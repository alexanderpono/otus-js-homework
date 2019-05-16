const https = require('https');
const xml2js = require('xml2js');
const MongoClient = require('mongodb').MongoClient;

const globals = {};

readPromise('https://www.sports.ru/rss/rubric.xml?s=208')
    .then(
        (xmlString)=>parseXmlPromise(xmlString),
        (err) => {console.log('readPromise() catch err=', err)}
    )
    .then(
        (xmlDom)=>{
            xmlRecords.setXmlDom(xmlDom);
            return openDb("mongodb://localhost:27017/test");
        },
        (err) => {console.log('parseXmlPromise() catch err=', err);}
    )
    .then((client)=>{
        console.log('successfully opened db');
        return insertRssIntoDb(client);
    })
    .catch((err)=>{
        console.log(err);
        console.log('closing db');
        globals.client.close()
    });
;




function readPromise(url) {
    return new Promise((resolve,reject) => {
        https.get(url, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                let error;
                error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
                res.resume();
                reject(error);
                return;
            };

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                resolve(rawData.toString());
            });
        }).on('error', (e) => {
            reject(e);
        });

    });
}


function parseXmlPromise(xmlString)
{
    return new Promise((resolve,reject) => {
        xml2js.parseString(xmlString, function(err, xmlDom) {
            if (err) {
                reject(err);
            }
            else {
                resolve(xmlDom);
            }
        });
    });
}


function openDb(url) {
    return new Promise((resolve,reject) => {
        MongoClient.connect(url, function(err, client){
        resolve(client);
    });
});
}


var xmlRecords = {
    items : null,
    xmlDom : null,

    setXmlDom : function(xmlDom) {
        this.xmlDom = xmlDom;
        let channel = this.xmlDom.rss.channel[0];
        this.items = channel.item;
    },

    getItem : function(index) {
        let rawItem = this.items[index];
        let enclosure = null;
        try {
            enclosure = rawItem.enclosure[0].$;
        }
        catch(e) {
        };
        return {
            title: rawItem.title[0],
            link: rawItem.link[0],
            descr: rawItem.description[0],
            pubDate: rawItem.pubDate[0],
            enclosure: enclosure,
            guid: rawItem.guid[0]
        };
    },

    itemsToDbFormat : function() {
        let itemsCount = this.items.length;
        let ar = [];

        for (let i=0; i<itemsCount; i++) {
            let item = xmlRecords.getItem(i);
            let newRecord = {
                _id : item.link,
                descr : item.descr,
                title: item.title,
                pubDate: item.pubDate,
                enclosure: item.enclosure,
                guid: item.guid,
                link : item.link
            };
            ar.push(newRecord);
        }

        return ar;
    }
}


function insertRssIntoDb(client) {
    globals.client = client;
    const db = client.db('test');
    let rssRecords = db.collection("rssRecords");

    let manyRecords = xmlRecords.itemsToDbFormat();
    let countToInsert = 0;

    manyRecords.map(function(recordToInsert) {
        countToInsert++;
        rssRecords.insertOne(recordToInsert, function(err, result){
            if(err){
                console.log('rssRecords.insertOne error=', err.message);
                countToInsert--;
                if (countToInsert === 0) {
                    console.log('insertRssIntoDb() closing db');
                    client.close()
                };
            }
            else {
                console.log('rssRecords.insertOne success=', result.ops[0]._id);
                countToInsert--;
                if (countToInsert === 0) {
                    console.log('insertRssIntoDb() closing db');
                    client.close()
                };
            };
        })
    });

    return Promise.resolve(true);
}
