const express = require('express');
const path = require('path');

const {Op} = require("sequelize");
const db = require('./db');

const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', async (req, res) => {
        //TODO: need tome correction for server time
        const dateobj = new Date();
        const time = dateobj.toLocaleString("en-US", {timeZone: "Europe/Kiev"}).slice(11,16);
        // let hour = parseFloat(dateobj.getHours());
        // hour = hour < 10 ? '0' + hour : '' + hour;
        // // let minutes = (dateobj.getMinutes());
        // const time = `${hour}:${dateobj.getMinutes()}`;
        const isWorkday = dateobj.getDay() < 6 ? 1 : 0;
        const routes = await db.Route.findAll({
            attributes: ['time'],
            where: {
                time: {
                    [Op.gte]: time,
                },
                isWorkday: dateobj.getDay() < 6 ? 1 : 0,
            },
            limit: 3
        })
        // res.send(time)
        res.send(JSON.stringify(routes));
        // res.render('pages/index')
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
