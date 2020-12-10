import "reflect-metadata";
import {createConnection} from "typeorm";
import {Project} from "./entity/Project";

createConnection().then(async connection => {

    // console.log('DB connection OK!');
    // console.log('Here you can setup and run express/koa/any other framework.');

    const express = require('express')

    const app = express()
    app.set('view engine', 'ejs');


    app.get('/', (req, res) => {
        res.send('It works!!')
    })

    app.get('/projects', async (req, res) => {
        // https://typeorm.io/#/find-options
        const projects = await connection.getRepository(Project).find({
            take: 3,
            relations: ['stats', 'thumbnail'],
        });

        console.log(projects);
        res.render('projects/index', {
            projects: projects,
        });
    })

    const port = 3000
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

}).catch(error => console.log(error));
