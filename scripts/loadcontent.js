document.addEventListener('DOMContentLoaded', () => {
    fetch('./scripts/content.json')
        .then(response => response.json())
        .then(data => {
            // Home
            document.querySelector('#home h1').textContent = data.home;

            // About Me
            document.querySelector('#about_me h2').textContent = data.about_me.title;
            document.querySelector('#about_me p').textContent = data.about_me.text;

            // Techs
            document.querySelector('#techs h2').textContent = data.techs.title;
            document.querySelector('.html img').alt = data.techs.html;
            document.querySelector('.photoshop img').alt = data.techs.photoshop;
            document.querySelector('.javascript img').alt = data.techs.javascript;

            // Acts
            document.querySelector('#acts h2').textContent = data.acts.title;

            // Footer
            document.querySelector('.footer').textContent = data.footer;
        })
        .catch(error => console.error('Error loading content:', error));
});
