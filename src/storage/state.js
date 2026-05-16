import debounce from '@utils/debounce'
import Debug from '@utils/debug'

export default class State {
  static #key = 'state'
  static instance = new State()

  constructor() {
    if (State.instance) return State.instance
  }

  #save(state) {
    if (Debug.enabled) return
    localStorage.setItem(State.#key, btoa(JSON.stringify(state)))
  }

  save = debounce(this.#save.bind(this), 1000)

  async load() {
    const state = localStorage.getItem(State.#key)
    if (state) return JSON.parse(atob(state))
  }
}
