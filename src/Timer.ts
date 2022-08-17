class Timer {
  private timeBetweenPings: number = 1000;
  private theInterval: NodeJS.Timeout;
  private millisecondPassed: number = 0;
  private actions = new Array<(timePassed: number) => void>();

  constructor() {}

  addAction(action: (timePassed: number) => void): void {
    this.actions.push(action);
  }

  public start(): void {
    this.theInterval = setInterval(
      (() => this.ping()).bind(this),
      this.timeBetweenPings
    );
  }
  public stop(): void {
    clearInterval(this.theInterval);
  }
  private ping(): void {
    this.actions.forEach((action) => action(this.millisecondPassed));
    this.millisecondPassed = this.millisecondPassed + this.timeBetweenPings;
  }
}
export default Timer;
