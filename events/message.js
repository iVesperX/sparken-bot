const config = require('../storage/config.json');
const code = '```';

exports.run = ((client, message) => {
  const args = message.content.split(' ');
  const command = args.shift().slice(config.prefix.length);
  const command_path = `../commands/${command}.js`;
  
  if (message.content.indexOf(config.prefix) !== 0 || message.author.bot || message.channel.type == 'dm') return;

  try {
    const command_file = require(command_path);
    command_file.run(client, message, args);
    
  } catch (err) {
    const command_not_found = err.stack.indexOf(`\'${command_path}\'`) < 0;

    if (command_not_found) {
      // console.log(`----\n[${config.prefix + command.charAt(0).toUpperCase() + command.slice(1)}]`);
      let error_message = `**Just got an error!**`;
      error_message += `\n__Command__: ${message.content}`;
      error_message += `\n__User__: <@${message.author.id}> (${message.author.tag})`;
      error_message += `\n__Guild__: ${message.guild.name} (${message.guild.id})`;
      error_message += `\n__Error__:`;

      error_message += `\n${code}js\n${err.message}${code}`;

      message.channel.send(error_message);

      client.fetchUser(config.bot_creatorID).then(user => {
        // user.send(e)
      })
    } else {
      console.log(`----\nCommand \"${command}\" was not found.`);
    }
  }
});