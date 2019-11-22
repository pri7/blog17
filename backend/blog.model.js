/** Mongoose schema for our Todo entity **/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Blog = new Schema({
     blog_description: {
         type: String
     },
     blog_title: {
         type: String
     },
     blog_date: {
         type: String
     },

 });
 
 module.exports = mongoose.model('Blog', Blog);