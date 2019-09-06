import {createTripInfoMain} from './components/trip-info-main.js';
import {createTripNavigation} from './components/trip-nav.js';
import {createTripFilters} from './components/trip-filters';
import {createTripSort} from './components/trip-sort';
import {getItem, getFilters, getNavigation} from './data.js';

import {TripController} from './controllers/trip-controller.js';

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
//addMarkupElement(tripEvents, createTripDaysList());

const tripController = new TripController(tripEvents, allItems);
tripController.init();
