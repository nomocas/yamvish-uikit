// --buddyfile: ../../../scss/views/_login.scss
var yam = require('yamvish'),
	y = require('./uikit-api');

module.exports = yam.toAPI('app', {
	login: function() {
		return this.agoraView('login',
			y()
			//_________________________________
			.section(
				y.id('login')
				.fade()
				.cl('registration')
				// .visible('{{ show }}')
				.click(function(e) {
					e.stopPropagation();
					if (e.target.id === 'login') {
						this.toggle('show')
							.set('page', null);
					}
				})
				//___________________________________ LOGIN FORM
				.div(
					y.cl('logo')
					.h(2, 'made.in')
				)
				.div(
					y.cl('login-panel')
					.visible('{{ page !== "forget-password" }}')
					.errorBox(
						y.visible('{{ $error.login }}')
						.text('{{ $error.login }}')
					)
					.form(
						y.attr('method', 'POST')
						.cl('formi')
						.submit(function(e) {
							e.preventDefault();
							this.set('$error.login', '');
							var credential = {
									// obliged to get it directly from dom because auto filled form doesn't fire input 
									email: e.target['login-email'].value,
									password: e.target['login-password'].value
								},
								self = this;
							this.env.data.login(this, credential)
								.then(function(s) {
									self.toAgora('login:hide')
									self.set('user', {})
										.set('$error.login', null)
										.set('page', null);
								}, function(error) {
									if (error.status === 401 && error.data.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED')
										self.set('$error.login', 'Please verify your email before login.')
									else
										self.set('$error.login', 'Login failed.')
								});
						})
						.inputField({
							id: 'login-email',
							val: '',
							// path: 'user.email',
							icon: 'user',
							placeholder: 'email',
							required: true
						})
						.inputField({
							id: 'login-password',
							type: 'password',
							val: '',
							// path: 'user.password',
							icon: 'lock',
							placeholder: 'password',
							required: true
						})
						.div(
							y.input('submit', 'Sign in')
						)
					)
					.p(
						y.text('Not a member ? ')
						.a('/sign-up', 'sign up now',
							y.click(function(e) {
								e.preventDefault();
								this.toggle('show');
							})
							.clickTo('/sign-up')
						)
					)
					.p(
						y.a('#', 'Forgot your password',
							y.click(function(e) {
								e.preventDefault();
								this.set('page', 'forget-password');
							})
						)
						.text(' ? ')
					)
				)
				.use('app:forgotPassword')
			)
		);
	},
	forgotPassword: function() {
		return this //____________________________ LOST PASSWORD
			.div(
				y.cl('forget-password-panel')
				.visible('{{ page === "forget-password" }}')
				.h(3, 'recover your password')
				.form(
					y.attr('method', 'POST')
					.cl('formi')
					.submit(function(e) {
						e.preventDefault();
					})
					.inputField({
						id: 'forget-pass-email',
						val: '',
						path: 'user.email',
						icon: 'user',
						placeholder: 'email',
						required: true
					})
					.div(
						y.input('submit', 'Check')
					)
				)
				.p(
					'Not a member ? ',
					y.a('#', 'sign up now',
						y.click(function(e) {
							e.preventDefault();
							this.toggle('show')
								.set('page', null);
						})
						.clickTo('/sign-up')
					)
				)
				.p(
					y.a('#', 'would login',
						y.click(function(e) {
							e.preventDefault();
							this.set('page', null);
						})
					)
					.text(' ? ')
				)
			);
	}
});