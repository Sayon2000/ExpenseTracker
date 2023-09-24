const express = require('express')
const cors = require('cors')

const app = express();

const sequelize = require('./util/db')
const expenseRoutes = require('./routes/expense')

app.use(cors())
app.use(express.json())

app.use('/expense' , expenseRoutes)


sequelize.sync().then((result) => {
    app.listen(4000)
}).catch(e => console.log(e))

