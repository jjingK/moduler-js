require('./css/common.css');

import events from './pubSub';
import status from './status';
import people from './revealing';

global.modules = {
  events,
  status,
  people
};

// Requried: Hot Reloading
if (module.hot) {
  module.hot.accept();
}
