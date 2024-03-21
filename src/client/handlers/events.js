const Ascii = require('ascii-table');
const client = require('../../..');
const events = require('../../events');

class eventHandler {
  static run() {
    const eventsTable = new Ascii('Events').setHeading('Name', 'Status', 'Reason');

    for (const event of events) {
      let name;

      if (!event.name || !event.run) return eventsTable.addRow(event.filename, '❌', 'Missing Name/Run');

      name = event.name;

      if (event.nick) name += ` (${event.nick})`;

      if (event.once) client.once(event.name, async (...args) => await event.run(...args));
      else client.on(event.name, async (...args) => await event.run(...args));

      eventsTable.addRow(name, '✅');
    }
    client.console.info(eventsTable.toString());
  }
}

const handler = eventHandler;

module.exports = handler;
