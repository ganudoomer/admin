module.exports = {
	isAuth: (req, res, next) => {
		if (req.session.username === 'admin') {
			next();
		} else {
			res.redirect('/');
		}
	},
	isLogin: (req, res, next) => {
		if (req.session.username === 'admin') {
			res.redirect('/dash');
		} else {
			next();
		}
	}
};
