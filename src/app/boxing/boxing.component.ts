import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxing',
  templateUrl: './boxing.component.html',
  styleUrls: ['./boxing.component.scss']
})
export class BoxingComponent implements OnInit {

  numberOfRounds = 5;
  roundDuration = 3;
  breakDuration = .5;

  currentRound = 0;
  timerActive = false;
  localInterval;
  timerValue = '00:00';
  status = 'Waiting';

  beepAudio = new Audio();
  endBeepAudio = new Audio();
  startBeepAudio = new Audio();
  trainingEnded = false;

  constructor() {
    this.beepAudio.src = '../../assets/beep.mp3';
    this.beepAudio.load();

    this.endBeepAudio.src = '../../assets/end.mp3';
    this.endBeepAudio.load();

    this.startBeepAudio.src = '../../assets/start.mp3';
    this.startBeepAudio.load();
  }

  ngOnInit() { }

  startTimer(duration, isActive) {
    window.clearInterval(this.localInterval);
    let timer = duration * 60;
    let minutes;
    let seconds;
    this.timerActive = isActive;

    if (isActive) {
      this.currentRound++;
      this.status = 'Boxing';
    }

    this.localInterval = setInterval(() => {
      minutes = Math.floor(timer / 60);
      seconds = Math.floor(timer % 60);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      this.timerValue = `${minutes}:${seconds}`;

      timer--;

      if (timer < 5 && timer >= 0) {
        this.beepAudio.play();
      }

      if (timer < 0) {
        if (this.timerActive) {
          this.endBeepAudio.play();
          this.endRound();
        } else {
          this.startBeepAudio.play();
          this.startTimer(this.roundDuration, true);
        }
      }
    }, 1000);
  }

  endRound() {
    window.clearInterval(this.localInterval);
    this.timerActive = false;

    if (this.currentRound === this.numberOfRounds) {
      this.reset();
    } else {
      this.status = 'Break';
      this.startTimer(this.breakDuration, false);
    }
  }

  reset() {
    this.trainingEnded = false;
    this.status = 'Waiting';
    this.timerValue = '00:00';
    this.currentRound = 0;
  }

}
