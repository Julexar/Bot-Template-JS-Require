require('dotenv').config();

module.exports = {
  token: process.env.BOT_TOKEN,
  default_prefix: 'b!',
  owners: ['Your ID'],
  presence: {
    status: 'online',
    activity: [
      {
        name: 'Templates',
        type: 3,
      },
    ],
    status: 'online',
  },
};
