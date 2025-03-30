document.addEventListener("DOMContentLoaded", function () {
    console.log("Locate a Socket is live!");
  
    // Show alert on form submission
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        M.toast({ html: 'Feature coming soon!', classes: 'teal darken-2' });
      });
    });
  });
  