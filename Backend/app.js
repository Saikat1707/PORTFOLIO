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
app.use(cors({
    origin: 'https://saikatportfolio-alpha.vercel.app', // frontend port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use('/uploads', express.static('public/uploads'));

app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.use('/Social', linkRouter)
app.use('/Project', projectRouter)
app.use('/Programming', cpLinkRouter)

app.listen(process.env.PORT, (req , res) =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

