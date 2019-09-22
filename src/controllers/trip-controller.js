import {TripDaysList} from './../components/trip-days-list.js';
import {TripEventsList} from './../components/trip-events-list.js';
import {render, unrender, Position} from './../utils/utils.js';
import {TripDaysListItem} from '../components/trip-days-list-item.js';
import {TripSort} from '../components/trip-sort.js';
import {PointController} from '../controllers/PointController.js';


export class TripController {
  constructor(container, days) {
    this._container = container;
    this._days = days;
    this._tripDaysList = new TripDaysList();
    this._tripEventList = new TripEventsList();
    this._tripSort = new TripSort();
    this._daysSet = new Set();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {

    render(this._container, this._tripSort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);

    this._tripSort.getElement()
    .addEventListener(`click`, (evt) => this._onSortClick(evt));
    this._renderDate();
  }

  _onDataChange(newData, oldData) {
    this._days[this._days.findIndex((it) => it === oldData)] = newData;
		this._renderDate();
	}

  _onChangeView() {
		this._subscriptions.forEach((it) => it());
	}

  _onSortClick(evt) {
    if (evt.target.classList.contains(`trip-sort__input`)) {
      this._tripDaysList.getElement().innerHTML = ``;
      const dataAttribute = evt.target.getAttribute(`data`);
      const sortDay = new TripDaysListItem(`sort day`, 0);
      switch (dataAttribute) {
        case `sort-time`:
          render(this._tripDaysList.getElement(), sortDay.getElement(), Position.BEFOREEND);
          this.renderCards(
            sortDay.getElement().querySelector(`.trip-events__list`),
            this._days.sort((a, b) => a.dueDate - b.dueDate)
          );
          break;
        case `sort-price`:
          render(this._tripDaysList.getElement(), sortDay.getElement(), Position.BEFOREEND);
          this.renderCards(
            sortDay.getElement().querySelector(`.trip-events__list`),
            this._days.sort((a, b) => a.price - b.price)
          );
          break;
        case `sort-event`:
          this._renderDate();
          break;
      }
    }
  }

  _renderDate() {
    this._tripDaysList.getElement().innerHTML = ``;
    const days = Array.from(new Set(this._days.map(day => day.dueDate))).sort();

    render(this._container, this._tripDaysList.getElement(), Position.BEFOREEND);
    days.forEach((date, index) => {
      const dateDay = new TripDaysListItem(date, index);
      render(this._tripDaysList.getElement(), dateDay.getElement(), Position.BEFOREEND);
      this.renderCards(
        dateDay.getElement().querySelector(`.trip-events__list`),
        this._days.filter(it => it.dueDate === date)
      )
    });
  }

  renderCards(day, data) {
    data.forEach((it) => {
      const pointController = new PointController(day, it, this._onDataChange, this._onChangeView);
      this._subscriptions.push(pointController.setDefaultView.bind(pointController));
    })
  }

  onSubmit(evt) {
    evt.preventDefault();
    this._tripEventList.getElement().innerHTML = ``;
    this._renderDate();
  }
}
