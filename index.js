const express=require('express');
const bodyParser=require('body-parser');
const provincesRouter=require("./src/routes/provinces");
const {validateXApiKey}=require('./src/utils/middleware');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(validateXApiKey);

app.use(provincesRouter);

app.listen(3000)
.on('listening',()=>{
    console.log('server is listening on port 3000');
})
.on('error',(err)=>{
    console.log("error: ",err);
})