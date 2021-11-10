const express = require('express')
const multer= require('multer')

const getCSVData = require('./csvparser')
const xlsTOjson = require('./xlparser')

var type
let data 
var namee

// console.log(result)
const app = express();
const port= process.env.PORT || 5001;

const fileStorageEngine= multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './file_folder');
    },
    filename: (req,file, cb) => {
        cb(null, file.originalname);
    },
});



// Middleware setup
const upload = multer({storage: fileStorageEngine})

app.use(express.json());


app.get('/parser',(req,res)=>{
    res.send('OK');
});


//to parse csv file 

app.post('/parser',upload.single('file'),(req,res)=>{
    try{
        const recivedata = req.body.array;
        const obj = JSON.parse(recivedata)
        type= obj.type
        namee= obj.key
    
        // console.log(obj.type);
        // console.log(req.file)
        res.send("File Recived").status(200);
    }catch(e){
        res.status(400).send(e);
        console.log('Error:',e);
    }
});


function f(){
    if(type=="csv"){
        const a= async ()=> {
            var filepath= `./file_folder/${namee}`
            data = await getCSVData(filepath);
            // console.log(data)
            //  res.send(data).status(200)

        }
        a()
    }else if(type=="xls"){
        
        const b = async ()=> {
            var filepath= `./file_folder/${namee}`
            data = await xlsTOjson(filepath);
            // console.log(data)
        }
        b()

    }else{
        let data = 'ERROR'

    }

}


app.get('/parser/result',(req,res)=>{
    f()
   res.send(data).status(200)
})


app.listen(port,()=>{

    console.log(`app running on port: ${port}`)
});
