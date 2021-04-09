const express = require('express')
const app = express()
const port = 3000
var expressSanitizer = require("express-sanitizer")

app.use(expressSanitizer())
app.use(express.static(__dirname+"/public"))
app.set("view engine",'ejs')

app.get('/:id',(req,res)=>{
  req.params.id = req.sanitize(req.params.id)
  res.render("index", {id: req.params.id})
})

app.get('*',(req,res)=>{
  res.send("Error : Page not found")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
