const express = require('express')
const cors = require('cors')

const app = express();

const sequelize = require('./util/db')
const expenseRoutes = require('./routes/expense')
const userRoutes = require('./routes/user')

const User = require('./models/user')
const Expense = require('./models/expense')

app.use(cors())
app.use(express.json())

User.hasMany(Expense)
Expense.belongsTo(User)

app.use('/expense' , expenseRoutes)
app.use('/user' , userRoutes)


sequelize
.sync()
// .sync({force : true})
.then((result) => {
    app.listen(4000)
}).catch(e => console.log(e))

