import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { isValidEmail, isValidPassword, doPasswordsMatch } from "../../utils/validators";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validations
    if (!isValidEmail(email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Password terlalu lemah, minimal 6 karakter.");
      return;
    }
    if (!doPasswordsMatch(password, confirmPassword)) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    try {
      const response = await register(email, password);
      if (response.success) {
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
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

        <h1 className="login-title">Daftar Akun</h1>
        <p className="login-subtitle">Sistem Monitoring Penimbangan Telur</p>

        {error && <div className="login-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="Masukkan email baru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
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
                placeholder="Masukkan password baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password">Konfirmasi Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                id="confirm-password"
                type="password"
                placeholder="Konfirmasi password baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Memproses..." : <>Daftar <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="auth-switch-link">
          Sudah punya akun? <Link to="/login">Login</Link>
        </div>

        <footer className="login-footer">
          © 2026 EggScale IoT System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
