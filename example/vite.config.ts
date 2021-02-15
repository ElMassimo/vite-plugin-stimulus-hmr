import path from 'path'
import { UserConfig } from 'vite'
import StimulusHMR from 'vite-plugin-stimulus-hmr'

const config: UserConfig = {
  plugins: [
    StimulusHMR(),
  ],
}

export default config
