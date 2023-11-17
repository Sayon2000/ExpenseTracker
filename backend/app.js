const express = require('express')
const cors = require('cors')

const app = express();

const sequelize = require('./util/db')

const expenseRoutes = require('./routes/expense')
const userRoutes = require('./routes/user')
const paymentsRoutes = require('./routes/purchase')
const premiumRoutes = require('./routes/premium')

const User = require('./models/user')
const Expense = require('./models/expense')
const Order = require('./models/order')
const passwordRoutes = require('./routes/forgot-password')
const resetPassword = require('./models/resetPassword')
const reportRoutes = require('./routes/report')

app.use(cors())
app.use(express.json())

User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(resetPassword)
resetPassword.belongsTo(User)

app.use('/expense' , expenseRoutes)
app.use('/user' , userRoutes)
app.use('/payment' , paymentsRoutes)
app.use('/premium' , premiumRoutes)
app.use('/password', passwordRoutes)
app.use('/report' , reportRoutes)


sequelize
.sync()
// .sync({force : true})
.then((result) => {
    app.listen(4000)
}).catch(e => console.log(e))

