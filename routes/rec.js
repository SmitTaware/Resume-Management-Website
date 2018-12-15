const express = require('express');
const router = express.Router();
const multer = require('multer');
const path =require('path');
//set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
      cb(null,file.fieldname+'-'+ Date.now() + path.extname(file.originalname));
    }
  });
  //Init upload
  const upload = multer({
    storage: storage
  }).single('Resume');


const dbOperation = require("../data/rec");


router.get("/rec", (req, res) => {
    console.log("here");
    res.render('main/recForm');

});

router.post("/rec", async (req, res) => {

    let error = "";
    if (!req.body.company) error +="Company Name cannot be empty <br>";
    //if (!req.body.lastname) error +="Lastname cannot be empty  <br>";
    if (!req.body.position)  error +="Position address cannot be empty  <br> ";
    if (!req.body.Resume)  error +="Resume cannot be empty <br> ";
    //if (!req.body.dateofbirth) error +="Date of birth cannot be empty <br> ";
    //if(!req.body.gender)  error +="Gender cannot be empty <br> ";
    if (typeof(!req.body.salary)!=Number)  error +="Salary should be a number <br> ";
    if (req.body.company.length > 20) error +="Firstname  is too long <br> ";
    //if (req.body.lastname.length > 20) error +="Lastname  is too long <br> ";
    if (req.body.position.length > 20) error +="Email address is too long  <br>";
   
    if(error !== ""){
        res.render("main/recForm", { error: error});
        return;}
        
        upload(req,res,(err)=>{
       
            if(err){
              res.render("main/recForm", { error: err});
              console.log(err);
            }else {
             let CV = req.file.path;
              if(req.file == undefined) {
                res.render("main/recForm", { error: 'No file selected.'})
              } 
            }
          });
    
    
     //createRec(id,User,Comp,Pos,JD,CV,AS)
    try {
       const Record = await dbOperation.createRec(req.session.user._id,req.session.user.userName,req.body.company,req.body.position,req.body.jobD,CV,req.body.appS,req.body.salary);
        res.render("main/recPage",{rec: Record});

    } catch (e) {
        res.render("main/recForm", { error: e});
        console.log(e);
    }
})







module.exports = router;