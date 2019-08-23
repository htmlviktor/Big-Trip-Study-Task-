export const createTripDayItem = ({type, towns, dueDate, price, additionalOptions}) => {
  console.log(towns)
  return `
  <li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} to ${towns}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30"> ${new Date(dueDate).getHours()} : ${new Date(dueDate).getMinutes()}</time>
          —
          <time class="event__end-time" datetime="2019-03-18T11:00">${new Date(dueDate * 1.2).getHours()} : ${new Date(dueDate).getMinutes()}</time>
        </p>
        <p class="event__duration">1H 30M</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
          <li class="event__offer">
          ${additionalOptions.map((it) => {if(it.availability){
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
};
