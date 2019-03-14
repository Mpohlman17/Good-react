var map_search;
var listRandom = [];
var sliderInstance;

// gets information for API search from page
$("#searchBtn").on("click", function(event) {
  event.preventDefault();
  var zip = $("#zipCodeInput").val();
  var mileage = $("#mileageInput").val();
  // clears data input from API's
  // ClearFields()
  var searchOption = $("#selectorDropdown").val();
  if (searchOption === "Charity Events") {
    // event search function
    const token = "LTV5SOWTS6QBZF72VGDA";
    let queryURL =
      "https://www.eventbriteapi.com/v3/events/search/?location.address=" +
      zip +
      "&location.within=" +
      mileage +
      "mi&expand=venue&categories=111&token=" +
      token;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the resulting object
        $(".testimonials").html("");
        listRandom = [];
        let results = response.events;
        map_search.removeMarkers();
        console.log("resultado " + results);
        // extracting data for each event to push into cards
        for (var i = 0; i < results.length; i++) {
          let name = results[i].name.text;
          let description = results[i].description.text;
          if (description.length > 300) {
            description = description.substr(0, 300);
          }
          let url = results[i].url;
          let latitude = results[i].venue.latitude;
          let longitude = results[i].venue.longitude;
          var datacharity = new dataCharity();
          datacharity.charityName = name.trim();
          datacharity.charityNextLine = description.trim();
          datacharity.charityUrl = url;
          datacharity.latitude = latitude;
          datacharity.longitude = longitude;
          // datacharity.charityAbout = charityAbout;
          datacharity.address = null;
          listRandom.push(datacharity);
        }
        printResult(listRandom);
      });
  } else if (searchOption === "Local Charities") {
    // charit search function
    const key = "6e6269f3d39bb81c4b37878dfaaef2f6";
    const id = "aa69566f";
    let queryURL =
      "https://api.data.charitynavigator.org/v2/Organizations?app_id=" +
      id +
      "&app_key=" +
      key +
      "&pageSize=15&zip=" +
      zip;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // console.log("response "+response);
        $(".testimonials").html("");
        listRandom = [];
        for (let i = 0; i < response.length; i++) {
          let charityName = response[i].charityName;
          let charityCity = response[i].mailingAddress.city;
          let charityAddress = response[i].mailingAddress.streetAddress1;
          let charityUrl = response[i].charityNavigatorURL;
          let charityFocus = response[i].irsClassification.nteeType;
          if (charityFocus == null) {
            charityFocus = "";
          }
          let zip = response[i].mailingAddress.postalCode.split("-");
          let address = charityAddress + ", " + zip[0] + ", " + charityCity;
          var datacharity = new dataCharity();
          datacharity.charityName = charityName.trim();
          datacharity.charityNextLine = charityFocus;
          datacharity.charityUrl = charityUrl;
          // datacharity.charityAbout = charityAbout;
          datacharity.address = address;
          listRandom.push(datacharity);
        }
        printResult(listRandom);
      });
  } else {
    alert("Please select charity or event from dropdown! :D");
  }
});

function printResult(listRandom) {
  var text = "";
  var cont = 0;
  var count = 0;
  var final = "";
  for (let i = 0; i < listRandom.length; i++) {
    if (cont == 6) {
      cont = 0;
      text = text.concat("</div>");
      final = final
        .concat('<div class="testimonial">')
        .concat(text)
        .concat("</div>");
      text = text.concat(
        '<div class="image-column col-md-4 col-sm-6 col-xs-12"><div class="image-holder"><div class="image-content"><h5 id="title">' +
          listRandom[i].charityName +
          '</h5></a><p id="description">' +
          listRandom[i].charityNextLine +
          '</p><div class="link-btn"><a href="' +
          listRandom[i].charityUrl +
          '" class="btn-style-three" id="url" target="_blank">MORE INFO</a></div><div class="savebutton link-btn" data-x="' +
          listRandom[i].charityName +
          '" data-y="' +
          listRandom[i].charityNextLine +
          '" data-z="' +
          listRandom[i].charityUrl +
          '"><a   class="btn-style-three" >SAVE</a></div></div></div></div>'
      );
      text = "";
    }
    if (cont == 3) {
      text = '<div class="row">'.concat(text).concat('</div><div class="row">');
      text = text.concat(
        '<div class="image-column col-md-4 col-sm-6 col-xs-12"><div class="image-holder"><div class="image-content"><h5 id="title">' +
          listRandom[i].charityName +
          '</h5></a><p id="description">' +
          listRandom[i].charityNextLine +
          '</p><div class="link-btn"><a href="' +
          listRandom[i].charityUrl +
          '" class="btn-style-three" id="url" target="_blank">MORE INFO</a></div><div class="savebutton link-btn" data-x="' +
          listRandom[i].charityName +
          '" data-y="' +
          listRandom[i].charityNextLine +
          '" data-z="' +
          listRandom[i].charityUrl +
          '"><a   class="btn-style-three">SAVE</a></div></div></div></div>'
      );
      cont++;
    } else {
      text = text.concat(
        '<div class="image-column col-md-4 col-sm-6 col-xs-12"><div class="image-holder"><div class="image-content"><h5 id="title">' +
          listRandom[i].charityName +
          '</h5></a><p id="description">' +
          listRandom[i].charityNextLine +
          '</p><div class="link-btn"><a href="' +
          listRandom[i].charityUrl +
          '" class="btn-style-three" id="url" target="_blank">MORE INFO</a></div><div class="savebutton link-btn" data-x="' +
          listRandom[i].charityName +
          '" data-y="' +
          listRandom[i].charityNextLine +
          '" data-z="' +
          listRandom[i].charityUrl +
          '"><a   class="btn-style-three">SAVE</a></div></div></div></div>'
      );
      cont++;
    }
    if (listRandom[i].address == null) {
      if (count == 0) {
        map_search.setCenter(listRandom[i].latitude, listRandom[i].longitude);
        map_search.addMarker({
          lat: listRandom[i].latitude,
          lng: listRandom[i].longitude,
          title: listRandom[i].charityName,
          click: function(e) {
            window.open(listRandom[i].charityUrl, "_blank");
          }
        });
      } else {
        map_search.addMarker({
          lat: listRandom[i].latitude,
          lng: listRandom[i].longitude,
          title: listRandom[i].charityName,
          click: function(e) {
            window.open(listRandom[i].charityUrl, "_blank");
          }
        });
      }
    } else {
      getCoordinates(
        listRandom[i].charityName,
        listRandom[i].address,
        listRandom[i].charityUrl,
        count
      );
    }
    count++;
  }
  final = final
    .concat('<div class="testimonial"><div class="row">')
    .concat(text)
    .concat("</div></div>");
  $(".testimonials").append(final);
  if (sliderInstance != undefined) {
    sliderInstance.reloadSlider();
  } else {
    sliderInstance = $(".testimonials").bxSlider({
      auto: false,
      pause: 8000, // time on each review
      mode: "fade", // or slide
      infiniteLoop: false,
      controls: false, // true for arrows
      slideMargin: 2
    });
  }
}

function getCoordinates(charityName, address, url, count) {
  let queryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    address +
    "&key=" +
    "AIzaSyCDd9mg5blcxDthtRIGYiPaZCfCRgObEmI";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var latitude = response.results[0].geometry.location.lat;
    var longitude = response.results[0].geometry.location.lng;
    if (count == 0) {
      map_search.setCenter(latitude, longitude);
    }
    map_search.addMarker({
      lat: latitude,
      lng: longitude,
      title: charityName,
      click: function(e) {
        window.open(url, "_blank");
      }
    });
  });
}

$(document).ready(function() {
  GMaps.geolocate({
    success: function(position) {
      latme = position.coords.latitude;
      lngme = position.coords.longitude;
      map_search = new GMaps({
        div: "#map-search",
        zoom: 11,
        lat: latme,
        lng: lngme
      });
    },
    error: function(error) {
      alert("Geolocation failed: " + error.message);
    },
    not_supported: function() {},
    always: function() {
      // alert("Done!");
    }
  });
  $("#map-search").css("height", "400px");

  $(document).on("click", ".savebutton", function() {
    var newPost = {
      title: $(this).data("x"),
      description: $(this).data("y"),
      url: $(this).data("z")
    };
    console.log("newPost " + newPost);
    $.post("/api/data", newPost, function() {});
  });
});
