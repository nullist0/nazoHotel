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
    conn.getTable(`Option natural left join Option_Kind`, callback);
};

var findOfBook = function(book_id, callback){
    const db = conn.connect();

    var sql = `SELECT * FROM Option WHERE book_id = ?`;
    var values = [book_id];
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
var createOption = function(allList, callback){
    const db = conn.connectMulitiple();

    var sql = [];
    var values = [];
    for(var all in allList){
        sql.push(`INSERT INTO Option(book_id, option_name, apply_num) VALUES(?, ?, ?)`);
        values.push([all.book_id, all.option_name, all.apply_num]);
    }
    sql = sql.join(';');

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

    var sql = `UPDATE Option SET `;
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
    var sql = `DELETE FROM Option where book_id = ?`;
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