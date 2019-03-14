var googleTag = $(
  '<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uq660sOqIWpWFdN6tGwKUYR07jmx-Ww&callback=initMap">'
)
$('body').append(googleTag)

var map, infoWindow

function initMap () {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 9
  })
  infoWindow = new google.maps.InfoWindow()
  

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        infoWindow.setPosition(pos)
        infoWindow.setContent('Location found.')
        infoWindow.open(map)
        map.setCenter(pos)

        var marker1 = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Your Location'
        })
        // setting position of map
        marker1.setMap(map)
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function eventBriteCall () {
  // event to ask for user location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // getting location for google maps/Eventbrite APIs
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        // eventBright api
        const token = 'LTV5SOWTS6QBZF72VGDA'
        let queryUrl =
          "'https://www.eventbriteapi.com/v3/events/search/?location.latitude=" +
          pos.lat +
          '&location.longitude=' +
          pos.lng +
          '&categories=111&token=' +
          token

        $.ajax({
          async: true,
          url: queryUrl,
          method: 'GET'
        }).then(function (response) {
          let results = response.events
          console.log(results)
          for (let i = 0; i < results.length; i++) {
            console.log(results[i].name)
            console.log(results[i].coordinates)
            console.log(results[i].url)
          }
        })
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter())
      }
    )
  } else {
    handleLocationError(false, infoWindow, map.getCenter())
  }
}

function handleLocationError (browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}

eventBriteCall()
