var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// you can change the database name e.g. myFourthTodo
mongoose.connect('mongodb+srv://test:test@cluster0.9jdsj.mongodb.net/myThirdTodo?retryWrites=true&w=majority')
// Create a schema = this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

// you can change the collection name e.g. ToDoExtra
var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers and ice-cream and char siew pao'}).save(function(err){
  if (err) throw err;
  console.log('item saved!');
})


var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding @$$' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('hello linus')
  });

  app.get('/todo', function (req, res) {
    res.render('todo', { todos: data });
  });
  app.post('/todo', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', function (req, res) {
    data = data.filter(function (todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  })

  // let data = []
  // app.get('/todo', function (req, res) {
  //   Todo.find({}, function (err, data) {
  //     if (err) throw err
  //     res.render('todo', { todos: data })
  //   })
  // });

  // app.post('/todo', urlencodedParser, function (req, res) {
  //   if (!req.body) {
  //     console.log('!req.body');
  //     console.log(req.body);
  //   } else {
  //     console.log(req.body);
  //     data.push(req.body);
  //     // push data back to client
  //     res.json(data);

  //     // push data to mongodb
  //     const itemTwo = Todo({
  //       item: req.body.item,
  //     }).save(function (err) {
  //       if (err) throw err;
  //       console.log('item saved', req.body.item);
  //     });
  //   }
  // });

  // app.delete('/todo/:item', function (req, res) {
  //   Todo.deleteOne({ item: req.params.item.replace(/\-/g, ' ') }, function (err, data) {
  //     if (err) throw err
  //     res.json(data)
  //   })
  // });
};