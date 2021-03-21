/// <reference types="vite/client" />

import { Application } from 'stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const app = Application.start()

// Controller files must be named *_controller.js.
export const controllers = import.meta.globEager('../**/*_controller.js')
registerControllers(app, controllers)
