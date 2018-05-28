import { Injectable } from '@angular/core';
import appConfig from './config';

@Injectable({
    providedIn: 'root'
})
export class FetchDataService {

    constructor() {
    }

    get(translatedText) {
        let targetLanguage = 'ru';
        let url3 = appConfig.getTranslateUrl(translatedText, targetLanguage);
        return fetch(url3)
            .then(res => res.json());
    }

}
