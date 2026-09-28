// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// `npm run build:static` gera HTML pré-renderizado em dist/client, pronto para subir
// por FTP em qualquer hospedagem. O build normal (Lovable/Cloudflare) não muda.
const staticExport = process.env.STATIC_EXPORT === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(staticExport && {
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages: [{ path: "/" }, { path: "/sitemap.xml" }],
    }),
  },
  ...(staticExport && { nitro: false as const }),
  vite: {
    server: {
      // Assets enviados pelo Lovable (src/assets/*.asset.json) apontam para /__l5e/...,
      // que só existe na hospedagem do Lovable. Em dev local, busca do site publicado.
      proxy: {
        "/__l5e": { target: "https://smile-guard-coach.lovable.app", changeOrigin: true },
      },
    },
  },
});
