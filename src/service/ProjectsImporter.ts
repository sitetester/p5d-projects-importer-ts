import ProjectsParser from "./parser/projectsParser";
import ProjectDetailsParser from "./parser/projectDetailsParser";
import {Project} from "../entity/Project";
import {getConnection} from "typeorm";

const axios = require('axios');

export default class ProjectsImporter {

    private readonly baseUrl = 'https://planner5d.com'

    private projectsParser: ProjectsParser
    private projectDetailsParser: ProjectDetailsParser


    constructor() {
        this.projectsParser = new ProjectsParser()
        this.projectDetailsParser = new ProjectDetailsParser(this.baseUrl)
    }

    async import(page = 1, maxPages: number = 5): Promise<boolean> {

        console.info(`Importing page: ${page}`);
        const url = this.baseUrl + '/gallery/floorplans?page=' + page;

        const response = await axios.get(url)
        const html = response['data']

        const projectRepository = getConnection().getRepository(Project)

        const parsedProjects = this.projectsParser.parse(html)
        for (const parsedProject of parsedProjects) {
            const response = await axios.get(this.baseUrl + parsedProject.link)
            const project = await this.projectDetailsParser.parse(response.data, parsedProject)

            // https://typeorm.io/#/undefined/using-cascades-to-automatically-save-related-objects
            // https://typeorm.io/#/many-to-one-one-to-many-relations
            // ```With cascades enabled you can save this relation with only one save call.```
            await projectRepository.save(project)
        }

        ++page
        if (page <= maxPages) {
            await this.import(page, maxPages)
        }

        return true;
    }
}
