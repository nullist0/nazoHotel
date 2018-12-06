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
        main_staff_id: null,
        sub_staff_id: null
    }, data);

    var sql = `INSERT INTO Room(room_id, room_type, room_price, view, equipment, main_staff_id, sub_staff_id) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    var values = [data.room_id, data.room_type, data.room_price, data.view, data.equipment, data.main_staff_id, data.sub_staff_id];
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
    },
    create: createRoom,
    update: updateRoom,
    delete: deleteRoom
};