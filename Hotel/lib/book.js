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
        option_price: null,
        total_price: null
    }, data);
    const db = conn.connect();

    var date1 = new Date(data.check_in);
    var date2 = new Date(data.check_out);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var sql = `INSERT INTO Book(room_id, customer_id, check_in, check_out, book_price , optione_price, total_price) `+
    `VALUES(?,?,?,?,?,?,?)`;
    var values = [data.room_id, data.customer_id, data.check_in, data.check_out,
         data.room_price*diffDays, data.option_price,
         data.room_price*diffDays+data.option_price];
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

    data = Object.assign({
        room_id: null,
        customer_id: null,
        check_in: null,
        check_out: null,
        book_price: null,
        option_price: null,
        total_price: null,
        isCheckout: false,
        isClean: false
    }, data);

    var sql = `UPDATE Book SET `;
    var values = [];
    for(var name in data){
        if(name != `BooK_id` && data[name] != null){
            sql += `${name} = ? `;
            values.push(data[name]);
        }
    }
    values.push(data.Book_id);

    sql += `WHERE Book_id = ?`;
    
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

    var sql = `DELETE FROM Book book_id = ?`;
    db.query(sql, [id], function (error, results, fields){
        if(error) throw error;
        callback(results);
    });
    conn.end();
};

/**
 * 
 * @param {Object} data
 * @param {function} callback 
 */
var findBook = function(data, callback){
    data = Object.assign({
        book_id: null,
        first_name: null,
        last_name: null,
        mobile_number: null,
        email: null,
    }, data);
    const db = conn.connect();

    var values = [];
    var sql = `SELECT * `+
        `FROM Book `+
        `WHERE `;
    for(var key in all){
        if(all[key] != null){
            sql += `${key} = ? `;
            values.push(all[key]);
        }
    }

     db.query(sql, values, function(error, results, fields){
         if(error) throw error;
         callback(results);
     });
     conn.end();
};





module.exports = {
    find:{
        all: findAllBook,
        allJoin: findAllJoin,
        book: findBook
    },
    create: createBook,
    update: updateBook,
    delete: deleteBook
};