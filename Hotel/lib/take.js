var conn = require('./db');

/**
 * find all rows in Take Table
 * @param {function} callback 
 */
var findAllTake = function(callback){
    conn.getTable(`Take`, callback);
};

/**
 * find all rows in Claim natural left join Take Table
 * @param {function} callback 
 */
var findAllJoin = function(callback){
    conn.getTable(`Claim natural left join Take`, callback);
};

/**
 * assign an employee to the claim
 * @param {number} claim_id 
 * @param {number} employee_id 
 */
var assignEmployee = function(claim_id, employee_id, callback){
    const db = conn.connect();

    var sql = `INSERT INTO Take(claim_id, employee_id, finish_time) VALUES(?, ?, ?)`;
    var values = [claim_id, employee_id, null];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * save and notice that the employee finished the claim
 * @param {number} claim_id 
 */
var finishClaim = function(claim_id, callback){
    const db = conn.connect();
    var sql = `UPDATE Take SET finish_time = NOW() WHERE claim_id = ?`;
    
    console.log(sql);

    db.query(sql, [claim_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    find:{
        all:findAllTake,
        allJoin:findAllJoin
    },
    assign:assignEmployee,
    finish:finishClaim
};