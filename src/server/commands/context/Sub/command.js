const { ContextBuilder } = require('../../../../client/builders');
const { ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

class Command extends ContextBuilder {
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
  type: ApplicationCommandType.User,
  description: 'This is an example Command',
  defaultMemberPermissions: [PermissionFlagsBits.SendMessages],
  options: [],
});
