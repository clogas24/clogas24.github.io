import ProjectPage from "./ProjectPage.jsx";
import TechTags from "./TechTags.jsx";

// Every computer-vision write-up (Project0-4) shares this shape: title, intro,
// tech tags, an Approach section, and an embedded PDF report.
export default function CvProjectPage({ title, intro, tags, approach, dir, pdfName }) {
  const pdfPath = `/computer-vision/${dir}/${encodeURIComponent(pdfName)}.pdf`;

  return (
    <ProjectPage>
      <h1>{title}</h1>
      <p>{intro}</p>

      <TechTags tags={tags} />

      <h2>Approach</h2>
      {approach.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <h2>Full Report</h2>
      <p>
        The complete write-up is embedded below, or{" "}
        <a href={pdfPath} target="_blank" rel="noopener">
          open the PDF directly
        </a>
        .
      </p>
      <embed src={`${pdfPath}#toolbar=0&navpanes=0`} type="application/pdf" />
    </ProjectPage>
  );
}
