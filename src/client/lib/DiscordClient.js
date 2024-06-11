const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config');
const logger = require('./logger');
const { loggers } = require('winston');
const fs = require('fs');

class DiscordClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    });

    this.slashCommands = new Collection();
    this.prefixCommands = new Collection();
    this.contextCommands = new Collection();
    this.config = config;
    this.log = logger.log;
    this.console = logger.console;
  }

  start() {
    try {
      ['events', 'slashCommands', 'prefixCommands', 'contextCommands'].forEach(handler => {
        const Handler = require(`../handlers/${handler}`);
        Handler.run();
      });

      this.login(config.token);
    } catch (err) {
      this.log.error(err);
    }
  }

  chkServerLog(server) {
    try {
      if (!fs.existsSync(`./logs/server/${server.id}`)) fs.mkdirSync(`./logs/server/${server.id}`);

      return loggers.get(`${server.id}`);
    } catch (err) {
      throw err;
    }
  }

  async writeServerLog(server, content) {
    try {
      const guildLog = this.chkServerLog(server);
      guildLog.info('========Beginning of new Log========');
      guildLog.info(content);

      this.writeDevLog(`Successfully wrote into Logfile of Server "${server.name}"`);
    } catch (err) {
      this.logDevError(err);
    }
  }

  async logServerError(server, err) {
    try {
      const guildLog = this.chkServerLog(server);

      guildLog.error(`${err} - ${err.cause}`);
    } catch (error) {
      this.logDevError(error);
    }
  }

  writeDevLog(content) {
    try {
      if (!fs.existsSync('./src/client/logs/devlog.log')) this.log.info('========Beginning of new Log========\n');

      this.log.info(content);
    } catch (err) {
      this.logDevError(err);
    }
  }

  logDevError(err) {
    this.log.error(err);
  }
}

module.exports = { DiscordClient };
