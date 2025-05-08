const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const morgan = require('morgan')
app.use(morgan('dev')) // Logging middleware

const linkRouter = require('./routes/link.routes')
const projectRouter = require('./routes/project.routes')
const cpLinkRouter = require('./routes/cpLink.routes')

const connection = require('./config/db.config')
connection()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Optional: To allow only a specific origin (e.g., your React app)
app.use(cors({
    origin: 'http://localhost:5173', // frontend port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/Social', linkRouter)
app.use('/Project', projectRouter)
app.use('/Programming', cpLinkRouter)

app.listen(process.env.PORT, (req , res) =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

