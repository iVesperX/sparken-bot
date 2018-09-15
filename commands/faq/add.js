exports.run = ((client, message, args) => {
    if (!args.length) {
        // Calculate FAQ Information
        return message.channel.send('[FAQ Information Here]');
    }

    if ()


        message.channel.send('Below is a list of FAQ for this server:');
});

exports.help = {
    desc: 'Adds a question to the FAQ list.',
    use: 'faq add'
};