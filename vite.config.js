import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //added the line below to make the setup for github pages
  //github pages serves the app from /WhatsForDinner/ and not from the root,
  //so Vite needs to know the path. Must match the repo name exactly.
  base: "/WhatsForDinner/",
});
