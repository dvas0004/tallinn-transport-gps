import fetch from "node-fetch";

const API_ENDPOINT = `https://transport.tallinn.ee/siri-stop-departures.php`;

exports.handler = async (event, context) => {
  let stopid = event.queryStringParameters.stopid;
  return fetch(API_ENDPOINT+"?stopid="+stopid)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        return {
            statusCode: 200,
            body: data
        }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};