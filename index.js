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
    console.log(Client.users.resolve(new_guild.ownerID));
    sebas_std_logs("new on a server");
});

// Listener receve messages
Client.on('message', (message) => {
    if (!message.author.bot) {
        switch (message.content) {
            case Markdown + "ping":
                ping(message);
                sebas_has_been("ping", message);
                break;
            case Markdown + "hello":
                hello(message);
                sebas_has_been("hello", message);
                break;
            case Markdown + "guild":
                message.reply("Guild : " + message.guild);
                sebas_std_logs("Guild");
                break;
            default :
                console.log(message.content);
                break;
        }
    }
});

function add_new_server(name, guild, owner, nb_numbers) 
{
    var sql = "INSERT INTO server_list (name, guild, owner, nb_members) VALUES ('" + name + "', '" + guild + "', '" + owner + "', " + nb_numbers + ")";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

// Function reply to ping command
function ping(message) 
{
    message.reply("Pong\nPing ms: " + (message.createdAt.getTime() - (new Date().getTime())));
}

// Function reply to hello command
function hello(message)
{
    message.reply("Hello !");
}

// Function send log in console
function sebas_has_been(command, message) 
{
    console.log("Sebas has been " + command + " by " + message.author.tag);
}

function sebas_std_logs(command)
{
    console.log(new Date() + ": commande " + command + " has been run");
}