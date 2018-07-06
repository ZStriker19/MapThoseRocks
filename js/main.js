var routeObjList = [];
function initMap() {
    console.log("We init dis map");
    
  var NorthCol = {lat: 55.03, lng: -105.25};

  var map = new google.maps.Map(
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
    
//     var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
//        var beachMarker = new google.maps.Marker({
//          position: {lat: -33.890, lng: 151.274},
//          map: map,
//          icon: image
//        });
//    var image = 'imgs/adamOndraDawnWall.jpg';
//        var ondra = new google.maps.Marker({
//          position: {lat: -34.890, lng: 151.274},
//          map: map,
//          icon: image
//        });
    
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
             var contentString = 
`<div class="iw-container">
    <div class="routePicDiv">
         <a href =${currentRoute.url} target="_blank">
            <img class="routePic" src= ${currentRoute.imgMedium}>
        </a>
    </div>
    <div class = "iw-title">
        <h4>${currentRoute.name}</h4>
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
</div>`;
             
             
//              google.maps.event.addListener(map, 'click', function(event) {
//                  
//    alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
//  });
//             
             
             infowindow2.setContent(contentString);
             infowindow2.open(map, marker);
             if (infowindow){
                 infowindow.close();
             }
         }
        })(marker, i));
        
       
        
//         google.maps.event.addEventListener(marker, 'mouseover')
         google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
         return function() {
             infowindow.setContent(routeObjList[i].name);
             infowindow.open(map, marker);
         }
        })(marker, i));
        
//        google.maps.event.addListener(marker, 'click', (function(event) {
//         return function() {
//                 if (infowindow2){
//                      infowindow2.close();
//                 }
//         }
//        })(marker, i));
        
        
        
         google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
         return function() {
             if (infowindow){
                 infowindow.close();
             }
//             if (infowindow2){
//                 infowindow2.close();
//             }
         }
        })(marker, i));
        
         
    }
    
    var image = {
    url: "https:\/\/cdn-files.apstatic.com\/climb\/105935643_sqsmall_1494061717.jpg",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(48, 36),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
    var marker = new google.maps.Marker({
        position: { lat: 40, lng: 0},
        map: map,
        icon: image,
        title: "nice beach place",
        
        });
    };


    
     function queryMP() {
        var latTextInput = document.getElementById('latTextInput');
        var lat = latTextInput.value;
         
        var lonTextInput = document.getElementById('lonTextInput');
        var lon =lonTextInput.value;
         
        var maxDistanceTextInput = document.getElementById('maxDistanceTextInput');
        var maxDistance = maxDistanceTextInput.value;
         
         var minDiffTextInput = document.getElementById('minDiffTextInput');
         var minDiff = minDiffTextInput.value;
         
         var maxDiffTextInput = document.getElementById('maxDiffTextInput');
         var maxDiff = maxDiffTextInput.value;
         
         
         
fetch('https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=' + lat + ' &lon=' + lon + '&maxDistance=' + maxDistance + '&minDiff=' + minDiff + '&maxDiff=' + maxDiff + '&key=200281230-f53e043253280bf68ad7836198a7d45b')
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