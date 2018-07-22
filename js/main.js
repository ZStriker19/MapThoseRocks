var routeObjList = [];
function initMap() {
    console.log("We init dis map");
    
  let NorthCol = {lat: 55.03, lng: -105.25};

  let map = new google.maps.Map(
      document.getElementById('map'), 
      {
          zoom: 6, 
          center: NorthCol,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
      });

    
    
    
  var marker = new google.maps.Marker({
      position: NorthCol, 
      map: map,
      draggable: true
  });
    
    var marker = new google.maps.Marker({
  position: {flat : -39, lng : 100},
  map: map,
    title : 'Hiiii'    
});
    

    var infowindow = new google.maps.InfoWindow;
    var marker, i;
    console.log("Should enter for loop to make markers here.")
    console.log(routeObjList);
    for ( i = 0; i < routeObjList.length; i++) {
        console.log(routeObjList[i].name);
        marker = new google.maps.Marker({
             position: {
                lat: routeObjList[i].latitude , 
                lng: routeObjList[i].longitude,
                title: routeObjList[i].name,
             },
             map: map
        });

        map.setZoom(10);
        map.panTo(marker.position);

        
        var infowindow2 = new google.maps.InfoWindow;
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             let currentRoute = routeObjList[i];
             
             
             let contentString = 
`<div class="iw-container" style= "background-image: url(${currentRoute.imgMedium})" >
    <div class="white-cover">
        <div class = "iw-title">
           <a href= "${currentRoute.url}" target="_blank"> <h4>${currentRoute.name}</h4> </a>
        </div>
        <div class="routeInfoSection">
            <div class="indivInfoPresentation">      
                <div class="infoBubbleArrow">
                    <h4 id="ratingTxt">Rating</h4>
                </div>
                <img src="../imgs/arrow.png" class="arrow"/>
                <h4> ${currentRoute.stars} </h4>
            </div>
            <div class="indivInfoPresentation">     
                <div class="infoBubbleArrow">
                    <h4 id="gradeTxt">Grade</h4>
                </div>
                <img src="../imgs/arrow.png" class="arrow"/>
                <h4>${currentRoute.rating}</h4>
            </div>
                <div class="indivInfoPresentation">      
                    <div class="infoBubbleArrow">
                        <h4 id="typeTxt">Type</h4>
                    </div>
                    <img src="../imgs/arrow.png" class="arrow"/>
                    <h4> ${currentRoute.type}</h4>
                </div>

            </div>
    </div>
</div>`;
             
             infowindow2.setContent(contentString);
             infowindow2.open(map, marker);
             if (infowindow){
                 infowindow.close();
             }
         }
        })(marker, i));
        
         google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
         return function() {
             let contentString = 
`<div class="small-window">
    <p> ${routeObjList[i].name} </p>
</div>`
             infowindow.setContent(contentString);
             infowindow.open(map, marker);
         }
        })(marker, i));
        
//        google.maps.event.addListener(map, 'click', function( event ){
//  alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
//});
             
             google.maps.event.addListener(map, 'click', function( event ){
                 let searchInfo = [];
                 console.log("let's go!")
                 let lat = event.latLng.lat();
                 let lng = event.latLng.lng();
                 
                 var maxDistanceTextInput = document.getElementById('maxDistanceTextInput');
                 var maxDistance = maxDistanceTextInput.value;

                 var minDiffTextInput = document.getElementById('minDiffTextInput');
                 var minDiff = minDiffTextInput.value;

                 var maxDiffTextInput = document.getElementById('maxDiffTextInput');
                 var maxDiff = maxDiffTextInput.value;

                 searchInfo.push(lat);
                 searchInfo.push(lng);
                 searchInfo.push(maxDistance);
                 searchInfo.push(minDiff);
                 searchInfo.push(maxDiff);
                 
                 mpQuery(searchInfo);
                 
});
             
        
         google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
         return function() {
             if (infowindow){
                 infowindow.close();
             }
         }
        })(marker, i));     
    }
    
};


    
     function getInfoFromForms() {
        let searchInfo = []
        let latTextInput = document.getElementById('latTextInput');
        let lat = latTextInput.value;
         
        let lngTextInput = document.getElementById('lngTextInput');
        let lng =lngTextInput.value;
         
        let maxDistanceTextInput = document.getElementById('maxDistanceTextInput');
        let maxDistance = maxDistanceTextInput.value;
         
         let minDiffTextInput = document.getElementById('minDiffTextInput');
         let minDiff = minDiffTextInput.value;
         
         let maxDiffTextInput = document.getElementById('maxDiffTextInput');
         let maxDiff = maxDiffTextInput.value;
         
         searchInfo.push(lat);
         searchInfo.push(lng);
         searchInfo.push(maxDistance);
         searchInfo.push(minDiff);
         searchInfo.push(maxDiff);
         return searchInfo;
         
         }
         
function mpQuery(searchInfo){
    fetch('https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=' + searchInfo[0] + ' &lon=' + searchInfo[1] + '&maxDistance=' + searchInfo[2] + '&minDiff=' + searchInfo[3] + '&maxDiff=' + searchInfo[4] + '&key=200281230-f53e043253280bf68ad7836198a7d45b')
            .then(res => res.json())
            .then(res => {
                console.log('We Goin');
                console.log(res.routes[0]);
                
                const allRouteArr = [];
                const count = Object.keys(res.routes).length;
                console.log(count);
                
                for (let i = 0; i < count; ++i) {
                    routeObjList.push(res.routes[i]);
                }
                initMap();
            }).catch(err => console.log('not working!', err));

     }


function queryMPWithForms(){
    mpQuery(getInfoFromForms())
    
}

$(document).ready(function() {
    let $filter = $('#filter');
    let $menu = $('#menu')
    $filter.on('click', ()=> {
        if ($menu.hasClass('fadeOutLeft')) {
            $menu.removeClass('fadeOutLeft');
            $menu.addClass('slideInLeft');
        } else {
            console.log(0);
            $menu.addClass('fadeOutLeft');
            $menu.removeClass('slideInLeft');
        }
    })
    console.log("alright");
    
});
    



//{
//    "routes": [
//        {
//            "id": 105748657,
//            "name": "The Yellow Spur",
//            "type": "Trad",
//            "rating": "5.9+",
//            "stars": 4.8,
//            "starVotes": 842,
//            "pitches": 6,
//            "location": [
//                "Colorado",
//                "Boulder",
//                "Eldorado Canyon SP",
//                "Redgarden Wall",
//                "Redgarden - Tower One"
//            ],
//            "url": "https:\/\/www.mountainproject.com\/route\/105748657\/the-yellow-spur",
//            "imgSqSmall": "https:\/\/cdn-files.apstatic.com\/climb\/1202925_sqsmall_1494040765.jpg",
//            "imgSmall": "https:\/\/cdn-files.apstatic.com\/climb\/1202925_small_1494040765.jpg",
//            "imgSmallMed": "https:\/\/cdn-files.apstatic.com\/climb\/1202925_smallMed_1494040765.jpg",
//            "imgMedium": "https:\/\/cdn-files.apstatic.com\/climb\/1202925_medium_1494040765.jpg",
//            "longitude": -105.2875,
//            "latitude": 39.9318
//        },
//


//url:'https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=40.03&lon=-105.25&maxDistance=10&minDiff=5.6&maxDiff=5.10&key=200281230-f53e043253280bf68ad7836198a7d45b'