const Handlebars = require('handlebars');   // webpack.config setting alias

(function($, win) {
  const peoples = [];
  const $form = $('.form');
  const $lists = $('.lists');

  $form.submit(function(event) {
    event.preventDefault();
    const $name = $(this).find('[name=name]');
    const name = $name.val().trim();
    const source = $('#people-template').html();
    const template = Handlebars.compile(source);

    if (!name.length) {
      return false;
    }
    peoples.push({name});
    const html = template({ name });
    $lists.append(html);
    $name.val('');
  });

  $lists.off().on('click', 'a.del', function(event) {
    event.preventDefault();
    const $this = $(this);
    const $remove = $this.parent();
    const index = $lists.index($remove);

    $remove.remove();
    peoples.splice(index, 1);
  });
}(jQuery, window));
