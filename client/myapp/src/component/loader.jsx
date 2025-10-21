// Loader.jsx - Reusable loading component
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ 
  size = 'medium', 
  message = 'Loading...', 
  centered = true,
  showMessage = true 
}) {
  const sizeMap = {
    small: '1.5rem',
    medium: '2.5rem',
    large: '4rem'
  };

  const LoadingContent = () => (
    <>
      <CircularProgress size={sizeMap[size]} />
      {showMessage && (
        <p className="mt-3 text-muted mb-0">{message}</p>
      )}
    </>
  );

  if (centered) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <LoadingContent />
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center">
      <LoadingContent />
    </div>
  );
}

export function PageLoader({ message = 'Loading page...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <CircularProgress size="3rem" />
        <p className="mt-3 text-muted">{message}</p>
      </div>
    </div>
  );
}

export function ButtonLoader({ size = 20 }) {
  return (
    <span 
      className="spinner-border spinner-border-sm me-2" 
      role="status" 
      aria-hidden="true"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
