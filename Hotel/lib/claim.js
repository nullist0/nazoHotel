var conn = require('./db');

var createRow = function(data){
    var db = conn.connect();
    data = Object.assign({
        room_id: null,
        customer_call: null,
        department: "프론트",
        deadline: "NOW()"
    }, data);
    sql = `INSERT INTO Claim(room_id, customer_call, department, deadline) VALUES(?, ?, ?, ?)`;
    values = [data.room_id, data.customer_call, data.department, data.deadline];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
    });
    conn.end();
};

var getRow = function(id, callback){
    var db = conn.connect();

    sql = `SELECT * FROM Claim WHERE claim_id = ?`
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var updateRow = function(id, changedData){
    var db = conn.connect();

    set = [];
    values = [];
    for(var name in changedData){
        set.add(`${name} = ?`);
        values.add(changedData[name]);
    }
    values.add(id);

    sql = `UPDATE Claim `;

    sql += `SET `
    var i = 0;
    while(i < set.length){
        sql += `${set[i]} = ? `;
        if(i < set.length - 1)
            sql += `, `;
        i++;
    }
    sql += `WHERE claim_id = ?`;
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
    });

    conn.end();
};

var deleteRow = function(id){
    var db = conn.connect();

    sql = `DELETE FROM Claim where claim_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

module.exports = {
    create: createRow,
    get: getRow,
    update: updateRow,
    delete: deleteRow
}