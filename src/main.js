import {createTripInfoMain} from './components/trip-info-main.js';
import {createTripNavigation} from './components/trip-nav.js';
import {createTripFilters} from './components/trip-filters';
import {createTripSort} from './components/trip-sort';
import {createTripDaysList} from './components/trip-days-list';
import {getItem, getFilters, getNavigation} from './data.js';
import {dayItem} from './components/day-item.js';
import {dayEdit} from './components/day-item-edit.js';
import {render, Position} from './utils.js';

const tripInfo = document.querySelector(`.trip-info`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const addMarkupElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

const navigation  = getNavigation();
const filters = getFilters();
const createItemsArray = (count) => {
  let itemsArray = [];
  for (let i = 0; i < count; i++) {
    itemsArray.push(getItem());
  }
  return itemsArray;
};
const allItems = createItemsArray(4);
console.log(allItems)
const getTripTowns = () => {
  const towns = [];
  for(let it of allItems) {
    towns.push(it.towns)
  }
  return towns
}
const tripTowns = getTripTowns();

const getPrice = () => {
  let total = 0;
  for(let it of allItems) {
    total += it.price;
  }
  return total
}
const totalPrice = getPrice();
addMarkupElement(tripInfo, createTripInfoMain(tripTowns, totalPrice), `afterbegin`);
addMarkupElement(tripControls, createTripFilters(filters), `afterbegin`);
addMarkupElement(tripControls, createTripNavigation(navigation), `afterbegin`);
addMarkupElement(tripEvents, createTripSort());
addMarkupElement(tripEvents, createTripDaysList());

const renderDay = (dayMock) => {
  const day = new dayItem(dayMock);
  const editDay = new dayEdit(dayMock);
  const tripEventsList = document.querySelector(`.trip-events__list`);
  render(tripEventsList, day.getElement(), Position.BEFOREEND);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tripEventsList.replaceChild(day.getElement(), editDay.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  day.getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    tripEventsList.replaceChild(editDay.getElement(), day.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  editDay.getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, () => {
    tripEventsList.replaceChild(day.getElement(), editDay.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });
}
allItems.forEach((it) => renderDay(it));
