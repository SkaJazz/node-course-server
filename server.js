const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

app.use((req,res,next) => {
	// console.log(req);
	var now = new Date().toString();
	var log = `${now} : ${req.method} : ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

// app.use((req,res,next) => {
// 	res.render('maitenance.hbs', {
// 		pageTitle: 'Сайт на обслуживании',
// 		greetingMessage: "Мы скоро вернёмся."
// 	}); 
// });

// Файлы доступны по прямым ссылкам
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.render('home.hbs', {
		pageTitle: 'Муми-блоггинг',
		greetingMessage: "Привет! Меня зовут Соня Трошина и я муми-блоггер."
	}); 
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'О нашем проекте',
		message: 'Муми-блоггинг: о Финляндии с любовью'
	});
});

app.get('/portfolio', (req,res) => {
	res.render('portfolio.hbs', {
		pageTitle: 'Портфолио',
		message: 'Страница портфолио (в разработке)'
	});
});

app.listen(port,() => {
	console.log(`Server is up on port ${port}!`);
});
	
