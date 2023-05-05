const express = require('express')
const connectDB = require('./db/conn')

const app = express()
const port = 3000

app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectDB();