const MySQL = require('mysql');

class db {
    constructor() {
        var con = MySQL.createConnection({
            host: "localhost",
            user: "SebasBot",
            password: "SebasConnection",
            database: "discord_bot"
        });

        this.con.connect(function(err) {
            if (err) throw err;
            console.log(" -- I'm connected to MySQL database");
        });
    }
}