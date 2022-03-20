class Jimmi {
  public readonly id: string;

  constructor() {
    this.id = crypto.randomUUID();
  }
  public play(): void {
  }
  public pause(): void {
  }
  public stop(): void {
  }
  public getMusicInfo(): string {
    return '';
  }
  public changeMusicUrl(url: string): void {
  }
}

export default Jimmi;
