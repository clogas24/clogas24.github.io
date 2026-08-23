import ProjectPage from "../components/ProjectPage.jsx";
import TechTags from "../components/TechTags.jsx";

export default function RealtimeFileSync() {
  return (
    <ProjectPage>
      <h1>Real-Time File Synchronization Service</h1>
      <p>
        Computer Networks final project. A central server and any number of clients keep a shared
        folder in sync over raw TCP sockets &mdash; edit a file on one machine and every other
        connected client picks up the change within a second, similar in spirit to a minimal
        Dropbox built entirely on top of the socket API.
      </p>

      <TechTags tags={["Python", "TCP sockets", "threading", "JSON", "struct (binary framing)"]} />

      <h2>Approach</h2>
      <p>
        The system is a classic star topology: a <code>server.py</code> process holds the
        authoritative copy of the shared folder in <code>server_storage/</code>, and any number of{" "}
        <code>client.py</code> instances connect to it, each watching its own local folder. Every
        accepted change flows through the server, which persists it and rebroadcasts it to every
        other connected client.
      </p>
      <ul>
        <li>
          <strong>Wire protocol.</strong> TCP is a byte stream with no built-in message boundaries,
          so every message is framed as a 4-byte big-endian length prefix followed by that many
          bytes of UTF-8 JSON. Both sides read the prefix first, then read exactly that many bytes
          before decoding &mdash; a standard length-prefixing pattern that avoids partial-message
          parsing.
        </li>
        <li>
          <strong>Change detection.</strong> Clients don't hook into OS filesystem events; instead
          each client re-snapshots its watched folder once a second (path, type, mtime, size for
          every file and folder) and diffs that snapshot against the previous one to derive a list
          of <code>create_file</code>, <code>update_file</code>, <code>delete_file</code>,{" "}
          <code>create_folder</code>, and <code>delete_folder</code> actions to send.
        </li>
        <li>
          <strong>Initial sync.</strong> When a client connects, the server walks{" "}
          <code>server_storage/</code> and replays it as a stream of <code>create_folder</code>/
          <code>create_file</code> messages before accepting any changes from that client &mdash;
          the client wipes its local folder first, so it always starts from a clean, authoritative
          state rather than trying to merge with whatever was there before.
        </li>
        <li>
          <strong>Concurrency.</strong> The server spawns one thread per connected client; each
          client runs a background listener thread for incoming pushes from the server alongside a
          polling timer thread that watches the local folder, with a lock guarding the shared
          snapshot and client-list state on each side.
        </li>
      </ul>

      <div className="image-gallery">
        <figure>
          <img
            src="/realtime-file-sync/images/architecture-diagram.png"
            alt="Architecture diagram: three clients each connect directly to a central server, which holds the master file storage and rebroadcasts every change to the other clients"
          />
          <figcaption>
            Every client connects directly and only to the server &mdash; clients never talk to
            each other.
          </figcaption>
        </figure>
      </div>

      <h2>Design decisions</h2>
      <ul>
        <li>
          Changed files are sent in full (hex-encoded) rather than diffed or chunked &mdash;
          simpler to reason about and sufficient for the scale of a class project, at the cost of
          re-sending an entire file on every save.
        </li>
        <li>
          Conflict resolution is sidestepped entirely: a client's folder is wiped and rebuilt from
          the server's broadcast on every connect, and the server is the single point every change
          passes through, so there's no local/remote merge logic to get wrong.
        </li>
        <li>
          Polling once a second trades latency and CPU efficiency for portability &mdash; no
          dependency on platform-specific filesystem-event APIs (<code>inotify</code>,{" "}
          <code>ReadDirectoryChangesW</code>), at the cost of up to a one-second delay before a
          change is even noticed.
        </li>
      </ul>

      <h2>Limitations</h2>
      <ul>
        <li>
          No authentication or encryption &mdash; the socket is a plain, unauthenticated TCP
          connection meant for local/LAN demoing, not a real network deployment.
        </li>
        <li>
          No conflict resolution for two clients editing the same file within the same poll
          window; the later write silently wins.
        </li>
        <li>Every save retransmits the whole file, so it doesn't scale well to large files or high edit frequency.</li>
      </ul>
    </ProjectPage>
  );
}
