// /**
//  * Sebas Bot is a discord bot for community management.
//  * Owner and Copyright : Alexandre ELISABETH.
//  * Home page: https://github.com/0Blanck0/SebasBot
//  * V. 1.0.0 
//  */

// Option for MySQL config
const mysql_options = [
    host = "localhost",
    user = "SebasBot",
    password = "SebasConnection",
    database = "discord_bot"
];

// Token for login bot
const token = "ODIzMjgyNDE0MDgzMjQ0MDMz.YFejfw.tCZ5O9GQ3zD7gjFhkqZnuf7b7jg";

// Create new bot
const Bot = require("./class/bot");
const Sebas = new Bot(mysql_options, token);

// Run bot
Sebas.run();
