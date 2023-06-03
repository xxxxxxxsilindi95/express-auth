const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db);
connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});
module.exports = connection;
