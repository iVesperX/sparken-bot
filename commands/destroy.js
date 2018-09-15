const reactor = require('../util/reactor.js');
const config = require('../storage/config.json');

exports.run = ((client, message, args) => {
	if (message.author.id != config.ownerID && message.author.id != config.bot_creatorID) return;
	
	message.channel.send('Connection terminated.').then(() => {
		client.destroy();
	});
});