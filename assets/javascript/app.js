// Ensure document is ready
$(document).ready(function() {
  // VARIABLES - GLOBAL
  // =========

  // Declare array of strings
  var topics = ["new year", "chinese new year", "groundhog day", "valentine's day", "daylight saving time", "st. patrick's day", "april fool's day", "tax day", "cinco de mayo", "mardi gras", "mother's day", "memorial day", "father's day", "independence day", "labor day", "halloween", "thanksgiving", "christmas"];
  
  var giphyData; // API search response
  var queryOffset; // Query offset parameter

  // FUNCTIONS
  // =========

  // Display buttons of array elements after page load
  function displayButtons() {
    $(".button-section").empty();
    for (var i = 0; i < topics.length; i++) {
      $(".button-section").append(`<button class="btn btn-primary btn-sm mr-1 mb-1" data-label="${topics[i]}">${topics[i]}</button>`);
    }
  }

  // Build query for AJAX request
  function queryBuilder(topic, offset) {
    // Giphy Search Endpoint
    queryURL = "https://api.giphy.com/v1/gifs/search?";
    queryParams = {
      "api_key": "hcBcx9BTBmEP8j639mgYzTU1FLGFc0hc",
      "q": topic,
      "limit": 10,
      "offset": offset,
    }

    // Return URL + serialized params for API search
    return queryURL + $.param(queryParams);
  }
  
  // Display gifs with JSON object from API search result 
  function displayGifs() {
    // Display static gifs and ratings
    for (var i = 0; i < 10; i++) {
      var newGif = $("<p class='float-left mr-3'>");
      
      // Add still image element with still and animate data states  
      newGif.append(`<img class="gif" src="${giphyData.data[i].images.fixed_height_still.url}" data-state="still" data-still="${giphyData.data[i].images.fixed_height_still.url}" data-animate="${giphyData.data[i].images.fixed_height.url}" alt="${giphyData.data[i].images.fixed_height_still.url}">`);
      
      // Metadata of object
      newGif.append(`<figcaption>Slug: ${giphyData.data[i].slug.substring(0, 24)}</figcaption>`);
      newGif.append(`<figcaption>Type: ${giphyData.data[i].type.substring(0, 24)}</figcaption>`);
      newGif.append(`<figcaption>Rating: ${giphyData.data[i].rating}</figcaption>`);

      // Append to gif section
      $(".gif-section").prepend(newGif);
    }
  }

  // Toggle still <--> animate images
  function imgToggler() {
    // Check if current image is still or animate and toggle
    if ($(this).attr("data-state") === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  // Add query buttons
  function queryButton() {
    event.preventDefault();
    topics.push($("#add-search-input").val().trim());
    $("#add-search-input").val("");
    displayButtons();
  }
  

  // MAIN CONTROLLER
  displayButtons();
  
  // Listen for buttons click to initiate API search
  $(document).on("click", ".button-section > button, #add-gifs-btn", function() {
    // Check if adding additional gifs or initial query; 
    if ($(this).attr("id") === "add-gifs-btn") {
      queryOffset += 10;
    } else {
      queryOffset = 0;
      $(".gif-section, .add-gifs-section").empty();
      // Add button to display 10 additional gifs
      $(".add-gifs-section").append(`<button class="btn btn-primary btn-sm m-1" id="add-gifs-btn" data-label="${$(this).attr("data-label")}">Add 10 more gifs</button>`)
    }
    // Declare queryURL by calling queryBuilder function, passing data-label and offset
    var queryURL = queryBuilder($(this).attr("data-label"), queryOffset);

    // AJAX request to API search, responding with JSON object, which is passed to displayGifs function
    $.ajax( {
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      giphyData = response;
      // Call displayGifs function 
      displayGifs();
    });

  });

  // Listen for image click to call imgToggler function
  $(document).on("click", ".gif", imgToggler);

  // Listen for add search submit to call queryButton function
  $("#add-search-submit").on("click", queryButton);

});
