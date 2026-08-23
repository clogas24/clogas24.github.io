import CvProjectPage from "../../components/CvProjectPage.jsx";

export default function Project1() {
  return (
    <CvProjectPage
      dir="Project1"
      pdfName="Project 1 Report - Carson Logas"
      title="Camera Geometry, Histogram Equalization & Edge Detection"
      intro={
        <>
          CSCI 581 (Computer Vision) project covering three classic image-processing techniques on
          real photos: perspective vs. orthographic projection, histogram equalization for
          contrast enhancement, and difference-of-Gaussians (DoG) edge detection.
        </>
      }
      tags={["Python", "OpenCV", "NumPy", "Matplotlib"]}
      approach={[
        <>
          Rendering the same hallway scene under perspective vs. orthographic projection showed
          the core difference directly: under perspective, parallel lines converge toward a
          vanishing point, giving a strong sense of depth, while orthographic projection keeps
          them parallel, flattening the scene.
        </>,
        <>
          Histogram equalization was applied to several faded, low-contrast, and underexposed
          photos. In each case, redistributing pixel intensities across the full brightness range
          made details easier to see &mdash; at the cost of introducing grainy noise in the
          darkest regions, since equalization amplifies whatever separation exists there, noise
          included.
        </>,
        <>
          Two DoG-based edge detectors were then compared: a naive approach that smooths the image
          before differencing, and a direct approach that differences first. The naive method
          consistently produced cleaner, more readable edges, especially on noisy test images,
          while the direct method picked up more background noise along with the true edges
          &mdash; both found the same structures, but smoothing first paid off on image quality.
        </>,
      ]}
    />
  );
}
