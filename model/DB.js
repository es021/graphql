var Mysql = require("promise-mysql");

var DB = function (env) {
    var config = {};
    if (env === "DEV") {
        config = {
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'wp_career_fair'
        };
    } else if (env === "PROD") {
        config = {
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'wp_career_fair'
        };
    }

    this.con = Mysql.createPool(config);

    /*this.con.query('SELECT * FROM wp_cf_users').then(function (rows) {
     console.log(rows);
     });*/

    /*
     this.con.connect(function (err) {
     if (err) {
     throw err;
     } else {
     console.log("DB Connected");
     }
     });
     */
};

DB.prototype.query = function (sql, success, error) {
    this.con.query(sql, function (err, res) {
        if (err) {
            error(err);
        } else {
            console.log(res);
            success(res);
        }
    });
};

DB.prototype.prepareLimit = function (page, offset) {
    var start = (page - 1) * offset;
    var limit = (typeof page !== "undefined" && typeof offset !== "undefined")
            ? `LIMIT ${start},${offset}` : "";
    return limit;
};

module.exports = new DB("DEV");
//module.exports = new DB("PROD");
//helper function


function dbSuccessHandler(res) {
    console.log(res[0]);
    console.log();

    for (var i in res) {

    }
    return res[0];
}

function dbErrorHandler(err) {
    console.log(err);
    return err;

}
