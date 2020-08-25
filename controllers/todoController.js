var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://nishant_rout:laltu@1999@to-do-app-6wskq.mongodb.net/todo?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true }, 
()=> console.log("Connected to database")
);

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo= mongoose.model('Todo', todoSchema);

//var data =[{item: 'complete assignment'}, {item: 'play game'}, {item: 'nodejs tutorial'}];
var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app){
    app.get('/todo', function(req, res){
        //get data from database and pass it to view
        Todo.find({}, function(err, data){
            if(err) throw err;
            res.render('todo',{todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        //get data from view and add it to database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from database
        Todo.find({item : req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};