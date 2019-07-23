import React, { useState, Fragment, useMemo, useEffect } from 'react';
import { Map, Popup, TileLayer, Circle, Marker } from 'react-leaflet';
import MapCacheLayer from './MapCacheLayer';
import StopDialog from './StopDialog';
import Axios from 'axios';
import stopData from '../data/stopData';
import { iconBus, iconTram, iconStop, iconTrolleybus } from './MapIcons';

interface IData{
    dataPoint : {id: number|string, line: string, transportType: number, realLat: number, realLong: number}
}

interface IProps {
    preferredStop: number|string, 
    markers: IData['dataPoint'][],
    myPosition: {realLat: number, realLong: number}
}

const MapComponent = (props : IProps) => {
       
    const [myPosition, changeMyPosition] = useState([59.437, 24.745] as [number, number]);
    useEffect(()=>{
        if (props.myPosition && props.myPosition.realLat != myPosition[0]){
            console.log("Updating Position...")
            changeMyPosition([props.myPosition.realLat, props.myPosition.realLong]);
        }
        
    },[props.myPosition]);
    
    
    const [preferredStop, changePreferredStop] = useState(props.preferredStop);
    const [stopInfo, changeStopInfo] = useState()
    const [stopDialogOpen, changeStopDialogOpen] = useState(false)
    const [pleaseWait, changePleaseWait] = useState(false)

    const handleClose = () => changeStopDialogOpen(false);

    const getStopInfo = (data: IData['dataPoint']) => {
            changePleaseWait(true)
            changeStopDialogOpen(true)

            Axios.get(`/.netlify/functions/stopInfoEndpoint?stopid=${data.id}`).then(resp=>{
                const splitData = resp.data.split('\n');
                if (splitData.length>2){
                    const expectedTimeInSeconds = splitData[2].split(',')[2]
                    const scheduledTimeInSeconds = splitData[2].split(',')[3]
                    changeStopInfo({
                        name: data.line,
                        id: data.id,
                        data: data, 
                        expectedTimeInSeconds: parseInt(expectedTimeInSeconds),
                        scheduledTimeInSeconds: parseInt(scheduledTimeInSeconds),
                        expectedTimeHour: Math.floor(parseInt(expectedTimeInSeconds)/60/60),
                        expectedTimeMinutes: Math.round(((parseInt(expectedTimeInSeconds)/60/60) % 1) * 60)
                    });
                }
                changePleaseWait(false)
                changeStopDialogOpen(true);
            })     

    }

    useEffect(()=>{

        if (preferredStop != ""){
            const data = stopData.filter(dataPoint => dataPoint.SiriID==preferredStop)
            const stop = data[0];
            
            getStopInfo({
                id: stop.SiriID,
                line: stop.Name, 
                transportType: 4,
                realLat: stop.Lat/100000,
                realLong: stop.Lng/100000
            })
        }

    },[props.preferredStop]);

    const handleCircleClick = (data: IData['dataPoint']) => (e:any) => {
        console.log("handleCircleClick")
        if (data.transportType === 4){       
            getStopInfo(data);
        }
    }
    

    const map = useMemo(()=> <Map center={myPosition} zoom={16}>        
        <TileLayer 
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Circle key={"you"} center={myPosition} radius={30} color={"green"}> 
            <Popup>
                Your Position
            </Popup>
        </Circle>
        { props.markers ? props.markers.map(data => {

            let transportType: string;
            let radius = 10
            let icon;

            switch (data.transportType) {
                case 4:
                    icon = iconStop
                    transportType = 'Stop'
                    break;
                case 3:
                    icon = iconTram
                    transportType = 'Tram'
                    break;
                case 2:
                    icon = iconBus
                    transportType = 'Bus'
                    break;
                case 1:
                    icon = iconTrolleybus
                    transportType = 'Trolleybus'
                    break;
                default:
                    transportType = 'TODO'
                    break;
            }

            return <Marker 
                key={data.id} 
                position={[data.realLat, data.realLong]} 
                radius={radius} 
                icon={icon}
                onclick={handleCircleClick(data) }
            > 
            { 
                transportType === "Stop" ? null : <Popup>
                    {transportType}
                    <hr />
                    Line number: {data.line}
                    <br />
                    Vehicle ID: {data.id}
                </Popup>
            }
            </Marker>

        }) : null }  
        <MapCacheLayer />  
    </Map> , [props.markers, myPosition])
    
    return <Fragment>
        {map}
        <StopDialog handleClose={handleClose} stopDialogOpen={stopDialogOpen} stopInfo={stopInfo} handleReload={getStopInfo} pleaseWait={pleaseWait}/>
    </Fragment>;
}

MapComponent.whyDidYouRender={
    logOnDifferentValues: false,
  };

export default MapComponent;