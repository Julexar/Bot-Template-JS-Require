const client = require('../../..');
const { BadRequestError, ForbiddenError } = require('../../client/errors');
const { ErrorEmbed } = require('../../client/embeds');

class Event {
  static name = 'interactionCreate';
  static nick = 'Slash';

  /**
   *
   * @param {import('discord.js').Interaction} interaction
   */
  static async run(interaction) {
    try {
      const server = interaction.guild;

      if (!server) throw new BadRequestError('Invalid Server', 'Could not fetch the Server from the Interaction!');

      if (interaction.isChatInputCommand()) {
        const command = client.slashCommands.get(interaction.commandName);

        if (!command) throw new BadRequestError('Invalid Command', "The Command you are trying to run does not exist in the Bot's files!");

        if (!command.enabled) throw new ForbiddenError('Command disabled', 'The Command you are trying to run has been disabled by the Developer!');

        const channel = interaction.channel;

        if (command.permissions) {
          if (command.permissions.bot && command.permissions.bot.length >= 1) {
            if (!channel.permissionsFor(interaction.guild.me).has(command.permissions.bot)) {
              const perms = channel.permissionsFor(interaction.guild.me).missing(command.permissions.bot);

              throw new ForbiddenError(
                'Bot missing Permissions',
                `The Bot is missing the following Permissions to run the current Command\n: ${perms.join(', ')}`
              );
            }
          }
        }

        client.writeServerLog(server, `/${command.name} was run by ${interaction.user.username} in #${channel.name}`);

        if (command.choices) command.setChoices();

        await command.run(interaction);
      }

      if (interaction.isContextMenuCommand()) {
        const command = client.contextCommands.get(interaction.commandName);

        if (!command) throw new BadRequestError('Invalid Command', "The Command you are trying to run does not exist in the Bot's files!");

        if (!command.enabled) throw new ForbiddenError('Command disabled', 'The Command you are trying to run has been disabled by the Developer!');

        client.writeServerLog(server, `Context Command "${command.name}" was run by ${interaction.user.username}`);

        await command.run(interaction);
      }
    } catch (err) {
      if (err instanceof BadRequestError || err instanceof ForbiddenError)
        return await interaction.reply({
          embeds: [new ErrorEmbed(err, false)],
          ephemeral: true,
        });

      return await interaction.reply({
        embeds: [new ErrorEmbed(err, true)],
        ephemeral: true,
      });
    }
  }
}
