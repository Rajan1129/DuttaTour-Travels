import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

export default function AdminLogin() {
  const [username, setUsername] = useState(localStorage.getItem("dutta_admin_user") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Defined admin credentials requested by user
  const TARGET_USERNAME = "duttatravels@lav.com";
  const TARGET_PASSWORD = "lav#duttaservice";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError("Please enter both Username and Password.");
      return;
    }

    const isUserValid = trimmedUser === TARGET_USERNAME.toLowerCase();
    const isPassValid = trimmedPass === TARGET_PASSWORD;

    if (!isUserValid || !isPassValid) {
      setError("Invalid username or password. Access denied.");
      return;
    }

    setIsSubmitting(true);

    if (rememberMe) {
      localStorage.setItem("dutta_admin_user", TARGET_USERNAME);
    } else {
      localStorage.removeItem("dutta_admin_user");
    }

    // Set admin token for backend API compatibility
    localStorage.setItem("dutta_admin_token", "dutta-admin-secret-2026");

    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/admin/dashboard");
    }, 300);
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("dutta_admin_theme") || "dark";
  });
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dutta_admin_theme", next);
  };

  return (
    <div className={`min-h-screen w-full overflow-y-auto ${isDark ? "bg-[#141b2b] text-white" : "bg-[#f4f6fa] text-gray-800"} flex items-center justify-center p-4 py-8 selection:bg-orange-500 selection:text-white transition-colors duration-200`}>
      <SEO
        path="/admin/login"
        title="Admin Login | Dutta Tour & Travel"
        description="Admin portal login for Dutta Tour & Travel management."
        noindex
      />

      <div className={`max-w-[420px] w-full ${isDark ? "bg-[#1e2638] border-white/10" : "bg-white border-gray-200 shadow-xl"} rounded-2xl p-6 sm:p-7 border shadow-2xl relative overflow-hidden my-auto transition-colors duration-200`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f57c00]/10 rounded-bl-full pointer-events-none" />

        {/* Top bar with Theme Switcher */}
        <div className="flex items-center justify-end mb-3 relative z-10">
          <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-amber-300 border-white/10"
                : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[15px] text-[#f57c00]">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>

        {/* Website Running Logo & Branding */}
        <div className="flex flex-col items-center text-center gap-2 mb-5 relative z-10">
          <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition-opacity">
            <img
              src="/logo.png"
              alt="Dutta Tour & Travels"
              className="h-11 sm:h-12 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
            />
            <div className="flex flex-col text-left">
              <span className={`font-extrabold text-xl sm:text-2xl ${isDark ? "text-white" : "text-gray-900"} leading-tight tracking-tight`}>
                Dutta Travels
              </span>
              <span className="font-bold text-[9px] sm:text-[10px] text-[#f57c00] uppercase tracking-wider">
                DUTTA MOTORS &bull; UNA
              </span>
            </div>
          </Link>
          <div className="mt-1">
            <span className={`text-xs font-bold ${isDark ? "text-gray-300 bg-white/5 border-white/10" : "text-gray-700 bg-gray-100 border-gray-200"} uppercase tracking-wider px-3 py-1 rounded-full border`}>
              Admin Portal Login
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-3 relative z-10">
          {/* Username Field */}
          <div>
            <label className={`block text-[11px] font-bold ${isDark ? "text-gray-300" : "text-gray-700"} uppercase tracking-wide mb-1 flex items-center justify-between`}>
              <span>Username</span>
              <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">security</span>
                <span>Security Highly Priority</span>
              </span>
            </label>
            <div className={`relative flex items-center ${isDark ? "bg-[#141b2b] border-white/10" : "bg-gray-50 border-gray-300"} rounded-xl px-3 py-2 border focus-within:border-[#f57c00]`}>
              <span className="material-symbols-outlined text-[17px] text-gray-400 mr-2 shrink-0">
                shield_person
              </span>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (Security Highly Priority)"
                className={`w-full bg-transparent text-xs sm:text-sm ${isDark ? "text-white" : "text-gray-900"} focus:outline-none placeholder-gray-400 font-medium`}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-[11px] font-bold ${isDark ? "text-gray-300" : "text-gray-700"} uppercase tracking-wide mb-1 flex items-center justify-between`}>
              <span>Password</span>
              <span className={`text-[9px] ${isDark ? "text-gray-400" : "text-gray-500"} font-medium`}>Encrypted</span>
            </label>
            <div className={`relative flex items-center ${isDark ? "bg-[#141b2b] border-white/10" : "bg-gray-50 border-gray-300"} rounded-xl px-3 py-2 border focus-within:border-[#f57c00]`}>
              <span className="material-symbols-outlined text-[17px] text-gray-400 mr-2 shrink-0">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (Security Highly Priority)…"
                className={`w-full bg-transparent text-xs sm:text-sm ${isDark ? "text-white" : "text-gray-900"} focus:outline-none placeholder-gray-400 pr-7 font-mono`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-2.5 text-gray-400 hover:${isDark ? "text-white" : "text-gray-900"} transition-colors cursor-pointer`}
                title={showPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me & Security Status */}
          <div className={`flex items-center justify-between text-[11px] ${isDark ? "text-gray-400" : "text-gray-600"} pt-0.5`}>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={`w-3.5 h-3.5 text-[#f57c00] rounded focus:ring-0 ${isDark ? "bg-[#141b2b] border-white/10" : "bg-white border-gray-300"} cursor-pointer`}
              />
              <span>Remember session</span>
            </label>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">verified_user</span>
              <span>256-Bit SSL</span>
            </span>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-[15px] shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl bg-[#f57c00] hover:bg-[#e65100] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
          >
            <span className="material-symbols-outlined text-[17px]">login</span>
            <span>{isSubmitting ? "Verifying…" : "Sign In to Admin Portal"}</span>
          </button>

          <div className={`pt-2 border-t ${isDark ? "border-white/10" : "border-gray-200"} text-center`}>
            <Link to="/" className={`text-[11px] ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors inline-flex items-center gap-1`}>
              <span className="material-symbols-outlined text-[13px]">arrow_back</span>
              <span>Back to Public Website</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
