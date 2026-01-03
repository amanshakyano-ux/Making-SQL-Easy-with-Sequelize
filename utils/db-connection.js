const mysql = require('mysql2')
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"972013",
    database:"students",
})


connection.connect((err)=>{
    if(err)
    {
          console.log(err.message)
    }
    const studentQuery = `CREATE TABLE IF NOT EXISTS students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(30) UNIQUE,
        age INT)`
    connection.execute(studentQuery,(err)=>{
       if(err){
        return console.log(err.message)
       }
        console.log("student table created")
    })
})


module.exports = connection;