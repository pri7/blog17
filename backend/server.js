const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = express.Router(); // Create an instance of the Express Router
const PORT = 4000;

let Blog = require('./blog.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://pri7:pass1234@cluster0-v7vcw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

// mongoose.connect('mongodb://127.0.0.1:27017/blogs', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
     console.log("MongoDB database connection established successfully");
})

// GET: Retrieve list of all blogs from the MongoDB database.
blogRoutes.route('/').get(function (req, res) {
     Blog.find(function (err, blogs) {
          if (err) {
               console.log(err);
          } else {
               res.json(blogs);
          }
     });
});

// GET: Retrieve a blog item by providing an ID.
blogRoutes.route('/:id').get(function (req, res) {
     let id = req.params.id;
     Blog.findById(id, function (err, blog) {
          res.json(blog);
     });
});

// POST: Add New Blog Item to MongoDB Database.
blogRoutes.route('/add').post(function (req, res) {
     let blog = new Blog(req.body);
     blog.save()
          .then(blog => {
               res.status(200).json({ 'blog': 'blog added successfully' });
          })
          .catch(err => {
               res.status(400).send('adding new blog failed');
          });
});


// POST: Update a existing blog item by providing an ID.
blogRoutes.route('/delete').post(function (req, res) {
     console.log("phoch gya", req.body.id);
          Blog.remove({_id: req.body.id}).then(blog => {
               res.json('Blog Deleted!');
          })
               .catch(err => {
                    res.status(400).send("Delete not possible");
               });
});

// The router added as a middleware and take control of request starting with path '/blogs'
app.use('/blogs', blogRoutes);

app.listen(PORT, function () {
     console.log("Server is running on Port: " + PORT);
});