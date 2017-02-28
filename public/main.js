// const people = require('./revealing');
// global.people = people;
const listsTpl = require('./lists.hbs');
(function() {
  const lists = document.getElementsByClassName('lists')[0];
  lists.innerHTML = listsTpl( { people: ['Sang', 'Kwon', 'Kim', 'Kang'] });
})();

// Requried: Hot Reloading
if (module.hot) {
  module.hot.accept();
}
