# Digital Literacy Campaign Chatbot

A modern, interactive chatbot for digital literacy assistance, built with a React frontend and Flask backend.  
Supports FAQ-based answers with a fallback to Azure OpenAI GPT-4o for advanced responses.

---

## Project Structure

root/
├── backend/
├── dlc-chatbot/ # React frontend
├── .env # Environment variables (gitignored)
├── .gitignore
└── README.md
---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Azure OpenAI account and API credentials

---

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate    # Linux/macOS
venv\Scripts\activate       # Windows
Install dependencies:
pip install -r requirements.txt
```
Create a .env file in the root folder with the following variables:
```bash
.env
AZURE_OPENAI_KEY=your_azure_openai_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
```
Run the backend server:
```bash
python app.py
```
Frontend Setup
Navigate to the frontend folder:
```bash
cd ../dlc-chatbot
```
Install dependencies:
```bash
npm install
# or
yarn install
```
Run the development server:
```bash
npm start
# or
yarn start
```

The app should open in your browser at http://localhost:3000.
