const fs = require('fs');
const dot = require('dot');
const parseXMLString = require('xml2js').parseStringSync;

// var i18n = require('../i18n');
const englishi18n = require('../i18n/en.json');
const spanishi18n = require('../i18n/es.json');
const baseViews = `${__dirname}/../views`;
const html = {};
const defs = {};

// Compile dots .def files
fs.readdirSync(baseViews)
  .forEach(file => {
    if(file.indexOf('.def') < 0) return;
    defs[file.slice(0, -4)] = (fs.readFileSync(`${baseViews}/${file}`, 'utf8'));
  });

// Create html object from files
fs
  .readdirSync(baseViews)
  .forEach((folder) => {
    if(!fs.lstatSync(`${baseViews}/${folder}`).isDirectory()) return;
    var template, english, spanish, data;
    fs
      .readdirSync(`${baseViews}/${folder}`)
      .forEach((file) => {
        const contents = fs.readFileSync(`${baseViews}/${folder}/${file}`, 'utf8');

        if(file.indexOf('.dot') > 0) template = dot.template(contents, undefined, defs);
        if(file.indexOf('.en.xml') > 0) english = parseXMLString(contents);
        if(file.indexOf('.es.xml') > 0) spanish = parseXMLString(contents);
        if(file.indexOf('.data.json') > 0) data = require(`${baseViews}/${folder}/${file}`);
      })

    if(!template) console.log(`WARNING: Missing template for: ${folder}`);
    if(!english) console.log(`WARNING: Missing English translation for: ${folder}`);
    if(!spanish) console.log(`WARNING: Missing Spanish translation for: ${folder}`);
    if(!template || !english || !spanish) return console.log(`WARNING: Skipping ${folder} compilation`);

    spanish.content.i18n = spanishi18n;
    english.content.i18n = englishi18n;
    spanish.content.data = data;
    english.content.data = data;

    html[folder] = {
      es: template(spanish.content),
      en: template(english.content),
    };

  })


function renderPage(req, res, next) {
  let { page, lan } = req.params;
  if(!lan) lan = 'en';
  if(['es', 'en'].indexOf(lan) === -1) return res.send('404 Not found');
  if(!html[page]) return res.send('404 Not found');
  res.send(html[page][lan]);
}

function renderIndex(req, res, next) {
  res.send(html['index']['en']);
}

function renderSpanishIndex(req, res) {
  res.send(html['index']['es']);
}

function renderBlogEntry(req, res) {
  let { lan } = req.params;
  if(!lan) lan = 'en';
  if(['es', 'en'].indexOf(lan) === -1) return res.send('404 Not found');
  res.send(html['blog-entry'][lan]);
}

module.exports = {
  renderPage,
  renderIndex,
  renderSpanishIndex,
  renderBlogEntry,
}
