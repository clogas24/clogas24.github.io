import CvProjectPage from "../../components/CvProjectPage.jsx";

export default function Project2() {
  return (
    <CvProjectPage
      dir="Project2"
      pdfName="Project 2 Report - Carson Logas"
      title="Homography-Based Image Rectification & AR Poster Swap"
      intro={
        <>
          CSCI 581 (Computer Vision) project using homographies to rectify a tilted planar surface
          into a front-facing view, then reusing the same correspondence points to warp a virtual
          poster onto a wall for an augmented-reality effect, and finally comparing two
          general-purpose image warping methods.
        </>
      }
      tags={["Python", "OpenCV", "NumPy"]}
      approach={[
        <>
          A homography is a projective transformation mapping one 2D plane to another. When a flat
          surface is photographed at an angle, its edges converge due to perspective; by computing
          the homography between the tilted surface and a rectangular target, that projection can
          be mathematically undone to simulate a head-on view &mdash; the same technique used by
          document scanners, AR apps, and panorama stitchers.
        </>,
        <>
          The same correspondence points were then reused for an AR effect: a new homography
          mapped a virtual poster's corners onto the paper region on a wall, and{" "}
          <code>cv2.warpPerspective()</code> plus a blending mask attached it at the correct angle
          in the scene. The hardest part was picking accurate corner points, since any error there
          threw off the whole alignment.
        </>,
        <>
          Finally, triangular-mesh warping and thin-plate-spline (TPS) warping were compared on a
          grid image. Triangular mesh warping splits the image into triangles and warps each
          independently &mdash; fast, with good local control, but prone to visible seams between
          triangles. TPS bends the whole image smoothly and continuously, giving more natural
          results on curved shapes at the cost of more computation.
        </>,
      ]}
    />
  );
}
