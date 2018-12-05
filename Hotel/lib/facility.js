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

var createfacility = function(floor, type, m_staff, s_staff, callback){
    conn.createfacility(floor, type, m_staff, s_staff, callback);
};

var updatefacility = function(all, callback){
    target = all.facility_id;
    all = Object.assign({
        floor: null,
        type: null,
        m_staff: null,
        s_staff: null,
    }, all);
    conn.updatefacility(target, all, callback);
};

var delfacility = function(facility_id, callback){
    conn.delfacility(facility_id, callback);
};

module.exports = {
    find:{
        all: findAllfacility,
        list: findfacilityList,
    },
    create: createfacility,
    update: updatefacility,
    delete: delfacility
};