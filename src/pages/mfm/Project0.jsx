import ProjectPage from "../../components/ProjectPage.jsx";
import TechTags from "../../components/TechTags.jsx";

const capacityResults = [
  { model: "Baseline (256)", params: "203,530", acc: "84.67%", loss: "0.4221" },
  { model: "Two hidden layers (256–128)", params: "235,146", acc: "85.31%", loss: "—" },
  { model: "Bottleneck (1 neuron)", params: "805", acc: "35.53%", loss: "1.528" },
];

const attentionSettings = [
  { setting: "A (small)", embed: "32", hidden: "64", layers: "1", dropout: "0.0", lr: "0.005" },
  { setting: "B (larger)", embed: "64", hidden: "128", layers: "2", dropout: "0.2", lr: "0.003" },
];

const part1Gallery = [
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig1_fashion_mnist_samples.png",
    alt: "Grid of ten Fashion-MNIST sample images labeled with their clothing category",
    caption: "Sample Fashion-MNIST images across all 10 clothing categories.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig2_baseline_training_curves.png",
    alt: "Baseline MLP training/validation loss and validation accuracy curves over 10 epochs",
    caption: "Baseline MLP (1 hidden layer, 256 units, ReLU): loss and validation accuracy per epoch.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig3_vanishing_gradients.png",
    alt: "Log-scale plot of gradient magnitude by layer depth for an 8-hidden-layer network, comparing Sigmoid and ReLU",
    caption: "Gradient magnitude by layer depth (8 hidden layers) — Sigmoid vanishes toward the input, ReLU stays flat.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig4_deep_sigmoid_vs_relu.png",
    alt: "Validation accuracy over 5 epochs for an 8-hidden-layer network, comparing deep Sigmoid and deep ReLU",
    caption: "Training a deep (8-layer) network: Sigmoid stalls near chance while ReLU keeps learning.",
  },
];

const part2Gallery = [
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig5_attention_val_loss.png",
    alt: "Validation loss curves for Setting A (small) and Setting B (larger) attention models over 15 epochs",
    caption: "Validation loss: Setting A (small) vs. Setting B (larger), 15 epochs each.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig6_attention_diagonal_cats.png",
    alt: "Attention heatmap for the sentence 'i like cats .' translated to French, showing a clean diagonal alignment",
    caption: "“i like cats .” → “j’aime les chats .” — clean, near-diagonal attention.",
  },
  {
    src: "/Multimodal-Foundation-Models/Project0/images/fig7_attention_diffuse_calm.png",
    alt: "Attention heatmap for the sentence 'he's calm .' translated to French, showing diffuse, spread-out attention",
    caption: "“he’s calm .” → “il est en train de pleurer .” — attention spreads out when word order/structure diverges.",
  },
];

export default function Project0() {
  return (
    <ProjectPage>
      <h1>MLPs on Fashion-MNIST &amp; Bahdanau Attention for Translation</h1>
      <p>
        MFM (Multimodal Foundation Models) Project 0, in two parts: a linear softmax classifier
        and multilayer perceptron built from scratch for Fashion-MNIST to study capacity,
        activation functions, and vanishing gradients, then a GRU encoder-decoder for
        English-to-French translation with hand-implemented Bahdanau (additive) attention.
      </p>

      <TechTags tags={["Python", "PyTorch", "NumPy", "Matplotlib", "Seq2Seq", "Attention"]} />

      <h2>Part 1 &mdash; MLPs on Fashion-MNIST</h2>
      <p>
        Fashion-MNIST has 60,000 training images and 10,000 test images (28&times;28 grayscale,
        10 clothing categories). The official training set was split into 55,000 training / 5,000
        validation, with the test set touched only once at the very end. Every model is trained
        the same way (cross-entropy loss + SGD) so the comparisons below are apples-to-apples.
      </p>

      <h3>Baseline model</h3>
      <p>
        The baseline is a single hidden layer &mdash; Flatten &rarr; Linear(784, 256) &rarr; ReLU
        &rarr; Linear(256, 10), about 203K parameters &mdash; trained with plain SGD, lr = 0.1,
        batch size 256, for 10 epochs. Training loss dropped smoothly the whole way (0.880 &rarr;
        0.377) with no instability, validation accuracy climbed from 79.4% to 85.6% (a bit noisy
        epoch-to-epoch from the fairly high, momentum-free learning rate), and test accuracy landed
        at 84.67% (loss 0.4221) &mdash; in line with validation, so nothing overfit.
      </p>

      <h3>Hidden layers &amp; model capacity</h3>
      <p>
        Two variations were compared against the baseline: a deeper 2-layer network
        (784 &rarr; 256 &rarr; 128 &rarr; 10, ~235K params) and an extreme bottleneck with a
        single hidden neuron (784 &rarr; 1 &rarr; 10, 805 params).
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Parameters</th>
            <th>Test accuracy</th>
            <th>Test loss</th>
          </tr>
        </thead>
        <tbody>
          {capacityResults.map((row) => (
            <tr key={row.model}>
              <td>{row.model}</td>
              <td>{row.params}</td>
              <td>{row.acc}</td>
              <td>{row.loss}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Going deeper only bumped accuracy a little (84.67% &rarr; 85.31%) &mdash; Fashion-MNIST is
        already easy enough for one wide layer that extra depth buys little, and the second network
        even started worse in epoch 1 (loss 1.076 vs. 0.880) since the signal has to cross an extra
        nonlinearity. Squeezing everything through a single neuron was brutal: accuracy fell to
        35.53%. That's still well above the 10% random-guessing floor &mdash; the model finds
        <em> something</em>, likely a coarse footwear-vs.-not-footwear split &mdash; but there's no
        way to fit 10 classes through one scalar.
      </p>

      <h3>Activation functions &amp; vanishing gradients</h3>
      <p>
        Swapping ReLU for Sigmoid in the baseline cost about 3 points of test accuracy (84.67%
        vs. 81.52%), and Sigmoid started much further behind (epoch 1 loss 1.489 vs. 0.880) since
        its derivative maxes out at 0.25, shrinking every gradient update. Sigmoid's loss curves
        were noticeably smoother than ReLU's despite learning slower &mdash; its bounded, smooth
        shape seems to trade speed for stability.
      </p>
      <p>
        To make vanishing gradients visible directly, a deep 8-hidden-layer network (128 units
        each) was built and its gradient norms measured layer-by-layer. For Sigmoid, the gradient
        at the layer closest to the input was 2.92&times;10<sup>-7</sup> vs. 7.50&times;10
        <sup>-1</sup> near the output &mdash; a roughly 2.6-million-times difference, textbook
        vanishing gradients, since each Sigmoid layer multiplies the backward gradient by at most
        0.25. ReLU's derivative is just 1 wherever it's active, so its gradients varied by less
        than 10&times; across all 8 layers. Training both confirmed this matters in practice, not
        just at initialization: the deep Sigmoid model learned noticeably slower than the deep ReLU
        one.
      </p>

      <div className="image-gallery">
        {part1Gallery.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <h3>Computational considerations</h3>
      <p>
        Training needs more memory than inference because backprop has to keep every layer's
        forward activation around until the backward pass reaches it, plus a gradient buffer per
        parameter and whatever state the optimizer tracks (nothing extra for plain SGD, one buffer
        for SGD+momentum, two for Adam's running mean and variance):
      </p>
      <pre className="code-block">
        <code>{`Inference memory ≈ parameters + one layer's activations (max)

Training memory  ≈ parameters + gradients + optimizer state + ALL activations
                    (sum over layers)`}</code>
      </pre>
      <p>
        Batch size grows the activation term linearly but never touches the
        parameter/gradient/optimizer memory, which stays fixed regardless of batch size.
      </p>

      <h2>Part 2 &mdash; Bahdanau Attention for Machine Translation</h2>
      <p>
        A GRU encoder-decoder was built for English-to-French translation, then extended with
        Bahdanau (additive) attention on the decoder side &mdash; implemented by hand, with no
        built-in attention layers. Data loading, the encoder, attention, decoder, training, BLEU
        scoring, and the attention heatmaps all live in one notebook, following the D2L chapters on
        machine translation, seq2seq, and Bahdanau attention.
      </p>
      <p>
        Training data is the English-French sentence pairs bundled with D2L (a cleaned subset of
        Tatoeba): lowercased, whitespace-tokenized, with punctuation split into its own tokens and
        a small <code>Vocab</code> class mapping words to indices (dropping rare tokens, adding{" "}
        <code>&lt;pad&gt;</code>/<code>&lt;bos&gt;</code>/<code>&lt;eos&gt;</code>/
        <code>&lt;unk&gt;</code>). Sentences are padded or truncated to 12 tokens, with each
        sentence's real length tracked for masking &mdash; 20,000 pairs total, batch size 64.
      </p>

      <h3>Model architecture</h3>
      <p>
        The encoder is a GRU that keeps <em>every</em> time step's output (not just the final
        hidden state, as a plain seq2seq model would), since attention needs to look back across
        the whole source sentence. The decoder's current hidden state is the query, and the
        encoder's outputs serve as both keys and values. The score between a query and a key is:
      </p>
      <pre className="code-block">
        <code>{`a(q, k) = w_vᵀ · tanh(W_q·q + W_k·k)`}</code>
      </pre>
      <p>
        Those scores are softmaxed (masking out padding so it gets no weight) and used to take a
        weighted sum of the encoder outputs &mdash; the context vector &mdash; which is
        concatenated with the decoder's own input embedding at every step before feeding the
        decoder's GRU. Training uses teacher forcing and a masked cross-entropy loss that skips
        padding positions.
      </p>

      <h3>Training &amp; hyperparameters</h3>
      <p>
        Two configurations were trained for 15 epochs each on identical data and splits, to see
        what model size and regularization change:
      </p>

      <table className="result-table">
        <thead>
          <tr>
            <th>Setting</th>
            <th>embed_size</th>
            <th>num_hiddens</th>
            <th>num_layers</th>
            <th>dropout</th>
            <th>lr</th>
          </tr>
        </thead>
        <tbody>
          {attentionSettings.map((row) => (
            <tr key={row.setting}>
              <td>{row.setting}</td>
              <td>{row.embed}</td>
              <td>{row.hidden}</td>
              <td>{row.layers}</td>
              <td>{row.dropout}</td>
              <td>{row.lr}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Both settings were checked against hand-picked English sentences with known French
        translations, plus BLEU-2 averaged over 200 held-out validation sentences. Setting B's
        extra capacity (more hidden units, a second layer) is only worth it if its dropout
        successfully holds off overfitting on this fairly small 20K-pair dataset &mdash; if B's
        training loss keeps falling while its validation loss and BLEU stall, that's the tell.
        Setting A, being smaller and single-layer, trains noticeably faster per epoch and is the
        better choice for quick iteration; B makes more sense with more time or data to spend.
        Whichever setting scored higher on validation BLEU was used for the attention
        visualizations below.
      </p>

      <div className="image-gallery">
        {part2Gallery.map((item) => (
          <figure key={item.src}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <h3>Visualizing attention</h3>
      <p>
        Stacking each decoding step's attention-weight vector over the source sentence produces a
        heatmap: rows are predicted French words, columns are source English words, showing what
        the model was "looking at" when it generated each word. For simple, close-to-word-for-word
        sentences like <em>"i like cats ."</em>, attention lands basically on the diagonal &mdash;
        exactly what you'd want. For trickier sentences where word order or structure diverges,
        like <em>"he's calm ."</em> (French needs an extra pronoun + verb that English contracts
        away), attention spreads out across multiple words instead of staying clean and diagonal
        &mdash; and translation quality tends to dip along with it, since a fuzzier attention
        pattern hands the decoder a less useful context vector. The overall pattern: attention
        sharpens for sentences with clean 1-to-1 word alignment and gets more diffuse when
        reordering or extra function words are needed.
      </p>

      <h2>Notebooks &amp; full report</h2>
      <p>
        The complete write-up is embedded below, or{" "}
        <a
          href={`/Multimodal-Foundation-Models/Project0/${encodeURIComponent(
            "MFM - Project 0 Report.pdf"
          )}`}
          target="_blank"
          rel="noopener"
        >
          open the PDF directly
        </a>
        . Both notebooks are also available to download and run end-to-end.
      </p>
      <div className="resource-links">
        <a href="/Multimodal-Foundation-Models/Project0/Part1.ipynb" download>
          Part1.ipynb (Fashion-MNIST MLPs)
        </a>
        <a href="/Multimodal-Foundation-Models/Project0/Part2.ipynb" download>
          Part2.ipynb (Bahdanau attention)
        </a>
      </div>
      <embed
        src={`/Multimodal-Foundation-Models/Project0/${encodeURIComponent(
          "MFM - Project 0 Report.pdf"
        )}#toolbar=0&navpanes=0`}
        type="application/pdf"
      />
    </ProjectPage>
  );
}
