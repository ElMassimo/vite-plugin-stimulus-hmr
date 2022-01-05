import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    console.log('Revealing Image', this.element)
    this.element.classList.remove('hidden')
  }

  disconnect() {
    console.log('Hiding Image', this.element)
    this.element.classList.add('hidden')
  }
}
