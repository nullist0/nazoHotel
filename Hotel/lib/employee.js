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
var addEmployee = function(employee_id, first_name, last_name, department, city, street, zip, email, gender, mobile_number, start_work, salary, responsible){
    const db = conn.connect();

    var sql = `INSERT INTO employee values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [employee_id, first_name, last_name, department, city, street, zip, email, gender, mobile_number, start_work, salary, responsible], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 삭제하기. 
 */
var delEmployee = function(employee_id){
    const db = conn.connect();

    var sql = `DELETE FROM employee WHERE employee_id = ?`;
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
var add_vac_Employee = function(employee_id, start_date, end_date, type){
    const db = conn.connect();

    var sql = `INSERT INTO vacation values(?, ?, ?, ?)`;
    db.query(sql, [employee_id, start_date, end_date, type], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 휴가 삭제하기. 
 */
var del_vac_Employee = function(employee_id){
    const db = conn.connect();

    var sql = `DELETE FROM vacation WHERE employee_id = ?`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 오늘 휴가 직원 파악. 
 */
var vacEmployee = function(){
    const db = conn.connect();

    var sql = `select employee_id, last_name, first_name FROM employee natural join vacation WHERE(vacation.start_date <= now() and now() <=vacation.end_date) `;
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
var NvacEmployee = function(){
    const db = conn.connect();

    var sql = `select employee_id, last_name, first_name from employee where employee_id not in 
        (select employee_id FROM employee natural join vacation WHERE(vacation.start_date <= now() and now() <=vacation.end_date));`;
    db.query(sql, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * 직원 출근시간 찍기. 
 */
var enterEmployee = function(employee_id){
    const db = conn.connect();

    var sql = `insert into time_table values(?, now(), now(), null);`;
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
var leaveEmployee = function(employee_id){
    const db = conn.connect();

    var sql = `update time_table set leave_time = now() where employee_id =?;`;
    db.query(sql, [employee_id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};





