import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const page = (...segments) => resolve(__dirname, ...segments, "index.html");

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: page(),
        cCompiler: page("c-compiler"),
        kAnonymity: page("k-anonymity-vs-differential-privacy"),
        realtimeFileSync: page("realtime-file-sync"),
        cvProject0: page("computer-vision", "Project0"),
        cvProject1: page("computer-vision", "Project1"),
        cvProject2: page("computer-vision", "Project2"),
        cvProject3: page("computer-vision", "Project3"),
        cvProject4: page("computer-vision", "Project4"),
      },
    },
  },
});
