import { Controller } from "stimulus"

export default class extends Controller {
  connect() {
    console.log('Home 🏠', this.element)
  }
}
