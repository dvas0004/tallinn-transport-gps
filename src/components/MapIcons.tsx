// https://thenounproject.com/term/map-marker-icon/331589/
import L from 'leaflet';

const iconBus = new L.Icon({
    iconUrl: require('../img/bus-marker.png'),
    iconRetinaUrl: require('../img/bus-marker.png'),
    iconAnchor: new L.Point(15, 45),
    popupAnchor: new L.Point(0, -45),
    iconSize: new L.Point(30, 45)
});

const iconTram = new L.Icon({
    iconUrl: require('../img/tram-marker.png'),
    iconRetinaUrl: require('../img/tram-marker.png'),
    iconAnchor: new L.Point(22, 45),
    popupAnchor: new L.Point(0, -45),
    iconSize: new L.Point(45, 45)
});

const iconStop = new L.Icon({
    iconUrl: require('../img/person-marker.png'),
    iconRetinaUrl: require('../img/person-marker.png'),
    iconAnchor: new L.Point(22, 45),
    popupAnchor: new L.Point(0, -45),
    iconSize: new L.Point(45, 45)
});

const iconTrolleybus = new L.Icon({
    iconUrl: require('../img/trolleybus-marker.png'),
    iconRetinaUrl: require('../img/trolleybus-marker.png'),
    iconAnchor: new L.Point(22, 45),
    popupAnchor: new L.Point(0, -45),
    iconSize: new L.Point(45, 45)
});

export { iconBus, iconTram, iconStop, iconTrolleybus };