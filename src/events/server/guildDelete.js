const { loggers } = require('winston');
const client = require('../../..');

class Event {
  static name = 'guildDelete';

  static async run(server) {
    if (loggers.get(server.id)) loggers.close(server.id);
    client.writeDevLog(`Left Server "${server.name}"`);
  }
}

module.exports = Event;
