import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MapComponent from './MapComponent';
import stopData from '../data/stopData.js';

interface IGpsDataPoint {
    id: number|string, 
    line: string, 
    transportType: number, 
    realLat: number, 
    realLong: number
}

const DataContainer = () => {
    
    let initialData: IGpsDataPoint[] = [];
    const [gpsData, changeGpsData] = useState(initialData);
    const [myPosition, changeMyPosition] = useState();

    let initialPreferredLine: string|boolean = false;
    let initialPreferredVehicle: string|boolean = false;
    let initialPreferredStop: string = "";

    const urlOptions = window.location.hash.substr(1).split('&');
        if (urlOptions.length >= 1){
            urlOptions.forEach(option => {
                if (option !== ""){
                    const optionParts = option.split('=');
                    const key = optionParts[0];
                    const value = optionParts[1];

                    switch (key) {
                        case "vehicle":
                            initialPreferredVehicle = value;
                            break;
                        case "line":
                            initialPreferredLine = value;
                            break;
                        case "stop":
                            initialPreferredStop = value;
                            break;
                        default:
                            break;
                    }

                }                
            })
        }

    
    const [preferredLine, changePreferredLine] = useState(initialPreferredLine)    
    const [preferredVehicle, changePreferredVehicle] = useState(initialPreferredVehicle)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                
                changeMyPosition({
                    realLat: position.coords.latitude,
                    realLong: position.coords.longitude 
                })

            });
        } else { 
            console.log("Geolocation is not supported by this device.");
        }
        

    }, []);

    const getGpsData = () => {

        console.log("Fetching Data....")
        Axios.get("/.netlify/functions/gpsEndpoint").then(resp => {
        
            let processedData: IGpsDataPoint[] = [];
            const rawData = resp.data;

            rawData.filter((elem: any) => preferredLine ? (elem.properties.line == preferredLine) : true)
                .filter((elem: any) => preferredVehicle ? (elem.properties.id == preferredVehicle) : true)
                .map((rawDataPoint: any) => {
                    
                    const id = rawDataPoint.properties.id.toString();
                    const line = rawDataPoint.properties.line.toString();
                    const transportType = rawDataPoint.properties.type;
                    const realLat = rawDataPoint.geometry.coordinates[1];
                    const realLong = rawDataPoint.geometry.coordinates[0];
                    
                    processedData.push({
                        id: id,
                        line: line, 
                        transportType: transportType,
                        realLat: realLat,
                        realLong: realLong
                    });         
                })
            
                        

            // add stop data (TODO: parallel?)
            for (let index = 0; index < stopData.length; index++) {
                const stop = stopData[index];
                processedData.push({
                    id: stop.SiriID,
                    line: stop.Name, 
                    transportType: 4,
                    realLat: stop.Lat/100000,
                    realLong: stop.Lng/100000
                }); 
                
            }

            changeGpsData(processedData);

        })

    }

    useEffect(()=>{

        getGpsData();
        setInterval(()=>{
            getGpsData();
        }, 50000)
        
    },[])

    

    return <div>
            {gpsData.length > 0 ? <MapComponent preferredStop={initialPreferredStop} markers={gpsData} myPosition={myPosition} /> : 'GPS data loading...'}
    </div>

}

DataContainer.whyDidYouRender=true;
export default DataContainer;