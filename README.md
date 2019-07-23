# Tallinn Transport Map (live)

## [https://tallinn-transport.davidvassallo.me](https://tallinn-transport.davidvassallo.me)

**TL;DR : A map of Tallinn overlaid with the positions of public transport stops and the real-time position of buses, trams, and trolley-buses.... though it turned out that the Estonian government had the exact same idea I had though and had already built their own version [here](https://gis.ee/tallinn/)**

### Overview

The Estonian government tends to be very transparent and publicly releases a lot of the data that they collect. Tallinn city is no exception and has it's own "open data" page (in English!) here:

[https://avaandmed.tallinn.ee/eng/](https://avaandmed.tallinn.ee/eng/)

Browsing through the list above you'll note a number of links with respect to public transport, including ['Location of public transport vehicles in real time'](https://avaandmed.tallinn.ee/nimistu?id=35). It's useful to me and my immediate family to know when the next bus is arriving at our closest public transport stop (usually out of plain laziness leading us to get to the stop at the last possible minute - however if you ever lived in Estonia you'd know arriving at the last minute takes on a very real need in winter due to the sometimes extreme cold). So I went ahead and built a web app that consumes the realtime data provided by the city and overlaid them on a map. 

Tapping on the public transport stops shows you the expected arrival time of the next bus, while tapping on the icons representing the public transport vehicles will show basic details like the type of vehicle and the line number they are servicing

After about 8 hours of effort I had a ready app - and just then I realised the Estonian government had already built pretty much the exact same thing I did... 

[https://gis.ee/tallinn/](https://gis.ee/tallinn/)

The similarities are pretty obvious - and I am happy that it seems my thinking process aligned really well with the Estonian devs... we even used the same libraries! Nevertheless there are some technical differences under the hood that I used:

- Use of service workers to provide caching and overall better responsiveness
- Use of leaflet tile caching again to provide better responsiveness especially on mobile phones

### Asking for features / bugfixes

Open an issue: https://github.com/dvas0004/tallinn-transport-gps/issues

**Note**: if there's an open issue with the feature / bug you want address, use the thumbs-up, heart, whatever reaction to vote for it rather than opening a new issue, it helps me decide what to tackle next when I have the time.


### Data Sources Used

- Realtime location of vehicles: http://transport.tallinn.ee/gps.txt
- Departure / arrival times: https://avaandmed.tallinn.ee/nimistu?id=33
- After having found the gis.ee server, I've pulled the data from their server because they provide it in easier to process JSON form. Have a look at the source code for the actual urls

### Tech Used

* Map powered by [Leaflet](https://leafletjs.com/)
* ReactJS with TypeScipt: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Hosted on [Netlify](https://www.netlify.com), including the serverless 'backend', built using lambda functions
