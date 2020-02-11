namespace DatabaseClient {
    window.addEventListener("load", init);
    let serverAddress: string = "https://girrbacv2.herokuapp.com";

    function init(_event: Event): void {


    }
    export function insert(): void {
        let url: string = "command=insert" + "&" + "score" + "=" + Endabgabe.score + "&" + "name" + "=" + Rodelhang.name;
        sendRequest(url, handleInsertResponse);
    }

    export function getHighscore() {
        let query: string = "command=getHighscore";
        sendRequest(query, handleHighscoreResponse);

    }
    function sendRequest(_query: string, _callback: EventListener): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", serverAddress + "?" + _query, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }


    function handleInsertResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {

        }
    }
    function handleHighscoreResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.response);


            let hs: Highscore[] = JSON.parse(xhr.response);

            function sortScore(_h1: Highscore, _h2: Highscore): number {
                if (_h1.score < _h2.score) {
                    return 1;
                }
                if (_h1.score > _h2.score) {
                    return -1;
                }
                return 0;
            }
            hs.sort(sortScore);

            for (let b: number = 0; b < hs.length; b++) {
              let div: HTMLDivElement = document.createElement("div");  
                document.getElementById("scores").appendChild(div);
                div.innerHTML = "Name " + hs[b].name;
                div.innerHTML +="\t Score " + hs[b].score;
                

            }
        }
    }

}
