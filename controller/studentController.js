const db = require("../utils/db-connection")
const Student = require('../models/students')



const addStudent = async (req,res)=>{
    try{
         const{name,email} = req.body;
         const student = await Student.create({
            name:name,
            email:email
            
            })
            res.status(201).send(`User with name:${name} is created!`)

     }catch(error){
         res.status(500).send('Unable to make an entry')
     }

    
}


const getAllStudents = async (req,res)=>{
 
    try{
        const student = await Student.findAll()
         if(student.length === 0) res.status(404).send('List is empty!!')
            res.status(200).send(student)
    }catch(error){

    }
 
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



    const modifyStudent = async (req,res)=>
        {
            try{
                const{id} = req.params;
             const {name} = req.body;
            
            const student = await Student.findByPk(id)

             if(!student){
                res.status(404).send("User Not Found!!")
             }
             student.name = name;
              
             await student.save();
             res.status(200).send("User updated successfully//")
            }
            catch(error){
                res.status(500).send("User cannot be updated!!")
            }
            

        }

const deleteStudent = async (req,res)=>{
      
    try{
        const{id} = req.params;
         const student =  await Student.destroy({
            where:{
                id:id
            }
         })
         if(!student){
            res.status(404).send("User is not found")
         }
         res.status(200).send("User is deleted")
    }catch(error){
            res.status(500).send("User cannot be deleted!!")
    }
    
 
}


module.exports = {
    addStudent,
    getAllStudents,
    getByIdStudent,
    modifyStudent,
    deleteStudent
}