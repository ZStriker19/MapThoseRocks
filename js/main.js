const routeObjList = [];

 const getLocationFromForms = () => {
     let latLng = {};
     latLng.lat = getLatFromForm();
     latLng.lng = getLngFromForm();
     return latLng;
     }
 
 
 const getLocationFromGeolocation = () => {
   let address = modifyAddressForAPIQuery(getAddressFromForm());
   return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC2F7hM_zRpnXkBjoqYwXsDThomJ8Z5brk`)
    .then(res => res.json())
    .then(res => { 
       let latLng = {};
       latLng.lat = res.results[0].geometry.location.lat;
       latLng.lng = res.results[0].geometry.location.lng;
       return Promise.resolve(latLng);
     
    }).catch(err => console.log('geolocation not working', err));
}

         
const makeQuery = (latLng) => {
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
    getLocationFromGeolocation().then(latLng => makeQuery(latLng));
}

const queryMPWithForms = () => {
    makeQuery(getLocationFromForms())
}

const getDropDownValue = () => {
    let dropDown = document.getElementById('search-by');
    return dropDown.options[dropDown.selectedIndex].value;
}

const queryMP = () => {
    let dropDownSelectedValue = getDropDownValue();
    if (dropDownSelectedValue === "search-by-click"){
        return;
    } else if (dropDownSelectedValue === "search-by-coords") {
        queryMPWithForms()
    } else if (dropDownSelectedValue === "search-by-address") {
        queryMPWithGeolocation();
    }
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
    console.log(document.getElementById('address').value)
    return document.getElementById('address').value;
}

const modifyAddressForAPIQuery = (address) => {
    return address.replace(" ", ",")
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
        queryMP();
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
