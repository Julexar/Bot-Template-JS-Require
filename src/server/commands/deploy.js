import { client } from '../../..';

client.guilds.cache.forEach(async guild => {
  await registerSlashCommands(guild);

  await registerContextCommands(guild);
});

async function registerSlashCommands(guild) {
  if (!client.slashCommands) return;

  client.slashCommands.forEach(async command => {
    try {
      if (guild.commands.cache.find(c => c.name === command.name && c.type === 1)) return;

      await guild.commands.create(command);
      client.writeDevLog(`Successfully registered Slash Command /${command.name} in "${guild.name}"!`);
    } catch (err) {
      client.logDevError(err);
    }
  });
}

async function registerContextCommands(guild) {
  if (!client.contextCommands) return;

  client.contextCommands.forEach(async command => {
    try {
      if (guild.commands.cache.find(c => c.name === command.name && c.type === 2)) return;

      await guild.commands.create(command);
      client.writeDevLog(`Successfully registered Context Command /${command.name} in "${guild.name}"!`);
    } catch (err) {
      client.logDevError(err);
    }
  });
}
