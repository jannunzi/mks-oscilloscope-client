import utilities from "../utils/utilities";

const baseUrl = utilities.getBaseUrl();

export default class OsciloscopeService {
    static instance = null
    static getInstance() {
        if(this.instance === null) {
            this.instance = new OsciloscopeService()
        }
        return this.instance
    }

    static pause = () =>
        fetch(`${baseUrl}/api/oscilloscope/pause`, {
            method: 'post'
        }).then(response => response.json())

    static play = () =>
        fetch(`${baseUrl}/api/oscilloscope/play`, {
            method: 'post'
        }).then(response => response.json())

    static updateOsciloscope = (oscilloscopeConfig) =>
        fetch(`${baseUrl}/api/oscilloscope`, {
            method: 'put',
            body: JSON.stringify(oscilloscopeConfig),
            headers: {
                'content-type': 'application/json'
            }
        })
}
