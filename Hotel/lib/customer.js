var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllCustomer = function(callback){
    conn.getTable(`customer`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(book natural left join customer) natural join room`, callback);
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
    const db = conn.connect();

    var sql = `INSERT INTO customer `+
    `(first_name, last_name, gender, birthday, mobile_number, email, membership)`+
    ` VALUES(?,?,?,?,?,?,?)`;
    var values = [customer.first_name, customer.last_name, customer.gender, customer.birthday, customer.mobile_number,
         customer.email, customer.membership];
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
var deleteCustomer = function(id){//사실 굳이 안해도 될 것 같아요.지금 상황에서는
    const db = conn.connect();

    var sql = `DELETE FROM customer where customer_id = ?`;
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