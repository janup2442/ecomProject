// ProductCardSkeleton.jsx - Loading placeholder for product cards
export default function ProductCardSkeleton() {
  return (
    <div className="card h-100 shadow-sm">
      {/* Image placeholder */}
      <div 
        className="card-img-top bg-light d-flex align-items-center justify-content-center" 
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        {/* Title skeleton */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-8"></span>
        </div>
        
        {/* Brand skeleton */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-6"></span>
        </div>
        
        {/* Rating skeleton */}
        <div className="placeholder-glow mb-2">
          <span className="placeholder col-4"></span>
        </div>
        
        {/* Price skeleton */}
        <div className="placeholder-glow mt-auto">
          <span className="placeholder col-7"></span>
        </div>
      </div>
    </div>
  );
}
