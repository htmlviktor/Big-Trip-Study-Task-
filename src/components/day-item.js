import { AbstractComponent } from './abstract-component.js';
const moment = require('moment');
export class DayItem extends AbstractComponent {
  constructor({type, towns, dueDate, price, additionalOptions}){
    super();
    this._type = type;
    this._towns = towns;
    this._dueDate = dueDate;
    this._price = price;
    this._additionalOptions = additionalOptions;
  }
  getTemplate() {
      return `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${this._type} to ${this._towns}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="2019-03-18T10:30"> ${moment(new Date(this._dueDate)).format('HH:mm')}</time>
              —
              <time class="event__end-time" datetime="2019-03-18T11:00"> ${moment(new Date(this._dueDate - 7200)).format('HH:mm')}</time>
            </p>
            <p class="event__duration">1H 30M</p>
          </div>

          <p class="event__price">
            €&nbsp;<span class="event__price-value">${this._price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
              <li class="event__offer">
              ${this._additionalOptions.map((it) => {if(it.availability){
                return `<span class="event__offer-title">${it.title}</span>
                          +
                        €&nbsp;<span class="event__offer-price">${it.price}</span>`;}
                      }).join(``)
                }
              </li>
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`;
  }
}
