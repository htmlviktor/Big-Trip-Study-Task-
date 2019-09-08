import {TripDaysList} from './../components/trip-days-list.js';
import {TripEventsList} from './../components/trip-events-list.js';
import {dayItem} from './../components/day-item.js';
import {dayEdit} from './../components/day-item-edit.js';
import {render, Position} from './../utils.js';
import { TripDaysListItem } from '../components/trip-days-list-item.js';

export class TripController {
  constructor(container, days){
    this._container = container;
    this._days = days;
    this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
  }
  init(){

    render(this._container, this._tripDaysList.getElement(), Position. BEFOREEND);

    let daysSet = new Set();
      this._days.forEach((day) => {
      daysSet.add(day.dueDate);
    });
    const sortFunction =  (a, b) => {
      return a - b
    }
    Array.from(daysSet).sort(sortFunction).forEach((date, index) => {
      this._renderDate(date, index, this._days)
    });
  }
  _renderDate(date, index, days){
    const dateDay = new TripDaysListItem(date, index);

    days.forEach((dayMock) => {

      const day = new dayItem(dayMock);
      const editDay = new dayEdit(dayMock);

      if(date === dayMock.dueDate){

        const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            dateDay.getElement().querySelector(`.trip-events__list`).replaceChild(day.getElement(), editDay.getElement());
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        day.getElement()
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          dateDay.getElement().querySelector(`.trip-events__list`).replaceChild(editDay.getElement(), day.getElement());
          document.addEventListener(`keydown`, onEscKeyDown);
        });
        editDay.getElement()
        .querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          dateDay.getElement().querySelector(`.trip-events__list`).replaceChild(day.getElement(), editDay.getElement());
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        render(dateDay.getElement().querySelector(`.trip-events__list`), day.getElement(), Position.BEFOREEND);
      }
    })
    render(this._tripDaysList.getElement(), dateDay.getElement(), Position. BEFOREEND);
    render(dateDay.getElement(), this._tripEventList.getElement(), Position.BEFOREEND);
  }
}
