import { AbstractComponent } from "./abstract-component";

export class TripDaysListItem extends AbstractComponent {
   constructor(date, index){
    super();
    this._date = new Date(date).toLocaleString(`en-US`, {month: `short`, day: `numeric`});
    this._index = index + 1;
  }
  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._index}</span>
        <time class="day__date" datetime="2019-03-18">${this._date}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`;
  }
}
