export class EventBus {
  constructor() {
    this._h = {};
  }
  on(event, fn) {
    (this._h[event] = this._h[event] || []).push(fn);
  }
  off(event, fn) {
    if (!this._h[event]) return;
    this._h[event] = this._h[event].filter((f) => f !== fn);
  }
  emit(event, payload) {
    (this._h[event] || []).slice().forEach((fn) => {
      try {
        fn(payload);
      } catch (e) {
        console.error(`EventBus handler for "${event}" failed:`, e);
      }
    });
  }
}
