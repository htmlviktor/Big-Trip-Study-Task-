export const createTripNavigation = ({navigationItems}) => {
  return `<h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs  trip-tabs">
    ${navigationItems.map((it) => {return `<a class="trip-tabs__btn  ${it.isActive ? `trip-tabs__btn--active` : `` }" href="#">${it.title}</a>`}).join(``)}
  </nav>`;
};
