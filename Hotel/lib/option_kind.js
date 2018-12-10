var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllOption_Kind = function(callback){
    conn.getTable(`Option_Kind`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`Option natural left join Option_Kind`, callback);
};

var findOfBookOptionKinds = function(book_id, callback){
    const db = conn.connect();

    var sql = 'SELECT * FROM `Option` natural left join `Option_Kind` WHERE book_id = ?';
    var values = [parseInt(book_id, 10)];
    db.query(sql, values, function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {Object} all 
 */
var createOption_Kind = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        option_name: null,
        option_price_per_num: null
    },all);

    var sql = `INSERT INTO Option_Kind(option_name, option_price_per_num) VALUES(?, ?)`;
    var values = [all.option_name, all.option_price_per_num];
    db.query(sql, values, function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var deleteOption_kind = function(id, callback){
    const db = conn.connect();
    var sql = `DELETE FROM Option_Kind where option_name = ?`;
    db.query(sql, [id], function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {Object} all 
 */
var updateOption_Kind = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        option_name: null,
        option_price_per_num: '0'
    },all);
    all.option_price_per_num = parseInt(all.option_price_per_num);

    var sql = `UPDATE Option_Kind SET option_price_per_num = ? WHERE option_name = ?`;
    var values = [all.option_price_per_num, all.option_name];

    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};


module.exports = {
    find:{
        all: findAllOption_Kind,
        allJoin: findAllJoin,
        ofBook: findOfBookOptionKinds
    },
    create: createOption_Kind,
    update: updateOption_Kind,
    delete: deleteOption_kind
};

