// Skeleton shaped like the study pages, shown while progress loads.
export default function Loading() {
  return (
    <div className="page" aria-busy="true" aria-label="Loading your study space…">
      <div className="page-head"><div className="skeleton-stack"><span className="skeleton w-30" /><span className="skeleton h-title w-60" /><span className="skeleton w-45" /></div></div>
      <div className="stat-grid">{Array.from({ length: 4 }, (_, index) => <span className="skeleton block" key={index} />)}</div>
      <div className="overview-grid">
        <div className="skeleton-stack"><span className="skeleton panel" /></div>
        <div className="skeleton-stack">{Array.from({ length: 5 }, (_, index) => <span className="skeleton row" key={index} />)}</div>
      </div>
    </div>
  );
}
