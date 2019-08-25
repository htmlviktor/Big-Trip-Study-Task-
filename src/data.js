export const getItem = () => ({
  type: [
    `bus`,
    `check-in`,
    `drive`,
    `flight`,
    `restaurant`,
    `ship`,
    `sightseeing`,
    `taxi`,
    `train`,
    `transport`,
    `trip`,
  ][Math.floor(Math.random() * 11)],
  towns: [
    `Berlin`,
    `Praha`,
    `Drezden`,
    `Zalypivsk`,
  ][Math.floor(Math.random() * 4)],
  photos: [
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
  ],
  description:[
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`,
  ],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  price:[
    600,
    140,
    200,
    500,
  ][Math.floor(Math.random() * 4)],
  additionalOptions: [{
    title: `Add luggage`,
    price: 10,
    availability: true,
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      availability: false,
    },
    {
      title: `Add meal`,
      price: 2,
      availability: false,
    },
    {
      title: `Choose seats`,
      price: 9,
      availability: true,
    }
  ]
});
export const getFilters = () => ({
  filters: [
    {
      title: `Everything`,
      isChecked: true,
    },
    {
      title: `Future`,
      isChecked: false,
    },
    {
      title: `Past`,
      isChecked: false,
    },
  ]
});
export const getNavigation = () => ({
  navigationItems: [
    {
      title: `Table`,
      isActive: true,
    },
    {
      title: `Stats`,
      isActive: false,
    },
  ]
});

