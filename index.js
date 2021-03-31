/**
 * Sebas Bot is a discord bot for community management.
 * Owner and Copyright : Alexandre ELISABETH.
 * Home page: https://github.com/0Blanck0/SebasBot
 * V. 1.0.0 
 */

const Discord = require("discord.js");
const MySQL = require('mysql');
const Client = new Discord.Client();
const Markdown = "!"

var con = MySQL.createConnection({
    host: "localhost",
    user: "SebasBot",
    password: "SebasConnection",
    database: "discord_bot"
});

// Bot identification
Client.login("ODIzMjgyNDE0MDgzMjQ0MDMz.YFejfw.tCZ5O9GQ3zD7gjFhkqZnuf7b7jg");

// Listerner get ready to use bot
Client.once('ready', () => {
    console.log(" -- I'm online");
      
    con.connect(function(err) {
        if (err) throw err;
        console.log(" -- I'm connected to MySQL database");
    });
});

Client.on('guildCreate', (new_guild) => {
    //add_new_server(new_guild.name, new_guild, new_guild.owner.user.tag, new_guild.memberCount);
    // new_guild.members.fetch()
    // .then(console.log)
    // .catch(console.error);
    new_guild.members.fetch(new_guild.ownerID)
    .then((result) => {
        console.log(result.user);

        if (result.user.id == new_guild.ownerID)
            console.warn("ok");
    })
    .catch(console.error);
    sebas_std_logs("new on a server");
});

// Listener receve messages
Client.on('message', (message) => {
    if (!message.author.bot) {
        switch (message.content) {
            case Markdown + "help":
                get_help(message);
                break;
            case Markdown + "ping":
                ping(message);
                break;
            case Markdown + "hello":
                hello(message);
                break;
            case Markdown + "guild":
                get_guild_id(message);
                break;
            default :
                if (message.content.indexOf(Markdown) == 0)
                    message.reply("Sorry invalid command");

                break;
        }
    }
});

/***************
 * DB function *
 ***************/

function add_new_server(name, guild, owner, nb_numbers) 
{
    var sql = "INSERT INTO server_list (name, guild, owner, nb_members) VALUES ('" + name + "', '" + guild + "', '" + owner + "', " + nb_numbers + ")";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

/*****************
 * Tool function *
 ****************/
function get_banner(message)
{
    let banner = message.guild.bannerURL();

    if (!banner)
        banner = Client.user.avatarURL();
    
    return banner;
}

/******************
 * Reply function *
 *****************/

// Function reply help message
function get_help(message)
{
    let banner = get_banner(message);
    
    const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help for Sebas Bot')
	.setAuthor(message.author.tag, message.author.avatarURL())
	.setDescription('here is a list of commands you can use :')
	.setThumbnail(Client.user.avatarURL())
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: 'help', value: 'Reply this embed with commands you can use for Sebas Bot' },
		{ name: 'ping', value: 'Reply "Pong" with your ping in ms' },
		{ name: 'hello', value: 'Reply just "Hello"' },
        { name: '\u200B', value: '\u200B' }
	)
	.setImage(banner)
	.setTimestamp()
	.setFooter('Sebas Bot');

    message.reply(helpEmbed);
    sebas_has_been("help", message);
}

// Function reply to ping command
function ping(message) 
{
    let banner = get_banner(message);

    const pingEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Ping command')
	.setAuthor(message.author.tag, message.author.avatarURL())
	.setDescription('Bot reply :')
	.setThumbnail(Client.user.avatarURL())
	.addFields(
		{ name: 'Pong !', value: "Ping ms: " + (message.createdAt.getTime() - (new Date().getTime())) },
        { name: '\u200B', value: '\u200B' }
	)
	.setImage(banner)
	.setTimestamp()
	.setFooter('Sebas Bot');
    
    message.reply(pingEmbed);
    sebas_has_been("ping", message);
}

// Function reply to hello command
function hello(message)
{
    message.reply("Hello !");
    sebas_has_been("hello", message);
}

// Function reply guild id
function get_guild_id(message)
{
    message.reply("Guild : " + message.guild);
    sebas_std_logs("Guild");
}

// Function send log in console
function sebas_has_been(command, message) 
{
    console.log("Sebas has been " + command + " by " + message.author.tag);
}

// Fonction send generique log in console
function sebas_std_logs(command)
{
    console.log(new Date() + ": commande " + command + " has been run");
}