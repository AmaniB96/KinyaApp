"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaBookOpen, FaMicrophone, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import AnimatedTitle from "../components/AnimatedTitle";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const getDisplayName = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ')[0];
    }
    return session?.user?.email?.split('@')[0] || 'User';
  };

  return (
    <div className="landing-container">
      {/* Navigation */}
      <header className="navbar glass-effect">
        <div className="logo gradient-text">Kinya</div>
        {/* Burger menu for mobile */}
        <button
          className="burger-menu"
          aria-label="Open navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Desktop nav */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/" className="nav-link active" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/lessons" className="nav-link" onClick={() => setMenuOpen(false)}>
            Lessons
          </Link>
          <Link href="/quizzes" className="nav-link" onClick={() => setMenuOpen(false)}>
            Quizzes
          </Link>
          <Link href="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <div className="nav-auth-buttons mobile-auth">
            {session ? (
              <div style={{ color: 'var(--color-primary)', textAlign: 'center' }}>
                Welcome back, {getDisplayName()}!
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-secondary nav-auth-btn" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary nav-auth-btn" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        {/* Desktop auth buttons */}
        <div className="nav-auth-buttons desktop-auth">
          {status === "loading" ? (
            <div style={{ color: 'var(--color-text-muted)' }}>Loading...</div>
          ) : session ? (
            <div style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
              Welcome, {getDisplayName()}!
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary nav-auth-btn">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary nav-auth-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <AnimatedTitle />
        <p className="hero-subtitle">
          {session ? `Continue your journey, ${getDisplayName()}!` : "Discover the language, Embrace the culture"}
        </p>
        <div className="hero-cta-group">
          <Link href="/lessons" className="btn btn-primary">
            {session ? "Continue Learning" : "Start Learning"}
          </Link>
          <Link
            href="/quizzes"
            className="btn btn-secondary glass-effect"
          >
            Take a Quiz
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature glass-effect">
            <div className="feature-icon">
              <FaBookOpen />
            </div>
            <h3 className="feature-title gradient-text">
              Comprehensive Modules
            </h3>
            <p className="feature-description">
              Learn Kinyarwanda through structured, engaging lessons
            </p>
          </div>
          <div className="feature glass-effect">
            <div className="feature-icon">
              <FaMicrophone />
            </div>
            <h3 className="feature-title gradient-text">Voice Recognition</h3>
            <p className="feature-description">
              Practice pronunciation with instant feedback
            </p>
          </div>
          <div className="feature glass-effect">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3 className="feature-title gradient-text">Community Learning</h3>
            <p className="feature-description">
              Connect with fellow learners and native speakers
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer glass-effect">
        <div>
          <strong>Kinya</strong> &mdash; Learn Kinyarwanda the modern way
          <br />
          &copy; {new Date().getFullYear()} Kinya. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
