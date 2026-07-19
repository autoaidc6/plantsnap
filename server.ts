import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { identifyPlantServer } from "./services/geminiServerService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" })); // Large payload limit for base64 images

  // API Route
  app.post("/api/identify-plant", async (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image data provided" });
      }

      const result = await identifyPlantServer(image);
      return res.json(result);
    } catch (error) {
      console.error("Server API Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      return res.status(500).json({ error: errorMessage });
    }
  });

  const getDirname = () => {
    try {
      return path.dirname(fileURLToPath(import.meta.url));
    } catch {
      return __dirname;
    }
  };
  const dirname = getDirname();

  // Robust dev vs prod detection
  let isProd = process.env.NODE_ENV === "production";
  let vite: any = null;

  if (!isProd) {
    try {
      vite = await import("vite");
    } catch (e) {
      console.warn("Vite not found. Forcing production mode fallback.", e);
      isProd = true;
    }
  }

  // Vite middleware for development
  if (!isProd && vite) {
    const { createServer: createViteServer } = vite;
    const viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(viteInstance.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
