"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import styles from "./MainLayout.module.css";

const MainLayout = ({ children, activePage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const getDisplayName = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ')[0]; // First name only
    }
    return session?.user?.email?.split('@')[0] || 'User';
  };

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
          
          {/* Mobile auth section */}
          <div className={styles.mobileAuth}>
            {status === "loading" ? (
              <div className={styles.loading}>Loading...</div>
            ) : session ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <FaUser /> Welcome, {getDisplayName()}!
                </div>
                <button 
                  onClick={handleSignOut}
                  className={`btn btn-secondary ${styles.navAuthBtn}`}
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`btn btn-secondary ${styles.navAuthBtn}`} onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/register" className={`btn btn-primary ${styles.navAuthBtn}`} onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
        
        {/* Desktop auth section */}
        <div className={styles.desktopAuth}>
          {status === "loading" ? (
            <div className={styles.loading}>Loading...</div>
          ) : session ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.userButton}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <FaUser />
                {getDisplayName()}
              </button>
              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <Link 
                    href="/profile" 
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/dashboard" 
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className={styles.dropdownItem}
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className={`btn btn-secondary ${styles.navAuthBtn}`}>
                Login
              </Link>
              <Link href="/register" className={`btn btn-primary ${styles.navAuthBtn}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;