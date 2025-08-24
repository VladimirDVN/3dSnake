import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false,
    target: 'esnext',
    emptyOutDir: true,
    lib: {
      entry: 'main.js',  // путь к вашему main.js
      name: 'MyBundle',      // имя глобальной переменной
      formats: ['es'],     // формат IIFE (подходит для браузера)
      fileName: 'main-out'   // имя выходного файла (без расширения)
    },
    rollupOptions: {
      output: {
        // dir: '.',         // выходная директория
        entryFileNames: 'main-out.js'  // точное имя файла
      }
    }
  }
});