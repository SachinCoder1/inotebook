const connectToMongo = require('./db')
connectToMongo()
var cors = require('cors')

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello ashley!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})