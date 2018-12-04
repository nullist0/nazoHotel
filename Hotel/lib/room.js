var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllRoom = function(callback){
    conn.getTable(`room`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(book natural left join customer) natural join room`, callback);
};


/**
 * 
 * @param {Object} data 
 */
var findOneRoom = function(id, callback){
    const db = conn.connect();
    var value = [id];
    var sql = `SELECT * FROM room WHERE room_id=?`;

    db.query(sql, value, function(error, result, fields){
        if(error) throw error;
        callback(result);
    });
    conn.end();

};



/**
 * 
 * @param {Object} data 
 */
var createRoom = function(data){
    const db = conn.connect();
    data = Object.assign({
        room_id: null,
        room_type: null,
        room_price: null
    }, data);

    var sql = `INSERT INTO room(room_id, room_type, room_price) VALUES(?, ?, ?)`;
    var values = [data.room_id, data.room_type, data.room_price];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
    });
    conn.end();
};

/**
 * 
 * @param {Object} data 
 */
var updateRoom = function(data){
    const db = conn.connect();

    data = Object.assign({
        room_id: null,
        room_type: null,
        room_price: null
    }, data);

    var sql = `UPDATE room SET `;
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
    });

    conn.end();
};

/**
 * 
 * @param {number} id 
 */
var deleteRoom= function(id){
    const db = conn.connect();

    var sql = `DELETE FROM room where room_id = ?`;
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
    },
    create: createRoom,
    update: updateRoom,
    delete: deleteRoom
};