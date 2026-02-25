import React from 'react';

import * as styles from './Toast.module.css';

const ICONS = {
  info: 'ⓘ',
  success: '✓',
  error: '!',
};

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      style={{ '--toast-duration': '4s' }}
      role="status"
      aria-live="assertive"
    >
      <div className={styles.icon} aria-hidden="true">
        {ICONS[type] || ICONS.info}
      </div>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <div className={styles.progress} />
      </div>
      <button className={styles.close} onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default Toast;
