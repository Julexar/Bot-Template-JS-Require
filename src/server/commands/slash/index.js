const fs = require('fs');
const commands = [];
const dirs = fs.readdirSync('./src/server/commands/slash');

for (const dir of dirs) {
    const files = fs.readdirSync(`./src/server/commands/slash/${dir}`).filter(file => file.endsWith('.js'));
    
    for (const file of files) {
        const command = require(`./${dir}/${file}`);
        command.filename = `${file}`;
        commands.push(command);
    }
}

module.exports = commands;