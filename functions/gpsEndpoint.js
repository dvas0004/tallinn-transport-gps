import fetch from "node-fetch";

const API_ENDPOINT = `https://gis.ee/tallinn/geojson.php`;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify(data.features)
        }
    })
    .catch(error => ({ statusCode: 422, body: String(error) }));
};