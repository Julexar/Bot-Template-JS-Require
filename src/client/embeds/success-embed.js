const CustomEmbed = require('./custom-embed');

class SuccessEmbed extends CustomEmbed {
    constructor(title, description) {
        super(title, description, 0x65FE08);
    }
}

module.exports = SuccessEmbed;