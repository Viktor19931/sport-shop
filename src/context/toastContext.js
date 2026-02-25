import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Toast from '../components/Toast/Toast';

export const ToastContext = createContext({
  showToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    if (!message) return;

    clearTimeout(timerRef.current);
    setToast({ message, type });

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export default ToastContext;
