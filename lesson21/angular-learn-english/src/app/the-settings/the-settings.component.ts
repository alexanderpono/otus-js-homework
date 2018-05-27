import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'the-settings',
    templateUrl: './the-settings.component.html',
    styleUrls: ['./the-settings.component.css']
})
export class TheSettingsComponent implements OnInit {

    selected = 'en';
    selectedNo = '20';
    languages = [
        {value:'en', viewValue:'English'},
        {value:'ru', viewValue:'Russian'}
    ];
    wordsNumbers = [
        {value:'5', viewValue:'5'},
        {value:'10', viewValue:'10'},
        {value:'15', viewValue:'15'},
        {value:'20', viewValue:'20'},
    ];

    constructor() { }

    ngOnInit() {
    }

}
