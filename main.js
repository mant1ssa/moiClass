import express from 'express'

const app = express();

app.get('/', (req, res) => {
    console.log("hello main");

    res.status(200).send('hello')
})

app.listen(5000, () => {
    console.log(`Server is listening on port ${5000}`)
})