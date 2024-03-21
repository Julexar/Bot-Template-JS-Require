const CustomEmbed = require('./custom-embed');

class ErrorEmbed extends CustomEmbed {
    constructor(error, custom) {
        if (custom) super('An Error occurred...', error, 0xFF0000);
        else super(`${error}`, `${error.cause}`, 0xFF0000);
    }
}

module.exports = ErrorEmbed;