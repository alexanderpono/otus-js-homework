import { LocalStorageService } from 'angular-2-local-storage';
import appConfig from './config';

export default class Dictionary {
    protected storage: LocalStorageService;

    constructor() {
        this.storage = new LocalStorageService(appConfig.localStorageConfig);
    };

    public getDictionary() {
        let dictionary = this.storage.get('dictionary');
        if (dictionary === null) {
            this.storage.set('dictionary', appConfig.initTranslations);
            dictionary = this.storage.get('dictionary');
        }
        return dictionary;
    }

    public updateDictionary(word, translation) {
        let data = Array(this.getDictionary());
        data.push({en:word, ru:translation});
        this.replaceDictionary(data);
    }

    private replaceDictionary(newDictionary) {
        this.storage.set('dictionary', newDictionary);
    }

}