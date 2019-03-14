$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  // var bodyInput = $("#body");

  var saveButton = $('#saveButton');

  // Adding an event listener for when the form is submitted
  $(saveButton).on('click', function(event){
    event.preventDefault();
    var titleInput = $('#title');
    var descriptionInput = $('#description');
    var urlInput = $('#link');
    console.log(titleInput, descriptionInput, urlInput);
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput.val().trim(),
      description: descriptionInput.val().trim(),
      url: urlInput.val().trim()
    }

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post

    submitPost(newPost);

  });
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)

  // A function for handling what happens when the form to create a new post is submitted
  /*function handleButtonClick (event) {
    event.preventDefault()
    console.log(titleInput, descriptionInput, urlInput)
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput.val().trim(),
      description: descriptionInput.val().trim(),
      url: urlInput.val().trim()
    }

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post

    submitPost(newPost)
  }*/



  // Submits a new post and brings user to blog page upon completion
  function submitPost (data) {
    $.post('/api/data', data, function () {});
  }
})
