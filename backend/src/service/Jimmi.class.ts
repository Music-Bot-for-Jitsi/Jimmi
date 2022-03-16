class Jimmi {
  public readonly id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
}

export default Jimmi;
