var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");
const cheerio = require('cheerio')
var request = require("request");
//const mongoose = require('mongoose');
 
var app = express();


//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapedData";

//mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
app.use(express.static('public'));
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

 
app.get('/', function (req, res) {
  request("https://lifehacker.com/tag/programming", function(error, response, html) {
    var $ = cheerio.load(html);
    var results = [];
    $("div .js_post-wrapper").each(function(i, element) { 
      var title = $(element).find(".js_entry-link").text();
      var link = $(element).find(".js_entry-link").attr("href");
      var summary = $(element).find(".entry-summary").text();
      results.push({
        title: title,
        link: link,
        summary: summary
      });
    });
    res.render('home', {"news" : results})
  })

});

app.get('/api/save', function (req, res) {
  
});

app.listen(3000);