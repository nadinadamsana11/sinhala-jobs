/**
 * Firebase configuration and initialization module.
 * Following Clean Architecture: Data layer source initialization.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVITxn2yGKrzOEl4AGWdDmXeMMsHCRUow",
  authDomain: "sinhala-jobs.firebaseapp.com",
  projectId: "sinhala-jobs",
  storageBucket: "sinhala-jobs.firebasestorage.app",
  messagingSenderId: "133179969587",
  appId: "1:133179969587:web:5da0ad7ec757da8b715346",
  measurementId: "G-B8T0VQHCLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db, analytics };
