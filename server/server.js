import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import user from './routes/user/routes';
import sent from './routes/sent/routes';
import inbox from './routes/inbox/routes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Managing routes
app.use(user);
app.use(sent);
app.use(inbox);

// (Welcome page)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to EPICmail' })
})

// Port listening
app.listen(process.env.PORT || 5000, () => {
  console.log('server running and listenning on port 5000');
});

export default app;