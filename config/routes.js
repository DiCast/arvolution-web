var c = require('./../server/controller.js');

var setLan = require('./../server/utils/setLan.js');

var lowercaseParams = require('./../server/utils/lowercaseParams.js');

module.exports = function(app) {
  app.get('/', c.renderIndex);
  app.get('/en', c.renderIndex);
  app.get('/es', c.renderSpanishIndex);

  app.get('/:lan/blog/:entry', lowercaseParams, c.renderBlogEntry);
  app.get('/blog/:entry', c.renderBlogEntry);

  app.get('/:lan/:page', lowercaseParams, c.renderPage);
  app.get('/:page', lowercaseParams, c.renderPage);

  // app.post('/contact', c.contactEmail);
}
