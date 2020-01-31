import { Component } from '@angular/core';

export type TrainingType = 'boxing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedTrainingMethod: TrainingType;

  selectTrainingMethod(method: TrainingType) {
    this.selectedTrainingMethod = method;
  }
}
