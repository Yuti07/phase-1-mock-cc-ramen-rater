// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenDetail = document.querySelector('#ramen-detail');
    const newRamenForm = document.querySelector('#new-ramen');

    // Fetch all ramens from the API
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        // Display each ramen image in the ramen menu
        ramens.forEach(ramen => {
          const ramenImage = document.createElement('img');
          ramenImage.src = ramen.image;
          ramenImage.addEventListener('click', () => displayRamenDetail(ramen));
          ramenMenu.appendChild(ramenImage);
        });

        // Display details for the first ramen
        displayRamenDetail(ramens[0]);
      });

    // Function to display ramen details
    function displayRamenDetail(ramen) {
      ramenDetail.innerHTML = `
        <img src="${ramen.image}" alt="${ramen.name}" />
        <h2>${ramen.name}</h2>
        <h3>${ramen.restaurant}</h3>
        <p>Rating: ${ramen.rating}</p>
        <p>Comment: ${ramen.comment}</p>
      `;
    }

    // Event listener for new ramen form submission
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();

      // Get the form inputs
      const name = document.querySelector('#new-name').value;
      const restaurant = document.querySelector('#new-restaurant').value;
      const image = document.querySelector('#new-image').value;
      const rating = document.querySelector('#new-rating').value;
      const comment = document.querySelector('#new-comment').value;

      // Create a new ramen object
      const newRamen = {
        name: name,
        restaurant: restaurant,
        image: image,
        rating: rating,
        comment: comment
      };

      // Add the new ramen to the menu
      const newRamenImage = document.createElement('img');
      newRamenImage.src = newRamen.image;
      newRamenImage.addEventListener('click', () => displayRamenDetail(newRamen));
      ramenMenu.appendChild(newRamenImage);

      // Clear the form inputs
      newRamenForm.reset();
    });
  });

