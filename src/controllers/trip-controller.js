import {TripDaysList} from './../components/trip-days-list.js';
import {TripEventsList} from './../components/trip-events-list.js';
import {DayItem} from './../components/day-item.js';
import {DayEdit} from './../components/day-item-edit.js';
import {render, Position} from './../utils.js';
import {TripDaysListItem} from '../components/trip-days-list-item.js';
import {TripSort} from '../components/trip-sort.js';

const moment = require('moment');

export class TripController {
  constructor(container, days) {
    this._container = container;
    this._days = days;
    this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
    this._tripSort = new TripSort();
    this._daysSet = new Set();

    this.onSubmit = this.onSubmit.bind(this);
  }

  init() {
    render(this._container, this._tripSort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);


    this._renderDate();
  }

  _onSortClick(evt, daysSet) {
    if (evt.target.classList.contains(`trip-sort__input`)) {
      const dataAttribute = evt.target.getAttribute(`data`);
      this._tripDaysList.getElement().innerHTML = ``;

      switch (dataAttribute) {
        case `sort-time`:
          const sortTimeDays = this._days.slice().sort((a, b) => a.price - b.price);
          Array.from(daysSet).sort((a, b) => {
            return a - b
          }).forEach((date, index) => {
            this._renderDate(date, index, sortTimeDays)
          });
          break;
        case `sort-price`:
          const sortPriceDays = this._days.slice().sort((a, b) => a.price - b.price);
          Array.from(daysSet).sort((a, b) => {
            return a - b
          }).forEach((date, index) => {
            this._renderDate(date, index, sortPriceDays)
          });
          break;
        case `sort-event`:
          Array.from(daysSet).sort((a, b) => {
            return a - b
          }).forEach((date, index) => {
            this._renderDate(date, index, this._days)
          });
          break;
      }
    }
  }

  _renderDate() {
    const days = Array.from(new Set(this._days.map(day => day.dueDate))).sort();
    render(this._container, this._tripEventList.getElement(), Position.BEFOREEND);
    days.forEach((date, index) => {
      const dateDay = new TripDaysListItem(date, index);
      render(this._tripEventList.getElement(), dateDay.getElement(), Position.BEFOREEND);
      this.renderCards(
        dateDay.getElement().querySelector(`.trip-events__list`),
        this._days.filter(it => it.dueDate === date)
      )
    })
  }

  renderCards(day, data) {
    data.forEach((eventData) => {
      const card = new DayItem(eventData);
      const cardEdit = new DayEdit(eventData);
      render(day, card.getElement(), Position.AFTERBEGIN);

      card.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => {
            day.replaceChild(cardEdit.getElement(), card.getElement());

            cardEdit.getElement().addEventListener(`submit`, this.onSubmit);
          });
    })
  };

  onSubmit(evt) {
    evt.preventDefault();
    this._tripEventList.getElement().innerHTML = ``;
    this._renderDate();
  }


  // this._days.forEach((dayMock) => {
  //   const day = new dayItem(dayMock);
  //   const editDay = new dayEdit(dayMock);
  //
  //   if(date === dayMock.dueDate){
  //
  //     const onEscKeyDown = (evt) => {
  //       if (evt.key === `Escape` || evt.key === `Esc`) {
  //         dateDay.getElement().querySelector(`.trip-events__list`).replaceChild(day.getElement(), editDay.getElement());
  //         document.removeEventListener(`keydown`, onEscKeyDown);
  //       }
  //     };
  //     day.getElement()
  //     .querySelector(`.event__rollup-btn`)
  //     .addEventListener(`click`, () => {
  //       dateDay.getElement().querySelector(`.trip-events__list`).replaceChild(editDay.getElement(), day.getElement());
  //       document.addEventListener(`keydown`, onEscKeyDown);
  //     });
  //
  //     editDay.getElement()
  //     .querySelector(`.event__save-btn`)
  //     .addEventListener(`click`, (evt) => {
  //       evt.preventDefault();
  //       const formData = new FormData(editDay.getElement().querySelector(`.event`))
  //       const entry = {
  //         type: formData.get(`event-type`),
  //         towns: formData.get(`event-destination`),
  //         dueDate: moment(formData.get(`event-start-time`)).unix(),
  //         price: formData.get(`event-price`),
  //       }
  //       this._days[this._days.findIndex((it) => {
  //         return it === dayMock})] = entry;
  //       this._onSaveBtnClick();
  //     });
  //
  //     render(dateDay.getElement().querySelector(`.trip-events__list`), day.getElement(), Position.BEFOREEND);
  //   }
  // });
  // render(this._tripDaysList.getElement(), dateDay.getElement(), Position. BEFOREEND);
  // render(dateDay.getElement(), this._tripEventList.getElement(), Position.BEFOREEND);

}
