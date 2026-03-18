const express=require('express');
const StudentController = require('../controllers/StudentController');
const StudentImage = require('../utils/studentImage');

const Router=express.Router();


/**
* @swagger
* /api/v1/create/student:
*   post:
*     summary: create Student
*     tags:
*       - Student
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add student
 *        description: Add student in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *     responses:
 *        201:
 *          description: student data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
Router.post('/create/student',StudentController.createStudent);
/**
 * @swagger
 * /api/v1/students:
 *  get:
 *    summary: Get all the student from Database
 *    tags:
 *       - Student
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: data fetched successfully.
 */
Router.get('/students',StudentController.getAllStudents);
Router.get('/student/edit/:id',StudentController.getSingleStudent);
Router.put('/student/update/:id',StudentController.updateStudent);
Router.delete('/student/delete/:id',StudentController.deleteStudent);



Router.get('/student/:name', StudentController.getstudentdata)




module.exports=Router;


