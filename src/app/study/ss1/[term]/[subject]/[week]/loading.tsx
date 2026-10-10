// Skeleton shaped like a lesson page, shown while the lesson and saved notes load.
export default function Loading() {
  return (
    <div className="page lesson-shell" aria-busy="true" aria-label="Loading lesson…">
      <span className="skeleton pill" />
      <div className="lesson-head skeleton-stack"><span className="skeleton w-30" /><span className="skeleton h-title w-60" /><span className="skeleton w-75" /><span className="skeleton w-45" /></div>
      <div className="lesson-columns">
        <span className="skeleton panel" />
        <div className="skeleton-stack">{Array.from({ length: 5 }, (_, index) => <span className="skeleton block" key={index} />)}</div>
      </div>
    </div>
  );
}
