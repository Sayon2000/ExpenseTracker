const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const https = require('https')

const mongoose = require('mongoose')

const app = express();

require('dotenv').config()


// const expenseRoutes = require('./routes/expense')
const userRoutes = require('./routes/user')
// const paymentsRoutes = require('./routes/purchase')
// const premiumRoutes = require('./routes/premium')

// const User = require('./models/user')
// const Expense = require('./models/expense')
// const Order = require('./models/order')
// const Download = require('./models/download')

// const passwordRoutes = require('./routes/forgot-password')
// const resetPassword = require('./models/resetPassword')
// const reportRoutes = require('./routes/report')

app.use(cors())
app.use(express.json())
// app.use(helmet())
app.use(compression())


// const accessLogStream = fs.createWriteStream(path.join(__dirname , 'access.log'),{flags : 'a'})


// app.use(morgan('combined',{ stream :accessLogStream}))


// app.use('/expense' , expenseRoutes)
app.use('/user' , userRoutes)
// app.use('/payment' , paymentsRoutes)
// app.use('/premium' , premiumRoutes)
// app.use('/password', passwordRoutes)
// app.use('/report' , reportRoutes)

app.use(express.static(path.join(__dirname , '..' , 'frontend')))




mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('connected')
    app.listen(4000)

    
}).catch(e => console.log(e))
