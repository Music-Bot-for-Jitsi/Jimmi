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
  public getStatus(): string {
    return '';
  }
  public getQueue(): string[] {
    return [];
  }
  public getCurrent(): string {
    return '';
  }
  public changeMusicUrl(_url: string): void {
  }
  public clearPlaylist(): void {
  }
  public removeTrackFromPlaylist(_index: number): void {
  }
  public skip(): void {
  }
  public addToPlaylist(_url: string): void {
  }
}

export default Jimmi;
