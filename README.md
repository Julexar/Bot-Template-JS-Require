# Bot-Template-JS-Require
A template for Discord Bots using JS and require.

# Inputs
The following variables must be defined in a `.env` file.

| Name        | Description                               |
| ----------- | ----------------------------------------- |
| `BOT_TOKEN` | The Token of your Bot.                    |

# Usage
You can use this Template as is.

## Commands
Additional Commands go in `/src/server/commands` and have to be created in the corresponding folders.

`slash` for Slash Commands, `prefix` for Prefix Commands and `context` for Context Commands

## Events
Additional Events go in `/src/events` and have to be created in the corresponding folders.

`client` for client-side Events (e.g. `ready`, `error`, etc.) and `server` for server-side Events (e.g. `guildCreate`, `voiceStateUpdate`, etc.)

## Logs
Client Logs are in `/src/client/logs` and Server Logs are in  `/src/server/logs`.