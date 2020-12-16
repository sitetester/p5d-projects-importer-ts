import {Project} from "../../entity/Project";
import ProjectDenormalizer from "../projectDenormalizer";

const axios = require('axios');
const $ = require('cheerio');

export default class ProjectDetailsParser {

    private projectDenormalizer: ProjectDenormalizer

    constructor(private baseUrl: string) {
        this.projectDenormalizer = new ProjectDenormalizer()
    }

    /**
     * https://www.w3schools.com/cssref/css_selectors.asp
     * https://cheerio.js.org
     */
    async parse(html: string, project: Project): Promise<Project> {

        project.aboutContents = $('.is-7-tablet-portrait > p:nth-child(12)', html).text()
        project.hash = this.parseProjectKey(html)

        const data = await this.downloadProjectData(project.hash)
        return this.projectDenormalizer.denormalize(data, project)
    }

    // somehow #btnCopyProject doesn't return `data` value
    private parseProjectKey(html: string): string {

        const href = $('a.button.is-fullwidth.is-primary', html).attr('href')
        const myArray = new RegExp('key=(.+)&').exec(href);
        if (myArray[1] !== null) {
            return myArray[1]
        }

        return ''
    }

    private async downloadProjectData(key: string): Promise<[]> {

        const response = await axios.get(this.baseUrl + '/api/project/' + key)

        return response['data']
    }
}