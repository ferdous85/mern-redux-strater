const express = require('express')
const dotenv = require('dotenv')
const notes = require('./data/notes')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express()
dotenv.config()
connectDB()

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

app.use(notFound)
app.use(errorHandler)


app.get('/api/notes', (req, res)=>{
  res.send(notes)
})



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on ${PORT}`))