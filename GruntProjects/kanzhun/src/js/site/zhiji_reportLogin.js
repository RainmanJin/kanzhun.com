require.config({
	baseUrl: '/js/site',
	paths: {
		u: '../utils',
		c: '.',
    comp: '../../components'
	}
});

require(['c/auth_dialog'], function(auth_dialog) {
	$(function() {
		auth_dialog.open("#login");
	});
});