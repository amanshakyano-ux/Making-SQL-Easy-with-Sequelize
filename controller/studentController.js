const db = require("../utils/db-connection")

const addStudent = (req,res)=>{
 
    
    const{name,email,age} = req.body;
    
    if(!name || !email || !age)
    {
        return res.status(400).json({
            message:"All fields are mandatory"
        })
    }

    const addStudentQuery = `INSERT INTO students(name,email,age) VALUES(?,?,?)`
    db.execute(addStudentQuery,[name,email,age],(err)=>{
        if(err)

        {
            console.log(err.message)
            return err.message
        }
        res.status(201).json({
            success:true,
            message:`student - ${name} details added!`
        })
    })


}


const getAllStudents = (req,res)=>{
const getStudentQuery = `SELECT * FROM students`
db.execute(getStudentQuery,(err,result)=>{
    if(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
    if(result.length === 0)
    {
        return res.send(404).json({
            message:"Student list is empty!"
        })
    }
        return res.status(200).json({
            success:true,
            totalStudents:result.length,
            result
        })
})
}

const getByIdStudent=(req,res)=>
    {

        const {id} = req.params;
        if(isNaN(id))
        {
            return res.status(400).json({
                message:"Id is invalid"
            })
        }
        const getStudentByIdQuery = `SELECT * FROM students WHERE id =?`
        db.execute(getStudentByIdQuery,[id],(err,result)=>{
            
            if(err){
                console.log(err)
                return res.status(500).json({message:err.message})
            }

            if(result.length === 0) 
                {
                     return res.status(404).json({
                        message:`There is no user of this id - ${id}`
                     })
                }

            return res.status(200).json({
                success:true,
                result
            })

        })
    } 



    const modifyStudent = (req,res)=>
        {
            const{id} = req.params;
            const {name,email,age} = req.body;
            
            if(isNaN(id))
                {
                    return res.status(400).json({
                        message:"Id is invalid"
                    })
                }
            if(!name || !email || !age)
                {
                    return res.status(400).json({
                        message:"All fields are mandatory to change students details"
                    })
                }
                
                    
            const modifyQuery = `UPDATE students set name =?, email=?, age=? WHERE id = ?`

            db.execute(modifyQuery,[name,email,age,id],(err,result)=>{
                if(err){
                    return res.status(500).json({message:err.message})
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Student not found"
                });
                }
                return res.status(200).json({
                 message:`Student with id - ${id} updated successfully`
                })

            })


        }

const deleteStudent = (req,res)=>{
      const{id} = req.params;
       if(isNaN(id))
                {
                    return res.status(400).json({
                        message:"Id is invalid"
                    })
                }


      const deleteQuery = `DELETE FROM students WHERE id = ? `
      db.execute(deleteQuery,[id],(err,result)=>{
         if(err)
            {
              return res.status(500).json({message:err.message})
            }
            
            if (result.affectedRows === 0) {
                    return res.status(404).json({
                        message: "Student not found"
                });
               }
               return res.status(200).json({
                message:"Student deleted successfully"
               })

 })
}


module.exports = {
    addStudent,
    getAllStudents,
    getByIdStudent,
    modifyStudent,
    deleteStudent
}