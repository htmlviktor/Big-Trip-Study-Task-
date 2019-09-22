import {DayItem} from './../components/day-item.js';
import {DayEdit} from './../components/day-item-edit.js';
import {render, Position} from './../utils/utils.js';
import {callFlatpickr} from '../utils/flatpickr.js';

const moment = require('moment');

export class PointController{
  constructor(container, data, onDataChange, onChangeView){
    this._container = container;
    this._data = data;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._card = new DayItem(data);
    this._cardEdit = new DayEdit(data);

    this.create()
  }
  create(){

      callFlatpickr(this._cardEdit.getElement().querySelector(`.event__input--time`),{
        altInput: true,
        allowInput: true,
        defaultDate: this._data.dueDate,
      });
      render(this._container, this._card.getElement(), Position.AFTERBEGIN);

      const onEscKeyDown = (evt) => {
          if (evt.key === `Escape` || evt.key === `Esc`) {
            this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        this._card.getElement().querySelector(`.event__rollup-btn`)
          .addEventListener(`click`, () => {
            this._onChangeView();
            this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
            this._cardEdit.getElement().addEventListener(`submit`, this.onSubmit);
            document.addEventListener(`keydown`, onEscKeyDown);
          });
          this._cardEdit.getElement().querySelector(`.event__save-btn`)
          .addEventListener(`click`, (evt) => {
            evt.preventDefault();
            const formData = new FormData(this._cardEdit.getElement().querySelector(`.event`))
            const entry = {
              type: formData.get(`event-type`),
              towns: formData.get(`event-destination`),
              dueDate: moment(new Date(formData.get(`event-start-time`))).unix(),
              price: formData.get(`event-price`),
            }
            const newObject = Object.assign({} , this._data, entry);
            this._onDataChange(newObject, this._data);
            this.create();
          });
  }
  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }
}
