const express = require('express')
const app = express()
const port = 3000
var expressSanitizer = require("express-sanitizer")
var bodyParser = require('body-parser');
var methodOverride = require("method-override")
var mongoose  = require("mongoose")

mongoose.connect("mongodb://localhost/hackpast", { useUnifiedTopology: true , useNewUrlParser: true })
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressSanitizer())
app.use(express.static(__dirname+"/public"))
app.set("view engine",'ejs')

var Sample = require("./models/sample")

app.get('/:id',(req,res)=>{
  req.params.id = req.sanitize(req.params.id)
  var newSample = new Sample({
    name:req.params.id
  })

  newSample.save((err, sample)=>{
    if(err){
      console.log("error")
    }else{
      console.log("saved")
      console.log(sample)
    }
  })

  res.render("index", {id: req.params.id})
})

app.get('*',(req,res)=>{
  res.send("Error : Page not found")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
