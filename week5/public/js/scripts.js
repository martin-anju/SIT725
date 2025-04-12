document.addEventListener("DOMContentLoaded", function () {
  console.log("Locate a Socket is live!");

  const cardContainer = document.createElement("div");
  cardContainer.className = "container row";
  document.body.appendChild(cardContainer);

  // Load socket cards from server
  fetch("/api/sockets")
  .then(res => res.json())
  .then(result => {
    console.log("Fetched result:", result); // 👈 Check this in the browser console

    if (Array.isArray(result.data)) {
      result.data.forEach(socket => {
        const card = createCard(socket.place, socket.details);
        cardContainer.appendChild(card);
      });
    } else {
      console.error("Expected an array, got:", result.data);
    }
  })
  .catch(err => console.error("Fetch error:", err));

    

  // Create and return a Materialize card element
  function createCard(title, description) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col s12 m6 l4";
    cardDiv.innerHTML = `
      <div class="card">
        <div class="card-content">
          <span class="card-title">${title}</span>
          <p>${description}</p>
        </div>
      </div>`;
    return cardDiv;
  }

  // Handle form submissions
  const submitForm = document.querySelector("#submit form");
  submitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const place = document.getElementById("place").value;
    const details = document.getElementById("details").value;

    fetch("/api/sockets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ place, details })
    })
    .then(res => res.json())
    .then(response => {
      M.toast({ html: response.message, classes: "teal darken-2" });
      const newCard = createCard(place, details);
      cardContainer.appendChild(newCard);
      submitForm.reset();
    });
  });

  // Disable default find form
  const findForm = document.querySelector("#find form");
  findForm.addEventListener("submit", function (e) {
    e.preventDefault();
    M.toast({ html: "Search feature coming soon!", classes: "teal darken-2" });
  });
});
