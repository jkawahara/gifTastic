// Ensure document is ready
$(document).ready(function() {
  // VARIABLES - GLOBAL
  // =========

  // Declare array of strings
  var topics = ["chocolate lab", "russian blue cat", "pixie-bob", "hummingbird", "gray squirrel", "skunk", "eagle", "quail", "rattlesnake", "goat", "cow", "pig", "chicken", "spider", "June bug", "owl", "bee", "wasp", "dolphin", "whale"];

  // FUNCTIONS
  // =========

  // Display buttons of array elements
  function displayButtons() {
    $(".button-section").empty();
    for (var i = 0; i < topics.length; i++) {
      $(".button-section").append(`<button data-label="${topics[i]}">${topics[i]}</button>`);
    }
  }

  // Build query for AJAX request
  function queryBuilder(animal) {
    // Giphy Search Endpoint
    queryURL = "https://api.giphy.com/v1/gifs/search?";
    queryParams = {
      "api_key": "hcBcx9BTBmEP8j639mgYzTU1FLGFc0hc",
      "q": animal
    }

    // Return URL + serialized params
    return queryURL + $.param(queryParams);
  }

  // Display gifs with JSON object from API search result
  function displayGifs(giphyData) {
    $(".gif-section").empty();

    // Display 10 ratings with static gifs
    for (var i = 0; i < 10; i++) {
      var newGif = $("<p>");
      // Rating of object
      newGif.text(`Rating: ${giphyData.data[i].rating}`);
      
      // Add still image element with still and animate data states  
      newGif.prepend(`<img class="gif" src="${giphyData.data[i].images.fixed_height_still.url}" data-state="still" data-still="${giphyData.data[i].images.fixed_height_still.url}" data-animate="${giphyData.data[i].images.fixed_height.url}" alt="${giphyData.data[i].images.fixed_height_still.url}">`);

      // Append to gif section
      $(".gif-section").append(newGif);
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
    topics.push($("#add-animal-input").val().trim());
    console.log(topics);
    $("#add-animal-input").val("");
    displayButtons();
  }

  // MAIN CONTROLLER
  displayButtons();
  
  // Listen for button click to initiate API search
  $(document).on("click", ".button-section > button", function() {
    // Declare variables for API search
    var queryURL = queryBuilder($(this).attr("data-label"));

    // AJAX request to API search, responding with JSON object, which is passed to displayGifs function
    $.ajax( {
      url: queryURL,
      method: "GET"
    }).then(displayGifs);

  });

  // Listen for image click to call imgToggler function
  $(document).on("click", ".gif", imgToggler);

  // Listen for form submit to call queryButton function
  $("#add-animal-submit").on("click", queryButton);

});
