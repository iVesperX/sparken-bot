exports.run = ((client, message, args) => {
  message.channel.send(`Pong! \`${client.ping} ms\``);
});

exports.help = {
  desc: 'Pings Sparken for a response.',
  use: 'ping'
};