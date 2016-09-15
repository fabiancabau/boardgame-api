module.exports = function(app) {
	
	var Usuario = require('../models/usuario');
	var Cliente = require('../models/cliente');

	/* FEATURES CLIENTE */
	/* GET all clientes com seu respectivo usuário */
	app.get('/clientes', function(req, res) {
		Cliente.find({}).exec(function(err, clientes){
			Usuario.populate(clientes, {path: "usuario"}, function(err, clientes) {
				if (err) {
					res.status(500).json(err);
					console.log(err);
				}
				res.json(clientes);
				console.log(clientes);
			})
		})
	})

	/* GET cliente de um determinado usuário */
	app.get('/clientes/:id', function(req, res) {
		Cliente.findById(req.params.id).exec(function(err, clientes){
			Usuario.populate(clientes, {path: "usuario"}, function(err, clientes) {
				if (err) {
					res.status(500).json(err);
					console.log(err);
				}
				res.json(clientes);
				console.log(clientes);
			})
		})
	})

	/* ADD cliente de um determinado usuário */
	app.post('/clientes', function(req, res) {
		Cliente = new Cliente(req.body);
		Cliente.usuario._id = req.body.usuario._id;
		
		Cliente.save(function(err, clientes) {
			if (err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(clientes);
			console.log(clientes);
		})
	})

	/* UPDATE cliente */
	app.put('/clientes/:id', function(req, res) {
		Cliente.findByIdAndUpdate(req.params.id, req.body, function(err, cliente) {
			if (err) {
				res.status(500).json(err);
				console.log(err);
			} 
			res.json(cliente);
			console.log(cliente);
		})
	})

	/* DELETE cliente */
	app.delete('/clientes/:id', function(req, res) {
		Cliente.findOneAndRemove({_id: req.params.id}, function(err, cliente) {
			if(err) {
				res.status(500).json(err);
				console.log(err);
			} 
			res.json(cliente);
			console.log(cliente);
		})
	})
	/* END FEATURES CLIENTE */


	/* FEATURES NOTA */
	/* ADD nota */
	app.post('/clientes/notas', function(req, res) {
		Cliente.findById(req.body.clienteId, function(err, cliente) {
			if(!err) {
				cliente.nota.push({
					dt_nota: req.body.dt_nota,
					texto: req.body.texto,
					clienteId: req.body.clienteId
				})

				cliente.save(function(err, nota) {
					if (err) {
						res.status(500).json(err);
						console.log(err);
					}
					res.json(nota);
					console.log(nota);
				})
			}
		})
	})

	/* GET uma nota por id */
	app.get('/clientes/notas/:id', function(req, res) {
		Cliente.findById(req.body.id, function(err, nota) {
			if (err) {
				res.status(500).json(err);
				console.log(err);
			}
			res.json(nota);
			console.log(nota);
		})
	})

	/* END FEATURES NOTA */
}