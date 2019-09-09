import {TripDaysList} from './../components/trip-days-list.js';
import {TripEventsList} from './../components/trip-events-list.js';
import {dayItem} from './../components/day-item.js';
import {dayEdit} from './../components/day-item-edit.js';
import {render, Position} from './../utils.js';
import {TripDaysListItem} from '../components/trip-days-list-item.js';
import {TripSort} from '../components/trip-sort.js';

export class TripController {
  constructor(container, days){
    this._container = container;
    this._days = days;
    this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
    this._tripSort = new TripSort();
  }
  init(){
    render(this._container, this._tripSort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    let daysSet = new Set();
      this._days.forEach((day) => {
      daysSet.add(day.dueDate);
    });
    Array.from(daysSet).sort((a, b) => {return a - b}).forEach((date, index) => {
      this._renderDate(date, index, this._days)
    });
    this._tripSort.getElement()
    addEventListener(`click`,(evt) => this._onSortClick(evt, daysSet))
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
  _onSortClick(evt,daysSet){
    if(evt.target.tagName === `INPUT`){
      const dataAttribute = evt.target.getAttribute(`data`);
      this._tripDaysList.getElement().innerHTML = ``;

      switch (dataAttribute) {
        case `sort-time`:
          const sortTimeDays = this._days.slice().sort((a, b) => a.price - b.price);
          Array.from(daysSet).sort((a, b) => {return a - b}).forEach((date, index) => {
            this._renderDate(date, index, sortTimeDays)
          });
          break;
        case `sort-price`:
          const sortPriceDays = this._days.slice().sort((a, b) => a.price - b.price);
          Array.from(daysSet).sort((a, b) => {return a - b}).forEach((date, index) => {
            this._renderDate(date, index, sortPriceDays)
          });
          break;
        case `sort-event`:
          Array.from(daysSet).sort((a, b) => {return a - b}).forEach((date, index) => {
            this._renderDate(date, index, this._days)
          });
          break;
      }
    }
  }
}
