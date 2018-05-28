export default {
    getTranslateUrl : function(translatedText, targetLanguage) {
        let url2 = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180527T232350Z.a8aefda57ce46bb2.26e8cb10f92ca87d043a4b06b586eeabd8b95fd6&text=${translatedText}&lang=${targetLanguage}`;
        return url2;
    },

    localStorageConfig: {
        prefix: 'angular-learn-english',
        storageType: 'localStorage'
    },

    initTranslations : [
        {'en': 'to apply', 'ru': 'добавлять'},
        {'en': 'education', 'ru': 'образование'},
        {'en': 'to go', 'ru': 'идти'},
        {'en': 'responsible', 'ru': 'ответственный'}
    ]
}