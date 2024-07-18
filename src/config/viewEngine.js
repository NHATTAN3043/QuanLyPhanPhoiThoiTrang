import express from "express"
var path = require('path')
const { engine } = require('express-handlebars');
const Handlebars  = require('../helpers/handlebars')
// Lấy đường dẫn của thư mục hiện tại
const currentDir = __dirname;

// Lấy đường dẫn của thư mục cha
const parentDir = path.dirname(currentDir);

const configViewEgine = (app) => {    
    //temple engine
    app.engine('hbs',
        engine({
        extname: '.hbs',
        handlebars: Handlebars,
        defaultLayout: 'main', // Đặt layout mặc định là 'main'
        layoutsDir: path.join(parentDir, 'resources', 'views', 'layouts'),
        partialsDir: path.join(parentDir, 'resources', 'views', 'partials'),
    }));

    app.set('view engine', 'hbs');
    app.set('views', path.join(parentDir, 'resources','views'))
    console.log('PATH:'+ path.join(parentDir, 'resources','views') )
}

export default configViewEgine
