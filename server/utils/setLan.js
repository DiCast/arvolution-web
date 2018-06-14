module.exports = function setLan(req, res, next) {
  var lan = req.params.lan

  if(!lan) res.locals.lan = 'en';
  if(lan === 'en') res.locals.lan = 'en';
  if(lan === 'es') res.locals.lan = 'es';

  if(!res.locals.lan) return notFound(req, res)
  next()
}
