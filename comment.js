//create web server
//npm install express
const express = require('express');
const app = express();
const port = 3000;

//npm install body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//npm install mongodb
const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    db = client.db('commentdb');
});

app.post('/comment', (req, res) => {
    db.collection('comments').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    db.collection('comments').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.send(result);
    });
});

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

//npm install ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.collection('comments').find().toArray((err, result) => {
        if (err) return console.log(err);
        res.render('index.ejs', {comments: result});
    });
});

app.post('/comment', (req, res) => {
    db.collection('comments').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
        res.redirect('/');
    });
});