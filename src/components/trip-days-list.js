import { AbstractComponent } from "./abstract-component";

export class TripDaysList extends AbstractComponent {
   constructor({dueDate, index}){
    super();
    this._date = new Date(dueDate).toLocaleString(`en-US`, {month: `short`, day: `numeric`});;
    this._index = index;
  }
  getTemplate() {
    return `<ul class="trip-days">
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._index}</span>
        <time class="day__date" datetime="2019-03-18">${this._date}</time>
      </div>
    </li>
  </ul>`;
  }
};
