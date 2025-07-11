import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'news.html',
        testKnowledge: 'test.html',
      },
    },
  },
})
