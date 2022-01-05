import type { Plugin } from 'vite'
import { identifierForGlobKey } from 'stimulus-vite-helpers'
import createDebugger from 'debug'

import type { Options } from './types'
export * from './types'

const debug = createDebugger('stimulus:hmr')

// Public: Vite Plugin to provide HMR for Stimulus controllers, allowing to
// re-register them without reloading the page.
export default function StimulusHMRPlugin ({ appGlobal = '$$StimulusApp$$' }: Options = {}): Plugin {
  return {
    name: 'stimulus:hmr',
    apply: 'serve',

    transform (code, id, options) {
      if ((options?.ssr && !process.env.VITEST) || id.includes('node_modules')) return

      // Auto-detect Stimulus application and make accessible during HMR.
      const appRegex = /\n[^\n]*?\s(\w+)(?:\s*=\s*Application\.start\(\))/
      const appVariable = (code.match(appRegex) || [])[1]
      if (appVariable) {
        debug('application', { appVariable, id })
        const exportFooter = `export const $$StimulusApp$$ = window.$$StimulusApp$$ = ${appVariable};`
        return `${code}\n${exportFooter}`
      }

      // Detect if it's a Stimulus controller file.
      const controllerId = identifierForGlobKey(id)
      if (!controllerId) return
      debug('controller', { name: controllerId, id })

      // Inject HMR accept to the Stimulus controller file.
      const metaHotFooter = `
        if (import.meta.hot) {
          import.meta.hot.accept(newModule => {
            if (!window.${appGlobal}) {
              console.warn('Stimulus app not available. Are you creating the app? Falling back to page refresh.');
              import.meta.hot.invalidate();
            } else {
              window.${appGlobal}.register('${controllerId}', newModule.default);
            }
          })
        }
      `.replace(/(\n|\s\s)+/gm, '')

      return `${code}\n${metaHotFooter}`
    },
  }
}
