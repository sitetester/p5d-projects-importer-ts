const axios = require('axios');

export default class QrCodeFetcher {

    private readonly GOOGLE_CHART_API = 'https://chart.googleapis.com/chart';
    /**
     * Image size
     * <width>x<height>
     */
    private chs: string = '300x300';

    async fetchCode(contents: string): Promise<string> {

        const url = this.GOOGLE_CHART_API + '?chs=' + this.chs + '&cht=qr&chl=' + encodeURI(contents);
        const response = await axios.get(url)
        return response['data']
    }
}