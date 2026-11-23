"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import styles from "./_components/field-manual.module.css";

const THEME_STORAGE_KEY = "stylekit-technical-profile-theme";
const THEME_CHANGE_EVENT = "stylekit-technical-profile-theme-change";

function subscribeToThemeChanges(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

function getThemeSnapshot() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
}

function getServerThemeSnapshot() {
  return false;
}

export default function TechnicalProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storedTheme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [selectedTheme, setSelectedTheme] = useState<boolean | null>(null);
  const isDark = selectedTheme ?? storedTheme;

  function toggleTheme() {
    const next = !isDark;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
      setSelectedTheme(null);
    } catch {
      setSelectedTheme(next);
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <>
      <div id="top" className={`${styles.sheet} ${isDark ? styles.dark : ""}`}>
      <header className={`${styles.masthead} ${styles.crosslineBottom}`}>
        <div className={styles.rail}>
          <Link className={styles.wordmark} href="/templates/technical-profile">
            <span className={styles.wordmarkGlyph} aria-hidden="true">颖/</span>
            <span>颖的手记</span>
          </Link>
          <nav className={styles.navigation} aria-label="主导航">
            <Link href="/templates/technical-profile#work">项目</Link>
            <Link href="/templates/technical-profile#notes">手记</Link>
          </nav>
          <button
            className={styles.themeButton}
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "使用浅色主题" : "使用深色主题"}
            title={isDark ? "使用浅色主题" : "使用深色主题"}
          >
            {isDark ? <Sun aria-hidden="true" size={16} /> : <Moon aria-hidden="true" size={16} />}
          </button>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div className={styles.rail}>
          <div className={styles.footerTop}>
            <Link href="/templates/technical-profile" className={styles.wordmark}>
              <span className={styles.wordmarkGlyph} aria-hidden="true">颖/</span>
              <span>颖的手记</span>
            </Link>
            <a href="#top" className={styles.backToTop}>回到顶部</a>
          </div>
          <p className={styles.sampleNote}>
            记录学习、折腾与建造的过程。
          </p>
          <div className={styles.footerMeta}>
            <span>颖的手记 / 2026</span>
            <a href="https://github.com/sjy1024" target="_blank" rel="noopener noreferrer">GitHub · sjy1024</a>
            <span>基于 StyleKit 模板 · MIT</span>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
