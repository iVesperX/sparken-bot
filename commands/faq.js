const Discord = require('discord.js');
const config = require('../storage/config');
const util = require('../shared/util');

const question = require('../model/question');

// const add = require('./faq/add');

exports.run = (async (client, message, args) => {
  if (!args.length) {
    const role_color = !message.guild.me.displayColor ? 12172222 : message.guild.me.displayColor;

    // Calculate FAQ Information
    const questions = (await client.database.collection('questions').findOne({})).data;
    const list_of_questions = new Discord.RichEmbed();

    list_of_questions.setAuthor('Frequently Asked Questions')
                     .setColor(role_color)
                     // .setDescription('List of all players within PL.')
                     .setFooter(client.user.tag, client.user.avatarURL);
    
    questions.forEach(q => {
      list_of_questions.addField(q.text, 'N/A');
    });

    return message.channel.send(list_of_questions);
  }
  
  if (args[0] == 'add') {
    if (args.length < 2) return message.channel.send('I need a question to add!');

    const question_to_add = args.slice(1).join(' ');
    const questions = (await client.database.collection('questions').findOne({})).data;
    const new_question = util.clone(question);

    new_question.id = util.getLatestId(questions);
    new_question.text = question_to_add;
    new_question.author = message.author.id;

    // return message.channel.send(`${config.code}json\n${JSON.stringify(new_question)}${config.code}`);
    questions.push(new_question);

    client.database.collection('questions').updateOne({}, { $set: { 'data': questions } });
    
    message.channel.send('Your question has been added!');

  } else if (args[0] == 'remove') {
    if (args.length < 2 || !parseInt(args[1])) return message.channel.send('Specify the numerical ID of the question you want to remove.');

    const questions = (await client.database.collection('questions').findOne({})).data;

  }
  
  // message.channel.send('Below is a list of FAQ for this server:');
});

exports.help = {
  desc: 'Pings Sparken for a response.',
  use: 'ping'
};