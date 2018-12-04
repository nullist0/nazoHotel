var conn = require('./facility_db');

/**
 * 
 * @param {fucntion} callback 
 */
var findAllfacility = function(callback){
    conn.getTable('facility', callback);
};

var findfacilityList = function(callback){
    var Column = 'facility, type';
    conn.getColumn('use', Column, callback);
};

var addfacility = function(floor, type, m_staff, s_staff, callback){
    conn.addfacility(fllor, type, m_staff, s_staff, callback);
};

var editfacility = function(all, callback){
    target = all.facility_id;
    all = Object.assign({
        floor: null,
        type: null,
        m_staff: null,
        s_staff: null,
    }, all);
    conn.editfacility(target, all, callback);
};

var delfacility = function(facility_id, callback){
    conn.delfacility(facility_id, callback);
};
