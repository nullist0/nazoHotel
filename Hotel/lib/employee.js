var conn = require('./db');

/**
 * 
 * 직원목록 불러오기. 
 */
var findAllEmployee = function(callback){
    conn.getTable(`Employee`, callback);
};

var findBy = function(all, callback){
    all = Object.assign({
        employee_id: null,
        name: null,
        department: null, 
        address: null,
        email: null,
        gender: null, 
        mobile_number: null,
        start_work: null, 
        salary: null, 
        responsible: null
    }, all);
    const db = conn.connect();

    var values = [];
    var sql = `SELECT * `+
        `FROM Employee `+
        `WHERE `;
    for(var key in all){
        if(all[key] != null){
            sql += `${key} = ? `;
            values.push(all[key]);
        }
    }
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 추가하기. 
 */
var addEmployee = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        name: null,
        department: null, 
        address: null,
        email: null,
        gender: null, 
        mobile_number: null,
        start_work: null, 
        salary: null, 
        responsible: null
    }, all);

    var cols = [];
    var values = [];
    var qs = [];
    for(var key in all){
        cols.push(key);
        values.push(all[key]);
        qs.push('?');
    }

    var sql = `INSERT INTO Employee(${cols.join(', ')}) values(${qs.join(', ')})`;
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var updateEmployee = function(data, callback){
    const db = conn.connect();
    data = Object.assign({
        employee_id: null,
        name: null, 
        department: null, 
        address: null,
        email: null,
        gender: null, 
        mobile_number: null,
        start_work: null, 
        salary: null, 
        responsible: null
    }, data);

    var sql = `UPDATE Employee SET `;
    var values = [];
    for(var name in data){
        if(name != `employee_id` && data[name] != null && data[name] != ''){
            sql += `${name} = ? `;
            values.push(data[name]);
        }
    }
    values.push(parseInt(data.employee_id, 10));

    sql += `WHERE employee_id = ?`;

    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 삭제하기. 
 */
var delEmployee = function(employee_id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Employee WHERE employee_id = ?`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 휴가 추가하기. 
 */
var add_vac_Employee = function(all, callback){
    all = Object.assign({
        employee_id: null,
        start_date: null,
        end_date: null,
        type: null
    }, all);

    const db = conn.connect();

    var sql = `INSERT INTO Vacation values(?, ?, ?, ?)`;
    var values = [all.employee_id, all.start_date, all.end_date, all.type];
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 휴가 삭제하기. 
 */
var del_vac_Employee = function(employee_id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Vacation WHERE employee_id = ?`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var findVacation = function(isVacation, callback){
    if(isVacation)
        vacEmployee(callback);
    else
        NvacEmployee(callback);
}

/**
 * 
 * 오늘 휴가 직원 파악. 
 */
var vacEmployee = function(callback){
    const db = conn.connect();

    var sql = `select employee_id, last_name, first_name FROM Employee natural join vacation WHERE(vacation.start_date <= now() and now() <=vacation.end_date) `;
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 오늘 휴가아닌 직원 파악. 
 */
var NvacEmployee = function(callback){
    const db = conn.connect();

    var sql = `select employee_id, last_name, first_name from employee where Employee_id not in 
        (select employee_id FROM employee natural join vacation WHERE(vacation.start_date <= now() and now() <=vacation.end_date));`;
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var findEmpTimeJoin = function(callback){
    conn.getTable(`Employee natural left join (SELECT * FROM Time_table ORDER BY date DESC) as TTime`, callback);
};

/**
 * 
 * 직원 출근시간 찍기. 
 */
var enterEmployee = function(employee_id, callback){
    const db = conn.connect();

    var sql = `insert into Time_table values(?, now(), null, null);`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 퇴근시간 찍기. 
 */
var leaveEmployee = function(employee_id, callback){
    const db = conn.connect();

    var sql = `update Time_table set leave_time = now() where employee_id =?;`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var findAllTimeTable = function(callback){
    conn.getTable(`Time_table`, callback);
};

module.exports = {
    find : {
        all: findAllEmployee,
        join: findEmpTimeJoin,
        by: findBy
    },
    vacation: {
        find: findVacation,
        delete: del_vac_Employee,
        create: add_vac_Employee
    },
    time_table: {
        find: findAllTimeTable,
        enter: enterEmployee,
        leave: leaveEmployee
    },
    create: addEmployee,
    delete: delEmployee,
    update: updateEmployee
}