import {Project} from "../entity/Project";

export default class ProjectDenormalizer {

    denormalize(projectData: [], project: Project): Project {

        project.title = projectData['items'][0].name

        const items = projectData['items'][0]['data']['items']
        project.numFloors = this.parseNumFloors(items)
        project.numRooms = this.parseNumRooms(items)
        project.numOtherItems = this.parseNumOtherItems(items)

        return project
    }

    parseNumFloors(projectItems: []): number {

        let count = 0;
        for (const item of projectItems) {
            if (item['className'] === 'Floor') {
                ++count;
            }
        }

        return count;
    }

    parseNumRooms(projectItems: []): number {

        let count = 0;
        for (const floor of projectItems) {
            if ('items' in floor) {

                const floorItems: [] = floor['items']
                for (const floorItem of floorItems) {
                    if (floorItem['className'] === 'Room') {
                        ++count;
                    }
                }
            }

        }

        return count;
    }

    parseNumOtherItems(projectItems: [], count: number = 0): number {

        for (const item of projectItems) {
            if (item['className'] !== 'Floor' && item['className'] !== 'Room') {
                ++count
            }

            if ('items' in item) {
                count = this.parseNumOtherItems(item['items'], count)
            }
        }

        return count;
    }
}