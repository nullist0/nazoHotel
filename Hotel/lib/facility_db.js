var mysql = require('mysql');

module.exports = {
    conn:null,
    connect:function(){
        this.conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'hotel',
            password : 'hotel',
            database : 'hotel',
            insecureAuth : true
        });
        this.conn.connect();
        return this.conn;
    },
    
    getTable:function(table, callback){
        const db = this.connect();
    
        var sql = 'SELECT * FROM ' + table;
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },
    
    getColumn:function(table, findColumn, callback){
        const db = this.connect();
    
        var sql = 'SELECT '+ findColumn +' FROM ' + table;
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },

    createfacility:function(floor, type, m_staff, s_staff, callback){
        const db = this.connect();
    
        var sql = 'insert into facility (floor, type, main_staff_id, sub_staff_id) VALUES(' + floor + ', ' + type + ', ' + m_staff + ', ' + s_staff + ')';
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },
    
    updatefacility:function(target, inform, callback){
        const db = this.connect();

        var where = 'set facility_id = ' + target;
        var sql = 'update facility set floor=' + inform.floor + 'type=' + inform.type + 'main_staff_id =' + inform.m_staff + 'sub_staff_id=' + inform.s_staff + 'where = ' + where;
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },

    delfacility:function(facility_id, callback){
        const db = this.connect();
    
        var sql = 'delete from facility where facility_id=' + facility_id;
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },

    updatefix:function(target, inform, callback){
        const db = this.connect();

        var where = 'set facility_id = ' + target;
        var sql = 'update facility set facility_id=' + inform.facility_id + 'employee_id=' + inform.employee + 'fixed_time =' + inform.fixed_time + 'where = ' + where;
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },

    createfex:function(fix_id, facility_id, employee_id, fixed_time, callback){
        const db = this.connect();
    
        var sql = 'insert into fix (facility_id, employee_id, fixed_time) VALUES(' + facility_id + ', ' + employee_id + ', ' + fixed_time + ')';
        db.query(sql, [id], function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },

    end:function(){
        this.conn.end();
    }
};
