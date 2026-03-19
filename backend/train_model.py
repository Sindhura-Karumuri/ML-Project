"""
Train a Random Forest on Fashion MNIST via OpenML and save model.pkl
Run once: python train_model.py
"""
import numpy as np
import pickle
from sklearn.datasets import fetch_openml
from sklearn.ensemble import RandomForestClassifier

print("Fetching Fashion MNIST from OpenML (may take a minute)...")
mnist = fetch_openml('Fashion-MNIST', version=1, as_frame=False, parser='auto')
X = mnist.data.astype(np.float32) / 255.0
y = mnist.target.astype(int)

# Standard split: first 60k train, last 10k test
X_train, X_test = X[:60000], X[60000:]
y_train, y_test = y[:60000], y[60000:]

print(f"Training Random Forest on {len(X_train)} samples...")
clf = RandomForestClassifier(n_estimators=100, n_jobs=-1, random_state=42, verbose=1)
clf.fit(X_train, y_train)

acc = clf.score(X_test, y_test)
print(f"Test accuracy: {acc*100:.2f}%")

with open("model.pkl", "wb") as f:
    pickle.dump(clf, f)
print("Saved model.pkl — ready to use.")
