/**
 * Sebas Bot is a discord bot for community management.
 * Owner and Copyright : Alexandre ELISABETH.
 * Home page: https://github.com/0Blanck0/SebasBot
 * V. 1.0.0 
 */

const fs = require('fs');

module.exports = {
    // Function send log in console
    sebas_has_been(command, message) 
    {
        let data = new Date() + ": Sebas has been " + command + " by " + message.author.tag;

        console.log(data);
        this.sebas_write_logs(data);
    },

    // Fonction send generique log in console
    sebas_std_logs(command)
    {
        console.log(new Date() + ": commande [" + command + "] has been run");
    },

    // Fonction send markdown log
    sebas_mark_logs(markdown, guild)
    {
        console.log(new Date() + ": guild " + guild + " have change markdown for " + markdown);
    },

    sebas_write_logs(logs_data)
    {
        fs.appendFile('./logs/logs.txt', logs_data + "\n", function(err, data) {
            if (err) return console.log(err);
        });
    }
}