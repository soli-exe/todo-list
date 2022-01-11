let darkMode = false;
const togglerIcon = document.querySelector('#togglerIcon');
const bgImg = document.querySelector("#bgImg");
let img = '';

function setBackgroundImg() {
    let windowWidth = window.innerWidth;
    if (windowWidth <= 768){
        darkMode == true ? img='bg-mobile-dark' : img='bg-mobile-light';
    } if (windowWidth > 768) {
        darkMode == true ? img='bg-desktop-dark' : img='bg-desktop-light';
    }
    return bgImg.style.backgroundImage = `url("/assets/img/${img}.jpg")`;
}

window.addEventListener('resize', setBackgroundImg);
themeToggler.addEventListener('click', switchTheme);

function switchTheme() {

    if (!darkMode) {
        darkMode = true;
        setBackgroundImg();
        document.documentElement.setAttribute('data-theme', 'dark');
        togglerIcon.src = './assets/icons/icon-sun.svg';
        localStorage.setItem('theme', 'dark');
    }
    else {
        darkMode = false;
        setBackgroundImg();
        document.documentElement.setAttribute('data-theme', 'light');
        togglerIcon.src = './assets/icons/icon-moon.svg';
        localStorage.setItem('theme', 'light');
    }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    setBackgroundImg();
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        darkMode = true;
        setBackgroundImg();
        document.querySelector('#togglerIcon').src = './assets/icons/icon-sun.svg';
    }
}