var conn = require('./fix_db')

var findAllfix = function(callback){
    conn.getTable(fix, callback);
};

var editfix = function(all, callback){
    target = all.fix_id;
    all = Object.assign({
        facility_id: null,
        employee_id: null,
        fixed_time: null,
    }, all);
    conn.editfix(target, all, callback);
};

var addfix = function(fix_id, facility_id, employee_id, fixed_time, callback){
    conn.addfacility(fix_id, facility_id, employee_id, fixed_time, callback);
};

module.exports = {
    find:{
        all: findAllfix,
    },
    edit: editfix,
    add: addfix
};