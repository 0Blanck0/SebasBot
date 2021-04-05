/**
 * Sebas Bot is a discord bot for community management.
 * Owner and Copyright : Alexandre ELISABETH.
 * Home page: https://github.com/0Blanck0/SebasBot
 * V. 1.0.0 
 */

// Import
const Discord = require("discord.js");
const MySQL = require("./mysql");

// Include
const Logs = require("../tools/logs");

class Bot {
    constructor(mysql_options, token) {
        this.markdown = "!";
        this.color = "0099ff";

        // Class call
        this.Client = new Discord.Client();
        this.DB = new MySQL(mysql_options);

        // Bot identification
        this.Client.login(token);
    }

    run()
    {
        // Add listener for the bot
        this.add_bot_listener();
    }

    /**********************
     * Listeners function *
     **********************/

    add_bot_listener()
    {
        // Listerner get ready to use bot
        this.Client.once('ready', () => {
            console.log(" -- I'm online");

            this.DB.mysql_ready();
        });

        this.Client.on('guildCreate', (new_guild) => {
            this.DB.add_new_server(new_guild.name, new_guild, new_guild.ownerID, new_guild.memberCount);
            Logs.sebas_std_logs("new on a server");
        });

        // Listener receve messages
        this.Client.on('message', (message) => {
            if (!message.author.bot) {
                this.DB.get_server_markdown(message.guild, (result) => {
                    this.markdown = result;
                });

                if (message.content.indexOf(this.markdown) == 0)
                    this.action_manager(message);
            }
        });
    }

    
    action_manager(message)
    {
        let command = message.content.split(' ');
        command = command[0];

        switch (command) {
            case this.markdown + "help":
                this.get_help(message);
                break;
            case this.markdown + "ping":
                this.ping(message);
                break;
            case this.markdown + "hello":
                this.hello(message);
                break;
            case this.markdown + "guild":
                this.get_guild_id(message);
                break;
            case this.markdown + "markdown":
                let arg = message.content.split(' ');
        
                if (arg.length > 1) {
                    arg = arg[arg.length - 1];
                    this.update_server_markdown(message.guild.id, arg, message);
                }

                break;
            default :
                message.reply("Sorry invalid command");
                break;
        }
    }

    /*****************
     * Tool function *
     *****************/

    get_banner(message)
    {
        let banner = message.guild.bannerURL();

        if (!banner)
            banner = this.Client.user.avatarURL();
        
        return banner;
    }

    embed_maker(title, author_tag, author_avatar, description, thumbnail, fields, banner)
    {
        const NewEmbed = new Discord.MessageEmbed()
        .setColor(this.color)
        .setTitle(title)
        .setAuthor(author_tag, author_avatar)
        .setDescription(description)
        .setThumbnail(thumbnail)
        .addFields(fields)
        .setImage(banner)
        .setTimestamp()
        .setFooter('Sebas Bot');

        return NewEmbed;
    }

    /******************
     * Reply function *
     *****************/

    // Function reply help message
    get_help(message)
    {
        let title = 'Help for Sebas Bot';
        let description = 'here is a list of commands you can use :';
        let author_tag = message.author.tag;
        let author_avatar = message.author.avatarURL();
        let thumbnail = this.Client.user.avatarURL();
        let banner = this.get_banner(message);

        let fields = [
            { name: '\u200B', value: '\u200B' },
            { name: 'help', value: 'Reply this embed with commands you can use for Sebas Bot' },
            { name: 'ping', value: 'Reply "Pong" with your ping in ms' },
            { name: 'hello', value: 'Reply just "Hello"' },
            { name: '\u200B', value: '\u200B' }
        ];

        const helpEmbed = this.embed_maker(title, author_tag, author_avatar, description, thumbnail, fields, banner);

        message.reply(helpEmbed);
        Logs.sebas_has_been("help", message);
    }

    // Function reply to ping command
    ping(message) 
    {
        message.reply("Ping ms: " + (message.createdAt.getTime() - (new Date().getTime())));
        Logs.sebas_has_been("ping", message);
    }

    // Function reply to hello command
    hello(message)
    {
        message.reply("Hello " + message.author.username + " !");
        Logs.sebas_has_been("hello", message);
    }

    // Function reply guild id
    get_guild_id(message)
    {
        message.reply("Guild : " + message.guild);
        Logs.sebas_std_logs("Guild");
    }

    // Function call another for update server markdown
    update_server_markdown(guild, new_markdown, message)
    {
        this.DB.update_server_markdown(guild, new_markdown, (r_markdown, r_guild) => {
            this.markdown = r_markdown;
            message.reply("Markdown have change [" + message.content[0] + " -> " + this.markdown + "]");
            Logs.sebas_mark_logs(r_markdown, r_guild);
        })
    }
}

module.exports = Bot;
