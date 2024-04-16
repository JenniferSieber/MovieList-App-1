require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 8000
const { MongoClient } = require('mongodb')

let db,
  dbName = 'movie-1',
  dbString = process.env.DB_STRING 

MongoClient.connect(dbString)
  .then(client => {
    console.log(`API connected to: ${dbName}`)
    db = client.db(dbName)
  })

// --Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// --Routes
app.get('/', (req, res) => {
  db.collection('movies').find().sort({ likes: -1 }).toArray()
    .then(data => {
      res.render('index.ejs', { info: data })
    })
    .catch(err => console.error(err))
})

app.post('/addMovie', (req, res) => {
  db.collection('movies').insertOne({
    movieName: req.body.movieName,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    imgLink: req.body.imgLink, 
    likes: 0,
  })
  .then(result => {
    console.log(`added to List`)
    res.redirect('/')
  })
  .catch(err => console.error(err))
})

app.put('/updateLikes', (req, res) => {
  db.collection('movies').updateOne({
    movieName: req.body.movieNameS,
    genre: req.body.genreS,
    releaseYear: req.body.releaseYearS,
    imgLink: req.body.imgLinkS,
    likes: req.body.likesS
  }, {
    $set: {
      likes: req.body.likesS + 1
    }
  }, {
    sort: { _id: -1 },
    upsert: true
  })
  .then(result => {
    console.log(`update movie likes`)
    res.json(`Update likes:`)
  })
})

app.delete('/deleteMovie', (req, res) => {
  db.collection('movies').deleteOne({ movieName: req.body.movieNameS })
    .then(result => {
      console.log('Delete Movie')
      res.json(`Deleted`)
    })
    .catch(err => console.error(err))
})

// --PORT Listener
app.listen(PORT || process.env.PORT, () => {
  console.log(`Server running on Port: ${PORT}`)
})
