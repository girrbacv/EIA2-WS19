"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Hallo");
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let highscore;
    let databaseURL;
    let dbName = "eia";
    let dbCollection = "score";
    databaseURL = "mongodb+srv://test:1234@eia2girrbacv-ep9wt.mongodb.net/test?retryWrites=true&w=majority";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    console.log("Server starting on port: " + port);
    connectToDatabase(databaseURL);
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            highscore = mongoClient.db(dbName).collection(dbCollection);
            console.log("Database connection is ", highscore != undefined);
        });
    }
    function handleRequest(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("What's up?");
            _response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            if (_request.url) {
                let url = Url.parse(_request.url, true);
                // for (let key in url.query) {
                //     _response.write(key + ":" + url.query[key] + "<br/>");
                // }
                if (url.query["command"] == "retrieve") {
                    let report = yield retrieveOrders();
                    if (report == "We encountered tecnical problems. Please try again later")
                        _response.write(report);
                    else
                        _response.write(JSON.stringify(report));
                }
                else {
                    console.log("urlQuery: ", url.query);
                    let jsonString = JSON.stringify(url.query);
                    _response.write(jsonString);
                    highscore.insert(url.query);
                    console.log(jsonString);
                }
            }
            _response.end();
        });
    }
    function retrieveOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("Asking DB about Orders ", orders.find());
            let cursor = yield highscore.find();
            let answer = yield cursor.toArray();
            console.log("DB CursorToArray", answer);
            if (answer != null) {
                return answer;
            }
            else
                return "We encountered tecnical problems. Please try again later";
        });
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map