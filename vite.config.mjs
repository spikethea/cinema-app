import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(() => {
  return {
    base: '',
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
    build: {
      outDir: 'build',
    },
    plugins: [react(), viteTsconfigPaths(), basicSsl()],
    assetsInclude: ['**/*.gltf', '**/*.glb'],
  };
});