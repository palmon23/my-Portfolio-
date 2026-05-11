// THEME SWITCHER

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


// GEOLOCATION GREETING

const greeting = document.getElementById("greeting");

if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition(async (position) => {

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "your city";

      greeting.textContent =
        `Hello from ${city}! I'm a Web Developer`;

    } catch (error) {

      greeting.textContent =
        "Hello! I'm a Web Developer";
    }

  });

}


// PROJECT FILTER

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    document
      .querySelector(".filter-btn.active")
      .classList.remove("active");

    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {

      if (
        filter === "all" ||
        card.dataset.category === filter
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

});


// EMAILJS INIT
emailjs.init("uQEsk3sU06C3pFnjx");


// FORM SUBMIT
const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {

  e.preventDefault();

  emailjs.sendForm(
    "service_jmxnrwr",
    "template_10x8du6",
    this
  )

  .then(() => {

    alert("Message sent successfully!");

    form.reset();

  })

  .catch((error) => {

    alert("Failed to send message");

    console.log(error);

  });

});