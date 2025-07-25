"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children, activePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.pageContainer}>
      <header className={`${styles.navbar} glass-effect`}>
        <div className={`${styles.logo} gradient-text`}>Kinya</div>
        
        {/* Burger menu for mobile */}
        <button
          className={styles.burgerMenu}
          aria-label="Open navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {/* Nav links */}
        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${activePage === 'home' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/lessons" 
            className={`${styles.navLink} ${activePage === 'lessons' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Lessons
          </Link>
          <Link 
            href="/quizzes" 
            className={`${styles.navLink} ${activePage === 'quizzes' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Quizzes
          </Link>
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${activePage === 'dashboard' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/about" 
            className={`${styles.navLink} ${activePage === 'about' ? styles.active : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <div className={styles.mobileAuth}>
            <Link href="/login" className={`btn btn-secondary ${styles.navAuthBtn}`} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link href="/register" className={`btn btn-primary ${styles.navAuthBtn}`} onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </div>
        </nav>
        
        {/* Desktop auth buttons */}
        <div className={styles.desktopAuth}>
          <Link href="/login" className={`btn btn-secondary ${styles.navAuthBtn}`}>
            Login
          </Link>
          <Link href="/register" className={`btn btn-primary ${styles.navAuthBtn}`}>
            Register
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;