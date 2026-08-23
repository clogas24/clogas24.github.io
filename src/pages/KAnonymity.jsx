import ProjectPage from "../components/ProjectPage.jsx";
import TechTags from "../components/TechTags.jsx";

const results = [
  { dataset: "Adult Census Income", baseline: "0.818", kAnon: "0.741", dp: "0.799", diff: "+5.74 pp" },
  { dataset: "Heart Disease (Cleveland)", baseline: "0.833", kAnon: "0.793", dp: "0.847", diff: "+5.39 pp" },
  { dataset: "Diabetes Health Indicators", baseline: "0.862", kAnon: "0.861", dp: "0.860", diff: "−0.09 pp" },
];

const gallery = [
  {
    src: "/k-anonymity-vs-differential-privacy/images/fig1_privacy_utility_tradeoff.png",
    alt: "Privacy vs. utility tradeoff scatter plots for k-anonymity and differential privacy across all three datasets",
    caption: "Privacy vs. utility tradeoff: every parameter setting for both techniques, plotted on the same axes.",
  },
  {
    src: "/k-anonymity-vs-differential-privacy/images/fig2_accuracy_drop.png",
    alt: "Accuracy drop from baseline as a function of privacy parameter strength",
    caption: "Accuracy drop from baseline as privacy-parameter strength increases.",
  },
  {
    src: "/k-anonymity-vs-differential-privacy/images/fig3_avg_accuracy_comparison.png",
    alt: "Bar chart comparing average classifier accuracy per dataset and technique against the no-anonymization baseline",
    caption: "Average classifier accuracy per dataset and technique vs. the unanonymized baseline.",
  },
  {
    src: "/k-anonymity-vs-differential-privacy/images/fig4_reid_heatmap.png",
    alt: "Heatmap of reidentification rates for both techniques across all datasets and parameter settings",
    caption: "Reidentification-rate heatmap — both techniques stay near zero everywhere.",
  },
  {
    src: "/k-anonymity-vs-differential-privacy/images/fig5_dominance_summary.png",
    alt: "Bar chart summarizing the accuracy difference between differential privacy and k-anonymity per dataset",
    caption: "Accuracy difference (DP − k-anonymity) per dataset: positive means DP wins.",
  },
];

export default function KAnonymity() {
  return (
    <ProjectPage>
      <h1>Comparing K-Anonymity and Differential Privacy in Practice</h1>
      <p>
        CSCI 581 (University of Mississippi) final project. Both major data-anonymization
        techniques are implemented from scratch and evaluated head-to-head on the same three
        public datasets and the same utility/privacy metrics, to answer a question the surveyed
        literature leaves open: which one actually preserves more usable data in practice, at
        equivalent privacy protection?
      </p>

      <TechTags
        tags={["Python", "pandas", "NumPy", "scikit-learn", "IBM Diffprivlib", "Matplotlib"]}
      />

      <h2>Approach</h2>
      <p>
        K-anonymity and differential privacy were each implemented independently in Python and
        applied to three public datasets of varying size and domain: Adult Census Income (30,162
        records), Heart Disease &mdash; Cleveland (297 records), and Diabetes Health Indicators
        (253,680 records). Each dataset was split 80/20 into an anonymized training set and a
        held-out test set.
      </p>
      <ul>
        <li>
          <strong>K-anonymity</strong> was implemented from scratch using the Mondrian
          multidimensional partitioning algorithm (LeFevre et al., 2006), recursively splitting
          records on their quasi-identifiers and collapsing each partition to its mean, swept
          across k &isin; {"{2, 5, 10, 25, 50}"}.
        </li>
        <li>
          <strong>Differential privacy</strong> was implemented with IBM's Diffprivlib, applying
          the Laplace mechanism independently to each quasi-identifier column, swept across
          &epsilon; &isin; {"{0.1, 0.5, 1.0, 2.0, 5.0, 10.0}"}.
        </li>
      </ul>
      <p>
        Both techniques were then scored on the same two axes: a logistic regression classifier's
        accuracy on the true held-out test set (utility) and an exact-match reidentification rate
        against the anonymized training set (privacy) &mdash; putting every k setting and every
        &epsilon; setting on identical footing for direct comparison.
      </p>

      <h2>Results</h2>
      <p>
        Differential privacy preserved significantly more utility than k-anonymity on two of the
        three datasets, while both techniques achieved effectively equivalent, near-zero
        reidentification rates across every parameter setting tested &mdash; making utility the
        deciding factor between them.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Baseline accuracy</th>
            <th>Avg. k-anonymity accuracy</th>
            <th>Avg. DP accuracy</th>
            <th>DP &minus; k-anon</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.dataset}>
              <td>{row.dataset}</td>
              <td>{row.baseline}</td>
              <td>{row.kAnon}</td>
              <td>{row.dp}</td>
              <td>{row.diff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        K-anonymity generalizes by collapsing every record in a partition to that partition's
        mean, destroying within-partition variation that a classifier needs to learn from &mdash;
        irreversibly, and more so on small or high-skew datasets. Differential privacy instead
        adds noise per-record while leaving the overall statistical distribution largely intact,
        so it degrades gracefully. The one exception is the large Diabetes dataset, where
        k-anonymity's partitions stay small and tight enough that generalization barely changes
        the data, closing the gap.
      </p>

      <div className="image-gallery">
        {gallery.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <h2>Takeaways</h2>
      <ul>
        <li>
          Differential privacy is the better default when utility preservation matters &mdash; it
          degrades gracefully instead of structurally destroying data.
        </li>
        <li>
          K-anonymity remains competitive on very large datasets where quasi-identifiers have few
          unique values, since its partitions stay small and tight.
        </li>
        <li>
          Under a simple exact-match attack, both techniques achieve near-zero reidentification at
          every parameter setting tested &mdash; a stronger adversary model would likely widen the
          privacy gap between them.
        </li>
      </ul>

      <h2>Full Paper</h2>
      <p>
        The complete write-up is embedded below, or{" "}
        <a href="/k-anonymity-vs-differential-privacy/paper.pdf" target="_blank" rel="noopener">
          open the PDF directly
        </a>
        .
      </p>
      <embed
        src="/k-anonymity-vs-differential-privacy/paper.pdf#toolbar=0&navpanes=0"
        type="application/pdf"
      />
    </ProjectPage>
  );
}
