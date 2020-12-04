//**************************************************************************
// It connects the database and the server
//**************************************************************************

const mysql = require ('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ddsi',
    database: 'departamento'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log('Db is not connected');
        return;
    }else{
        console.log('Db is connected');
    }
})

module.exports = mysqlConnection;
