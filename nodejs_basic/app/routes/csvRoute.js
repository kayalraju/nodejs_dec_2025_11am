const express=require('express');
const bodyparser=require('body-parser');
const multer=require('multer');
const path=require('path');
const CsvController = require('../controllers/CsvController');
const router=express.Router();

router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended:true}));



const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvupload'),function(error,success){
            if(error) throw error;
        })
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage});

router.post('/csv',upload.single('file'),CsvController.createCsv);
router.get('/csv',CsvController.getCsvdata);




module.exports=router;