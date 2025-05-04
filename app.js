const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const linkRouter = require('./routes/link.routes')
const projectRouter = require('./routes/project.routes')
const cpLinkRouter = require('./routes/cpLink.routes')

const connection = require('./config/db.config')
connection()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', linkRouter)
app.use('/project', projectRouter)
app.use('/cplink', cpLinkRouter)

app.listen(process.env.PORT, (req , res) =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})

