import "reflect-metadata";
import {createConnection} from "typeorm";
import {Project} from "./entity/Project";

createConnection().then(async connection => {

    // console.log('DB connection OK!');
    // console.log('Here you can setup and run express/koa/any other framework.');

    const express = require('express')

    const app = express()
    app.set('view engine', 'ejs');
    const port = 3000
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })


    app.get('/', (req, res) => {
        res.send('It works!!')
    })

    app.get('/projects', async (req, res) => {

            let skip = 0
            let pageNum = req.query.pageNum
            if (pageNum !== undefined) {
                skip = 5 * (pageNum - 1)
            }

            // https://typeorm.io/#/find-options
            const options = {
                take: 5,
                skip: skip,
                relations: ['stats', 'thumbnail'],
            }

            const projectsCount = (await connection.getRepository(Project).find()).length
            const projects = await connection.getRepository(Project).find(options);

            const projectsPerPage = 5
            res.render('projects/index', {
                projects: projects,
                maxNum: projectsCount / projectsPerPage,
                projectsPerPage: projectsPerPage,
                pageNum: pageNum
            });
        }
    )


}).catch(error => console.log(error));
