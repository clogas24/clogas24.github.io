import ProjectPage from "../../components/ProjectPage.jsx";
import TechTags from "../../components/TechTags.jsx";

const vitResults = [
  { category: "Golden retriever", index: "207", top1: "4 / 4", top5: "4 / 4" },
  { category: "Zebra", index: "340", top1: "4 / 4", top5: "4 / 4" },
  { category: "School bus", index: "779", top1: "4 / 4", top5: "4 / 4" },
  { category: "Banana", index: "954", top1: "4 / 4", top5: "4 / 4" },
  { category: "Acoustic guitar", index: "402", top1: "3 / 4", top5: "4 / 4" },
  { category: "Overall", index: "—", top1: "19 / 20 (95%)", top5: "20 / 20 (100%)" },
];

const candidateSets = [
  { set: "A: the 5 project categories", cos: "0.3092", logit: "30.92", p: "1.000" },
  { set: "B: only “golden retriever” vs. “zebra”", cos: "0.3092", logit: "30.92", p: "1.000" },
  {
    set: "C: 5 categories + “labrador retriever” + “kuvasz”",
    cos: "0.3092",
    logit: "30.92",
    p: "0.705 (labrador 0.241, kuvasz 0.054)",
  },
];

const templateResults = [
  { template: "{category}", acc5: "20 / 20", minP: "0.9987", cos: "0.2963", margin: "9.64", acc10: "17 / 20" },
  { template: "a photo of a {category}", acc5: "20 / 20", minP: "0.9918", cos: "0.3081", margin: "9.96", acc10: "16 / 20" },
  { template: "an image showing a {category}", acc5: "20 / 20", minP: "0.9968", cos: "0.3145", margin: "10.48", acc10: "18 / 20" },
];

const modelComparison = [
  { model: "ViT-B/16 (ImageNet)", candidates: "1000 ImageNet classes", correct: "19 / 20" },
  { model: "ViT-B/16, restricted to my 5 classes", candidates: "5 classes", correct: "20 / 20" },
  { model: "CLIP ViT-B/32 (all three templates)", candidates: "5 texts", correct: "20 / 20" },
  { model: "CLIP ViT-B/32 (supplementary)", candidates: "10 texts incl. look-alikes", correct: "16–18 / 20" },
];

const onUnderResults = [
  { metric: "Image-to-description accuracy", baseline: "35 / 54 (64.8%)", changed: "34 / 54 (63.0%)" },
  { metric: "“On” images correct", baseline: "20 / 27", changed: "14 / 27" },
  { metric: "“Under” images correct", baseline: "15 / 27", changed: "20 / 27" },
  { metric: "Sets with both images correct", baseline: "8 / 27", changed: "8 / 27" },
  { metric: "Images assigned the “on” caption", baseline: "32 / 54", changed: "21 / 54" },
  { metric: "Mean margin", baseline: "+0.0045", changed: "+0.0028" },
  { metric: "Mean cosine between a set’s two captions", baseline: "0.926", changed: "0.915" },
  { metric: "p-value vs. 50%", baseline: "0.040", changed: "0.076" },
];

const part1Gallery = [
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig1_vit_patches.png",
    alt: "A 224 by 224 golden retriever image with a 16 by 16 patch grid overlaid, next to the same image split into 196 separated patches",
    caption: "A 224×224 input cut into 196 non-overlapping 16×16 patches by patchify(), in the row-major order the ViT uses.",
    wide: true,
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig2_learned_filters.png",
    alt: "Grid of 32 small colored squares showing learned patch-projection filters, some noisy and some showing smooth color blobs and edges",
    caption: "First 32 of 768 learned patch-projection filters — fixed properties of the checkpoint, identical for every image.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig4_vit_confusion_matrix.png",
    alt: "ViT-B/16 confusion matrix over five categories plus an 'other ImageNet class' column, with one acoustic guitar misclassified",
    caption: "ViT-B/16 confusion matrix: 19/20 top-1, with the one acoustic guitar miss landing on “electric guitar.”",
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig3_positional_similarity.png",
    alt: "Three 14 by 14 heatmaps of positional-embedding cosine similarity, each showing a bright cross through the reference position",
    caption: "Positional-embedding similarity on the 14×14 grid: each position is most similar to its own row and column — the model learned the 2-D layout from a 1-D index.",
    wide: true,
  },
];

const part2Gallery = [
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig5_clip_cosine_logits_softmax.png",
    alt: "Three side-by-side heatmaps for 10 images by 5 category texts: cosine similarity, logits, and softmax probability",
    caption: "Same scores at three stages: cosine (narrow 0.12–0.34 band), logits (×100), and softmax (almost all 0s and 1s).",
    wide: true,
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig6_clip_image_similarity.png",
    alt: "20 by 20 heatmap of CLIP image-image cosine similarity grouped by category, with dark 4 by 4 blocks along the diagonal",
    caption: "CLIP image–image similarity grouped by category — every within-category pair beats every cross-category pair.",
    wide: true,
  },
];

const part3Gallery = [
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig7_on_under_success.png",
    alt: "Six photos of a helmet, plant, and cap placed on and under a wooden table, each labeled with cosine scores and a correct prediction",
    caption: "Successful sets (helmet, plant, cap): both images matched — but notice how close the two cosines are.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig8_on_under_failure.png",
    alt: "Six photos of a painting, cup, and book placed on and under a wooden table, where one image in each pair is matched to the wrong caption",
    caption: "Failed sets (painting, cup, book): the same caption wins for both images, regardless of where the object is.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig9_on_under_margins.png",
    alt: "Scatter plot of per-image margin for all 27 objects, on-images as circles and under-images as squares, mostly within plus or minus 0.02",
    caption: "Per-image margin (correct minus wrong caption cosine) for all 54 images — tiny, and scattered on both sides of zero.",
    wide: true,
  },
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig10_caption_similarity.png",
    alt: "Text-text cosine similarity heatmap of all 54 captions alongside a bar chart showing each set's on/under caption pair has cosine above 0.84",
    caption: "To the text encoder, “A X on a table” and “A X under a table” are nearly interchangeable (mean cosine 0.926).",
    wide: true,
  },
];

const part3RewordGallery = [
  {
    src: "/Multimodal-Foundation-Models/Project1/images/fig11_wording_margin_change.png",
    alt: "Dumbbell plots comparing each image's margin under baseline and changed wording, split into on-images and under-images",
    caption: "Effect of “on top of” / “underneath” on every image's margin: lots of movement, but “on” images mostly drop and “under” images mostly rise.",
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

export default function Project1() {
  return (
    <ProjectPage>
      <h1>Pretrained ViT, CLIP Zero-Shot Matching &amp; “On” vs. “Under”</h1>
      <p>
        MFM (Multimodal Foundation Models) Project 1, in three parts, all using frozen pretrained
        checkpoints: taking apart a Vision Transformer (ViT-B/16) to see how an image becomes a
        token sequence and how far a fixed 1000-class head can go, rebuilding CLIP's image–text
        scoring by hand for zero-shot classification and prompt comparisons, and a controlled
        experiment testing whether CLIP can tell <em>“a mug on a table”</em> from{" "}
        <em>“a mug under a table.”</em>
      </p>

      <TechTags
        tags={["Python", "PyTorch", "torchvision", "Hugging Face Transformers", "CLIP", "ViT", "NumPy", "Matplotlib"]}
      />

      <h2>Part 1 &mdash; Understanding a Pretrained Vision Transformer</h2>
      <p>
        torchvision's <code>vit_b_16</code> with ImageNet-1k weights (86.6M parameters, 1000
        classes) was used as-is &mdash; no training. The test collection is 20 Wikimedia Commons
        images (CC0 / CC BY / CC BY-SA): 5 categories &times; 4 images &mdash; golden retriever,
        zebra, school bus, banana, and acoustic guitar &mdash; each mapping to exactly one ImageNet
        class, with class indices looked up from the checkpoint's own label list. Every image goes
        through the checkpoint's own preprocessing (resize 256, center crop 224, ImageNet
        normalization).
      </p>

      <h3>Image patches &amp; model inputs</h3>
      <p>
        A hand-written <code>patchify</code> cuts a (C, H, W) image into non-overlapping 16&times;16
        squares in row-major order, and <code>unpatchify</code> reassembles them as a sanity check.
        A 224&times;224 image gives 14 &times; 14 = <strong>196 patches</strong>, and with the CLS
        token prepended the sequence is <strong>197 tokens</strong> &mdash; confirmed against the
        real model, not just arithmetic: patch tokens come out as (1, 196, 768), the positional
        embedding is (1, 197, 768), and a hook on the first encoder block saw (1, 197, 768) going in.
      </p>
      <ul>
        <li>
          <strong>Patch projection:</strong> each 16&times;16&times;3 patch (768 raw numbers)
          becomes one 768-dim token through the same learned linear map. torchvision implements
          it as a stride-16 convolution; flattening my own patches and multiplying by the
          pretrained weights as a plain matrix product matched the model's tokens to within
          2.26&times;10<sup>-6</sup>.
        </li>
        <li>
          <strong>Positional embeddings:</strong> self-attention sees an unordered set, so each of
          the 197 positions gets a learned vector added. Their cosine similarities form a cross
          through each position's own row and column &mdash; the 2-D grid was learned from a 1-D
          index.
        </li>
        <li>
          <strong>CLS token:</strong> an extra learned vector at position 0 that pulls in
          information from every patch across 12 layers; its final state alone feeds the
          classification head.
        </li>
      </ul>
      <p>
        The patch picture is just rearranged pixels &mdash; <code>patchify</code> has no
        parameters. The learned projection is a different kind of object: its 768 rows, each
        reshaped to 3&times;16&times;16, are the edge, color, and frequency “filters” the model
        looks for in every patch.
      </p>

      <Gallery items={part1Gallery} />

      <h3>Predictions on a small image collection</h3>
      <p>
        All 20 images were run under <code>torch.no_grad()</code> and the full 20 &times; 1000
        probability matrix saved. Since the model picks among 1000 classes, a wrong answer can land
        outside my 5, so the confusion matrix gets an extra “other ImageNet class” column.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>ImageNet index</th>
            <th>Top-1 correct</th>
            <th>Top-5 correct</th>
          </tr>
        </thead>
        <tbody>
          {vitResults.map((row) => (
            <tr key={row.category}>
              <td>{row.category}</td>
              <td>{row.index}</td>
              <td>{row.top1}</td>
              <td>{row.top5}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The only miss was a teal, three-quarter-size acoustic guitar called an electric guitar
        (0.53 vs. 0.37) &mdash; after the center crop it's mostly neck and cutaway body in a solid
        bright color, much closer to an electric than the natural-wood guitars. A pale,
        cream-colored golden retriever was correct but unsure (0.44), with runners-up kuvasz and
        Great Pyrenees &mdash; both white-coated breeds, so the doubt tracks coat color. Oddly, 17 of
        20 top-1 probabilities sit between 0.83 and 0.91 and none exceed 0.91, even for very clear
        images; that ceiling looks like the effect of label smoothing and mixup/cutmix during
        training, so “0.90” here reads as “about as sure as this model gets.”
      </p>
      <p>
        The fixed head also limits what you can even ask. Only 1000 answers exist (no
        “sunflower” or “person”), exactly one label must win with probabilities summing to 1 (no
        “both” or “none of these”), granularity is locked (~120 dog breeds, but no way to ask “is
        this a dog?”), and anything beyond “what's the main object?” &mdash; color, counts,
        actions, spatial relations &mdash; has no output at all without retraining a new head.
      </p>

      <h2>Part 2 &mdash; CLIP for Image–Text Matching &amp; Zero-Shot Classification</h2>
      <p>
        Next, OpenAI's CLIP ViT-B/32 (<code>openai/clip-vit-base-patch32</code> via Hugging Face),
        frozen, on the same 20 images. The encoders return raw 512-dim embeddings; everything after
        that was written by hand:
      </p>
      <pre className="code-block">
        <code>{`1. L2-normalize every embedding
2. S = I_norm · T_normᵀ                 (cosine = dot product for unit vectors)
3. logits = exp(logit_scale) × S        (learned scale = 100.0)
4. softmax over candidate texts per row, argmax → predicted category`}</code>
      </pre>
      <p>
        The hand-built logits matched the model's own <code>logits_per_image</code> to within
        1.53&times;10<sup>-5</sup>, with identical predictions on all 20 images.
      </p>

      <h3>Cosine vs. logits vs. softmax</h3>
      <p>
        Raw cosine similarity lives in a surprisingly narrow band &mdash; 0.119 to 0.338 across all
        100 image–text pairs, with matches averaging 0.308 and non-matches 0.187. Multiplying by
        100 doesn't change the ranking; it just stretches that ~0.12 gap into a ~12-point logit gap,
        which softmax then turns into a probability ratio of about e<sup>12</sup> &asymp; 160,000.
        That's why the probability heatmap is almost pure 0s and 1s.
      </p>
      <p>
        And those probabilities depend entirely on the candidate list. Scoring the same golden
        retriever image against three lists leaves its cosine and logit untouched &mdash; only the
        probability moves:
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Candidate set</th>
            <th>Cosine</th>
            <th>Logit</th>
            <th>p(golden retriever)</th>
          </tr>
        </thead>
        <tbody>
          {candidateSets.map((row) => (
            <tr key={row.set}>
              <td>{row.set}</td>
              <td>{row.cos}</td>
              <td>{row.logit}</td>
              <td>{row.p}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        The image didn't change and the model didn't get less sure &mdash; the <em>question</em>{" "}
        changed. A CLIP probability means “the best of these options,” not “the probability this is
        a golden retriever.”
      </p>

      <h3>Comparing prompt wording</h3>
      <p>
        Three templates were compared without touching the weights. Because probabilities saturate
        near 1, the more useful number is the <strong>logit margin</strong> (true text minus best
        wrong text). A supplementary run added one look-alike distractor per category (labrador
        retriever, horse, city bus, plantain, electric guitar) for 10 candidates.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Template</th>
            <th>5-way acc.</th>
            <th>Min p(true)</th>
            <th>Mean cos to true</th>
            <th>Mean logit margin</th>
            <th>10-candidate acc.</th>
          </tr>
        </thead>
        <tbody>
          {templateResults.map((row) => (
            <tr key={row.template}>
              <td>{row.template}</td>
              <td>{row.acc5}</td>
              <td>{row.minP}</td>
              <td>{row.cos}</td>
              <td>{row.margin}</td>
              <td>{row.acc10}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        On the 5-way task wording didn't change a single prediction, but it did move the scores,
        and not uniformly: zebras and school buses gained steadily with more descriptive wording,
        while bananas dipped for “a photo of a…” &mdash; not because “banana” got weaker, but
        because “school bus” got stronger. With 10 candidates, wording <em>did</em> flip
        predictions, and every error was a banana called a plantain. None of this is fine-tuning:
        the model stays in <code>eval()</code> under <code>no_grad()</code> with no optimizer.
        Prompting just moves the text input to a different point in a fixed embedding space &mdash;
        free and reversible, but it can't teach CLIP anything it never learned.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Candidates</th>
            <th>Correct</th>
          </tr>
        </thead>
        <tbody>
          {modelComparison.map((row) => (
            <tr key={row.model}>
              <td>{row.model}</td>
              <td>{row.candidates}</td>
              <td>{row.correct}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Against Part 1, the candidate set explains more of the gap than the model does: restrict
        the ViT to the same 5 classes and it also scores 20/20; give CLIP look-alikes and it drops
        to 16–18/20.
      </p>

      <h3>Exploring the representation space</h3>
      <p>
        Image–image cosine similarity separates categories cleanly: the least similar same-category
        pair (0.676) still beats the most similar cross-category pair (0.661), and every image's
        nearest neighbor is from its own category. Zebras are the tightest group (0.923 mean),
        bananas the loosest (0.774). Underneath the object signal (~0.33), CLIP also encodes broad
        semantics (animals near animals), background, color palette, and composition &mdash; e.g.
        the indoor, warm-toned golden retriever sits closer to the wood-colored indoor guitars, and
        the one guitar photographed on grass is the guitar closest to the school buses.
      </p>

      <Gallery items={part2Gallery} />

      <h2>Part 3 &mdash; A Controlled Study of CLIP's Limits: “On” vs. “Under”</h2>
      <p>
        Can CLIP ViT-B/32 tell where an object is relative to another when both captions name the
        exact same objects? The hypothesis, written before running anything: because CLIP matches
        whole images to whole captions and captions can usually be matched from nouns alone,
        <strong> H1</strong> &mdash; accuracy on “on” vs. “under” will be close to chance, with
        both images in a set correct in clearly fewer than half the sets, and the two captions of a
        set will have near-identical text embeddings.
      </p>
      <p>
        Images come from <strong>What'sUp, Controlled Images A</strong> (Kamath, Hessel &amp; Chang,
        EMNLP 2023; MIT license): household objects photographed on or under one table, in one room,
        from one camera position. Selection rules were fixed in a script before looking at any model
        output &mdash; every object with both an “on” and “under” photo, captions unedited &mdash;
        giving <strong>27 comparison sets</strong> (54 images, 54 captions). Since both captions
        name the object and the table, object recognition can't solve it; only the relation can.
        Possible confounds (position in frame, shadow and background, object size, a prior favoring
        “on”) were listed up front and on/under images are reported separately.
      </p>

      <h3>Results</h3>
      <p>
        Each set gets a 2&times;2 cosine matrix (on/under images &times; on/under captions), and
        each image “picks” the higher-scoring caption. The ×100 scale can't change a decision, so
        cosines are compared directly; the <strong>margin</strong> is correct-caption cosine minus
        wrong-caption cosine.
      </p>
      <ul>
        <li>
          <strong>64.8%</strong> image-to-caption accuracy (35/54, p = 0.040 vs. 50%) &mdash; above
          chance, but barely, and optimistic since the 54 decisions aren't independent.
        </li>
        <li>
          Only <strong>8 of 27</strong> sets had both images right (coin flips would give 25%). In
          the other 19, CLIP chose the <em>same caption for both images</em> &mdash; “on” for both
          in 12 sets, “under” for both in 7. The choice depended on the object, not where it was.
        </li>
        <li>
          Mean margin was +0.0045, about a <strong>tenth</strong> of the ~0.12 gap that separated
          object categories in Part 2, even though images still matched their captions well in
          absolute terms (mean cosine 0.291).
        </li>
        <li>
          Swapping the preposition moves a caption far less than swapping the object (cosine 0.926
          vs. 0.804), and failures include big, obvious objects like the pillow, scarf, and dog
          &mdash; so small object size isn't the whole story.
        </li>
      </ul>
      <p>
        <strong>Verdict on H1: partly supported.</strong> Both images were matched in far fewer than
        half the sets and the captions are nearly interchangeable to the text encoder, but per-image
        accuracy is a bit better than chance &mdash; a weak relational signal, too weak to match a
        pair reliably.
      </p>

      <Gallery items={part3Gallery} />

      <h3>Testing one explanation: is it the wording?</h3>
      <p>
        Maybe “on” and “under” are just too short and overloaded (“a book on dinosaurs,” “under
        construction”) for the text encoder to separate. The single change: “on” &rarr; “on top
        of” and “under” &rarr; “underneath” in every caption, with images, cached embeddings,
        model, pairings, and metrics held fixed.
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Baseline (on / under)</th>
            <th>Changed (on top of / underneath)</th>
          </tr>
        </thead>
        <tbody>
          {onUnderResults.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.baseline}</td>
              <td>{row.changed}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        No net effect (64.8% &rarr; 63.0%, still 8/27 sets), but the aggregate hides a lot of
        churn: 25 of 54 decisions flipped &mdash; 12 fixed, 13 broken. What really changed was the
        direction of the bias, from favoring “on” to favoring “underneath.” The captions did get
        slightly less similar (0.926 &rarr; 0.915), but accuracy didn't follow, so “the prepositions
        are too weak a cue” isn't supported as the main cause.
      </p>

      <Gallery items={part3RewordGallery} />

      <h3>Is the relation in the image embeddings at all?</h3>
      <p>
        A text-free check: estimate an “on minus under” direction from 26 sets' image embeddings,
        project the held-out set's two images onto it, and call the higher one “on.” Image
        embeddings alone ordered the held-out pair correctly in <strong>27 of 27</strong> sets
        (p = 1.5&times;10<sup>-8</sup>). The text encoder has a consistent “on minus under”
        direction too &mdash; but the image and text directions barely line up (mean cosine +0.09).
        The information exists on both sides; it just isn't aligned across modalities, which fits a
        contrastive objective that rarely needs the relation to tell one caption's image from
        another. (Caveat: “on” also always means “higher in the frame, against the wall,” so 27/27
        shows the photos are separable, not that CLIP understands the relationship.)
      </p>

      <h3>Conclusion</h3>
      <p>
        In this controlled setting, CLIP ViT-B/32 reliably recognizes that an image shows a given
        object and a table, but tells “on” from “under” only a bit better than chance &mdash; 64.8%
        of images, 8 of 27 sets fully correct, with margins about a tenth the size of those
        separating object categories. More explicit wording didn't help; it just flipped which
        caption the model favors. The evidence points away from a pure wording problem and toward
        weak alignment between how the relation is encoded in images vs. text. This is one room,
        one table, one rewording, and one checkpoint, so larger CLIP models or natural photos may
        behave differently.
      </p>

      <h2>Notebooks &amp; full report</h2>
      <p>
        The complete write-up is embedded below, or{" "}
        <a
          href={`/Multimodal-Foundation-Models/Project1/${encodeURIComponent(
            "MFM - Project 1 Report.pdf"
          )}`}
          target="_blank"
          rel="noopener"
        >
          open the PDF directly
        </a>
        . All three notebooks are also available to download with outputs saved (run Part 1 before
        Part 2).
      </p>
      <div className="resource-links">
        <a href="/Multimodal-Foundation-Models/Project1/Part1.ipynb" download>
          Part1.ipynb (ViT-B/16)
        </a>
        <a href="/Multimodal-Foundation-Models/Project1/Part2.ipynb" download>
          Part2.ipynb (CLIP zero-shot)
        </a>
        <a href="/Multimodal-Foundation-Models/Project1/Part3.ipynb" download>
          Part3.ipynb (CLIP “on” vs. “under”)
        </a>
      </div>
      <embed
        src={`/Multimodal-Foundation-Models/Project1/${encodeURIComponent(
          "MFM - Project 1 Report.pdf"
        )}#toolbar=0&navpanes=0`}
        type="application/pdf"
      />
    </ProjectPage>
  );
}
