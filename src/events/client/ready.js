const client = require('../../..');
const { loggers, format, transports } = require('winston');
const moment = require('moment');
const fs = require('fs');

class Event {
  static name = 'ready';

  static async run() {
    client.user.setPresence(client.config.presence);

    // Register Slash Commands globally
    await this.registerGlobalSlashCommands();

    // Check Server Cache
    await this.checkServerCache();
  }

  static async registerGlobalSlashCommands() {
    try {
      await client.application.commands.set(client.slashCommands);

      client.writeDevLog('Successfully registered Slash Commands globally!');
    } catch (err) {
      client.logDevError(err);
    }
  }

  /**
   *
   * @param {import('discord.js').Guild} server
   */
  static async getLatestServerLog(server) {
    const logs = fs.readdirSync(`./src/server/logs/${server.id}`);
    const latestLog = logs[logs.length - 1];
    return latestLog;
  }

  static async checkServerCache() {
    client.writeDevLog('Checking Server Cache...');
    client.guilds.cache.map(async guild => {
      // Logfile Creation
      await this.checkServerLogger(guild);

      // Interval Creation
      await this.createInterval(guild);

      // Slash Command Registration
      //await this.registerGuildSlashCommands(guild);
    });
  }

  /**
   *
   * @param {import('discord.js').Guild} server
   */
  static async checkServerLogger(server) {
    const date = new Date().toISOString();
    const latestLogTime = (await this.getLatestServerLog(server)).replace('.log', '');
    const difference = moment(latestLogTime).diff(moment(date), 'hours');

    if (loggers.get(server.id) && difference > 23) loggers.close(server.id);

    loggers.add(server.id, {
      format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.message}`)
      ),
      transports: [new transports.File({ filename: `./src/server/logs/${server.id}/${date}.log` })],
    });
  }

  /**
   *
   * @param {import('discord.js').Guild} server
   */
  static async createInterval(server) {
    setInterval(
      async () => {
        await this.checkServerLogger(server);
      },
      1000 * 60 * 60 * 24
    );
  }

  /**
   *
   * @param {import('discord.js').Guild} server
   */
  static async registerGuildSlashCommands(server) {
    try {
      await server.commands.set(client.slashCommands);

      client.writeDevLog(`Successfully registered Slash Commands in ${server.name}!`);
    } catch (err) {
      client.logDevError(err);
    }
  }
}

module.exports = Event;
