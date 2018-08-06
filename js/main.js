const routeObjList = [];

 const getLocationFromForms = () => {
     let latLng = {};
     latLng.lat = getLatFromForm();
     latLng.lng = getLngFromForm();
     return latLng;
     }
 
 
 const getLocationFromGeolocation = () => {
    let latLng = {};
   fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Boulder,+CO&key=AIzaSyC2F7hM_zRpnXkBjoqYwXsDThomJ8Z5brk')
//    need to figure out how to find lat lng with objects changing each time. Or to just get back lat-lng by filtering
//    components.
    .then(res => res.json())
    .then(res => { 
       let latLng = {};
       console.log(res.);
    
    }).catch(err => console.log('geolocation not working', err));
}

         
const mpQuery = (latLng) => {
    fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${latLng.lat}&lon=${latLng.lng} &maxDistance=${getMaxDistanceFromForm()}&minDiff=${getMinDiffFromForm()}&maxDiff=${getMaxDiffFromForm()}&key=200281230-f53e043253280bf68ad7836198a7d45b`)
    
    .then(res => res.json())
    .then(res => {
        const allRouteArr = [];
        const count = Object.keys(res.routes).length;

        for (let i = 0; i < count; ++i) {
            routeObjList.push(res.routes[i]);
        }
        setMap();
    }).catch(err => console.log('mpQuery not working!', err));
     }


const queryMPWithGeolocation = () => {
    mpQuery(getInfoFromGeolocation())
}


const queryMPWithForms = () => {
    mpQuery(getLocationFromForms())
}

const getLatFromForm = () => {
    return document.getElementById('latTextInput').value;
}

const getLngFromForm = () => {
    return document.getElementById('lngTextInput').value;
}

const getMaxDistanceFromForm = () => {
    return document.getElementById('maxDistanceTextInput').value;
}

const getMinDiffFromForm = () => {
    return document.getElementById('minDiffTextInput').value;
}

const getMaxDiffFromForm = () => {
     return document.getElementById('maxDiffTextInput').value;
}



$(document).ready(function() {
    $('#click-to-search').on('change', (event) => {
        console.log("hit check")
        let location = $('#location');
        event.target.checked ? location.hide('slow') : location.show('slow');
    });
    
    $('#search-button').on('click', (event) => {
        queryMPWithForms();
    })
    
    
    let $filter = $('#filter');
    let $menu = $('#menu')
    $filter.on('click', ()=> {
        if ($menu.hasClass('fadeOutLeft')) {
            $menu.removeClass('fadeOutLeft');
            $menu.addClass('slideInLeft');
        } else {
            $menu.addClass('fadeOutLeft');
            $menu.removeClass('slideInLeft');
        }
    })
    
});
