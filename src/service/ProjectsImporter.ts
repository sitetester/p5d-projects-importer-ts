import ProjectsParser from "./parser/projectsParser";
import ProjectDetailsParser from "./parser/projectDetailsParser";
import {getConnection} from "typeorm";
import {Project} from "../entity/Project";

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

        console.info(`Importing page:  ${page}`);
        const url = this.baseUrl + '/gallery/floorplans?page=' + page;

        const response = await axios.get(url)
        const html = response['data']

        const parsedProjects: Project[] = []

        const projects = this.projectsParser.parse(html)
        for (const project of projects) {

            const detailsHtml = (await axios.get(this.baseUrl + project.link)).data
            parsedProjects.push(await this.projectDetailsParser.parse(detailsHtml, project))
            break
        }

        // https://typeorm.io/#/undefined/using-asyncawait-syntax
        await getConnection().getRepository(Project).save(parsedProjects)

        return true;
    }
}
