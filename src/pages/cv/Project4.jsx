import CvProjectPage from "../../components/CvProjectPage.jsx";

export default function Project4() {
  return (
    <CvProjectPage
      dir="Project4"
      pdfName="Project 4 Report - Carson Logas"
      title="Forward & Reverse Diffusion Denoising with a UNet"
      intro={
        <>
          CSCI 581 (Computer Vision) project implementing the forward noising process behind
          diffusion models and a UNet-based reverse process to denoise images step by step, then
          extending it to sampling from pure noise, classifier-free guidance, and SDEdit-style
          image editing.
        </>
      }
      tags={["Python", "PyTorch", "UNet"]}
      approach={[
        <>
          The forward process progressively corrupts an image with noise; tested at timesteps 250,
          500, and 750, the source image went from recognizable-but-noisy to almost entirely
          noise. Trying to reverse that with a plain Gaussian blur failed outright &mdash; it just
          smooths the noise rather than reconstructing anything, confirming that only a learned
          model can undo diffusion. A single UNet denoising step worked fine at low noise levels
          but couldn't rebuild detail once the image was heavily corrupted, while the full
          iterative reverse loop &mdash; denoising gradually across many steps &mdash; produced
          noticeably more structured, coherent results.
        </>,
        <>
          Running the reverse process from pure random noise produced abstract but structured
          images, confirming the sampling loop itself works. Classifier-free guidance (steering
          the model harder toward its text-conditioned prediction, tested at a guidance strength
          of 7) sharpened those samples and pulled them closer to the prompt. SDEdit &mdash; adding
          noise to a real image and then only partially denoising it &mdash; gave direct control
          over edit strength: low noise left the image nearly untouched, while high noise produced
          dramatic transformations.
        </>,
      ]}
    />
  );
}
