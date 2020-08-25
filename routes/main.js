const router = require('express').Router();
const User = require('../models/User');
const { isAuth, isLogin } = require('../middleware');
router.get('/', isLogin, (req, res) => {
	res.render('index');
});

router.post('/', (req, res) => {
	if (req.body.username === 'admin' && req.body.password === 'admin') {
		req.session.username = 'admin';
		res.redirect('/dash');
	} else {
		res.send('Noo');
	}
});

router.get('/dash', isAuth, (req, res) => {
	if (req.query.search) {
		const regex = new RegExp(req.query.search);
		User.find({ name: regex }).then((data) => {
			res.render('dash', { data: data });
		});
	} else {
		User.find({}).then((data) => {
			res.render('dash', { data: data });
		});
	}
});

router.get('/user', isAuth, (req, res) => {
	res.render('create');
});

router.get('/user/:id', isAuth, (req, res) => {
	const id = req.params.id;
	User.findById(id, (err, data) => {
		res.render('form', { data: data });
	});
});

router.put('/user/:id', isAuth, (req, res) => {
	const id = req.params.id;
	const upUser = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	};
	User.findByIdAndUpdate(id, upUser, (err, data) => {
		console.log(err);
		res.redirect('/dash');
	});
});

router.delete('/user/:id', isAuth, (req, res) => {
	const id = req.params.id;
	User.findByIdAndDelete(id, (err, data) => {
		console.log(err);
		res.redirect('/dash');
	});
});

router.post('/user', isAuth, (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	user.save((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/dash');
		}
	});
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
