var map = null;


function initMap() {
    console.log("We init dis map");
    
    let startingPointBoulderCO = {lat: 40.0150, lng: -105.2705};

      map = new google.maps.Map(
      document.getElementById('map'), 
      {
          zoom: 4, 
          center: startingPointBoulderCO,
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
    
    google.maps.event.addListener(map, 'click', function( event ){
        if(document.getElementById('click-to-search').checked === true) {
         let searchInfo = {};

         let lat = event.latLng.lat();
         let lng = event.latLng.lng();

         var maxDistanceTextInput = document.getElementById('maxDistanceTextInput');
         var maxDistance = maxDistanceTextInput.value;

         var minDiffTextInput = document.getElementById('minDiffTextInput');
         var minDiff = minDiffTextInput.value;

         var maxDiffTextInput = document.getElementById('maxDiffTextInput');
         var maxDiff = maxDiffTextInput.value;

         searchInfo.lat = lat;
         searchInfo.lng = lng;
         searchInfo.maxDistance = maxDistance;
         searchInfo.minDiff = minDiff;
         searchInfo.maxDiff = maxDiff;

         mpQuery(searchInfo);
             
         }
                 
});
}


const setMap = () => {
    const infowindow = new google.maps.InfoWindow;
    let marker, i;
    for ( i = 0; i < routeObjList.length; i++) {
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
                <img src="imgs/arrow.png" class="arrow"/>
                <h4> ${currentRoute.stars} </h4>
            </div>
            <div class="indivInfoPresentation">     
                <div class="infoBubbleArrow">
                    <h4 id="gradeTxt">Grade</h4>
                </div>
                <img src="imgs/arrow.png" class="arrow"/>
                <h4>${currentRoute.rating}</h4>
            </div>
                <div class="indivInfoPresentation">      
                    <div class="infoBubbleArrow">
                        <h4 id="typeTxt">Type</h4>
                    </div>
                    <img src="imgs/arrow.png" class="arrow"/>
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
             
         google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
         return function() {
             if (infowindow){
                 infowindow.close();
             }
         }
        })(marker, i));
        
    }
};
