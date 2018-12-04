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

    addfacility:function(floor, type, m_staff, s_staff, callback){
        const db = this.connect();
    
        var sql = 'insert into facility (floor, type, main_staff_id, sub_staff_id) VALUES(' + 'floor' + ', ' + 'type' + ', ' + 'm_staff' + ', ' + 's_staff' + ')';
        conn.query(sql, function(err, rows, fields){
            if(err) console.log(err);
            console.log(rows.insertId); // insertId는 auto_increment설정해 놓았다.(고유한 식별자를 알아낼 수 있는 방법이다.)
        });
        this.end();
    },

    end:function(){
        this.conn.end();
    }
};
