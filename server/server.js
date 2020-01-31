const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {todo} = require('./models/todo');
const {user} = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
    const newTodo = new todo({
        text: req.body.text
    });

    newTodo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.send("Bad Request");
    });
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})