var conn = require('./db');
var fs = require('fs');

var insert = function(){
    fs.readFile('../../Dummy/all.sql', function(err, data){
        var db = conn.connect();
        if(err) console.log(err);
        var sqls = data.toString().split(';');
        for(var i = 0; i < sqls.length; i++){
            if(sqls[i].trim().charAt(0) != '-')
            db.query(sqls[i].trim(), function (error, results, fields){
                if(error) throw error;
                // console.log(sqls[i].trim());
            });
        }
        conn.end();
    });
}
insert();

var create = function(){
    fs.readFile('../../Hotel.sql', function(err, data){
        var db = conn.connect();
        if(err) console.log(err);
        var sqls = data.toString().split(';');
        for(var i = 0; i < sqls.length; i++){
            console.log(sqls[i].trim());
            db.query(sqls[i].trim(), function (error, results, fields){
                if(error) throw error;
            });
        }
        conn.end();
    });
}