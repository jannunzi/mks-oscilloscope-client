import {localUrl, remoteUrl} from '../config/config'

export default class Utilities {
    static getBaseUrl = () => {
        const hrefParts = window.location.href.split('/')
        if(hrefParts[2].indexOf('localhost') !== -1) {
            return localUrl
        } else {
            return remoteUrl
        }
    }
}
