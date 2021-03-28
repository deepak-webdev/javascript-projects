let imageContainer = document.getElementById("image-container");
let loader = document.getElementById("loader");
let photos = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash Api
const count = 10;
const apiKey = "zJpuyGoy4a4ZL5lF1-8INkgmqgG-XEp78ivfvZc6JrY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if images finished loading
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attribute on DOM element
function setAttribute(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// function to display photos
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photos.length;
  photos.forEach((photo) => {
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for photos
    const img = document.createElement("img");

    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // eventListner to check if all images finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// funtion to get photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of the page

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
