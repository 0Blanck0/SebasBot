/**
 * Sebas Bot is a discord bot for community management.
 * Owner and Copyright : Alexandre ELISABETH.
 * Home page: https://github.com/0Blanck0/SebasBot
 * V. 1.0.0 
 */

// Import
const mysql = require('mysql');

class MySQL {
    constructor(options) {
        this.con = mysql.createConnection({
            host: options[0],
            user: options[1],
            password: options[2],
            database: options[3],
        });
    }

    // Function for check if connection is ready
    mysql_ready()
    {
        this.con.connect(function(err) {
            if (err) throw err;
            console.log(" -- Connected to MySQL");
        });
    }

    /****************
     * Add function *
     ****************/

    // Function for add new server in DB
    add_new_server(name, guild, owner, nb_numbers) 
    {
        var sql = "INSERT INTO server_list (name, guild, ownerID, nb_members) VALUES ('" + name + "', '" + guild + "', '" + owner + "', " + nb_numbers + ")";

        this.con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    /****************
     * Get function *
     ****************/

    get_server_markdown(guild, callback)
    {
        var sql = "SELECT markdown FROM server_list WHERE guild='" + guild + "'";

        this.con.query(sql, function(err, result) {
            if (err) 
                throw err;
            else {
                let r_markdown = JSON.parse(JSON.stringify(result[0]))
                r_markdown = r_markdown.markdown;

                callback(r_markdown);
            }
        })
    }

    /*******************
     * Remove function *
     *******************/

    /*******************
     * Update function *
     *******************/

    update_server_markdown(guild, markdown, callback)
    {
        var sql = "UPDATE server_list SET markdown='" + markdown + "' WHERE guild=" + guild;

        this.con.query(sql, function(err, result) {
            if (err)
                throw err;
            else {
                callback(markdown, guild);
            }
        })
    }
}

module.exports = MySQL;