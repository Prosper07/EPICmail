// Import packages
import express from 'express'
import bodyParser from 'body-parser'
//import router from './routes/routes';

// EPICmail app
const app = express()

//using body-parser
app.use(express.json())
app.use(bodyParser.json())

app.use(router)

// First route (Welcome page)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to EPICmail' })
})
// Starting server
app.listen(process.env.PORT || 5000, () => console.log('server running'))

export default app
