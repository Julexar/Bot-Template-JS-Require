const client = require('../../..');

client.guilds.cache.forEach(async guild => {
  await updateSlashCommands(guild);

  await updateContextCommands(guild);
});

async function updateSlashCommands(guild) {
  if (!client.slashCommands) return;

  client.slashCommands.forEach(async command => {
    try {
      const existingCommand = guild.commands.cache.find(c => c.name === command.name && c.type === 1);
      if (!existingCommand) return;

      await existingCommand.edit(command);
      client.writeDevLog(`Successfully updated Slash Command /${command.name} in "${guild.name}"!`);
    } catch (err) {
      client.logDevError(err);
    }
  });
}

async function updateContextCommands(guild) {
  if (!client.contextCommands) return;

  client.contextCommands.forEach(async command => {
    try {
      const existingCommand = guild.commands.cache.find(c => c.name === command.name && c.type === 2);
      if (!existingCommand) return;

      await existingCommand.edit(command);
      client.writeDevLog(`Successfully updated Context Command /${command.name} in "${guild.name}"!`);
    } catch (err) {
      client.logDevError(err);
    }
  });
}
