const CustomEmbed = require('./custom-embed');

class ListEmbed extends CustomEmbed {
    constructor(title, description, fields) {
        super(title, description, 0x00FFFF, fields);
    }
}

module.exports = ListEmbed;