/// <reference types="vite/client" />

import { Application } from '@hotwired/stimulus'
import { registerControllers } from 'stimulus-vite-helpers'

const app = Application.start()

// Controller files must be named *_controller.js.
export const controllers = import.meta.glob('../**/*_controller.js', { eager: true })
registerControllers(app, controllers)

export { app }
