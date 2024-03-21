const client = require('../../..');
const { loggers, format, transports } = require('winston');
const moment = require('moment');
const fs = require('fs');

class Event {
  static name = 'guildCreate';

  static async run(server) {
    // Logfile Creation
    await this.checkServerLogger(server);

    // Interval Creation
    await this.createInterval(server);

    // Slash Command Registration
    //await this.registerGuildSlashCommands(server);
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
