import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/user/routes';
import router2 from './routes/message/routes';
import router3 from './routes/sent/routes';
import router4 from './routes/contact/routes';
import router5 from './routes/inbox/routes';
import router6 from './routes/group/routes';
import router7 from './routes/groupmbr/routes';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Managing routes
app.use(router);
app.use(router2);
app.use(router3);
app.use(router4);
app.use(router5);
app.use(router6);
app.use(router7);

// (Welcome page)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to EPICmail' })
})

// Port listening
app.listen(process.env.PORT || 5000, () => {
  console.log('surver running and listenning on port 5000');
});

export default app;