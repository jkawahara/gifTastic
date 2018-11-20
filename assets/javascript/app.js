// Ensure document is ready
$(document).ready(function() {
  // VARIABLES - GLOBAL
  // =========

  // Declare array of strings
  var topics = ["dog", "cat", "pixie-bob", "hummingbird", "squirrel", "coyote", "raven", "quail", "snake", "goat", "cow", "pig", "chicken", "spider", "beetle", "owl", "bee", "wasp", "dolphin", "whale"];



  // FUNCTIONS
  // =========

  // Display buttons of array elements
  function displayButtons() {
    for (var i = 0; i < topics.length; i++) {
      $(".button-section").append(`<button data-label="${topics[i]}">${topics[i]}</button>`);
    }
  }

  // MAIN CONTROLLER
  displayButtons();

  // Your app should take the topics in this array and create buttons in your HTML.
  // Try using a loop that appends a button for each string in the array.

  
  // When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
  // When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

  // Under every gif, display its rating (PG, G, so on).

  // This data is provided by the GIPHY API.
  // Only once you get images displaying with button presses should you move on to the next step.

  // Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


});
