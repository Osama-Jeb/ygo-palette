const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors());
const port = 3001


let data;

axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', { responseType: 'json' })
    .then(res => {
        data = res.data
    })
    .catch(error => {
        console.error('Error making API call:', error.message);
    });

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