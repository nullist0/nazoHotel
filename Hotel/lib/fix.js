var conn = require('./fix_db')

var findAllfix = function(callback){
    conn.getTable(fix, callback);
};

var editfix = function(all, callback){
    target = all.fix_id;
    all = Object.assign({
        facility_id: null,
        employee_id: null,
        fixed_imde: null,
    }, all);
    conn.editfix(target, all, callback);
};