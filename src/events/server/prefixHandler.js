const client = require('../../..');
const { BadRequestError, ForbiddenError } = require('../../client/errors');
const { ErrorEmbed } = require('../../client/embeds');

class Event {
  static name = 'messageCreate';
  static nick = 'Prefix';

  /**
   *
   * @param {import('discord.js').Message} message
   */
  static async run(message) {
    try {
      const server = message.guild;

      if (!server) throw new BadRequestError('Invalid Server', 'Could not fetch the Server from the Message!');

      const prefix = client.config.default_prefix;

      if (message.content.toLowerCase().startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/\s+--/);
        const command = args.shift().toLowerCase();

        const cmd = client.prefixCommands.get(command) || client.prefixCommands.find(c => c.aliases && c.aliases.includes(command));

        if (!cmd) throw new BadRequestError('Invalid Command', "The Command you are trying to run does not exist in the Bot's files!");

        const channel = message.channel;

        if (cmd.permissions) {
          if (cmd.permissions.member && cmd.permissions.member.length >= 1) {
            if (!channel.permissionsFor(message.member).has(cmd.permissions.member)) {
              const perms = channel.permissionsFor(message.member).missing(cmd.permissions.member);

              throw new ForbiddenError(
                'Missing Permissions',
                `You are missing the following Permissions to run the current Command\n: ${perms.join(', ')}`
              );
            }
          }
        } else if (cmd.permissions.bot && cmd.permissions.bot.length >= 1) {
          if (!channel.permissionsFor(message.guild.me).has(cmd.permissions.bot)) {
            const perms = channel.permissionsFor(message.guild.me).missing(cmd.permissions.bot);

            throw new ForbiddenError(
              'Bot missing Permissions',
              `The Bot is missing the following Permissions to run the current Command\n: ${perms.join(', ')}`
            );
          }
        }

        if (cmd.args) {
          if (!cmd.optional) {
            if (args.length < cmd.usage.length) {
              const usage = cmd.usage.join(' ');

              throw new BadRequestError(
                'Invalid Command',
                `The Command requires you to use it's arguments. The correct usage is:\n\`${prefix}${cmd.name} ${usage}\``
              );
            }
          }
        } else if (!cmd.args) {
          if (args.length > 0) {
            throw new BadRequestError('Invalid Command', `The Command does not have any arguments. The correct usage is:\n\`${prefix}${cmd.name}\``);
          }
        }

        client.writeServerLog(
          server,
          `${prefix}${cmd.name} was triggered by ${message.author.username} in #${channel.name}!\nArguments: ${args.join(', ')}`
        );

        await cmd.run(message, args);
        await message.delete();
      }
    } catch (err) {
      if (err instanceof ForbiddenError || err instanceof BadRequestError)
        return await message.reply({
          embeds: [new ErrorEmbed(err, false)],
        });

      return await message.reply({
        embeds: [new ErrorEmbed(err, true)],
      });
    }
  }
}

module.exports = Event;
