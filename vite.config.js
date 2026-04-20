import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        cv: resolve(__dirname, 'cv.html'),
        projets: resolve(__dirname, 'projets.html'),
        javachat: resolve(__dirname, 'projets/java-chat-system.html'),
        network: resolve(__dirname, 'projets/network-multisite.html'),
        sae101: resolve(__dirname, 'projets/sae-101.html'),
        sae102: resolve(__dirname, 'projets/sae-102.html'),
        sae105: resolve(__dirname, 'projets/sae-105.html'),
        sae201: resolve(__dirname, 'projets/sae-201.html'),
        immovision: resolve(__dirname, 'projets/stage-immovision.html'),
      }
    }
  }
});
