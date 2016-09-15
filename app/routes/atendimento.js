module.exports = function(app) {
	
	app.get('/atendimentos', function(req, res) {
		res.send('atendimentos...');
	})
	
}