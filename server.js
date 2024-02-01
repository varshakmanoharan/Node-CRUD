const express = require('express')
const mongoose = require('mongoose')
const Task =require('./models/task')
const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('This is a crud app')
})
app.get('/blog',(req,res)=>{
    res.send('This is a crud app')
})
app.get('/task',async (req,res)=>{
    try {
        const task = await Task.find({});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
app.get('/task/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// send task
app.post('/task',async (req,res)=>{
   try {
    const task = await Task.create(req.body)
    res.status(200).json(task);
    } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
   }
})

// update a task
app.put('/task/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        if(!task){
            return res.status(404).json({message: `cannot find any task with ID ${id}`})
        }
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a task

app.delete('/task/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const task = await  Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: `cannot find any  task with ID ${id}`})
        }
        res.status(200).json( task);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:12345admin@crudapi.jwxzp8l.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=>{
    console.log('Node Api app is running on port 3000');
});
   
}).catch((error) => {
    console.log(error)
})