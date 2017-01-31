var AWS = require('aws-sdk');
var proxy = require('proxy-agent');
var assert = require('assert');
var https = require('https');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
var co = require('co');


global.max_background_processes = 1

var environment = process.env.MM_ENV
global.environment = process.env.MM_ENV


var aws_key = process.env.MM_AWS_KEY
assert.ok(aws_key != "", "MM_AWS_KEY variable is not set")
var aws_secret = process.env.MM_AWS_SECRET
assert.ok(aws_secret != "", "MM_AWS_SECRET variable is not set")

global.aws_key = aws_key
global.aws_secret = aws_secret


global.sns_arn_android = "arn:aws:sns:us-east-1:226343591250:app/GCM/Eventos_Android"
global.sns_arn_ios = "arn:aws:sns:us-east-1:226343591250:app/APNS_SANDBOX/eventos-ios"
//global.sns_arn_android = "arn:aws:sns:us-east-1:284225341239:app/GCM/Meetags_QA_Android"
// global.sns_arn_ios = "arn:aws:sns:us-east-1:284225341239:app/APNS_SANDBOX/Meetags-QA"




var port = 9001

if (environment == 'local') {
	var port = 9001
}


// global.s3_bucket_name = "qeeptouch-images"
global.s3_bucket_name = "eventos-sop"

if (environment == "prod") {
    global.mysql_host = process.env.MM_MYSQL_HOST
    assert.ok(global.mysql_host != "", "MM_MYSQL_HOST variable is not set")
    global.mysql_user = process.env.MM_MYSQL_USER
    assert.ok(global.mysql_user != "", "MM_MYSQL_USER variable is not set")
    global.mysql_pass = process.env.MM_MYSQL_PASS
    assert.ok(global.mysql_pass != "", "MM_MYSQL_PASS variable is not set")

	global.sns_arn_android = process.env.MM_SNS_ARN_ANDROID
    assert.ok(global.sns_arn_android != "", "MM_SNS_ARN_ANDROID variable is not set")
	global.sns_arn_ios = process.env.MM_SNS_ARN_IOS
    assert.ok(global.sns_arn_ios != "", "MM_SNS_ARN_IOS variable is not set")

}

console.log("Environment: " + environment);

if (environment == "qa-environment") {
	console.log("INIT: PROXY = " + global.proxy);
	global.proxy = "http://proxy.corp.globant.com:3128"
} else {
	console.log("INIT: PROXY DISABLED");
	global.proxy = ""
}



var app = express();

app.use(function(req, res, next) {

	console.log('REQ: ' + req.method + ' ' + req.url);

	next();
});

app.use(bodyParser.json())

http.createServer(app).listen(port, function() {

    console.log('Listening on port:'+port);
});

var rootAppName = "/interactions"

//JL Refactor
// organization endpoints -------------------------------------------------------------
app.use(rootAppName + '/organization/', require('./routes/organizationRoutes.js'));
