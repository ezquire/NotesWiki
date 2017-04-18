var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM account';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(account_id, callback) {
    var query = 'SELECT * FROM account WHERE account_id = ?';
    var queryData = [account_id];
    console.log(query);

    connection.query(query, queryData, function(err, result) {

        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    // FIRST INSERT THE Account
    var query = 'INSERT INTO account (first_name, last_name, email) VALUES (?)';

    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });

    /*connection.query(query, queryData, function(err, result) {

        // THEN USE THE COMPANY_ID RETURNED AS insertId AND THE SELECTED ADDRESS_IDs INTO COMPANY_ADDRESS
        var account_id = result.insertId;

        // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
        var query = 'INSERT INTO account (first_name, last_name, email) VALUES ?';

        // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
        var companyAddressData = [];
        for(var i=0; i < params.account_id.length; i++) {
            companyAddressData.push([account_id, params.account_id[i]]);
        }

        // NOTE THE EXTRA [] AROUND companyAddressData
        connection.query(query, [companyAddressData], function(err, result){
            callback(err, result);
        });
    });*/

};

exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

//declare the function so it can be used locally
/*var companyAddressInsert = function(company_id, addressIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    var query = 'INSERT INTO company_address (company_id, address_id) VALUES ?';

    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var companyAddressData = [];
    for(var i=0; i < addressIdArray.length; i++) {
        companyAddressData.push([company_id, addressIdArray[i]]);
    }
    connection.query(query, [companyAddressData], function(err, result){
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.companyAddressInsert = companyAddressInsert;

//declare the function so it can be used locally
var companyAddressDeleteAll = function(company_id, callback){
    var query = 'DELETE FROM company_address WHERE company_id = ?';
    var queryData = [company_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.companyAddressDeleteAll = companyAddressDeleteAll;*/

exports.update = function(params, callback) {
    var query = 'UPDATE account SET first_name = ?, last_name = ?, email = ? WHERE account_id = ?';
    var queryData = [params.first_name, params.last_name, params.email];

    connection.query(query, [queryData], function(err, result) {
        callback(err, result);
    });
       /* companyAddressDeleteAll(params.company_id, function(err, result){

            if(params.address_id != null) {
                //insert company_address ids
                companyAddressInsert(params.company_id, params.address_id, function(err, result){
                    callback(err, result);
                });}
            else {
                callback(err, result);
            }
        });

    });*/
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS company_getinfo;

 DELIMITER //
 CREATE PROCEDURE company_getinfo (company_id int)
 BEGIN

 SELECT * FROM company WHERE company_id = _company_id;

 SELECT a.*, s.company_id FROM address a
 LEFT JOIN company_address s on s.address_id = a.address_id AND company_id = _company_id;

 END //
 DELIMITER ;

 # Call the Stored Procedure
 CALL company_getinfo (4);

 */

exports.edit = function(account_id, callback) {
    var query = 'SELECT * FROM account WHERE account_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};