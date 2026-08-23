import CvProjectPage from "../../components/CvProjectPage.jsx";

export default function Project0() {
  return (
    <CvProjectPage
      dir="Project0"
      pdfName="Project 0 Report - Carson Logas"
      title="Linear Neural Networks & MLPs on Fashion-MNIST"
      intro={
        <>
          CSCI 581 (Computer Vision) project implementing a linear softmax classifier and a
          multilayer perceptron from scratch for Fashion-MNIST, then sweeping hyperparameters to
          see how learning rate, batch size, and hidden-layer capacity affect training.
        </>
      }
      tags={["Python", "PyTorch", "NumPy", "Matplotlib"]}
      approach={[
        <>
          The linear classifier was trained across a range of learning rates and batch sizes. A
          small learning rate (0.001) converged very slowly with high validation loss, a medium
          rate (0.05&ndash;0.1) converged fast with the lowest, most stable validation loss, and a
          large rate (&gt;0.1) became unstable and oscillated. Batch size showed a similar
          tradeoff: small batches (32) converged quickly but with noisy loss curves, medium
          batches (128) gave the best balance of speed and accuracy, and large batches (256) were
          stable but slower to improve and sometimes landed at a lower final accuracy. The softmax
          implementation also had to guard against numerical overflow/underflow in the
          exponentials &mdash; subtracting the max input before exponentiating keeps the largest
          term at a safe magnitude without changing the output probabilities.
        </>,
        <>
          The MLP experiments compared hidden-layer capacity directly: a hidden layer of 256 units
          produced steadily decreasing training/validation loss and rising validation accuracy,
          while a hidden layer of just 1 unit failed to improve at all, since a single neuron has
          no representational power and effectively collapses the network back to a linear
          classifier. This also highlighted a memory tradeoff &mdash; inference only needs to hold
          one layer's activations at a time, while training has to retain every layer's output for
          backpropagation, making training far more memory-hungry than inference.
        </>,
      ]}
    />
  );
}
