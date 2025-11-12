import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    libInjectCss(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MipoUI',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.esm.js'
        if (format === 'umd') return 'index.umd.js'
        return 'index.js'
      }
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'framer-motion',
        'lucide-react',
        '@emotion/is-prop-valid',
        '@emotion/styled'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'framerMotion',
          'lucide-react': 'lucideReact',
          '@emotion/is-prop-valid': 'isPropValid'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    postcss: './postcss.config.js', // Важно: явно укажите конфиг
    modules: {
      scopeBehaviour: 'local', // или 'global' для библиотеки
    }
  },
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom',
      '@emotion/is-prop-valid': '@emotion/is-prop-valid'
    }
  }
})