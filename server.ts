require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const gridfs = require('gridfs-stream');

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true,})
//const db = mongoose.connection
//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log("Connecting to database"))
const conn = mongoose.connection;
conn.once('open', () => console.log("Connecting to database"))
/*
let gfs;
conn.once('open', () => {
  gfs = gridfs(conn.db, mongoose.mongo);
  gfs.collection('Texas');
});

app.get('Texas/filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ message: 'File not found' });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
*/
app.use(express.json())

const TexasRouter = require('./routes/Texas')
app.use('/Texas', TexasRouter)

app.listen(4000, () => console.log('Server listening'))


