"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FIELD_NOTE_CATEGORIES, FIELD_NOTES } from "../_data";
import styles from "./field-manual.module.css";

export function FieldNotesList() {
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const filteredNotes = useMemo(
    () => activeCategory === "全部"
      ? FIELD_NOTES
      : FIELD_NOTES.filter((note) => note.category === activeCategory),
    [activeCategory]
  );

  return (
    <div>
      <div className={styles.filterRow} role="group" aria-label="按主题筛选手记">
        {FIELD_NOTE_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`${styles.filterButton} ${activeCategory === category ? styles.filterButtonActive : ""}`}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className={styles.filterStatus} aria-live="polite">
        {filteredNotes.length} 篇手记
        {activeCategory !== "全部" ? ` · ${activeCategory}` : ""}
      </p>
      <ul className={styles.noteList}>
        {filteredNotes.map((note, index) => (
          <li key={note.slug} className={styles.noteItem}>
            <span className={styles.noteNumber} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className={styles.noteContent}>
              <div className={styles.noteMeta}>
                <span>{note.category}</span>
                <span>{note.date}</span>
                <span>阅读 {note.readingTime}</span>
              </div>
              <h3 className={styles.noteTitle}>
                <Link href={`/templates/technical-profile/notes/${note.slug}`}>
                  {note.title}
                </Link>
              </h3>
              <p className={styles.noteExcerpt}>{note.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
