from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import difflib
import os
from dotenv import load_dotenv
from openai import AzureOpenAI

app = Flask(__name__)
CORS(app)

# Load environment variables from .env
load_dotenv()

# Load the FAQ data
with open('./data/faqData.json', 'r', encoding='utf-8') as f:
    faq_data = json.load(f)

# Azure GPT credentials
AZURE_API_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get('question', '').strip().lower()
    app_name = data.get('app', '').strip().lower()

    # Try local FAQ matching first
    if app_name in faq_data:
        possible_questions = list(faq_data[app_name].keys())
        closest = difflib.get_close_matches(question, possible_questions, n=1, cutoff=0.4)

        if closest:
            match = closest[0]
            return jsonify({'steps': faq_data[app_name][match]})

    # Fallback to GPT using Azure
    if AZURE_API_KEY and AZURE_ENDPOINT and AZURE_DEPLOYMENT:
        try:
            client = AzureOpenAI(
                api_key=AZURE_API_KEY,
                api_version="2024-05-01-preview",
                azure_endpoint=AZURE_ENDPOINT,
            )

            response = client.chat.completions.create(
                model=AZURE_DEPLOYMENT,
                messages = [
                    {
                        "role": "system",
                        "content": (
                            f"You are a helpful and friendly digital literacy assistant specializing in the app '{app_name}'."
                            "Please answer user questions in a clear, simple, and easy-to-understand way. "
                            "Provide step-by-step instructions just like a human would explain to a beginner. "
                            "Do NOT use any special formatting, markdown symbols, bullet points, or headers. "
                            "Keep the response concise and avoid technical jargon. "
                            "Make sure the steps can be read aloud smoothly, without any symbols like '###' or '•'."
                        )
                    },
                    {
                        "role": "user",
                        "content": question
                    }
                    ],              
                temperature=0.5,
                max_tokens=300,
            )

            gpt_reply = response.choices[0].message.content
            steps = [s.strip() for s in gpt_reply.split('\n') if s.strip()]
            return jsonify({'steps': steps})

        except Exception as e:
            print("GPT fallback failed:", e)
            return jsonify({'steps': ['Could not fetch an answer. Please try again later.']}), 500

    return jsonify({'steps': ['App not found or GPT unavailable.']}), 400

@app.route('/faqs/<app_name>', methods=['GET'])
def get_faqs(app_name):
    app_name = app_name.strip().lower()
    if app_name in faq_data:
        questions = list(faq_data[app_name].keys())
        return jsonify({'faqs': questions})
    else:
        return jsonify({'faqs': [], 'error': 'App not found'}), 404

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

