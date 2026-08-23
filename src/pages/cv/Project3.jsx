import CvProjectPage from "../../components/CvProjectPage.jsx";

export default function Project3() {
  return (
    <CvProjectPage
      dir="Project3"
      pdfName="Project 3 Report - Carson Logas"
      title="TinySSD Object Detector for Banana Detection"
      intro={
        <>
          CSCI 581 (Computer Vision) project training a small SSD-style object detector (TinySSD)
          on the D2L banana dataset, then writing a from-scratch Non-Maximum Suppression (NMS)
          implementation and validating it against PyTorch's built-in NMS.
        </>
      }
      tags={["Python", "PyTorch", "torchvision", "NumPy"]}
      approach={[
        <>
          The D2L banana dataset (1,000 training / 100 validation images, one banana per image
          against varied backgrounds, sizes, and positions) was loaded with a custom dataset class
          and spot-checked against its ground-truth boxes. TinySSD follows the standard SSD
          design: a small CNN extracts features at multiple scales, each scale generates anchor
          boxes, and the network predicts a class (banana/background) plus four box-offset values
          per anchor, trained with combined cross-entropy and L1 loss. Trained for 20 epochs on
          CPU with SGD, class error and bounding-box MAE both dropped quickly and leveled out
          around 3e-3, and the resulting detector reliably found bananas across new backgrounds
          with 0.9&ndash;1.0 confidence &mdash; though, since the dataset only teaches one class,
          it ignores every other object in a scene (e.g. it detects the banana in an image but
          says nothing about an owl next to it).
        </>,
        <>
          The custom NMS function sorts detections by score and greedily discards any box that
          overlaps a higher-scoring one past an IoU threshold, using a hand-written IoU function
          for the pairwise comparisons. Run on the same SSD outputs, it kept exactly the same 11
          boxes as <code>torchvision.ops.nms</code>, with identical kept-index lists &mdash;
          confirming the from-scratch implementation matches the reference exactly.
        </>,
      ]}
    />
  );
}
