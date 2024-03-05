const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const PORT = process.env.PORT || 4000

// swagger doc
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml');
const { error } = require('console');

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())

let courses = [
    {
        id:"1",
        name:"Learn Django",
        price:599
    },
    {
        id:"2",
        name:"Learn Nodejs",
        price:349
    },
    {
        id:"3",
        name:"Learn Angularjs",
        price:699
    }
]


app.get("/",(req,res)=>{
    res.send("Hello, this is Doc application")
})

app.get("/api/v1/LCO",(req,res)=>{
    res.send("Hello from LCO")
})

app.get("/api/v1/lcoObject",(req,res)=>{
    res.send({id:"1",name:"Learn Backend",price:599})
})
app.get("/api/v1/courses",(req,res)=>{
    res.send(courses)
})

app.get("/api/v1/myCourse/:ID",(req,res)=>{
    const myCourse = courses.find(course => course.id === req.params.ID)
    if (myCourse) res.status(200).send(myCourse)
    res.status(400).send({error:"Wrong ID, please check again"})
})

app.post("/api/v1/addCourse",(req,res) => {
    console.log(req.body);
    courses.push(req.body)
    res.send(true)
})

app.get("/api/v1/courseQuery",(req,res) => {
    let location = req.query.location
    let device = req.query.device
    res.send({location,device})
})

app.post("/api/v1/courseUpload",(req,res) => {
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    file.mv(path,(error) => {
        res.send(true)
    })
})

app.listen(PORT,() =>{
    console.log("Running at 4000");
})