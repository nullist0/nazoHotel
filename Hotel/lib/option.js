var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllOption = function(callback){
    conn.getTable(`Option`,callback);
};


/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(Book natural left join Customer) natural join Room`, callback);
};

/**
 * 
 * @param {Object} all 
 */
var createOption = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        option_name: null,
        apply_num: null
    },all);

    var sql = `INSERT INTO Option_Kind(option_name, apply_num) VALUES(?, ?)`;
    var values = [option_name, apply_num];
    db.query(sql, values, function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var deleteOption = function(id, callback){
    const db = conn.connect();
    var sql = `DELETE FROM Option where option_name = ?`;
    db.query(sql, [id], function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};



module.exports = {
    find:{
        all: findAllOption,
        allJoin: findAllJoin,
    },
    create: createOption,
    delete: deleteOption
};