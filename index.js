const { DiscordClient } = require('./src/client/lib/DiscordClient.js');
const client = new DiscordClient();

client.start();
client.log.info('Client started!');

module.exports = client;
