import React from 'react';
import { LeafletConsumer } from 'react-leaflet';
import { CachedTileLayer } from '@yaga/leaflet-cached-tile-layer';
import { Map } from 'leaflet';

const MapCacheLayer=()=>{
    
    console.log("Adding caching")
    return <LeafletConsumer>
        {
            context => {
                new CachedTileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
                    databaseName: "tile-cache-data", // optional
                    databaseVersion: 1, // optional
                    objectStoreName: "OSM", // optional
                    crawlDelay: 500, // optional
                    maxAge: 1000 * 60 * 60 * 24 * 7, // optional
                }).addTo(context.map as Map)
                return <div />
            }
        }
    </LeafletConsumer>

}

export default MapCacheLayer;