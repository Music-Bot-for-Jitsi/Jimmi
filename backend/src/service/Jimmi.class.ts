class Jimmi {
  public readonly id: string;

  constructor() {
    this.id = globalThis.crypto.randomUUID();
  }
}

export default Jimmi;
