var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllCustomer = function(callback){
    conn.getTable(`Customer`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(Book natural left join Customer) natural join Room`, callback);
};

/** 
 * @param {object} data
 */ 
var createCustomer = function(data, callback){
    const db = conn.connect();
    data = Object.assign({
        first_name: null,
        last_name: null,
        gender: null,
        birthday: null,
        mobile_number: null,
        email: null,
        membership: 0
    }, data);

    var sql = `INSERT INTO Customer `+
    `(first_name, last_name, gender, birthday, mobile_number, email, membership)`+
    ` VALUES(?,?,?,?,?,?,?)`;
    var values = [data.first_name, data.last_name, data.gender, data.birthday, data.mobile_number,
         data.email, data.membership];
    db.query(sql, values, function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {number} id 
 */
var deleteCustomer = function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Customer where customer_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};



module.exports = {
    find:{
        all: findAllCustomer,
        allJoin: findAllJoin,
    },
    create: createCustomer,
    delete: deleteCustomer
};