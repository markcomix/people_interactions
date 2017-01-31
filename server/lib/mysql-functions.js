var mysql = require('mysql');

var connection

var queryStack = 0
var shouldCloseConnectionOnFinish = 0
var dumpToLog = 1
module.exports.init = function(environment) {

    if (environment == 'prod') {
        connection = mysql.createConnection({
          host: global.mysql_host,
          user: global.mysql_user,
          password: global.mysql_pass,
          database: 'globant_event'
        });
    } else  if (environment == 'qa') {
      connection = mysql.createConnection({
        host: 'sop-qa.starmeup.com',
        user: 'node-client',
        password: 'n0d3-cl13nt',
        database: 'globant_event'
      });

    } else if (environment == 'qa-tunnel') {
        connection = mysql.createConnection({
          host: 'localhost',
          user: 'node-client',
          port: 8000,
          password: 'n0d3-cl13nt',
          database: 'globant_event'
        });

    } else if (environment == 'local') {

        console.log('Db:Constructor:CreateConnection');

        connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "admin",
            database: "globant_event"
        });

    }

    connection.connect();
    return this
}

module.exports.initWithConnection = function(dbConnection) {
    this.connection = dbConnection
}

module.exports.connection = connection
module.exports.dumpToLog = dumpToLog

module.exports.query = function (queryString,completionBlock,errorBlock) {
    addStack()
    connection.query(queryString, function(err, rows, fields) {
        removeStack()
        log(queryString)
        if (!err) {
            log("query completed");
            completionBlock(rows)
        } else {
            log('Error while performing Query. - '+ JSON.stringify(err));
            errorBlock(err)
        }
    });

}

module.exports.insert = function (query, object, completionBlock,errorBlock) {
    addStack()
    connection.query(query, object, function(err, result) {
        removeStack()
        log(query)
        if (!err) {
            log("query completed");
            completionBlock(result)
        } else {
            log('Error while performing Query. - '+ JSON.stringify(err));
            errorBlock(err)
        }
    });

}

var addStack = function() {
    queryStack++
}

var removeStack = function () {
    queryStack--
    if (shouldCloseConnectionOnFinish) {
        if (queryStack == 0) {
            connection.end()
        }
    }
}

var log = function (message) {
    if (dumpToLog != 0) {
        console.log(message);
    }
}

module.exports.endConnection = function() {
    if (queryStack > 0) {
        shouldCloseConnectionOnFinish = 1
    } else {
        connection.end()
    }
}
