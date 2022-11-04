const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30
const apiKey = 'Your API KEY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
   
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function to Set Attributes on DOM Elements

function setAttributes(element, attributes){
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    };
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    totalImages += photosArray.length;
    
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank', //To open in a new tab
        })

        // Create <img> for photo
        const img = document.createElement('img');
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // The above function is DRY code (Do not Repeat Yourself. It used to be the below commented code.)
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        // Put <img> inside the <a>, and then put both inside imageContainer Element

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}

// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near the bottom of the page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight * totalImages / count + window.scrollY  >= document.body.offsetHeight - 1000 && ready){
        
        ready = false;
        getPhotos();
        
    }
})

// On Load
getPhotos();