const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');

require('dotenv').config()
mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true,})

const conn = mongoose.connection;

let gfs;
conn.once('open', () => {
  gfs = gridfs(conn.db, mongoose.mongo);
  gfs.collection('Texas');
});

router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});


//GET
router.get('/', (req, res)=>{
    res.send("hello")
})



module.exports = router