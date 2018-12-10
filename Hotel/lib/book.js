var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllBook = function(callback){
    conn.getTable(`Book`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(Book natural left join Customer) natural join Room`, callback);
};

/** 
 * @param {object} data
 */ 
var createBook = function(data, callback){
    data = Object.assign({
        room_id: null,
        customer_id: null,
        check_in: null,
        check_out: null,
        book_price: null,
        people_num: 0,
        option_price: null,
        total_price: null
    }, data);
    const db = conn.connect();

    var date1 = new Date(data.check_in);
    var date2 = new Date(data.check_out);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var sql = `INSERT INTO Book(room_id, people_num, check_in, check_out, book_price) VALUES(?,?,?,?,?)`;
    var values = [parseInt(data.room_id), parseInt(data.people_num), data.check_in, data.check_out, data.room_price*diffDays];
    db.query(sql, values, function(error, results,fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();  
};

/**
 * 
 * @param {Object} data 
 */
var updateBook = function(data, callback){
    const db = conn.connect();
    const proto = {
        book_id: null,
        room_id: null,
        customer_id: null,
        check_in: null,
        check_out: null,
        book_price: null,
        option_price: null,
        total_price: null,
        people_num: 0,
        isCheckout: false,
        isClean: false
    }
    data = Object.assign({
        book_id: null,
        room_id: null,
        customer_id: null,
        check_in: null,
        check_out: null,
        book_price: null,
        option_price: null,
        total_price: null,
        is_checkout: false,
        is_clean: false
    }, data);

    var sql = `UPDATE Book SET `;
    var sets = [];
    var values = [];
    for(var name in proto){
        if(name != `book_id` && data[name] != null){
            sets.push(`${name} = ? `);
            values.push(data[name]);
        }
    }
    values.push(parseInt(data.book_id));

    sql += sets.join(', ') + ' ';
    sql += `WHERE book_id = ?`;

    console.log(sql);
    console.log(values);
    
    db.query(sql, values, function (error, results, fields){
        if(error) throw error;
        callback(results);
    });

    conn.end();
};

/**
 * 
 * @param {number} id 
 */
var deleteBook = function(id, callback){
    const db = conn.connect();

    var sql = `DELETE FROM Book WHERE book_id = ?`;
    db.query(sql, [parseInt(id, 10)], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

var findBook = function(all, callback){
    all = Object.assign({
        book_id: null,
        first_name: null,
        last_name: null,
        mobile_number: null,
        email: null,
    }, all);
    const db = conn.connect();

    var values = [];
    var sql = `SELECT * `+
        `FROM Book natural join Customer `+
        `WHERE `;
    var where = [];
    for(var key in all){
        if(all[key] != null){
            where.push(`${key} = ? `);
            values.push(all[key]);
        }
    }

    sql += where.join(' and ');
    sql += ` ORDER BY check_in DESC`

    console.log(sql);
    console.log(values);

     db.query(sql, values, function(error, results, fields){
         if(error) throw error;
         callback(results);
     });
     conn.end();
};

var findBookJoinRoom = function(book_id, callback){
    const db = conn.connect();

    var sql = `SELECT * `+
        `FROM Book natural left join Room `+
        `WHERE book_id = ?`;

     db.query(sql, [book_id], function(error, results, fields){
         if(error) throw error;
         callback(results);
     });
     conn.end();
};

module.exports = {
    find:{
        all: findAllBook,
        allJoin: findAllJoin,
        book: findBook,
        bookJoinRoom: findBookJoinRoom
    },
    create: createBook,
    update: updateBook,
    delete: deleteBook
};