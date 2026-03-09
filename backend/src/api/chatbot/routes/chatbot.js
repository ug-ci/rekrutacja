'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/chatbot',
      handler: 'chatbot.chat',
      config: {
        auth: false,
      },
    },
  ],
};
