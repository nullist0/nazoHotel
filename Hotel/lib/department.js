var conn = require('./db');

var findAllDept = function(callback){
    conn.getTable(`Department`, callback);
};

var createDept = function(data, callback){
    const db = conn.connect();
    data = Object.assign({
        name: null,
        population: 0
    }, data);

    var sql = `INSERT INTO Department(name, population) VALUES(?, ?)`;
    var values = [data.name, data.population];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var updateDept = function(data, callback){
    const db = conn.connect();

    data = Object.assign({
        name: null,
        population: 0
    }, data);

    var sql = `UPDATE Department SET population = ? `;
    sql += `WHERE name = ?`;

    db.query(sql, [parseInt(data.population, 10), data.name], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

var deleteDept = function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Department where name = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    find:{
        all: findAllDept
    },
    create: createDept,
    update: updateDept,
    delete: deleteDept
};