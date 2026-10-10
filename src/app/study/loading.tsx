// Skeleton shaped like the dashboard, shown while progress loads.
export default function Loading() {
  return (
    <div className="shell dashboard-content" aria-busy="true" aria-label="Loading your study space…">
      <div className="dashboard-hello">
        <div className="skeleton-stack"><span className="skeleton w-30" /><span className="skeleton h-title w-60" /><span className="skeleton w-45" /></div>
        <span className="skeleton stamp" />
      </div>
      <span className="skeleton bar" />
      <span className="skeleton continue" />
      <div className="dashboard-grid">
        <span className="skeleton panel" />
        <div className="skeleton-stack">{Array.from({ length: 6 }, (_, index) => <span className="skeleton row" key={index} />)}</div>
      </div>
    </div>
  );
}
