import express from "express"
var path = require('path')
const { engine } = require('express-handlebars');

const configViewEgine = (app) => {
    app.use(express.static(path.join(__dirname, 'public')))
    
    //temple engine
    app.engine('hbs',
    engine({
    extname: '.hbs',
    helpers: {}      

    }));

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, './views'))

}

export default configViewEgine
