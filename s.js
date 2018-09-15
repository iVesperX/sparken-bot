const Discord = require('discord.js');
const client = new Discord.Client({ autoReconnect: true });

const MongoClient = require('mongodb').MongoClient;
const login = process.env.mlab_login ? process.env.mlab_login : require('./storage/passwords.json').login;
const url = `mongodb://${login}@ds133152.mlab.com:33152/sparken_faq`;

const fs = require('fs');
const token = process.env.token ? process.env.token : require('./storage/passwords.json').token;

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log('Error connecting to database.');

    client.database = database.db('sparken_faq');

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);

        for (let i = 0; i < files.length; i++) {
            let event_file = require(`./events/${files[i]}`),
                event = files[i].split('.')[0];
            client.on(event, (...args) => event_file.run(client, ...args));
        }
    });

    client.login(token);
});