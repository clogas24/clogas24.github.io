export default function ProjectPage({ children }) {
  return (
    <div className="container project-page">
      <a className="back-link" href="/index.html">
        &larr; Back to all projects
      </a>
      {children}
    </div>
  );
}
