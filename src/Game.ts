import Timer from "./Timer";

const GAME_DURATION_IN_MINUTES = 90;

class Game {
  private timer: Timer;
  private minutesLeft = GAME_DURATION_IN_MINUTES;

  constructor() {
    this.timer = new Timer();
    this.timer.addAction(async (timePassed: number) => {
      (() => this.updateTimer(timePassed)).bind(this)();
    });
    this.timer.addAction(async (timePassed: number) => {
      (() => this.logTimeLeft(timePassed)).bind(this)();
    });
  }

  private logTimeLeft(millisecondPassed: number): void {
    const minutes = Math.floor(this.minutesLeft);
    const seconds = Math.floor((this.minutesLeft - minutes) * 60);
    console.log(`${minutes}:${seconds}`);
  }

  private updateTimer(millisecondPassed: number): void {
    this.minutesLeft = GAME_DURATION_IN_MINUTES - millisecondPassed / 1000 / 60;
    if (this.minutesLeft < 0) {
      this.minutesLeft = 0;
      this.pause();
    }
  }

  public start(): void {
    this.timer.start();
  }
  public pause(): void {
    this.timer.stop();
  }
}
const theGame = new Game();
export default theGame;
