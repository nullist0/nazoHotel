var conn = require('./emp_db');

/**
 * 
 * 직원목록 불러오기. 
 */
var findAllEmployee = function(callback){
    conn.getTable(`Employee`, callback);
};

/**
 * 
 * 직원 추가하기. 
 */
var addEmployee = function(all, callback){
    const db = conn.connect();
    all = Object.assign({
        first_name: null, 
        last_name: null, 
        department: null, 
        city: null, 
        street: null, 
        zip: null, 
        email: null,
        gender: null, 
        mobile_number: null,
        start_work: null, 
        salary: null, 
        responsible: null
    }, all);

    console.log(all);

    var sql = `INSERT INTO Employee values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var values = [all.first_name, all.last_name, all.department, 
        all.city, all.street, all.zip, all.email, all.gender, all.mobile_number, 
        all.start_work, all.salary, all.responsible]
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
        first_name: null, 
        last_name: null, 
        department: null, 
        city: null, 
        street: null, 
        zip: null, 
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
        if(name != `employee_id` && data[name] != null){
            sql += `${name} = ? `;
            values.push(data[name]);
        }
    }
    values.push(data.employee_id);

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
    conn.getTable(`Time_table natural left join Employee`, callback);
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
        join: findEmpTimeJoin
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