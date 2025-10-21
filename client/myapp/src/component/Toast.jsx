// Toast.jsx - Toast notification system
import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const { id, message, type } = toast;
  
  const getToastClass = () => {
    switch (type) {
      case 'success':
        return 'text-bg-success';
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      case 'info':
        return 'text-bg-info';
      default:
        return 'text-bg-primary';
    }
  };

  return (
    <div className={`toast show ${getToastClass()}`} role="alert">
      <div className="toast-header">
        <strong className="me-auto">
          {type === 'success' && '✅'} 
          {type === 'error' && '❌'} 
          {type === 'warning' && '⚠️'} 
          {type === 'info' && 'ℹ️'}
          {' '}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </strong>
        <button 
          type="button" 
          className="btn-close" 
          onClick={() => onClose(id)}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">
        {message}
      </div>
    </div>
  );
}
