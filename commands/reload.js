const config = require('../storage/config.json');

exports.run = ((client, message, args) => {
    if (message.author.id != config.ownerID && message.author.id != config.bot_creatorID) return;
    if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");

    const command = args[0];

    // the path is relative to the *current folder*, so just ./filename.js
    try {
        // tries to require the file
        delete require.cache[require.resolve(`./${command}.js`)];
    } catch(err) {
        return message.channel.send(`The command \`${command}\` doesn\'t exist.`);
    }

    message.channel.send(`The command ${command} has been reloaded!`);
});