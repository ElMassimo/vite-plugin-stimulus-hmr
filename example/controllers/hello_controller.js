import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    console.log('Stimulus with Vite.js ⚡️', this.element)
    this.originalText = this.element.textContent
    this.element.textContent = 'Stimulus with Vite.js'
  }

  disconnect() {
    this.element.textContent = this.originalText
  }
}
