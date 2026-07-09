import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: {
        index: './src/index.ts'
      }
    },
    rolldownOptions: {
      output: {
        topLevelVar: false
      }
    },
    sourcemap: true,
    minify: false,
    emptyOutDir: false
  },
  test: {
    exclude: [...configDefaults.exclude, './package'],
    coverage: {
      reporter: ['lcovonly', 'text'],
      include: ['src/**/*']
    },
    typecheck: {
      enabled: true,
      include: ['**/*.spec.ts']
    }
  }
})
