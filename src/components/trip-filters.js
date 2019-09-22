export const createTripFilters = ({filters}) => {
return `<h2 class="visually-hidden">Filter events</h2>
<form class="trip-filters" action="#" method="get">
    ${filters.map((it) => {return `<div class="trip-filters__filter">
    <input id="filter-${it.title}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${it.title}" ${it.isChecked ? `checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${it.title}">${it.title}</label>
    </div>`
    }).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
