export const createTripInfoMain = (tripTowns, totalPrice) => {
  return `<div class="trip-info__main">
  <h1 class="trip-info__title">${tripTowns[0]} ${tripTowns.length > 2 ? `&mdash; ... &mdash;` : `&mdash;`} ${tripTowns.slice(-1)}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
  </p>`;
};
