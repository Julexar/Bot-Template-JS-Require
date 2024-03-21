const { SlashBuilder } = require('../../../../client/builders');
const { PermissionFlagsBits } = require('discord.js');

class Command extends SlashBuilder {
  constructor(data) {
    super(data);

    this.enabled = true;
  }

  /**
   *
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async run(interaction) {
    await interaction.reply({
      content: 'Hello world!',
    });
  }
}

module.exports = new Command({
  name: 'command',
  description: 'This is an example Command',
  defaultMemberPermissions: [PermissionFlagsBits.SendMessages],
  options: [],
});
