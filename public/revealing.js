/**
 * Revealing Pattern
 * @refs https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 */
const events = require('./pubSub');
const listsTpl = require('./views/lists.hbs');

const people = (function() {
  const people = ['Lee', 'Kwon', 'Kang', 'Hyen', 'Joo'];

  const $el = $('#peopleModule');
  const $form = $el.find('form');
  const $button = $el.find('button');
  const $input = $el.find('input');
  const $ul = $el.find('ul');

  function render() {
    const data = { people };
    $ul.html(listsTpl(data));
    events.emit('peopleChanged', people.length);
  }

  //bind events
  $form.on('submit', (event) => event.preventDefault() );
  $button.on('click', addPerson);
  $ul.off().on('click', '.del', deletePerson);

  render();

  function addPerson(value) {
    const name = typeof value === 'string' ? value : $input.val();
    people.push(name);
    render();
    $input.val('');
  }

  function deletePerson(event) {
    let i;
    if (typeof event === 'number') {
      i = event;
    } else {
      const $target = $(event.target);
      const $remove = $target.parent('li');
      i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);
    render();
    return false;
  }

  return {
    addPerson,
    deletePerson
  };
}());

module.exports = people;
