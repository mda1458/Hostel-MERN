const express = require('express')
const connectDB = require('./utils/conn')

const app = express()
const port = 3000

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/authRoutes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
