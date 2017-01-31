var mysql = require('mysql');

var db = null;

class Db {
  constructor(environment) {

    if (environment == 'prod') {

        this.connection = mysql.createConnection({
          host: global.mysql_host,
          user: global.mysql_user,
          password: global.mysql_pass,
          database: 'globant_interaction'
        });

    } else if (environment == 'qa') {

      this.connection = mysql.createConnection({
        host: 'sop-qa.starmeup.com',
        user: 'node-client',
        password: 'n0d3-cl13nt',
        database: 'globant_interaction'
      });

    } else if (environment == 'qa-tunnel') {
        this.connection = mysql.createConnection({
          host: 'localhost',
          user: 'node-client',
          port: 8000,
          password: 'n0d3-cl13nt',
          database: 'globant_interaction'
        });

    } else if (environment == 'local') {

		console.log('Db:Constructor:CreateConnection');

      this.connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database: "globant_interaction"
      });

    } else {
        var assert = require('assert');
        assert.ok(true, "environment variable is not set")
    }

    this.connection.connect();
  }

  executeQuery(query) {

	console.log('Db::executeQuery - Begin');

    return this.connection.query.bind(this.connection, query);
  }

  executeQueryShort(query) {

	console.log('Db::executeQueryShort - Begin');

    var that = this;

    return function(callback) {

		that.connection.query(query, function(err, result) {

			console.log('Db::executeQueryShort - Query Finish');

		    if (err != null){

				console.log('Db::executeQueryShort - Err: ' + err);

			}else{

				console.log('Db::executeQueryShort - Result: ' + result);
			}

			callback(err, err ? null : result);

		});
    }
  }


  executeInsertOrUpdateQuery(query, object) {

	console.log('Db::executeInsertOrUpdateQuery - Begin');

	var that = this;

	return function(callback) {

		that.connection.query(query, object, function(err, result) {

			console.log('Db::executeInsertOrUpdateQuery - Query Finish');

		    if (err != null){

				console.log('Db::executeInsertOrUpdateQuery - Err: ' + err);

			}else{

				console.log('Db::executeInsertOrUpdateQuery - Result: ' + result);
			}

			callback(err, err ? null : result);
		});
	}
  }


  static getInstance() {

    if (!db)
      db = new Db(process.env.MM_ENV);

    return db;
  }
}

module.exports = Db;
