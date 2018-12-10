var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllOption = function(callback){
    conn.getTable('`Option`',callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable('`Option` natural left join Option_Kind', callback);
};

var findOfBook = function(book_id, callback){
    const db = conn.connect();

    var sql = 'SELECT * FROM `Option` WHERE book_id = ?';
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
var createOption = function(all, callback){
    const db = conn.connect();

    var sql = 'INSERT INTO `Option`(book_id, option_name, apply_num) VALUES';
    var sqlvalues = [];
    var values = [];
    var i = 0;
    while(i < all.options.length){
        sqlvalues.push(`(?, ?, ?)`);
        values.push(parseInt(all.book_id));
        values.push(all.options[i]);
        values.push(parseInt(all.apply_num));
        i++;
    }
    sql += sqlvalues.join(', ');

    console.log(sql);
    console.log(values);

    db.query(sql, values, function(error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {Object} data 
 */
var updateOption = function(data, callback){
    const db = conn.connect();

    data = Object.assign({
        book_id: null,
        option_name: null,
        apply_num: null
    }, data);

    var sql = 'UPDATE `Option` SET ';
    var values = [];
    for(var name in data){
        if(name != `option_name` && data[name] != null){
            sql += `${name} = ? `;
            values.push(data[name]);
        }
    }
    values.push(data.option_name);

    sql += `WHERE option_name = ?`;
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

var deleteOption = function(id, callback){
    const db = conn.connect();
    var sql = 'DELETE FROM `Option` where book_id = ?';
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
        ofBook: findOfBook
    },
    create: createOption,
    update: updateOption,
    delete: deleteOption
};