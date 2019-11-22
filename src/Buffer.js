
export default class Buffer {

    index = 0;
    data = [];
    length = -1;
    constructor(initialSize) {
        for(let i=0; i<initialSize; i++){
            this.data.push({
                x: i,
                y: 0,
                z: 10
            })
        }
        this.length = initialSize
    }

    push = data => {
        this.data.push({
            x: 0,
            y: data,
            z: 10
        })
        this.data.shift()
        for(let i=0; i<this.length; i++){
            this.data[i].x = i;
        }
    }

    get = () => this.data
}
