// main.js

$(document).ready(function () {
  // Handle click event for Edit button
  $(".edit-btn").click(function () {
    // Fetch item data using AJAX or other method
    // Populate edit form inside modal with fetched data
    // Example:
    var itemId = $(this).data("item-id");
    $.ajax({
      url: "/edit/" + itemId,
      method: "GET",
      success: function (data) {
        // Populate edit form fields with fetched data
        $("#editModal .modal-body").html(data);
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  });
});
