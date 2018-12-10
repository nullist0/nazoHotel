var conn = require('./db')

var findAllfix = function(callback){
    conn.getTable("Fix", callback);
};

var findAllFixJoinEmployee = function(callback){
    conn.getTable("Fix natural left join Employee", callback);
};

var updatefix = function(all, callback){
    const db = conn.connect();
    var target = all.fix_id;
    all = Object.assign({
        facility_id: null,
        employee_id: null,
        fixed_time: null,
    }, all);

    var sql = `UPDATE Fix SET `;
    var set = [];
    var values = [];
    for(var name in all){
        if(all[name] != null){
            set.push(`${name} = ? `);
            values.push(all[name]);
        }
    }
    sql += set.join(', ');
    sql += `WHERE fix_id = ?`;
    values.push(target);

    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var createfix = function(all, callback){
    const db = conn.connect();

    all = Object.assign({
        facility_id: null,
        employee_id: null,
        fixed_time: null
    }, all);

    var values = [all.facility_id, all.employee_id, all.fixed_time]
    var sql = 'insert into Fix (facility_id, employee_id, fixed_time)'+
        ' VALUES(?, ?, ?)';
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

var deleteFix = function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Fix WHERE fix_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    find:{
        all: findAllfix,
        joinEmployee: findAllFixJoinEmployee
    },
    update: updatefix,
    create: createfix,
    delete: deleteFix
};