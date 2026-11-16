import ProjectPage from "../../components/ProjectPage.jsx";
import TechTags from "../../components/TechTags.jsx";

const IMG = "/Multimodal-Foundation-Models/Project2/images";

const setupRows = [
  { item: "Architecture (all parts)", detail: "MLP: input (x, y, t) → 3 hidden layers of width 128 with SiLU → 2 outputs. 33,794 parameters" },
  { item: "Training", detail: "Adam, lr 10⁻³ with cosine decay to 5×10⁻⁵, batch 256, fresh random pairs every step" },
  { item: "Training steps", detail: "Part 1: 20,000. Part 2 / Part 3 baselines: 30,000. Reflow: 10,000. Compute-matched control: 36,042" },
  { item: "Seeds", detail: "Seed 0 in Parts 1–2; seeds 0, 1, 2 in Part 3. Evaluation noise and target samples use separate fixed seeds" },
  { item: "Device", detail: "CPU only: Intel 10th-gen Core, 6 torch threads, Windows 11, Python 3.13, torch 2.14 (CPU)" },
];

const stepRows = [
  { k: "1", time: "0.11 s", tv: "1.000", tvRef: "0.997", shift: "1.704", onLetter: "0.000" },
  { k: "2", time: "0.22 s", tv: "0.703", tvRef: "0.702", shift: "0.760", onLetter: "0.306" },
  { k: "5", time: "0.58 s", tv: "0.304", tvRef: "0.274", shift: "0.284", onLetter: "0.842" },
  { k: "10", time: "1.25 s", tv: "0.196", tvRef: "0.142", shift: "0.142", onLetter: "0.895" },
  { k: "25", time: "3.15 s", tv: "0.147", tvRef: "0.061", shift: "0.056", onLetter: "0.910" },
  { k: "50", time: "5.38 s", tv: "0.134", tvRef: "0.034", shift: "0.027", onLetter: "0.912" },
  { k: "100", time: "10.4 s", tv: "0.129", tvRef: "0.019", shift: "0.013", onLetter: "0.912" },
  { k: "200", time: "17.2 s", tv: "0.127", tvRef: "0.010", shift: "0.006", onLetter: "0.912" },
  { k: "1000 (ref.)", time: "103 s", tv: "0.127", tvRef: "—", shift: "—", onLetter: "0.911" },
];

const costRows = [
  { item: "Baseline training (30,000 steps)", compute: "23.0M", mean: "100.4 s" },
  { item: "Reflow: generate 100k pairs (200 steps)", compute: "20.0M", mean: "44.9 s" },
  { item: "Reflow: train (10,000 steps)", compute: "7.7M", mean: "42.4 s" },
  { item: "Reflow: total extra", compute: "27.7M", mean: "87.3 s" },
  { item: "Control: continued training (36,042 steps)", compute: "27.7M", mean: "128.7 s" },
];

const reflowRows = [
  { k: "1", base: "1.000 ± 0.000", ctrl: "1.000 ± 0.000", reflow: "0.178 ± 0.007", baseOn: "0.000", ctrlOn: "0.000", reflowOn: "0.871" },
  { k: "2", base: "0.712 ± 0.007", ctrl: "0.712 ± 0.006", reflow: "0.156 ± 0.006", baseOn: "0.297", ctrlOn: "0.307", reflowOn: "0.881" },
  { k: "3", base: "0.471 ± 0.005", ctrl: "0.468 ± 0.001", reflow: "0.148 ± 0.005", baseOn: "0.691", ctrlOn: "0.679", reflowOn: "0.886" },
  { k: "5", base: "0.310 ± 0.005", ctrl: "0.313 ± 0.002", reflow: "0.144 ± 0.006", baseOn: "0.838", ctrlOn: "0.869", reflowOn: "0.892" },
  { k: "10", base: "0.201 ± 0.008", ctrl: "0.174 ± 0.001", reflow: "0.142 ± 0.006", baseOn: "0.890", ctrlOn: "0.927", reflowOn: "0.896" },
  { k: "25", base: "0.148 ± 0.008", ctrl: "0.110 ± 0.002", reflow: "0.141 ± 0.006", baseOn: "0.906", ctrlOn: "0.939", reflowOn: "0.897" },
  { k: "50", base: "0.136 ± 0.007", ctrl: "0.095 ± 0.002", reflow: "0.141 ± 0.005", baseOn: "0.909", ctrlOn: "0.938", reflowOn: "0.898" },
  { k: "100", base: "0.132 ± 0.006", ctrl: "0.088 ± 0.002", reflow: "0.140 ± 0.005", baseOn: "0.909", ctrlOn: "0.937", reflowOn: "0.899" },
];

const straightnessRows = [
  { model: "Baseline", excess: "0.422 ± 0.003", velDev: "1.100", curved: "97.9%" },
  { model: "Continued (control)", excess: "0.424 ± 0.004", velDev: "1.112", curved: "98.1%" },
  { model: "Reflow", excess: "0.0001 ± 0.0000", velDev: "0.0003", curved: "0.1%" },
];

const part1Gallery = [
  {
    src: `${IMG}/fig1_training_paths.png`,
    alt: "Left: 40 straight gray lines between random Gaussian points and ring-cluster points, crossing each other everywhere. Right: one path with ten identical velocity arrows along it",
    caption: "40 random training pairs (they cross constantly), and one path whose finite-difference velocity is identical at all 10 times.",
    wide: true,
  },
  {
    src: `${IMG}/fig2_training_loss.png`,
    alt: "Training loss curve flattening near 5.7 after about 2,000 steps, next to a plot of loss by time t that rises to a peak near t = 0.2 and falls to a minimum near t = 0.75",
    caption: "Loss flattens at ~5.7 — the noise floor of random pairing. Binned by t, it starts near 9.1, peaks at 11.0 around t ≈ 0.2, and bottoms out at 1.56 around t ≈ 0.75.",
    wide: true,
  },
  {
    src: `${IMG}/fig3_generation_snapshots.png`,
    alt: "Five snapshots of 4,000 purple particles moving from a Gaussian blob to eight clusters on a ring, next to red target samples",
    caption: "The same 4,000 particles at t = 0, 0.25, 0.5, 0.75, 1 (purple) vs. independent target samples (red).",
    wide: true,
  },
  {
    src: `${IMG}/fig4_velocity_fields.png`,
    alt: "Five quiver plots of the learned velocity field: inward arrows at t = 0, near-zero at t = 0.25, outward at t = 0.5, and eight funnels into the clusters at t = 0.75 and 0.95",
    caption: "The learned field at five times: inward at t = 0, nearly zero at 0.25, flipped outward at 0.5, then eight basins funneling into the clusters.",
    wide: true,
  },
  {
    src: `${IMG}/fig5_trajectories_vs_training_paths.png`,
    alt: "Three panels: crossing straight training lines, curved non-crossing sampling trajectories from noise to the eight clusters, and trajectories drawn against their dashed start-to-end chords",
    caption: "Straight crossing training paths (left) vs. curved, non-crossing sampling trajectories (middle), each against its own chord (right).",
    wide: true,
  },
];

const part2TargetGallery = [
  {
    src: `${IMG}/fig6_cl_target.png`,
    alt: "The rendered bold CL mask, a Gaussian source cloud, and 8,000 red target samples forming the letters CL",
    caption: "The rendered “CL” mask, the Gaussian source, and 8,000 target samples.",
    wide: true,
  },
];

const part2AnimationGallery = [
  {
    src: `${IMG}/fig7_cl_flow_animation.gif`,
    alt: "Animation of 3,000 colored particles flowing from a Gaussian blob into the letters CL, colored blue to green for the C and yellow to red for the L",
    caption: "The learned transport, animated: 3,000 particles colored by where they end up (C blue → green, L yellow → red), with short fading trails.",
    wide: true,
  },
  {
    src: `${IMG}/fig8_cl_still_frames.png`,
    alt: "Two rows of six frames at t = 0 to 1. Top row colored by endpoint shows a clean left-to-right color gradient from the start; bottom row colored by starting angle shows contiguous hue bands wrapping around the C",
    caption: "Still frames at t = 0, 0.2, …, 1. Top: colored by endpoint — already sorted left-to-right at t = 0. Bottom: colored by starting angle — bands stay contiguous, so the C has to wrap the cloud around itself.",
    wide: true,
  },
];

const part2StepsGallery = [
  {
    src: `${IMG}/fig9_clouds_by_steps.png`,
    alt: "Ten panels of generated point clouds for K = 1, 2, 5, 10, 25, 50, 100, 200 and 1000 Euler steps plus red target samples; K = 1 is a single dot and the letters sharpen up to about K = 50",
    caption: "Final clouds from the same 40,000 starts at each step count, the 1,000-step reference, and target samples.",
    wide: true,
  },
  {
    src: `${IMG}/fig10_quality_vs_cost.png`,
    alt: "Three plots against step count: TV to target leveling off near 0.13 with discretization error dropping below the noise floor, on-letter rate leveling at 0.91, and sampling time growing linearly",
    caption: "TV to target and to the 1,000-step reference, on-letter rate, and sampling time vs. K.",
    wide: true,
  },
  {
    src: `${IMG}/fig11_error_map.png`,
    alt: "Target histogram, generated histogram, and their difference: blue along the inside edges of the strokes, faint red halo outside, and red at the two tips of the C",
    caption: "Where the remaining error lives (1,000 steps): a soft halo around every stroke, extra mass at the tips of the C, and haze between the letters.",
    wide: true,
  },
];

const part3DataGallery = [
  {
    src: `${IMG}/fig12_reflow_pairs.png`,
    alt: "Left: random training pairs crossing everywhere. Middle: reflow pairs from each source to its own baseline endpoint, which barely cross. Right: the reflow dataset's endpoints forming CL",
    caption: "Baseline training data (random pairs) crosses everywhere; reflow data (each source to its own baseline endpoint) barely crosses. Right: the reflow endpoints, which carry the baseline's errors (TV 0.125).",
    wide: true,
  },
];

const part3ResultsGallery = [
  {
    src: `${IMG}/fig13_quality_vs_nfe.png`,
    alt: "TV to target and on-letter rate vs. network evaluations for baseline, control and reflow; reflow is near its final quality from 1 step, while the others need 25 or more",
    caption: "TV and on-letter rate vs. network evaluations (line = mean over 3 seeds, band = min–max).",
    wide: true,
  },
  {
    src: `${IMG}/fig14_samples_grid.png`,
    alt: "Grid of samples for baseline (blue), control (orange) and reflow (green) at K = 1, 2, 3, 5, 10, 100; baseline and control are a dot at K = 1 while reflow already shows CL",
    caption: "Seed-0 samples from the same held-out starts. Rows: baseline, compute-matched control, reflow. Reflow is a readable “CL” after one step.",
    wide: true,
  },
  {
    src: `${IMG}/fig15_straightness.png`,
    alt: "Sampling trajectories for baseline and control are curved and hooked, while reflow's are straight line segments; a bar chart shows excess length near 0.42 for baseline and control and 0.0001 for reflow",
    caption: "250 seed-0 trajectories per model, plus mean excess length for every seed. Reflow's paths are straight lines.",
    wide: true,
  },
];

function Gallery({ items }) {
  return (
    <div className="image-gallery">
      {items.map((item) => (
        <figure key={item.src} className={item.wide ? "wide" : undefined}>
          <img src={item.src} alt={item.alt} loading="lazy" />
          <figcaption>{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function Project2() {
  return (
    <ProjectPage>
      <h1>Flow Matching &amp; Creative Point-Cloud Generation</h1>
      <p>
        MFM (Multimodal Foundation Models) Project 2, in three parts, all training small
        flow-matching models from scratch on 2D point coordinates: learning a flow from a Gaussian
        to eight clusters on a ring and explaining why its paths curve, turning my initials{" "}
        <em>“CL”</em> into a target distribution and animating the learned transport, and a
        seeded, compute-matched experiment on whether one round of <strong>reflow</strong>{" "}
        straightens the paths enough to sample in a handful of steps.
      </p>

      <TechTags tags={["Python", "PyTorch", "NumPy", "pandas", "Matplotlib", "Pillow", "Flow Matching", "Rectified Flow"]} />

      <h2>Setup</h2>
      <p>
        A network <code>v(x, t)</code> predicts a 2D velocity, and new points are generated by
        integrating that velocity from Gaussian noise at t = 0 to data at t = 1. Every part uses
        the same small model and training recipe, and everything ran on a laptop CPU. Checkpoints
        are saved, so re-plotting or changing the number of sampling steps never needs retraining.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>What I used</th>
          </tr>
        </thead>
        <tbody>
          {setupRows.map((row) => (
            <tr key={row.item}>
              <td>{row.item}</td>
              <td>{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Part 1 &mdash; Learning a 2D Flow from Scratch</h2>
      <p>
        The source is a standard 2D Gaussian, x<sub>0</sub> ~ N(0, I). The target is eight Gaussian
        clusters on a ring of radius 3 (cluster std 0.25), so both clouds fit inside
        [&minus;4, 4]&sup2;. Each training example draws x<sub>0</sub> and x<sub>1</sub>{" "}
        independently, draws t ~ U(0, 1), and regresses the network onto the straight-line
        velocity:
      </p>
      <pre className="code-block">
        <code>{`x_t = (1 − t)·x0 + t·x1        u = x1 − x0
L   = E_{t, x0, x1} ‖ v(x_t, t) − (x1 − x0) ‖²`}</code>
      </pre>
      <p>
        Because x<sub>t</sub> is linear in t, every training path is a straight line traveled at
        constant speed &mdash; finite differences at 10 times along one path all came out to exactly
        x<sub>1</sub> &minus; x<sub>0</sub>. But random training paths cross constantly, and at a
        crossing the same (x<sub>t</sub>, t) is paired with two different target velocities. No
        function can match both.
      </p>

      <h3>What the network actually learns</h3>
      <p>
        The network only sees (x<sub>t</sub>, t), never x<sub>0</sub> or x<sub>1</sub> separately,
        so under squared error the best it can do is the conditional mean{" "}
        <code>v*(x, t) = E[x1 − x0 | x_t = x]</code>: the average direction of all the random lines
        passing through x at time t. Over 20,000 steps (63 s), the loss dropped from 6.65 to{" "}
        <strong>5.70</strong> and was flat after about 2,000 steps. That plateau is the noise floor
        of random pairing, not a sign that learning stopped.
      </p>
      <ul>
        <li>
          <strong>t &rarr; 0:</strong> x<sub>t</sub> says nothing about x<sub>1</sub>, so the floor
          is the target's total variance, R&sup2; + 2&sigma;&sup2; = 9.125. The first bin measured
          9.58.
        </li>
        <li>
          <strong>t &rarr; 1:</strong> x<sub>1</sub> is pinned down but x<sub>0</sub> isn't, so the
          floor is the source variance, 2. The last bin measured 2.29.
        </li>
        <li>
          <strong>In between:</strong> the leftover variance is Var(x<sub>1</sub> | x<sub>t</sub>)
          / (1 &minus; t)&sup2;, so it rises to a peak of 11.0 around t &asymp; 0.2 before the
          cluster becomes identifiable, then drops to 1.56 around t &asymp; 0.75.
        </li>
      </ul>

      <h3>Generating new points</h3>
      <p>
        Sampling uses forward Euler, <code>z_(k+1) = z_k + Δt·v(z_k, t_k)</code>, from fresh
        Gaussian samples. With K = 100 steps, 4,000 points took 0.45 s, and all eight clusters come
        out at about the right size and position with roughly equal mass. The velocity field
        explains the surprising snapshots (the cloud barely moves by t = 0.25, then becomes a
        hollow ring at 0.5):
      </p>
      <ul>
        <li>
          At t = 0 the ideal field is E[x<sub>1</sub>] &minus; x = &minus;x, pointing at the
          target's mean, and the learned field matches it.
        </li>
        <li>
          Around t &asymp; 0.25 the inward pull of the “average target” and the outward pull of the
          ring cancel, so the field is nearly zero.
        </li>
        <li>
          By t = 0.5 it has flipped outward, and by 0.75 there are eight clear basins. The fastest
          arrows sit at the center, where particles have the farthest to go in the time left.
        </li>
      </ul>
      <p>
        <strong>Straight training paths do not give straight sampling paths.</strong> Sampling
        trajectories solve the ODE dz/dt = v(z, t), which has one direction per (z, t), so they
        can't cross. Averaging many crossing straight lines produces a curved flow: over 4,000
        particles the mean trajectory was <strong>19% longer</strong> than its start-to-end chord
        (excess length 0.255), and 86% of trajectories were more than 5% longer.
      </p>

      <Gallery items={part1Gallery} />

      <h2>Part 2 &mdash; A Creative Target: My Initials “CL”</h2>
      <p>
        I rendered “CL” in Arial Bold at 320 px with Pillow and thresholded it into a 451 &times;
        261 foreground mask (36,383 pixels). Bold letters were a deliberate choice: thick strokes
        are much easier for a small model than thin outlines. To sample, pick a foreground pixel
        uniformly, add uniform jitter inside it so the target is continuous, and map it to the
        plane so the letters are centered at the origin with x &isin; [&minus;3, 3] &mdash; the
        same scale as the N(0, I) source. One pixel is 0.013 units.
      </p>
      <p>
        Same model and training loop as Part 1, with 30,000 steps for the sharper detail. The loss
        leveled off at 3.48, and with 100 Euler steps <strong>91.1%</strong> of generated points
        land on the letters.
      </p>

      <Gallery items={part2TargetGallery} />

      <h3>Animating the learned transport</h3>
      <p>
        3,000 fixed Gaussian starting points were integrated with 100 Euler steps, and every
        particle's full path was stored. Each frame draws the same particles at one time step with
        a short fading trail. Colors are computed after integration, purely for display &mdash; the
        network only ever sees (x, y, t).
      </p>
      <ul>
        <li>
          Colored by endpoint, the cloud is already sorted at t = 0: the left side of the Gaussian
          becomes the C and the right side becomes the L. The learned map is an orderly
          rearrangement, not a shuffle.
        </li>
        <li>
          Up to t &asymp; 0.4 the cloud mostly shrinks and drifts. Between 0.6 and 0.8 it splits
          into two lobes and the hole of the C opens.
        </li>
        <li>
          Colored by starting angle, hues stay in contiguous bands throughout. An ODE flow is
          continuous and invertible, so it can't tear the cloud &mdash; to make the hole in the C it
          has to stretch the Gaussian and wrap it around, which is why the C ends up with the full
          rainbow.
        </li>
      </ul>

      <Gallery items={part2AnimationGallery} />

      <h3>The sampling trade-off</h3>
      <p>
        Keeping the trained weights and one fixed set of 40,000 starting points, I changed only the
        number of Euler steps K. The main metric is histogram{" "}
        <strong>total-variation distance (TV)</strong> to 40,000 independent target samples on a
        fixed 0.2-unit grid (plus an “outside” bin). Two independent target sets score 0.0425
        &mdash; the best anything can do. A 1,000-step solution from the same starts serves as a
        near-exact ODE reference, so TV to it and the per-point shift isolate discretization error.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Steps K</th>
            <th>Sampling time (40k pts)</th>
            <th>TV to target</th>
            <th>TV to 1000-step ref.</th>
            <th>Mean shift from ref.</th>
            <th>On-letter</th>
          </tr>
        </thead>
        <tbody>
          {stepRows.map((row) => (
            <tr key={row.k}>
              <td>{row.k}</td>
              <td>{row.time}</td>
              <td>{row.tv}</td>
              <td>{row.tvRef}</td>
              <td>{row.shift}</td>
              <td>{row.onLetter}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul>
        <li>
          <strong>K = 1 collapses completely.</strong> One Euler step just follows v(z<sub>0</sub>,
          0) &asymp; E[x<sub>1</sub>] &minus; z<sub>0</sub>, so every particle lands on the target
          mean &mdash; a single dot left of center, because the C has more ink than the L.
        </li>
        <li>
          K = 2 is one letter-sized blob; K = 5 is already a readable “CL” (84% on-letter) with
          smear in the hole of the C; K = 10&ndash;25 fills in most of the rest.
        </li>
        <li>
          <strong>From K &asymp; 50 on, more steps buy nothing.</strong> Discretization error falls
          below the noise floor, the endpoint shift drops to less than half a pixel at K = 200, and
          cost keeps rising linearly &mdash; K = 200 takes 3&times; longer than K = 50 for the same
          quality.
        </li>
      </ul>
      <p>
        Even the near-exact solution stays at TV 0.127, three times the noise floor. That gap
        belongs to the learned field, not the solver: a 33k-parameter MLP trained on random pairs
        produces a smooth velocity field, and the target has hard edges with zero density outside
        the ink. The error map shows a soft halo around every stroke, extra mass piled at the tips
        of the C where the flow pinches, and haze between the letters. Fixing that takes a better
        model, not more steps.
      </p>

      <Gallery items={part2StepsGallery} />

      <h2>Part 3 &mdash; Does Reflow Straighten the Paths?</h2>
      <p>
        Research question: can one round of reflow make the learned transport straighter and keep
        sample quality with fewer network evaluations? Same “CL” target and architecture
        throughout. The hypotheses, written before running anything:
      </p>
      <ul>
        <li>
          <strong>H1 (straightness):</strong> a model trained on the baseline's own (source,
          generated endpoint) pairs will have measurably straighter sampling paths.
        </li>
        <li>
          <strong>H2 (few-step quality):</strong> it will reach a given quality with fewer Euler
          steps (1&ndash;10), and beat a baseline given the same extra compute, ruling out “it just
          trained longer.”
        </li>
        <li>
          <strong>H3 (no free lunch):</strong> since reflow learns from the baseline's outputs, not
          the real target, with many steps it should be no closer to the target than its teacher.
        </li>
      </ul>

      <h3>Experimental design</h3>
      <p>
        Three fully independent seeds, each with its own frozen baseline (30,000 steps on random
        pairs), reflow dataset, reflow model, and control. The <strong>reflow dataset</strong> is
        100,000 fresh Gaussian sources per seed, each pushed through the frozen baseline with 200
        Euler steps and saved with its own endpoint &mdash; never reshuffled, and the target shape is
        never used. The <strong>reflow model</strong> starts from the baseline weights and trains
        10,000 steps on straight interpolations between those pairs. The{" "}
        <strong>compute-matched control</strong> instead trains the baseline further on random pairs
        for exactly reflow's extra compute: 20.0M forward passes to generate the data plus 7.68M for
        training (one step &asymp; 3 &times; 256 forward-equivalents) buys 36,042 control steps.
        Every model is evaluated on the same 40,000 held-out starts.
      </p>
      <p>
        Is 200 steps fine enough for the pairs? Re-running 5,000 sources with 1,000 steps moved the
        endpoints by 0.006 units on average &mdash; less than half a pixel.
      </p>

      <Gallery items={part3DataGallery} />

      <table className="result-table">
        <thead>
          <tr>
            <th>Cost item</th>
            <th>Compute (forward-equiv.)</th>
            <th>Mean wall-clock (3 seeds)</th>
          </tr>
        </thead>
        <tbody>
          {costRows.map((row) => (
            <tr key={row.item}>
              <td>{row.item}</td>
              <td>{row.compute}</td>
              <td>{row.mean}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The reflow loss fell to about <strong>0.0004</strong>, vs. ~3.47 for the random-pair
        control. With paired data, x<sub>t</sub> nearly determines its own pair, so almost none of
        Part 1's irreducible variance is left. That only means the pairs fit one non-crossing
        straight-line field &mdash; it says nothing about matching the target.
      </p>

      <h3>Results</h3>
      <p>Quality at each step count, mean &plusmn; std over 3 seeds (noise floor 0.042):</p>

      <table className="result-table">
        <thead>
          <tr>
            <th>K</th>
            <th>Baseline TV</th>
            <th>Control TV</th>
            <th>Reflow TV</th>
            <th>Baseline on-letter</th>
            <th>Control on-letter</th>
            <th>Reflow on-letter</th>
          </tr>
        </thead>
        <tbody>
          {reflowRows.map((row) => (
            <tr key={row.k}>
              <td>{row.k}</td>
              <td>{row.base}</td>
              <td>{row.ctrl}</td>
              <td>{row.reflow}</td>
              <td>{row.baseOn}</td>
              <td>{row.ctrlOn}</td>
              <td>{row.reflowOn}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Path straightness, measured on the same 200-step grid from 10,000 held-out starts. Excess
        length is polyline length minus start-to-end distance; velocity deviation is the
        rectified-flow paper's measure, zero only if velocity is constant along the path:
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Excess length</th>
            <th>Velocity deviation</th>
            <th>Paths &gt; 5% longer than chord</th>
          </tr>
        </thead>
        <tbody>
          {straightnessRows.map((row) => (
            <tr key={row.model}>
              <td>{row.model}</td>
              <td>{row.excess}</td>
              <td>{row.velDev}</td>
              <td>{row.curved}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The baseline is much more curved here than on the Part 1 ring (excess length 0.42 vs.
        0.26), since it has to split the cloud into two letters and wrap it into a C.
      </p>

      <Gallery items={part3ResultsGallery} />

      <h3>What the evidence supports</h3>
      <p>
        <strong>H1 &mdash; supported, strongly.</strong> After one round of reflow, paths are
        straight to within the precision of the 200-step grid in every seed: excess length went from
        0.422 to 0.0001, and noticeably curved paths from 98% to 0.1%. The compute-matched control
        is just as curved as the baseline, so the straightening comes from the paired data, not
        extra training. The baseline's ODE gives a deterministic, non-crossing coupling, so the
        straight lines between its pairs barely cross and one field can match almost all of them.
      </p>
      <p>
        <strong>H2 &mdash; supported.</strong> With a single network evaluation, reflow gets TV
        0.178 with 87% on the letters, while baseline and control both collapse to the mean (TV
        1.00). Reflow at 1 step beats the baseline at 10, and reflow at 3 steps (0.148) matches the
        baseline at 25 &mdash; the same quality for about <strong>8&times; fewer evaluations</strong>{" "}
        (0.23 s vs. 1.81 s for 40k points). The control is no better than the baseline at K &le; 5:
        more training on random pairs just refines the same curved field.
      </p>
      <p>
        <strong>H3 &mdash; supported, and the cost is visible.</strong> Reflow learns its teacher,
        not the target: at K = 100 its TV to the teacher's distribution is 0.027, against 0.140 to
        the real target. It inherits the teacher's haze and soft edges, adds a bit of fitting error
        of its own (slightly worse than its own baseline in all three seeds), and{" "}
        <strong>straighter doesn't mean better</strong> &mdash; reflow has by far the straightest
        paths but is the worst of the three at K = 100, while the most curved model, the control,
        is the best (TV 0.088, 94% on-letter).
      </p>

      <h3>Alternative explanations &amp; limits</h3>
      <ul>
        <li>
          <strong>The baseline wasn't converged.</strong> Continued training dropped TV from 0.131
          to 0.088, and since reflow distills its teacher, an undertrained teacher caps reflow's
          quality.
        </li>
        <li>
          <strong>Efficiency depends on the goal.</strong> For the same 27.7M forward-equivalents,
          reflow buys cheap sampling and continued training buys a more accurate field.
        </li>
        <li>
          <strong>Wall-clock isn't perfectly matched.</strong> Data generation is cheap batched
          inference, so the control got more wall-clock time (129 s vs. 87 s) &mdash; if anything,
          that favors the control.
        </li>
        <li>
          <strong>Warm start.</strong> Reflow started from the baseline weights; I didn't try
          reflow from scratch, so “paired data” and “paired data plus a good init” can't be fully
          separated.
        </li>
        <li>
          <strong>Metric and scope.</strong> TV can't see blur below its 0.2-unit bins, and this is
          one target, one small architecture, one round of reflow, and three seeds &mdash; though
          every comparison above has the same sign in all three.
        </li>
      </ul>

      <h3>Conclusion</h3>
      <p>
        One round of reflow made the learned transport almost perfectly straight and turned a model
        that needed about 25 Euler steps into one that gives comparable samples in 1&ndash;3 steps,
        which the same compute spent on regular training did not do. But reflow didn't improve the
        distribution itself: it copied its teacher's mistakes and added a few of its own, and the
        best many-step quality came from just training the baseline longer. The hypothesis holds
        as stated &mdash; straighter paths with quality preserved at far fewer evaluations &mdash;
        but straightness and accuracy to the target turn out to be two different things.
      </p>

      <h2>Notebooks &amp; full report</h2>
      <p>
        The complete write-up is embedded below, or{" "}
        <a
          href={`/Multimodal-Foundation-Models/Project2/${encodeURIComponent(
            "MFM - Project 2 Report.pdf"
          )}`}
          target="_blank"
          rel="noopener"
        >
          open the PDF directly
        </a>
        . All three notebooks are also available to download with outputs saved. Everything runs on
        a CPU (run Part 2 before Part 3, which reuses Part 2's target mask and seed-0 checkpoint).
      </p>
      <div className="resource-links">
        <a href="/Multimodal-Foundation-Models/Project2/Part1.ipynb" download>
          Part1.ipynb (2D flow from scratch)
        </a>
        <a href="/Multimodal-Foundation-Models/Project2/Part2.ipynb" download>
          Part2.ipynb (“CL” target &amp; animation)
        </a>
        <a href="/Multimodal-Foundation-Models/Project2/Part3.ipynb" download>
          Part3.ipynb (reflow experiment)
        </a>
      </div>
      <embed
        src={`/Multimodal-Foundation-Models/Project2/${encodeURIComponent(
          "MFM - Project 2 Report.pdf"
        )}#toolbar=0&navpanes=0`}
        type="application/pdf"
      />
    </ProjectPage>
  );
}
