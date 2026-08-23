import CountUpStat from "./CountUpStat.jsx";
import GithubIcon from "./GithubIcon.jsx";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="container site-nav">
        <a href="#" className="site-brand">
          Carson Logas
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="container hero">
        <div className="hero-text">
          <p className="hero-greeting">Hi, I'm Carson.</p>
          <p className="hero-role">Software Engineer &amp; CS Graduate Student</p>
          <p className="hero-desc">
            I build full-stack web platforms, computer vision systems, and low-level computing
            projects &mdash; and I'm pursuing an M.S. in Computer Science at the University of
            Mississippi.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <CountUpStat date="2002-01-04" />
              <span className="hero-stat-label">Age</span>
            </div>
            <div className="hero-stat">
              <CountUpStat date="2017-08-21" />
              <span className="hero-stat-label">Years Coding</span>
            </div>
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View My Projects
            </a>
            <a
              className="btn btn-secondary"
              href="https://github.com/clogas24"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <img className="hero-photo" src="/css/headshot/hsAI.png" alt="Carson Logas" />
          <div className="hero-socials">
            <a
              className="hero-social-link"
              href="https://github.com/clogas24"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GithubIcon width={20} height={20} />
            </a>
            <a
              className="hero-social-link"
              href="https://www.linkedin.com/in/carson-logas/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
                <path d="M13.5 0h-11A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0zM5.34 13.5H3.03V6.14h2.31zM4.19 5.13a1.34 1.34 0 1 1 0-2.67 1.34 1.34 0 0 1 0 2.67zM13.5 13.5h-2.3V9.93c0-.85-.02-1.94-1.18-1.94-1.19 0-1.37.93-1.37 1.89v3.62h-2.3V6.14h2.21v1.01h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.76 1.53 2.76 3.52z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
