export default class OsciloscopeService {
    static instance = null
    static getInstance() {
        if(this.instance === null) {
            this.instance = new OsciloscopeService()
        }
        return this.instance
    }
    updateOsciloscope = (oscilloscopeConfig) =>
        fetch(`http://localhost:5000/api/oscilloscope`, {
            method: 'put',
            body: JSON.stringify(oscilloscopeConfig),
            headers: {
                'content-type': 'application/json'
            }
        })
}
