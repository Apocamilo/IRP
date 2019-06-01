import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Camera} from '@ionic-native/camera';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {Firebase} from '@ionic-native/firebase';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';

import {FcmProvider} from '../providers/fcm/fcm';
import {Appointment} from '../providers/appointment/appointment';

import {Api, Settings, User} from '../providers';
import {MyApp} from './app.component';

const firebase = {
    // your firebase web config
    apiKey: "AIzaSyB-V2WJtVs6CoK9eHq4RnsrM0gAbEzdFvY",
    authDomain: "app-gnib.firebaseapp.com",
    databaseURL: "https://app-gnib.firebaseio.com",
    projectId: "app-gnib",
    storageBucket: "app-gnib.appspot.com",
    messagingSenderId: "1078132140212"
};

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {
        option1: true,
        option2: 'Ionitron J. Framework',
        option3: '3',
        option4: 'Hello'
    });
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        Api,
        User,
        Camera,
        Appointment,
        SplashScreen,
        StatusBar,
        {provide: Settings, useFactory: provideSettings, deps: [Storage]},
        // Keep this to enable Ionic's runtime error handling during development
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        Firebase,
        FcmProvider,
        Facebook
    ]
})
export class AppModule {
}
