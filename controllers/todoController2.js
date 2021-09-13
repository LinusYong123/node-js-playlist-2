var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// async function main() {
//   await mongoose.connect('mongodb+srv://test:test@cluster0.9jdsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
// }

// you can change the database name e.g. myFourthTodo
mongoose.connect('mongodb+srv://test:test@cluster0.9jdsj.mongodb.net/myThirdTodo?retryWrites=true&w=majority')

// mongoose.connect('mongodb+srv://test:test@todo.pztll.mongodb.net/todo?retryWrites=true&w=majority')

// Connect to the database
// mongoose.connect('mongodb+srv://test:test@lorem.4pnih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Create a schema = this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

// you can change the collection name e.g. ToDoExtra
var Todo = mongoose.model('TodoMore', todoSchema);
// var itemOne = Todo({item: 'buy flowers and ice-cream and char siew pao'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved!');
// })

// let ToDoMore = mongoose.model('ToDoMoreAgain', todoSchema)
// let itemA = ToDoMore({item: 'eat noodle soup'}).save(function(err){
//   if (err) throw err
//   console.log('itemA saved')
// })


let data = []
// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding @$$' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('hello linus')
  });

  app.get('/todo', function (req, res) {
    res.render('todo', { todos: data });
  });
  // app.post('/todo', urlencodedParser, function(req, res){
  //   data.push(req.body);
  //   res.json(data);
  // });

  app.delete('/todo/:item', function (req, res) {
    data = data.filter(function (todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);

  })

  app.get('/todo', function (req, res) {
    Todo.find({}, function (err, data) {
      if (err) throw err
      res.render('todo', { todos: data })
    })
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    // if (!req.body) {
    //   console.log('!req.body');
    //   console.log(req.body);
    // } else {
    //   console.log(req.body);
    //   data.push(req.body);
    //   // push data back to client
    //   res.json(data);

    // push data to mongodb
    const itemTwo = Todo({
      item: req.body.item,
    }).save(function (err) {
      if (err) throw err;
      console.log('item saved', req.body.item);
    });
  }
  });

app.delete('/todo/:item', function (req, res) {
  // const item = req.params.item.replace(/\-/g, ' ')
  // Todo.deleteOne({item: item}, (err) => {
  //   if (err) console.log('error deleting')
  //   else console.log('delete successfully')
  // })

  // Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(function (err, data) {
  //   if (err) throw err
  //   res.json(data)
  // })

  Todo.deleteOne({ item: req.params.item.replace(/\-/g, ' ') }, function (err, data) {
    if (err) throw err
    res.json(data)
  })
});
};