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

var createfacility = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        floor: null,
        type: null,
        m_staff: null, 
        s_staff:null
    }, all);

    var sql = 'insert into Facility (floor, type, main_staff_id, sub_staff_id) '+
        'VALUES(?, ?, ?, ?)';
    var values = [all.floor, all.type, all.m_staff, all.s_staff];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var updatefacility = function(all, callback){
    target = all.facility_id;
    all = Object.assign({
        floor: null,
        type: null,
        m_staff: null,
        s_staff: null,
    }, all);
    const db = this.connect();

    var sql = `UPDATE Faciility SET `;
    var values = [];
    for(var name in all){
        if(all[name] != null){
            sql += `${name} = ? `;
            values.push(all[name]);
        }
    }
    sql += `WHERE facility_id = ?`;
    values.push(target);

    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var delfacility = function(facility_id, callback){
    const db = this.connect();

    var sql = 'delete from facility where facility_id= ?';
    db.query(sql, [facility_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    this.end();
};

module.exports = {
    find:{
        all: findAllfacility,
        list: findfacilityList,
    },
    create: createfacility,
    update: updatefacility,
    delete: delfacility
};