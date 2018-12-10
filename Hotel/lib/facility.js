var conn = require('./db');

/**
 * 
 * @param {fucntion} callback 
 */
var findAllfacility = function(callback){
    conn.getTable('Facility', callback);
};

var findfacilityList = function(callback){
    var Column = 'facility_id, type';
    conn.getSelectedColumn('Use', Column, callback);
};

var findFacilityJoinFix = function(callback){
    const db = conn.connect();

    var sql = `
        SELECT * 
        FROM (Facility natural left join 
            (
            SELECT facility_id, fixed_time  
            FROM Fix 
            WHERE fixed_time in (SELECT MAX(fixed_time) from Fix GROUP BY facility_id)
            ) as Current_Fix
        )`;
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
}

var createfacility = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        name: null,
        floor: null,
        type: null,
        m_staff: null, 
        s_staff:null
    }, all);

    var sql = 'insert into Facility (name, floor, type, main_staff_id, sub_staff_id) '+
        'VALUES(?, ?, ?, ?, ?)';
    var values = [all.name, all.floor, all.type, all.m_staff, all.s_staff];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var updatefacility = function(all, callback){
    target = all.facility_id;
    all = Object.assign({
        name:null,
        floor: null,
        type: null,
        m_staff: null,
        s_staff: null,
    }, all);
    const db = conn.connect();

    var sql = `UPDATE Facility SET `;
    var set = [];
    var values = [];
    for(var name in all){
        if(all[name] != null){
            set.push(`${name} = ? `);
            values.push(all[name]);
        }
    }
    sql += set.join(',' );
    sql += `WHERE facility_id = ?`;
    values.push(target);

    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var delfacility = function(facility_id, callback){
    const db = conn.connect();

    var sql = 'delete from Facility where facility_id= ?';
    db.query(sql, [facility_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    find:{
        all: findAllfacility,
        list: findfacilityList,
        join: findFacilityJoinFix
    },
    create: createfacility,
    update: updatefacility,
    delete: delfacility
};