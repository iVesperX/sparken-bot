const add = require('./faq/add');

exports.run = ((client, message, args) => {
    if (!args.length) {
        // Calculate FAQ Information
        return message.channel.send('[FAQ Information Here]');
    }

    if ()


    message.channel.send('Below is a list of FAQ for this server:');
});

exports.help = {
    desc: 'Pings Sparken for a response.',
    use: 'ping'
};