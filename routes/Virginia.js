const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const gridfs = require('gridfs-stream');

require('dotenv').config()
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, })

const conn = mongoose.connection;

/*
let gfs;
conn.once('open', () => {
  gfs = gridfs(conn.db, mongoose.mongo);
  gfs.collection('Virginia');
});

router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});
*/

const GeoJSONModel = require("../src/components/Schemas/GeoJSONSchema")

conn.once('open', async () => {
    router.get('/find?', async (req, res) => {
        try {
            const party = req.query.party || 'R';
            const result = await GeoJSONModel.find({ 'properties.Party': party  });
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
    router.get('/findDistrict?', async (req, res) => {
        try {
            const district = req.query.district || '1';
            const result = await GeoJSONModel.find({ 'properties.District_Num': district  });
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
    router.get('/findName?', async (req, res) => {
        try {
            const name = req.query.name || '1';
            const result = await GeoJSONModel.find({ 'properties.LastName': name  });
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
    router.get('/all', async (req, res) => {
        try {
            const result = await GeoJSONModel.find();
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    });
});
router.get('/', (req, res) => {
    res.send("You are querying at Virginia Collection")
})



module.exports = router