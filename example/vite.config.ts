import { defineConfig, splitVendorChunkPlugin } from 'vite'
import StimulusHMR from 'vite-plugin-stimulus-hmr'

export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    StimulusHMR(),
  ],
})
