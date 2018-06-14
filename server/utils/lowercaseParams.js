module.exports = function(req, res, next) {
  if(req.params.lan) req.params.lan = req.params.lan.toLowerCase();
  if(req.params.page) req.params.page = req.params.page.toLowerCase();
  next();
}
