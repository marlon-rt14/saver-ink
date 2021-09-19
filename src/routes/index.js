const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	// res.send('Pagina de inicio');
	res.render('index');
});

module.exports = router;