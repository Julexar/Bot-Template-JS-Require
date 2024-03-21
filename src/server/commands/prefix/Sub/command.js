const { PermissionFlagsBits } = require('discord.js');

class Command {
  constructor() {
    this.name = 'command';
    this.nick = 'cmd';
    this.description = 'This is an example Command';
    this.permissions = {
      member: [PermissionFlagsBits.SendMessages],
    };
    this.enabled = true;
    this.args = true;
    this.usage = ['--<arg>'];
    this.optional = false;
  }

  /**
   *
   * @param {import('discord.js').Message} message
   * @param {string[]} args
   */
  async run(message, args) {
    switch (args[0]) {
      case '--arg1':
        return await message.reply({ content: 'You chose arg1!' });
      default:
        return await message.reply({ content: 'You did not choose an argument!' });
    }
  }
}

module.exports = new Command();
