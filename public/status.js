
  const statusTpl = require('./views/status.hbs');
  const events = require('./pubSub');

  const status = (function() {
    const $status = $('#statusModule');
    let people = 0;

    events.on('peopleChanged', setPeople);
    render();

    function render() {
      $status.html(statusTpl({ people }));
    }

    function setPeople(newPeople) {
      people = newPeople;
      render();
    }

    function destroy() {
      $status.remove();
      events.off('peopleChanged', setPeople);
    }

    return {
      destroy
    };
  }());
  module.exports = status;
