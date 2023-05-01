type EventHandler = (...args: any[]) => void;

class Observer {
  private handlers: Map<string, EventHandler[]> = new Map();

  on(eventName: string, handler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  remove(eventName: string, handlerToRemove: EventHandler): void {
    if (!this.handlers.has(eventName)) return;
    const handlers = this.handlers.get(eventName)!;
    const index = handlers.indexOf(handlerToRemove);
    if (index !== -1) {
      handlers!.splice(index, 1);
    }
  }

  emit(eventName: string, ...args: any[]): void {
    if (!this.handlers.has(eventName)) return;
    this.handlers
      .get(eventName)!
      .forEach((handler: EventHandler) => handler(...args));
  }
}
export { Observer };
export default Observer;
