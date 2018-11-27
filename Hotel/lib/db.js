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
    end:function(){
        this.conn.end();
    }
};