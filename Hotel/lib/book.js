var conn = require('./db');

/** 
 *
 * @param {function} callback
 */ 
var findAllBook = function(callback){
    conn.getTable(`book`,callback);
};

/** 
 *
 * @param {function} callback
 */ 
var findAllJoin = function(callback){
    conn.getTable(`(book natural left join customer) natural join room`, callback);
};

/** 
 * @param {object} data
 * @param {function} callback
 */ 
var searchBook = function(data, callback){
    data = Object.assign({
        check_in: null,
        check_out: null,
        people_num: null,
        room_type: null
    },data);
    const db = conn.connect();

    var values = [book.check_in, book.check_out, room.room_type];
    var sql = `SELECT * FROM Room WHERE room_id not in `+
    `(SELECT distinct(room_id) FROM Book WHERE (check_in between ? and ?) or (check_out. between ? and ?)) and room_type = ? LIMIT 1`;

    db.query(sql, values, function(error, result, fields){
        if(err) throw error;
        callback(result);
    });
    conn.end();
};



/** 
 * @param {object} data
 */ 
var createBook = function(data){
    const db = conn.connect();
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

    var sql = `INSERT INTO book(room_id, customer_id, check_in, check_out, book_price , optione_price, total_price) `+
    `VALUES(?,?,?,?,?,?,?)`;
    var values = [book.room_id, book.customer_id, book.check_in, book.check_out,
         room.room_price*(TO_DAYS(book.check_out)-TO_DAYS(book.check_in)), book.option_price,
         room.room_price*(TO_DAYS(book.check_out)-TO_DAYS(book.check_in))+book.option_price];
    db.query(sql, values, function(error, results,fields){
        if(error) throw error;
        callback(results.insertid);
    });
    conn.end();  
};

/**
 * 
 * @param {number} id 
 */
var deleteBook = function(id){
    const db = conn.connect();

    var sql = `DELETE FROM book book_id = ?`;
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
    const db = conn.connect();
    data = Object.assign({
        book_id: null,
        first_name: null,
        last_name: null,
        mobile_number: null,
        email: null,
    }, data);
    const db = conn.connect();

    var values = [book.book_id, customer.first_name, customer.last_name, customer.mobile_number, customer.email];
    var sql = `SELECT book_id, people_num, book_price, option_price, total_price, check_in, check_out`+
     `FROM book natural join customer WHERE book_id = ? and fisrt_name = ? and last_name = ? and mobile_number = ? and email = ?`;

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
        searchBook: searchBook,
        findBook: findBook
    },
    create: createBook,
    delete: deleteBook
};