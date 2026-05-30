"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError(res.error || "An unexpected error occurred");
        }
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="/Daksh-logo.jpg" alt="Daksh Interiors" className="logo" />
        </div>
        <h1>Admin Control Panel</h1>
        <p>Log in to manage your website content and enquiries.</p>
        
        {error && <div className="error-alert">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="support@dakshinteriors.in"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-blue);
          padding: 20px;
        }
        .login-card {
          background: white;
          padding: 50px;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          width: 100%;
          max-width: 450px;
        }
        .logo-container { text-align: center; margin-bottom: 30px; }
        .logo { height: 70px; object-fit: contain; }
        h1 { font-size: 1.8rem; color: var(--brand-blue); text-align: center; margin-bottom: 10px; }
        p { color: #666; text-align: center; margin-bottom: 30px; font-size: 0.95rem; }
        .error-alert {
          background: #fee2e2;
          color: #dc2626;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .form-group { margin-bottom: 20px; }
        label { display: block; font-weight: 700; margin-bottom: 8px; color: var(--brand-blue); font-size: 0.85rem; text-transform: uppercase; }
        input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          border: 2px solid #eee;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
        input:focus { outline: none; border-color: var(--brand-orange); }
        .btn-login {
          width: 100%;
          background: var(--brand-orange);
          color: white;
          padding: 16px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 800;
          margin-top: 10px;
          cursor: pointer;
        }
        .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
