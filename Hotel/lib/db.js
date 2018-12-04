var mysql = require(`mysql`);

module.exports = {
    conn:null,
    connect:function(){
        this.conn = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '1234',
            database : 'hotel',
            insecureAuth : true
        });
        this.conn.connect();
        return this.conn;
    },
    getTable:function(table, callback){
        const db = this.connect();
    
        var sql = `SELECT * FROM ` + table;
        db.query(sql, function (error, results, fields){
            if(error) throw error;
            callback(results);
        });
        this.end();
    },
    end:function(){
        this.conn.end();
    }
};