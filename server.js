require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const app = express();

// Establish Connection
function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database');
    }
    catch(err){
        console.log(err);
    }
}
connect();

//Schema Person
var personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
});

//creation of the model
const Person = mongoose.model('Person', personSchema);

//creating Person
var person = new Person({
    name: 'Offiong Ebeiyamba',
    age: 24,
    favoriteFoods: ['Egusi', 'Bread']
});

//Registering Person
person
    .save()
    .then(console.log('Person registration successful.'))
    .catch(err => {
        console.error(err)
    })

//creating People
const arrayOfPeople = [
    { name: 'David Mark', age: 27, favoriteFoods: ['Pasta', 'Rice'] },
    { name: 'Barry Lawn', age: 30, favoriteFoods: ['Hamburger', 'Salad'] },
    { name: 'Rose Park', age: 27, favoriteFoods: ['Salad'] }
];
Person
    .create(arrayOfPeople)
    .then(console.log('Person registration successful.'))
    .catch(err => {
        console.error(err)
    })

//Search all people
Person
    .find()
    .then(docs => {
        console.log('People found.',docs)
    })
    .catch(err => {
        console.error(err)
    })

//Search all people who like rice
Person
    .findOne({ favoriteFoods: {'$in':'Rice' }})
    .then(doc => {
        console.log('People found.',doc)
    })
    .catch(err => {
        console.error(err)
    })

//Search people by ID
var idUser = '6467a453554258b1b7226124';
Person
    .findById(idUser)
    .then(doc => {
        console.log('People found.',doc)
    })
    .catch(err => {
        console.error(err)
    })

var id = '6467a453554258b1b7226124';
Person
    .findById(id)
    .then(doc => {
        doc.favoriteFoods.push('Hamburger')
        doc.save()
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })


Person
    .findOneAndUpdate({name: 'David Mark'}, { age: 20 },{ new: true })
    .then(doc =>{
        console.log('updated age:',doc)
    })
    .catch(err => {
        console.error(err)
    })


var idDel = '6467a38fa1aea7b38c7f99ed'
Person
    .findByIdAndRemove(idDel)
    .then(console.log(`Person with ${idDel} deleted.`))
    .catch(err => {
        console.error(err)
    })


Person
    .deleteMany({name:'David Mark'})
    .then(console.log('person called David Mark deleted.'))
    .catch(err => {
        console.error(err)
    })


Person
    .find({ favoriteFoods: {'$in':'Salad'}})
    .sort('name')
    .limit(2)
    .select()
    .then(docs => {
        console.log('people who love salad:', docs)
    })
    .catch(err => {
        console.error(err)
    })

//Server
app.listen(port,
    () => console.log(`Server is running on port ${port}`)
);