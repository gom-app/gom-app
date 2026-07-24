import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Scale, Settings, LogOut, Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      navigate("/login");
    } else {
      alert("Gagal logout: " + response.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Panel */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
            <Menu size={22} />
          </button>
          {isSidebarOpen && (
            <Link to="/dashboard" className="sidebar-brand">
              <svg
                className="sidebar-egg-icon"
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
              <span>EggScale</span>
            </Link>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink 
                to="/dashboard" 
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <LayoutDashboard className="nav-icon" size={20} />
                {isSidebarOpen && <span className="nav-text">Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/penimbangan" 
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <Scale className="nav-icon" size={20} />
                {isSidebarOpen && <span className="nav-text">Penimbangan</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard/kalibrasi" 
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <Settings className="nav-icon" size={20} />
                {isSidebarOpen && <span className="nav-text">Kalibrasi Manual</span>}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer (Logout) */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="nav-icon text-danger" size={20} />
            {isSidebarOpen && <span className="nav-text text-danger">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-layout-container">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            {!isSidebarOpen && (
              <button className="hamburger-btn header-toggle" onClick={toggleSidebar}>
                <Menu size={22} />
              </button>
            )}
            <span className="welcome-text">Selamat datang, Admin</span>
          </div>
          <div className="header-right">
            <span className="user-profile">{user?.email || "Super Admin"}</span>
          </div>
        </header>

        {/* Render nested views here */}
        <main className="dashboard-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
