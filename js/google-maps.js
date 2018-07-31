var container = document.querySelector('.contact-us__google-map');

function initMap() {
    map = new google.maps.Map(container, {
        center: {lat: 59.936600, lng: 30.321500},
        zoom: 16,
    });

    var beachMarker = new google.maps.Marker({
          position: {lat: 59.936102, lng: 30.321534},
          map: map,
          icon: 'img/icon-map-marker.svg'
    });
}
