var conn = require('./db');

/**
 * find all rows in Claim Table
 * @param {fucntion} callback 
 */
var findAllClaim = function(callback){
    conn.getTable(`Claim`, callback);
};

/**
 * find all joined datas
 * @param {function} callback 
 */
var findAllClaimJoinTake = function(callback){
    conn.getTable(`Claim natural left join Take`, callback);
};

var findAllJoin = function(callback){
    conn.getTable(`(Claim natural left join Take) left join Employee USING(employee_id)`, callback);
};

/**
 * find all rows ordered by ordering
 * @param {boolean} orderAscending 
 * @param {function} callback 
 */
var findAllOrderBy = function(orderAscending, callback){
    const db = conn.connect();

    var sql = `SELECT * FROM Claim `;
    if(orderAscending)
        sql += `ORDER BY deadline ASC`
    else
        sql += `ORDER BY deadline DESC`
    
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * find row by all conditions
 * @param {Object} all 
 * @param {function} callback 
 */
var findBy = function(all, callback){
    all = Object.assign({
        claim_id: null,
        room_id: null,
        customer_call: null,
        department: null,
        deadline: null,
        asc: null
    }, all);
    const db = conn.connect();

    var values = [];
    var sql = `SELECT * `+
        `FROM Claim natural left join Take `+
        `WHERE `;
    for(var key in all){
        if(key != `asc` && all[key] != null){
            sql += `${key} = ? `;
            values.push(all[key]);
        }
    }

    if(all.asc != null){
        if(all.asc)
            sql += `ORDER BY deadline ASC`;
        else
            sql += `ORDER BY deadline DESC`;
    }
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * create claim row
 * @param {Object} data 
 */
var createClaim = function(data, callback){
    const db = conn.connect();
    data = Object.assign({
        room_id: null,
        customer_call: null,
        department: null,
        deadline: "NOW()"
    }, data);

    var sql = `INSERT INTO Claim(room_id, customer_call, department, deadline) VALUES(?, ?, ?, ?)`;
    var values = [data.room_id, data.customer_call, data.department, data.deadline];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * update claim row
 * @param {Object} data 
 */
var updateClaim = function(data, callback){
    const db = conn.connect();
    const proto = {
        claim_id: null,
        room_id: null,
        customer_call: null,
        department: null,
        deadline: null
    };
    data = Object.assign({
        claim_id: null,
        room_id: null,
        customer_call: null,
        department: null,
        deadline: null
    }, data);

    var sql = `UPDATE Claim SET `;
    var sets = [];
    var values = [];
    for(var name in proto){
        if(name != `claim_id` && data[name] != null){
            sets.push(`${name} = ? `);
            values.push(data[name]);
        }
    }
    values.push(parseInt(data.claim_id));

    sql += sets.join(', ') + ' ';
    sql += `WHERE claim_id = ?`;

    console.log(sql);
    console.log(values);
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

var deleteClaim = function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Claim where claim_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * find rows which are employee selected or not
 * @param {boolean} finished 
 * @param {function} callback 
 */ 
var findFinished = function(finished, callback){
    const db = conn.connect();

    var sql = `SELECT * FROM Claim natural join Take WHERE finish_time `;
    if(finished)
        sql += `is not null`
    else
        sql += `is null`
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

//개발노트 데모시나리오 산출물

/**
 * find rows which are employee selected or not
 * @param {boolean} selected 
 * @param {function} callback 
 */
var findEmployeeSelected = function(selected, callback){
    const db = conn.connect();

    var sql = `SELECT * FROM Claim natural left join Take WHERE employee_id `;
    if(selected)
        sql += `is not null`;
    else
        sql += `is null`;
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    find:{
        all: findAllClaim,
        allJoin: findAllJoin,
        allJoinTake: findAllClaimJoinTake,
        allOrderBy: findAllOrderBy,
        by: findBy,
        finished: findFinished,
        employeeSelected: findEmployeeSelected
    },
    create: createClaim,
    update: updateClaim,
    delete: deleteClaim
};