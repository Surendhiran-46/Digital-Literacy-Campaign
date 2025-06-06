# 📱 Digital Literacy Campaign – Smart App Guidance Chatbot

An AI-powered, voice-enabled chatbot designed to help digitally less-experienced users understand and use popular mobile apps with ease. Built for the **Digital Literacy Campaign**, this project offers quick instructions via an FAQ engine and intelligent GPT fallback – all wrapped in a modern, responsive UI.

---

## ✨ Features

* 💬 **Chatbot UI** with typing animation and smooth transitions
* 🧠 **FAQ engine** with close-match search and fallback to GPT-4o (Azure)
* 🗣️ **Voice input/output support** (Web Speech API)
* 📱 **App-based query grouping** for WhatsApp, Paytm, etc.
* 🌐 **Frontend hosted on Vercel**, backend hosted on **Render**
* 🎯 Accessible UX tailored for digitally less-experienced users

---

## 🛠️ Tech Stack

| Tech             | Purpose                            |
| ---------------- | ---------------------------------- |
| React + Tailwind | Interactive frontend design        |
| Flask            | Lightweight Python backend API     |
| OpenAI GPT-4o    | Natural language fallback handling |
| Azure OpenAI     | Enterprise GPT service             |
| Web Speech API   | Voice input/output support         |
| Render           | Backend hosting                    |
| Vercel           | Frontend hosting                   |

---

## 📁 Folder Structure

```
Digital Literacy Learner/
├── backend/              # Flask + GPT backend
│   ├── data/faqData.json
│   ├── app.py
│   ├── requirements.txt
│
├── dlc-chatbot/          # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
├── .env  
├── .gitignore
└── README.md (this file)
```

---

## ⚙️ Backend Setup (Flask + Azure GPT)

1. **Navigate to the backend folder:**

   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate       # Linux/macOS
   venv\Scripts\activate          # Windows
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** in `backend/` folder with:

   ```
   AZURE_OPENAI_KEY=your_azure_openai_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
   AZURE_OPENAI_DEPLOYMENT=your_deployment_name
   ```

5. **Start the server locally:**

   ```bash
   python app.py
   ```

---

## 💻 Frontend Setup (React + Tailwind CSS)

1. **Navigate to the frontend folder:**

   ```bash
   cd ../dlc-chatbot
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

---

## Live Demo

 [DLC Preview](https://digital-literacy-campaign.vercel.app/) 

---

## 🤝 Built By

### 💖 **Surendhiran**

> Crafted for the **CollegeTips.in Internship**
> Feel free to fork, clone, remix, and deploy this project for your own educational or campaign-based initiatives.

Let's make digital literacy **truly accessible** 💡🙌
