const express = require('express')
const cors = require('cors')
const axios = require('axios')
const data = require('./cardinfo.php.json')

const app = express()
app.use(cors());
const port = 3001

app.get('/:number', async (req, res) => {

    try {
        const num = req.params.number
        let src = data.data[num].card_images[0].image_url_cropped

        const response = await axios.get(src, {
            responseType: 'arraybuffer' 
        });

        const buffer = Buffer.from(response.data, 'binary');

        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);
    } catch (error) {
        console.error("Error occurred while fetching image:", error);
        res.status(500).send("Error occurred while fetching image");
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})