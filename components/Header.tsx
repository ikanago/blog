import React from "react";
import Link from "next/link";
const styles = require("./header.module.css");

export const Header = () => (
  <header className={styles.header}>
    <div className={styles.header_inner}>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/about" className={styles.link}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div >
  </header >
);
