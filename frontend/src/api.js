const BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";

export const pingBackend = () =>
  fetch(`${BASE}/ping`).catch(() => {});

export const apiSignup = (data) =>
  fetch(`${BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const apiSignin = (data) =>
  fetch(`${BASE}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const predictUpload = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return fetch(`${BASE}/predict/upload`, { method: "POST", body: fd }).then(r => r.json());
};

export const fetchStats = () => fetch(`${BASE}/stats`).then(r => r.json());
export const fetchModels = () => fetch(`${BASE}/models`).then(r => r.json());
export const fetchClasses = () => fetch(`${BASE}/classes`).then(r => r.json());

export const submitFeedback = (data) =>
  fetch(`${BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const submitContact = (data) =>
  fetch(`${BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const predict = (pixels = null) =>
  fetch(`${BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pixels ? { pixels } : {}),
  }).then(r => r.json());

export const saveHistory = (data) =>
  fetch(`${BASE}/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const fetchHistory = (email) =>
  fetch(`${BASE}/history?email=${encodeURIComponent(email)}`).then(r => r.json());
