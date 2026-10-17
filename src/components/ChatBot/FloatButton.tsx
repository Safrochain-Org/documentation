import React from 'react';
import Link from '@docusaurus/Link';
import styles from './FloatButton.module.css';

export default function FloatButton(): React.JSX.Element {
  return (
    <Link className={styles.launcher} to="/chat" aria-label="Open Ask me chat">
      {/* Icône sous forme de point d'interrogation stylisé et épuré */}
      <span className={styles.launcherIcon} aria-hidden="true">?</span>
      <span className={styles.launcherText}>Ask me</span>
    </Link>
  );
}
