import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img src="/logo.png" alt="GOM App Logo" className="splash-logo" />
        <h1 className="splash-title">GOM App</h1>
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}
