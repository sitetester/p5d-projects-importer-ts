import {Project} from "../../entity/Project";
import * as fs from "fs";
import QrCodeFetcher from "./qrCodeFetcher";

export default class QrCodesManager {

    private readonly qrCodesPath = __dirname + '/../../public/qr_codes/'
    private qrCodeFetcher: QrCodeFetcher

    constructor() {
        this.qrCodeFetcher = new QrCodeFetcher()
    }


    async generateCode(project: Project): Promise<void> {

        const path = this.qrCodesPath + project.hash + '.png';
        console.log('path = ' + path);

        if (fs.existsSync(path)) {
            return
        }

        const qrCode = await this.qrCodeFetcher.fetchCode(this.buildProjectContents(project))
        fs.writeFileSync(path, qrCode)
    }

    /**
     * https://developers.google.com/chart/infographics/docs/qr_codes?csw=1
     * Check `chl=<data>` parameter
     *
     * Considering that each project has a unique hash/key, only `hash` field should be sufficient to use
     *
     * @param project
     * @private
     */
    private buildProjectContents(project: Project): string {
        return project.hash
    }

}