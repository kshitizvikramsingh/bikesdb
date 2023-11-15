const express=require("express")
const mongoose=require("mongoose")
var cors = require('cors')
const app=express()
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/bikes');
app.use(express.json());
const Bike = mongoose.model('Bike', { name: String,cost: String,date: String,option: String });

app.post("/bikes",(req,res)=>{
  const bike = new Bike({ name: req.body.name,cost: req.body.cost,date: req.body.date,option:req.body.option });
bike.save().then((data) => {
    console.log(req.body)
    
    res.json(req.body)
});
    
})
app.delete("/bikes",async(req,res)=>{
    const response=await Bike.deleteOne({ _id: req.body._id });
    
    res.json(response)
})
app.get("/bikes",async(req,res)=>{
    const response=await Bike.find({})
    res.json(response)
})


app.listen("80",()=>{
    console.log("app is up on port 80")
})