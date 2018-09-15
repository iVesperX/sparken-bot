const config = require('../storage/config.json');

exports.run = ((client, message) => {
  const c = message.content;
  const args = c.split(' ');
  const command = args.shift().slice(config.prefix.length);
  const command_path = `../commands/${command}.js`;
  
  if (c.indexOf(config.prefix) !== 0 || message.author.bot || message.channel.type == 'dm') return;

  try {
    const command_file = require(command_path);
    command_file.run(client, message, args);
    
  } catch (err) {
    const command_not_found = err.stack.indexOf(`\'${command_path}\'`) < 0;

    if (command_not_found) {
      console.log(`----\n[${config.prefix + command.charAt(0).toUpperCase() + command.slice(1)}] ${err.stack}`);
    } else {
      console.log(`----\nCommand \"${command}\" was not found.`);
    }
  }
});