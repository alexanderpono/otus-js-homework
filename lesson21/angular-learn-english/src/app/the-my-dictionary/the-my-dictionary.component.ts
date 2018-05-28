import { Component, OnInit } from '@angular/core';
import Dictionary from '../Dictionary';
import { FetchDataService } from '../fetch-data.service';

@Component({
    selector: 'the-my-dictionary',
    templateUrl: './the-my-dictionary.component.html',
    styleUrls: ['./the-my-dictionary.component.css']
})
export class TheMyDictionaryComponent implements OnInit {
    protected dictionary;
    public data;
    public srcWord: string;
    public translation: string;

    constructor(private fetch: FetchDataService) {
        this.dictionary = new Dictionary;
    }

    ngOnInit() {
        this.data = this.dictionary.getDictionary();
    }

    onAddNew() {
        let srcWord = this.getEnglishWordFromUI();
        let translation = this.getTranslationFromUI();
        this.dictionary.updateDictionary(srcWord, translation);
        this.data = this.dictionary.getDictionary();
    }

    onGetTranslation() {
        let srcWord = this.getEnglishWordFromUI();
        this.fetch.get(srcWord)
            .then((result) => {
                let translationAr = result.text;
                let translationStr = translationAr.join(',');
                this.translation = translationStr;
            })
    }

    private getEnglishWordFromUI() {
        let obj = <HTMLInputElement> document.getElementById('englishWord');
        return obj.value;
    }

    private getTranslationFromUI() {
        let obj = <HTMLInputElement> document.getElementById('translation');
        return obj.value;
    }
}
