const routeObjList = [];

const showRoutes = () => {
    let dropDownSelectedValue = getDropDownValue();
    if (dropDownSelectedValue === "search-by-click"){
        return;
    } else if (dropDownSelectedValue === "search-by-coords") {
        queryMPWithForms();
    } else if (dropDownSelectedValue === "search-by-address") {
        queryMPWithGeolocation();
    }
}

const queryMPWithForms = () => {
    makeQuery(getLocationFromForms())
}

const queryMPWithGeolocation = () => {
    getLocationFromGeolocation().then(coords => makeQuery(coords));
}


const getLocationFromForms = () => {
     let coords = {};
     coords.lat = getLatFromForm();
     coords.lng = getLngFromForm();
     return coords;
}
 
 
const getLocationFromGeolocation = () => {
   let address = modifyAddressForAPIQuery(getAddressFromForm());
   return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC2F7hM_zRpnXkBjoqYwXsDThomJ8Z5brk`)
    .then(res => res.json())
    .then(res => { 
       let coords = {};
       coords.lat = res.results[0].geometry.location.lat;
       coords.lng = res.results[0].geometry.location.lng;
       return Promise.resolve(coords);
     
    }).catch(err => console.log('geolocation not working', err));
}

         
const makeQuery = (coords) => {
    fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${coords.lat}&lon=${coords.lng} &maxDistance=${getMaxDistanceFromForm()}&minDiff=${getMinDiffFromForm()}&maxDiff=${getMaxDiffFromForm()}&key=200281230-f53e043253280bf68ad7836198a7d45b`)
    
    .then(res => res.json())
    .then(res => {
        routeObjList.length = 0;
        const count = Object.keys(res.routes).length;
        for (let i = 0; i < count; ++i) {
            routeObjList.push(res.routes[i]);
        }
         setMapPins();
        
    }).catch(err => console.log('mpQuery not working!', err));
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

const getAddressFromForm = () => {
    return document.getElementById('address').value;
}

const modifyAddressForAPIQuery = (address) => {
    return address.replace(" ", ",")
}

const getDropDownValue = () => {
    let dropDown = document.getElementById('search-by');
    return dropDown.options[dropDown.selectedIndex].value;
}


$(document).ready(function() {
    
    $('#search-by').on('change', (event) => {
        let dropDownSelectedValue = getDropDownValue();
        
        if (dropDownSelectedValue === "search-by-click"){
            $('#location').hide('slow');
            
        } else if (dropDownSelectedValue === "search-by-coords") {
        $('#location').show('slow');
        $('#address-form').hide('slow');
        $('#coords').show('slow');
        
        } else if (dropDownSelectedValue === "search-by-address") {
        $('#coords').hide('slow');
        $('#location').show('slow');
        $('#address-form').show('slow');
        }
        
    });
    
    
    $('#search-button').on('click', (event) => {
        showRoutes();
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
