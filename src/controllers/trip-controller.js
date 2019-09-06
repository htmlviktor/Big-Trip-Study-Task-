import {TripDaysList} from './../components/trip-days-list.js';
import {TripEventsList} from './../components/trip-events-list.js';
import {dayItem} from './../components/day-item.js';
import {dayEdit} from './../components/day-item-edit.js';
import {render, Position} from './../utils.js';

export class TripController {
  constructor(container, days){
    this._container = container;
    this._days = days;
    //this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
  }
  init(){

    this._days.forEach((day, index) => {
      this._renderDate(day, index);
    });
    //render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    //render(this._tripDaysList.getElement(), this._tripEventList.getElement(), Position.BEFOREEND);

    this._days.forEach((dayMock) => this._renderDay(dayMock));
  }
  _renderDate(day, index){
    const dateDay = new TripDaysList(day, index);
    render(this._container, dateDay.getElement(), Position. BEFOREEND);
    render(dateDay.getElement(), this._tripEventList.getElement(), Position.BEFOREEND);

  }
  _renderDay(dayMock){
    const day = new dayItem(dayMock);
    const editDay = new dayEdit(dayMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._tripEventList.getElement().replaceChild(day.getElement(), editDay.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    day.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      this._tripEventList.getElement().replaceChild(editDay.getElement(), day.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    editDay.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      this._tripEventList.getElement().replaceChild(day.getElement(), editDay.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    render(this._tripEventList.getElement(), day.getElement(), Position.BEFOREEND);
  }
}
