import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD8mpLEVmtLe-3nZNjEZcfN9xw0b6XYf4k",
  authDomain: "db-eggscale.firebaseapp.com",
  databaseURL: "https://db-eggscale-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "db-eggscale",
  storageBucket: "db-eggscale.firebasestorage.app",
  messagingSenderId: "557138489591",
  appId: "1:557138489591:web:eaece386da4b8a0ff923f2",
  measurementId: "G-T1LGQKHWS8"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
