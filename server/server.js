const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const{ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {todo} = require('./models/todo');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.post('/todo',(req,res)=>{
    const newTodo = new todo({
        text: req.body.text
    });

    newTodo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todo',(req,res)=>{
    todo.find().then((result)=>{
        res.send({result});
    },(err)=>{
        res.status(400).send(err);
    });
});

app.get('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todo/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todo/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});


// ============USER==============

app.post('/user',(req,res)=>{
    const body = _.pick(req.body,['email','password']);
    const user = new User(body);

    user.save().then((user)=>{
        res.send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});
app.get('/user',(req,res)=>{
   user.find().then((result)=>{
        res.send(result);
   }),(err)=>{
       res.status(400).send(err);
   }
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})