import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TheMyDictionaryComponent } from './the-my-dictionary/the-my-dictionary.component';
import { TheGameComponent } from './the-game/the-game.component';
import { TheSettingsComponent } from './the-settings/the-settings.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
    declarations: [
        AppComponent,
        TheMyDictionaryComponent,
        TheGameComponent,
        TheSettingsComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        LocalStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
