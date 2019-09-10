import {TripDaysList} from './trip-days-list.js';
import {TripEventsList} from './trip-events-list.js';
import {render, Position} from './utils.js';

export class TripController {
  constructor(container, days){
    this._container = container;
    this._days = days;
    this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
  }
  init(){
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    render(this._tripEventList.getElement(), this._tripEventList.getElement(), Position.BEFOREEND);

    this._days.forEach((dayMOck) => this._renderDay(dayMOck));
  }
  _renderDay(){
    const day = new dayItem(dayMock);
    const editDay = new dayEdit(dayMock);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._tripEventList.replaceChild(day.getElement(), editDay.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    day.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      this._tripEventList.replaceChild(editDay.getElement(), day.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    editDay.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      this._tripEventList.replaceChild(day.getElement(), editDay.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  }
}
