import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Reveal from "../components/Reveal.jsx";
import TechTags from "../components/TechTags.jsx";
import GithubIcon from "../components/GithubIcon.jsx";

const projects = [
  {
    title: "K-Anonymity vs. Differential Privacy",
    desc: "Data Anonymization final project comparing two data-anonymization techniques head-to-head across three public datasets.",
    tags: ["Python", "scikit-learn"],
    href: "/k-anonymity-vs-differential-privacy/index.html",
    github: "https://github.com/clogas24/K-Anonymity-vs.-Differential-Privacy",
  },
  {
    title: "Real-Time File Sync Service",
    desc: "Computer Networks final project: a multi-client file synchronization server built from raw TCP sockets.",
    tags: ["Python", "TCP Sockets"],
    href: "/realtime-file-sync/index.html",
    github: "https://github.com/clogas24/Real-Time-File-Sync-Service",
  },
  {
    title: "C Compiler Front End",
    desc: "Compiler Construction project: a Flex/Bison lexer and parser that type-checks a C subset and emits ILOC-style IR in basic blocks.",
    tags: ["C", "Flex / Bison"],
    href: "/c-compiler/index.html",
    github: "https://github.com/clogas24/C-Compiler-Front-End",
  },
];

const cvProjects = [
  {
    title: "Project 0",
    desc: "Linear neural network classifier for Fashion-MNIST, with a hyperparameter sweep across learning rates.",
    href: "/computer-vision/Project0/index.html",
  },
  {
    title: "Project 1",
    desc: "Camera projection geometry, histogram equalization, and edge detection (DoG) on real photos.",
    href: "/computer-vision/Project1/index.html",
  },
  {
    title: "Project 2",
    desc: "Image rectification and an AR poster swap using homographies and image warping.",
    href: "/computer-vision/Project2/index.html",
  },
  {
    title: "Project 3",
    desc: "A TinySSD-style object detector trained to find bananas in the D2L banana dataset.",
    href: "/computer-vision/Project3/index.html",
  },
  {
    title: "Project 4",
    desc: "Forward and reverse diffusion — denoising a noised image step-by-step with a UNet.",
    href: "/computer-vision/Project4/index.html",
  },
];

const skillGroups = [
  {
    heading: "Languages",
    tags: ["Python", "JavaScript", "TypeScript", "C", "C++", "C#", "SQL"],
  },
  {
    heading: "Frameworks & Libraries",
    tags: [
      "Vue.js",
      "React",
      "Angular",
      "Node.js",
      "Express.js",
      ".NET Framework",
      "ASP.NET Core",
      "ASP.NET MVC",
      "ASP.NET Web API",
      "Flask",
      "Vite",
    ],
  },
  {
    heading: "Data & Machine Learning",
    tags: [
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "NLTK",
      "OpenCV",
      "TF-IDF",
      "SMOTE",
      "GridSearchCV",
      "Diffprivlib",
    ],
  },
  {
    heading: "Databases",
    tags: ["MySQL", "PostgreSQL", "SQL Server (SSMS)", "MongoDB", "Firebase"],
  },
  {
    heading: "Testing & Systems",
    tags: ["xUnit", "Flex / Bison", "Socket Programming", "Multithreading", "RESTful API Design"],
  },
  {
    heading: "Cloud & DevOps",
    tags: ["AWS (EC2, S3)", "Azure / Azure DevOps", "CI/CD", "Git / GitHub", "Agile / Scrum"],
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Reveal id="about" className="page-section">
          <div className="container">
            <h2 className="section-heading">About</h2>
            <p>
              Full-stack Software Engineer and Computer Science graduate student (M.S., University
              of Mississippi, expected December 2026) with production experience delivering
              enterprise analytics platforms, REST APIs, and security-hardened applications using
              Vue.js, .NET/C#, React, and Node.js. My coursework spans applied AI/ML &mdash;
              computer vision and privacy-preserving machine learning &mdash; alongside
              systems-level fundamentals in compilers and network programming. I like shipping
              features end-to-end, from database schema to production UI, with the tests and docs
              that keep them reliable.
            </p>
          </div>
        </Reveal>

        <Reveal id="experience" className="page-section">
          <div className="container">
            <h2 className="section-heading">Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-header">
                  <h3>AI App Development &amp; Full-Stack Intern</h3>
                  <span className="timeline-date">May &ndash; August 2026</span>
                </div>
                <p className="timeline-org">Exeter Finance &middot; Irving, TX</p>
                <ul className="timeline-list">
                  <li>
                    Developed and delivered a full-stack analytics dashboard using Vue.js, .NET
                    Framework, SQL, and amCharts 5, creating 4 custom REST API endpoints and
                    interactive visualizations that enabled business stakeholders to monitor
                    operational performance trends, resolution metrics, and process performance
                    across enterprise workflows.
                  </li>
                  <li>
                    Engineered full-stack reporting and analytics enhancements using Vue.js, .NET
                    Framework, SQL, xUnit, and amCharts 5, delivering KPI dashboards, application
                    funnel visualizations, dynamic status summaries, and an interactive geographic
                    concentration map supporting analysis of large-scale enterprise datasets
                    through synchronized filtering and real-time business intelligence reporting.
                  </li>
                  <li>
                    Designed and implemented a financial verification workflow across database,
                    backend, and frontend layers by introducing exception-driven status flags,
                    visual indicators, and custom filtering capabilities used by business teams to
                    identify post-verification changes, investigate new exception activity, and
                    streamline financial reconciliation processes.
                  </li>
                  <li>
                    Identified and remediated a high-severity application security vulnerability
                    discovered through automated security scanning, implementing secure input
                    validation and application hardening measures that eliminated exploitable
                    attack vectors, strengthened application security posture, and ensured
                    compliance with enterprise secure-release standards.
                  </li>
                  <li>
                    Developed and maintained 100+ xUnit test cases while creating SQL-based
                    edge-case test scenarios to validate business-critical workflows, improve
                    application reliability, and support successful Azure DevOps CI/CD pipeline
                    validation and production readiness.
                  </li>
                </ul>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-header">
                  <h3>Software Engineer Intern</h3>
                  <span className="timeline-date">May &ndash; July 2023</span>
                </div>
                <p className="timeline-org">Profiscience Inc. &middot; Flower Mound, TX</p>
                <ul className="timeline-list">
                  <li>Refactored customer-facing website content and improved user experience.</li>
                  <li>Identified and resolved critical bugs in new system releases, increasing stability.</li>
                  <li>Developed automated unit tests that reduced manual QA time by 40%.</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal id="projects" className="page-section">
          <div className="container">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="project-grid">
              {projects.map((p) => (
                <div className="project-card" key={p.title}>
                  <h2>{p.title}</h2>
                  <p>{p.desc}</p>
                  <TechTags tags={p.tags} />
                  <a className="project-link" href={p.href}>
                    View project &rarr;
                  </a>
                  <a
                    className="project-github-link"
                    href={p.github}
                    target="_blank"
                    rel="noopener"
                    aria-label="View on GitHub"
                  >
                    <GithubIcon width={18} height={18} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="computer-vision" className="page-section">
          <div className="container">
            <h2 className="section-heading">Computer Vision Projects</h2>
            <div className="project-grid">
              {cvProjects.map((p) => (
                <div className="project-card" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <a className="project-link" href={p.href}>
                    View project &rarr;
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="skills" className="page-section">
          <div className="container">
            <h2 className="section-heading">Skills</h2>
            {skillGroups.map((group) => (
              <div className="skills-group" key={group.heading}>
                <h3>{group.heading}</h3>
                <TechTags tags={group.tags} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal id="contact" className="page-section">
          <div className="container">
            <h2 className="section-heading">Contact</h2>
            <div className="resource-links">
              <a href="https://www.linkedin.com/in/carson-logas/" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a href="mailto:carsonlogas@outlook.com">Email</a>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
