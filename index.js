const express = require("express");
const MoviesInfo = require("./model/moviesDb");
const path = require('path');


const app = new express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build'))); 



// cors policy
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();

})


app.get('/',(req,res) => {
    res.send("hellooo")
})
app.post('/api/create',(req,res) => {
    try {
        console.log(req.body);
        let movies = new MoviesInfo(req.body);  //passing the data to database
        movies.save(); //saving to db
        res.send("Data Added");
    
    }
    catch (error) {      //error msg
        res.status(500).send(error);
    }
  
});

app.get('/api/view', async (req, res)=> {
    try {
        let result = await MoviesInfo.find();
        res.json(result);

    }
    catch (error) {      //error msg
        res.status(500).send(error);
    }
});


app.post('/api/update',async (req,res) => {
    try{
        console.log("update",req.body)
        let result = await MoviesInfo.findByIdAndUpdate(req.body._id,req.body);
        console.log("result",result);
        res.json(result);
        res.send ("Data Update");
    }
    catch (error) {      //error msg
        res.status(500).send(error);
    }
});


app.post('/api/delete' , async(req, res) =>{
    try{

        let result =await MoviesInfo.findByIdAndDelete(req.body._id,req.body);
        res.send("Data Deleted");
    }
    catch (error) {      //error msg
        res.status(500).send(error);

    }
})

app.post('/api/search',  async (req, res) => {
    try {
        // let result = await MoviesInfo.find(req.body);
        let result = await MoviesInfo.find({"Moviename":{$regex:'.*' + req.body.Moviename + '.*'}});
        res.json(result);
    } 
    catch (error) {
        res.status(500).send(error);
        
    }
})

app.get('/*',function (req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
});
app.listen(5003,()=>{
    console.log("helloo world");
})