document.addEventListener("DOMContentLoaded", function () {
  // Add your JavaScript code here
  document.querySelectorAll(".see-more").forEach((link) => {
    link.addEventListener("click", function () {
      const content = this.previousElementSibling; // Get the content element
      content.style.overflow = "visible"; // Display the full content
      this.style.display = "none"; // Hide the "see more" link
    });
  });
});
