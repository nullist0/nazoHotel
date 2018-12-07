var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllRoom = function(callback){
    conn.getTable(`Room`,callback);
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
 * @param {Object} data 
 */
var findOneRoom = function(id, callback){
    const db = conn.connect();
    var sql = `SELECT * FROM Room WHERE room_id=?`;

    db.query(sql,[id], function(error, result, fields){
        if(error) throw error;
        callback(result);
    });
    conn.end();
};


/** 
 * @param {object} data
 * @param {function} callback
 */ 
var searchBook = function(data, callback){
    data = Object.assign({
        check_in: null,
        check_out: null,
        people_num: null,
        room_type: null
    },data);
    const db = conn.connect();

    var values = [data.check_in, data.check_out, data.room_type];
    var sql = `SELECT * FROM Room WHERE room_id not in `+
    `(SELECT distinct(room_id) FROM Book WHERE (check_in between ? and ?) or (check_out. between ? and ?)) and room_type = ? LIMIT 1`;

    db.query(sql, values, function(error, result, fields){
        if(error) throw error;
        callback(result);
    });
    conn.end();
};


/**
 * 
 * @param {Object} data 
 */
var createRoom = function(data, callback){
    const db = conn.connect();
    data = Object.assign({
        room_id: null,
        room_type: null,
        room_price: null,
        view: null,
        equipment: null,
        is_checkout: false,
        is_clean: false,
        main_staff_id: null,
        sub_staff_id: null
    }, data);
    var q = [];
    for(var l in data){
        q.push('?');
    }

    var sql = `INSERT INTO Room(${data.keys.join(', ')}) VALUES(${q.join(', ')})`;
    var values = data.values;
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {Object} data 
 */
var updateRoom = function(data, callback){
    const db = conn.connect();

    data = Object.assign({
        room_id: null,
        room_type: null,
        room_price: null,
        view: null,
        equipment: null,
        isCheckout: null,
        isClean: null,
        main_staff_id: null,
        sub_staff_id: null
    }, data);

    var sql = `UPDATE Room SET `;
    var values = [];
    for(var name in data){
        if(name != `room_id` && data[name] != null){
            sql += `${name} = ? `;
            values.push(data[name]);
        }
    }
    values.push(data.room_id);

    sql += `WHERE room_id = ?`;
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

/**
 * 
 * @param {number} id 
 */
var deleteRoom= function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Room where room_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};


module.exports = {
    find:{
        One: findOneRoom,
        all: findAllRoom,
        allJoin: findAllJoin,
        forBook: searchBook
    },
    create: createRoom,
    update: updateRoom,
    delete: deleteRoom
};