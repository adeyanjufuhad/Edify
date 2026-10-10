// Skeleton shaped like the dashboard, shown while progress loads.
export default function Loading() {
  return (
    <div className="shell dashboard-content" aria-busy="true" aria-label="Loading your study space…">
      <div className="dash-hero">
        <div className="skeleton-stack"><span className="skeleton w-30" /><span className="skeleton h-title w-60" /><span className="skeleton w-45" /></div>
        <span className="skeleton ring" />
      </div>
      <span className="skeleton bar" />
      <div className="path-grid">
        <div className="skeleton-stack">{Array.from({ length: 7 }, (_, index) => <span className="skeleton row" key={index} />)}</div>
        <span className="skeleton panel" />
      </div>
    </div>
  );
}
