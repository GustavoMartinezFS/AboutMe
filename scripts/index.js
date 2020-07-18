/* index */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Function for smooth scrolling
function scrollToSection(id) {
    const targetSection = document.getElementById(id);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 50, // Adjust the value as needed
            behavior: 'smooth'
        });
    }
}

// Function to handle smooth scrolling on link click
function handleNavClick(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href').substring(1);
    scrollToSection(targetId);
}

// Assign smooth scroll event to each navigation link
navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

/* Form */

class Activity {
    constructor(id, title, description, url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    /* method to return all activities */
    getAllActivities() {
        return this.activities;
    };

    /* method to filter activities */
    createActivity(title, description, url) {
        const id = this.getNextId();
        const activity = new Activity(id, title, description, url);
        this.insertActivitySorted(activity);
        return activity;
    };

    /* method to delete */
    deleteActivity(idToDelete) {
        this.activities = this.activities.filter((activity) => activity.id !== idToDelete);
    };

    getNextId() {
        if (this.activities.length === 0) {
            return 1;
        }
        return this.activities[this.activities.length - 1].id + 1;
    }

    insertActivitySorted(activity) {
        const index = this.activities.findIndex(existingActivity => existingActivity.id > activity.id);
        if (index === -1) {
            this.activities.push(activity);
        } else {
            this.activities.splice(index, 0, activity);
        }
    }
};

const activityToHTML = (activities) => {
    const { title, description, url } = activities;   // Destructuring

    // Create HTML elements.
    const cardTitle = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardImage = document.createElement("img");
    const cardElement = document.createElement("div");

    // Assign values
    cardTitle.innerHTML = title;
    cardDescription.innerHTML = description;
    cardImage.src = url;

    // Link with CSS
    cardTitle.classList.add('title');
    cardDescription.classList.add('description');
    cardImage.classList.add('url');
    cardElement.classList.add('activityContainer');

    // Link with card
    cardElement.appendChild(cardTitle);
    cardElement.appendChild(cardDescription);
    cardElement.appendChild(cardImage);
    largeDiv.append(cardElement);

    // Return the div
    return cardElement;
}

const loadAllToDOM = () => {
    const activityContainer = document.getElementById('div1');

    activityContainer.innerHTML = '';

    // Complete list of activities
    const activities = myRepository.getAllActivities();

    // Map list of activities
    const htmlElements = activities.map(activity => activityToHTML(activity));

    htmlElements.forEach(element => {
        activityContainer.appendChild(element);
    });
}

/* Button */
const addButton = document.getElementById("add");
const largeDiv = document.getElementById('div1');
const myRepository = new Repository();

const handler = () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;

    if (!title || !description || !url) {
        alert("Please complete all fields.");
    } else {
        const activity = myRepository.createActivity(title, description, url);
        //loadAllToDOM();
        displayActivity(activity);

        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('url').value = '';
    }
}

function displayActivity(activity) {
    const activityCard = document.createElement('div');
    activityCard.className = "cardElementStyle";

    // Title
    const titleElement = document.createElement('strong');
    titleElement.innerText = activity.title;
    activityCard.appendChild(titleElement);

    activityCard.appendChild(document.createElement('br'));

    // Description
    const descriptionElement = document.createElement('span');
    descriptionElement.innerText = activity.description;
    activityCard.appendChild(descriptionElement);

    activityCard.appendChild(document.createElement('br'));

    // Image
    const imgElement = document.createElement('img');
    imgElement.src = activity.url;
    imgElement.alt = 'photo';
    activityCard.appendChild(imgElement);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteActivity(activity.id));
    activityCard.appendChild(document.createElement('br'));
    activityCard.appendChild(deleteButton);

    // Add card to container
    largeDiv.appendChild(activityCard);

    console.log('Activities:', myRepository.getAllActivities());
}

function deleteActivity(id) {
    myRepository.deleteActivity(id);
    refreshActivityDisplay();
}

function refreshActivityDisplay() {
    largeDiv.innerHTML = '';
    myRepository.getAllActivities().forEach(activity => displayActivity(activity));
}

addButton.addEventListener("click", handler)  // Button event.
