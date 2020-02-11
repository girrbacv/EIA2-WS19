import * as Mongo from "mongodb";
console.log("Database starting");

export namespace Endabgabe{

let databaseURL: string = "mongodb://localhost:8100";
let databaseName: string = "Test";
let db: Mongo.Db;
let highscore: Mongo.Collection;

// running on heroku?
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://test:test123@ds129462.mlab.com:29462/highscore";
    databaseName = "highscore";
}

// try to connect to database, then activate callback "handleConnect" 
Mongo.MongoClient.connect(databaseURL, handleConnect);

// connect-handler receives two standard parameters, an error object and a database object
function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        highscore = db.collection("score");
    }
}

export function insert(_doc: Highscore): void {
    // try insertion then activate callback "handleInsert"
    highscore.insertOne(_doc, handleInsert);
}

// insertion-handler receives an error object as standard parameter
function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}


// try to fetch all documents from database, then activate callback
export function findAll(_callback: Function): void {
    // cursor points to the retreived set of documents in memory
    var cursor: Mongo.Cursor = highscore.find();
    // try to convert to array, then activate callback "prepareAnswer"
    cursor.toArray(prepareAnswer);

    // toArray-handler receives two standard parameters, an error object and the array
    // implemented as inner function, so _callback is in scope
    
    function prepareAnswer(_e: Mongo.MongoError, HighscoreArray: Highscore[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            // stringify creates a json-string, passed it back to _callback
            _callback(JSON.stringify(HighscoreArray));
    }
}
}

/*
import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Endabgabe {
   
    let highscore: Mongo.Collection;
    let databaseURL: string;

    let dbName: string = "eia";
    let dbCollection: string = "score";

    
    databaseURL = "mongodb+srv://test:1234@cluster0-jkn7c.mongodb.net/test?retryWrites=true&w=majority";
    

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    startServer(port);
    console.log("Server starting on port: " + port);

    connectToDatabase(databaseURL);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscore = mongoClient.db(dbName).collection(dbCollection);
        console.log("Database connection is ", highscore != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // for (let key in url.query) {
            //     _response.write(key + ":" + url.query[key] + "<br/>");
            // }

            if (url.query["command"] == "retrieve") {
                let report: any[] | string = await retrieveOrders();
                if (report == "We encountered tecnical problems. Please try again later")
                    _response.write(report);
                else
                    _response.write(JSON.stringify(report));
            }
            else {
                console.log("urlQuery: ", url.query);
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
                highscore.insert(url.query); // sagt was in die collection eingetragen werden soll (url.query wird eingetragen)
                console.log(jsonString); 
            }
        }
        _response.end();
    }

    async function retrieveOrders(): Promise<any[] | string> {
        // console.log("Asking DB about Orders ", highscore.find());
        let cursor: Mongo.Cursor = await highscore.find();
        let answer: Promise<any[]> = await cursor.toArray();
        console.log("DB CursorToArray", answer);
        if (answer != null) {
            return answer;
        }
        else
            return "We encountered tecnical problems. Please try again later";
    }

}*/
