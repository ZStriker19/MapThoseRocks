var routeObjList = [];
function initMap() {
    console.log("We init dis map");
    
  var NorthCol = {lat: 40.03, lng: -105.25};

  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: NorthCol});

    
    
    
  var marker = new google.maps.Marker({position: NorthCol, map: map});
    var marker = new google.maps.Marker({
  position: {lat : -39, lng : 100},
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
        
        var infowindow2 = new google.maps.InfoWindow;
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             var contentString = '<div id="content">'+
            '<h4>Route Name: ' + routeObjList[i].name + '</h4>'+
            '<h4>Route Difficulty: ' + routeObjList[i].rating + '</h4>'+
            '<h4>Route Type: ' + routeObjList[i].type + '</h4>' +
            '<h4>Route Stars: ' + routeObjList[i].stars + '</h4>' +
            '<img src=' + routeObjList[i].imgSqSmall +'>' +
            '</div>';
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
//    for (var i = 0; i < beaches.length; i++) {
//          var beach = beaches[i];
//          var marker = new google.maps.Marker({
//            position: {lat: beach[1], lng: beach[2]},
//            map: map,
//            icon: image,
//            shape: shape,
//            title: beach[0],
//            zIndex: beach[3]
//          });
//}



// so figure out how to turn these into markers on the map.
    
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
         
         
         
         
        $.ajax({
            url:'https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=' + lat + ' &lon=' + lon+ '&maxDistance=' + maxDistance + '&minDiff=' + minDiff + '&maxDiff=' + maxDiff + '&key=200281230-f53e043253280bf68ad7836198a7d45b',
            type: 'GET',
            data: {
                format:'json', 
            },
            success: function(response) {
                console.log("We Goin")
                var resp = response;
                console.log(resp.routes[0]);

                var allRouteArr = [];
                var count = Object.keys(resp.routes).length;
                console.log(count);
                for (let i =0; i < count; i++) {
                    routeObjList.push(resp.routes[i]);
                }
                initMap();
            },

            error : function() {
                console.log('not working!');
            }
        })
         
     }

$(document).ready(function() {
    console.log("alright");
    //To later be input via google maps geolocatin API or forms.
//    var addTodoTextInput = document.getElementById('addTodoTextInput');
//    todoList.addTodo(addTodoTextInput.value);
    
    
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