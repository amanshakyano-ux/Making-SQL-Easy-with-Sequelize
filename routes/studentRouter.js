const express = require("express")
const router = express.Router()

const controller = require("../controller/studentController")

router.get('/',controller.getAllStudents)
router.post('/',controller.addStudent)
router.get('/:id',controller.getByIdStudent)
router.put('/:id',controller.modifyStudent)
router.delete('/:id',controller.deleteStudent)



module.exports = router;