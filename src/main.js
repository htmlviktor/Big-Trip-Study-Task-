import {createTripInfoMain} from './components/trip-info-main.js';
import {createTripNavigation} from './components/trip-nav.js';
import {createTripFilters} from './components/trip-filters';
import {createTripSort} from './components/trip-sort';
import {createTripDaysList} from './components/trip-days-list';
import {createTripDayItem} from './components/day-item';
import {createEventFormEditing} from './components/event-form-editing';
import {createDayItemEdit} from './components/day-item-edit.js';

const tripInfo = document.querySelector(`.trip-info`);
const tripControls = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const addMarkupElement = (container, markup, position = `beforeend`) => {
  container.insertAdjacentHTML(position, markup);
};

addMarkupElement(tripInfo, createTripInfoMain(), `afterbegin`);
addMarkupElement(tripControls, createTripFilters());
addMarkupElement(tripControls, createTripNavigation());
addMarkupElement(tripEvents, createTripSort());
addMarkupElement(tripEvents, createEventFormEditing());
addMarkupElement(tripEvents, createTripDaysList());

const tripDaysList = document.querySelector(`.trip-days`);

for (let i = 0; i < 3; i++) {
  addMarkupElement(tripDaysList, createTripDayItem());
}

const tripEventsList = document.querySelector(`.trip-events__list`);
addMarkupElement(tripEventsList, createDayItemEdit());
