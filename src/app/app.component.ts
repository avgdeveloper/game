import { Question } from './models/question';
import { HttpRes } from './models/http-res';
import { Component, OnInit, NgModule } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import * as $ from 'node_modules/jquery/dist/jquery.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'zoomInfo';
  questions: Question;
  answers: string[];
  counter: number = 0;
  noCheck: boolean = true;
  selected: false | string = false;
  correct: false | string = false;
  incorrect: false | string = false;
  continue: number;
  btnString: string = 'OK';


  constructor(private qs: QuestionsService) { }

  ngOnInit() {

    this.getQuestions();
  }

  getQuestions() {
    this.qs.getQuestions().subscribe((data: HttpRes) => {
      this.questions = data.results[this.counter];
      $.rand(this.answers = [this.questions.correct_answer, ...this.questions.incorrect_answers]);
    });
    $('.num-' + this.counter).addClass('bullet-on');
    this.btnString = 'OK';
    this.selected = false;
    this.correct = false;
    this.incorrect = false;

  }

  select(answer) {
    if (!this.correct && !this.incorrect) {
      this.selected = answer;
      this.noCheck = false;
    }
  }

  okBtn() {
    if (this.btnString === 'OK') {
      if (this.selected == this.questions.correct_answer) {
        this.correct = this.selected;
      } else {
        this.incorrect = this.selected;
      }
      this.btnString = 'continue';
    } else {
      this.counter = this.counter + 1;
      this.getQuestions();
    }
    //

  }

}
