"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash, FaSignOutAlt } from "react-icons/fa";
import styles from "./login.module.css";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLogin) {
      // Sign up validation
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      
      // Here you would implement your signup logic
      setError("Sign up functionality not yet implemented");
      setLoading(false);
      return;
    }

    // Login
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    
    setLoading(false);
    if (res.error) setError("Invalid credentials");
    else router.push("/dashboard");
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  if (session) {
    const displayName =
      session.user?.name ||
      session.user?.email?.split("@")[0] ||
      "User";
    return (
      <div className={styles.container}>
        <div className={styles.loggedInBox}>
          <div
            className={styles.welcomeDropdown}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            ref={dropdownRef}
          >
            <span className={styles.welcomeName}>
              Welcome, {displayName}!
            </span>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <FaSignOutAlt style={{ marginRight: 8 }} />
                  Logout
                </button>
              </div>
            )}
          </div>
          <p className={styles.loggedInText}>You are logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.authCard} glass-effect`}>
        <div className={styles.header}>
          <h1 className={`${styles.title} gradient-text`}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className={styles.subtitle}>
            {isLogin 
              ? "Sign in to continue your Kinyarwanda journey" 
              : "Join thousands learning Kinyarwanda"
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className={styles.input}
                required={!isLogin}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <div className={styles.passwordInput}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <div className={styles.passwordInput}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  required={!isLogin}
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className={`btn btn-primary ${styles.submitButton}`}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.buttonSpinner}></div>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <button 
          onClick={handleGoogleSignIn} 
          className={`${styles.googleButton} glass-effect`}
        >
          <FaGoogle />
          Continue with Google
        </button>

        <div className={styles.switchMode}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={switchMode}
              className={styles.switchButton}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ...existing styles... */

.loggedInBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
}

.welcomeDropdown {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.welcomeDropdown:hover .welcomeName {
  color: var(--color-secondary);
}

.dropdownMenu {
  position: absolute;
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-background);
  border: 1px solid rgba(46, 204, 113, 0.2);
  border-radius: 0.7rem;
  box-shadow: 0 4px 32px 0 rgba(46, 204, 113, 0.12);
  min-width: 140px;
  z-index: 100;
  padding: 0.5rem 0;
  animation: fadeInUp 0.2s;
}

.dropdownItem {
  width: 100%;
  padding: 0.7rem 1rem;
  background: none;
  border: none;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.2s;
}

.dropdownItem:hover {
  background: rgba(46, 204, 113, 0.08);
  color: var(--color-secondary);
}

.loggedInText {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-top: 0.5rem;
}