var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require("body-parser");
const cheerio = require('cheerio')
var request = require("request");
const mongoose = require('mongoose');
const Story = require("./storyModel");
const $PORT  = process.env.PORT || 3000;
 
var app = express();

const savedLinks = [
  { title: 'These Data Sets Are Just Waiting for Your Next Creative ProjectYesterday 10:00am',
  link: 'https://lifehacker.com/these-data-sets-are-just-waiting-for-your-next-creative-1826947365',
  summary: 'Artificial intelligence isn’t just for scary algorithms poised to take over our lives—it can also be a fun thing to play with, as we learned when we trained a computer to generate Lifehacker headlines. But you can’t play until you have some good data sets to start with.' },
{ title: 'I\'m FreshBooks Co-Founder Mike McDerment, and This Is How I Work5/23/18 2:00pm',
  link: 'https://lifehacker.com/im-freshbooks-co-founder-mike-mcderment-and-this-is-ho-1825693501',
  summary: 'Invoicing service FreshBooks is part of the software canon for freelancers and entrepreneurs. It’s shown up in Lifehacker recommendations from 2009 to 2018, and it’s still one of the best ways to stay sane when billing multiple clients. Two years ago, the company rolled out an entirely new version that it had secretly…' },
{ title: 'Teach Yourself Computer Science Using This Site 4/03/18 3:00pm',
  link: 'https://lifehacker.com/teach-yourself-computer-science-using-this-site-1824287559',
  summary: 'Lifehacker has collected a lot of “learn to code” resources that are especially helpful to new learners. But if you’ve already done a little coding or taken just a couple courses, and you want a more thorough education in both theory and practice, start with the site Teach Yourself Computer Science.' },
{ title: 'Become a Deep Learning Coder From Scratch in Under a Year2/06/18 11:45am',
  link: 'https://lifehacker.com/become-a-deep-learning-coder-from-scratch-in-under-a-ye-1822763353',
  summary: 'Machine learning (aka A.I.) seems bizarre and complicated. It’s the tech behind image and speech recognition, recommendation systems, and all kinds of tasks that computers used to be really bad at but are now really good at. It involves teaching a computer to teach itself. And you can learn to do it in well under a…' },
{ title: 'How to Build Your Own App If You Don\'t Know How to Code1/31/18 2:00pm',
  link: 'https://lifehacker.com/how-to-build-your-own-app-if-you-dont-know-how-to-code-1822376541',
  summary: 'In our series Getting It, we’ll give you all you need to know to get started with and excel at a wide range of technology, both on and offline. Here, we’re walking you through the process of creating your own app by examining five software tools  to get the job done.' },
{ title: 'Learn a Coding Language in 201812/21/17 1:00pm',
  link: 'https://lifehacker.com/learn-a-coding-language-in-2018-1821503751',
  summary: 'Changing career paths, getting an idea for an app out of your head, or just learning something new and useful are all great reasons to get started programming. Learning a programming language might sound as intimidating as learning an actual foreign language, but with the right tips, hints, and resources (conveniently…' },
{ title: 'I\'m Brian Fox, Author of the Bash Shell, and This Is How I Work12/13/17 9:00am',
  link: 'https://lifehacker.com/im-brian-fox-author-of-the-bash-shell-and-this-is-how-1820510600',
  summary: 'Brian Fox is a titan of open source software. As the first employee of Richard Stallman’s Free Software Foundation, he wrote several core GNU components, including the GNU Bash shell. Now he’s a board member of the National Association of Voting Officials and co-founder of Orchid Labs, which delivers uncensored and…' },
];



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapedData";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
app.use(express.static('public'));
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 
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

app.get('/load', function (req, res) {
  Story.find({}).then((info) => res.render('saved', {"news" : info})
  )

  
});

app.post('/api/save', function (req, res) {
  console.log(req.body.title)
  data ={
    title:req.body.title,
    link:req.body.link,
    summary: req.body.summary
  }
  Story.create(data)
    .then((dbStory) => res.json("Story Saved"))
    .catch((err) => res.json(err))
});


app.delete('/api/:id', function(req,res ){
  Story.findByIdAndRemove(req.params.id, (err, todo) => {
    if (err) return res.status(500).send(err);

    const response = {
      message: "Todo successfully deleted",
      id: todo._id
  };
  return res.status(200).send(response);
  })
 
})
app.listen($PORT);