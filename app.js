const express = require('express');
const app = express();
const main = require('./routes/main');
const mongoose = require('mongoose');
const User = require('./models/User');
const methodOverride = require('method-override');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

app.use(
	session({
		secret: 'I am the king of the whole wide world',
		resave: false,
		saveUninitialized: true
	})
);
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(main);
mongoose
	.connect(process.env.DatabaseUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('Mongoose connected'));

app.listen(process.env.PORT, process.env.IP, console.log('App running on port 3030'));
