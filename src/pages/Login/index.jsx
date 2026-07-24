import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Credentials:", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Minimalist Egg Icon */}
        <div className="login-logo-container">
          <svg
            className="login-egg-icon"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 10C26 10 10 48 10 80C10 102 28 115 50 115C72 115 90 102 90 80C90 48 74 10 50 10Z"
              fill="#1b5e20"
            />
            <path
              d="M38 40C32 50 32 66 38 76"
              stroke="#ffffff"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="login-title">EggScale IoT</h1>
        <p className="login-subtitle">Sistem Monitoring Penimbangan Telur</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            Login <ArrowRight size={18} />
          </button>
        </form>

        <footer className="login-footer">
          © 2026 EggScale IoT System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
