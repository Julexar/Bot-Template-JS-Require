const Ascii = require('ascii-table');
const client = require('../../..');
const commands = require('../../server/commands/slash');

class slashHandler {
  static run() {
    const commandsTable = new Ascii('Slash Commands').setHeading('Command', 'Status', 'Reason');

    for (const command of commands) {
      let name;

      if (!command.name || !command.run) return commandsTable.addRow(command.filename, '❌', 'Missing Name/Run');

      name = command.name;

      if (command.nick) name += ` (${command.nick})`;

      if (!command.enabled) return commandsTable.addRow(name, '❌', 'Disabled');

      client.slashCommands.set(command.name, command);
      commandsTable.addRow(name, '✅');
    }
    client.console.info(commandsTable.toString());
  }
}

const handler = slashHandler;

module.exports = handler;
