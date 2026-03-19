# 🤖 ML Project — Fashion MNIST Classifier

A full-stack machine learning web app that classifies clothing images into 10 Fashion MNIST categories using a trained Random Forest model.

## 🚀 Live Demo

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render

---

## 🧠 What It Does

Upload any clothing image and the model predicts which of these 10 categories it belongs to:

`T-shirt/top` · `Trouser` · `Pullover` · `Dress` · `Coat` · `Sandal` · `Shirt` · `Sneaker` · `Bag` · `Ankle boot`

---

## 🗂️ Project Structure

```
ML-Project/
├── backend/
│   ├── app.py              # Flask API
│   ├── train_model.py      # Model training script
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── pages/          # Home, Analytics, Feedback, Contact, About, History, SignIn, SignUp
│   │   ├── components/     # Header, Footer, FAQs, ProtectedRoute
│   │   └── context/        # Auth, Theme, Toast context providers
│   ├── vercel.json
│   └── package.json
├── render.yaml             # Render deployment config
└── MLProject.ipynb         # Exploratory notebook
```

---

## ⚙️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router |
| Backend | Python, Flask, Flask-CORS |
| ML Model | scikit-learn Random Forest (~87% accuracy) |
| Styling | Custom CSS with light/dark mode |
| Auth | JWT-less session auth with localStorage |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🖥️ Running Locally

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Runs on `http://localhost:5000`. The model auto-trains on first run if `model.pkl` is not present (~60s).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

Create `frontend/.env` with:

```
VITE_API_URL=http://localhost:5000
```

---

## 🔐 Features

- Sign up / Sign in with persistent login (localStorage)
- Protected routes — Analytics, Feedback, Contact require authentication
- Drag & drop image upload with live prediction
- Confidence scores for all 10 classes
- Prediction history per user
- Toast notifications for all actions
- Light / Dark mode toggle
- Feedback and Contact forms saved to JSON

---

## 📦 Deployment

### Backend → Render
- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `gunicorn app:app`

### Frontend → Vercel
- Root directory: `frontend`
- Framework: Vite
- Add env var: `VITE_API_URL=<your-render-url>`

---

## 📄 License

MIT
