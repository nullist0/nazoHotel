var conn = require('./fix_db')

var findAllfix = function(callback){
    conn.getTable(fix, callback);
};

var updatefix = function(all, callback){
    target = all.fix_id;
    all = Object.assign({
        facility_id: null,
        employee_id: null,
        fixed_time: null,
    }, all);
    conn.updatefix(target, all, callback);
};

var createfix = function(fix_id, facility_id, employee_id, fixed_time, callback){
    conn.createfacility(fix_id, facility_id, employee_id, fixed_time, callback);
};

module.exports = {
    find:{
        all: findAllfix,
    },
    update: updatefix,
    create: createfix
};