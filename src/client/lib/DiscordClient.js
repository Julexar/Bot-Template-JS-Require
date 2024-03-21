const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config');
const logger = require('./logger');

class DiscordClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
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
}

module.exports = { DiscordClient };