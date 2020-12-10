import {Project} from "../../entity/Project";
import {ProjectThumbnail} from "../../entity/ProjectThumbnail";
import {ProjectStats} from "../../entity/ProjectStats";

const $ = require('cheerio');


export default class ProjectsParser {

    static parseThumbnail(divCardIdeasCard): ProjectThumbnail {

        const img = $('a.card-image.image img', divCardIdeasCard)

        const projectThumbnail = new ProjectThumbnail()
        projectThumbnail.src = img.attr('src')
        projectThumbnail.alt = img.attr('alt')

        return projectThumbnail;
    }

    static parseStats(divCardIdeasCard): ProjectStats {

        const projectStats = new ProjectStats();

        projectStats.numViews = $('div.level-left div.level-item:nth-child(1) span:nth-child(2)', divCardIdeasCard).text()
        projectStats.numLikes = $('div.level-left div.level-item:nth-child(2) span:nth-child(2)', divCardIdeasCard).text()
        projectStats.numComments = $('div.level-right div.level-item:nth-child(1) span:nth-child(2)', divCardIdeasCard).text()

        return projectStats;
    }

    /**
     * https://www.w3schools.com/cssref/css_selectors.asp
     * https://cheerio.js.org
     *
     * https://github.com/gemini-testing/gemini/issues/48#issuecomment-51320226
     *
     * <div class="example__class with spaces"></div>
     * Your div actually has three classes: example__class, with and spaces.
     * Correct selector to match on such element is .example__class.with.spaces

     * @param html
     */
    parse(html: string): Project[] {

        let projects: Project[] = []
        $('div.card.ideas-card', html).each(function (i, divCardIdeasCard) {
            const that = this
            const project: Project = new Project()

            project.link = $('a.card-image.image', divCardIdeasCard).attr('href');
            project.thumbnail = ProjectsParser.parseThumbnail(divCardIdeasCard)
            project.stats = ProjectsParser.parseStats(divCardIdeasCard)

            projects.push(project)
        })

        console.log(projects[0])

        return projects
    }
}