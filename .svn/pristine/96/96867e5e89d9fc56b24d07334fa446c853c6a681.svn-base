var express = require('express');
var router = express.Router();

// GET home page.
router.get('*', function(req, res) {
  res.render(req.originalUrl.slice(1), { previewUrl: '' });
});

module.exports = router;
