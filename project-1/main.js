const nav = document.querySelector('.nav__h');
const closeBtn = document.querySelector('.burger__close');
const openBtn = document.querySelector('.burger__open');


openBtn.addEventListener('click', ()=>{
    nav.setAttribute('data-opened', 'true')
})


closeBtn.addEventListener('click', ()=>{
    nav.setAttribute('data-opened', 'false')
})


const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switchersRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) {
        const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
        currentRadio.checked = true;
        
    }

    [...switchersRadios].forEach((radio) => {
        radio.addEventListener('change', (e) => {
            setScheme(e.target.value)
        });
    });
    
}


function setupScheme() {
    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();

    if (savedScheme === null) return;

    if (savedScheme !== systemScheme) {
        setScheme(savedScheme);
    }
}


function setScheme(scheme) {
    switchMedia(scheme);

           savedScheme(scheme)
        
}

function switchMedia (scheme) {
    let lightMedia;
    let darkMedia;

      {
        lightMedia = (scheme === 'light') ? 'all' : 'not all';
        darkMedia = (scheme === 'dark') ? 'all' : 'not all';

    }

[...lightStyles].forEach((link) => {
    link.media = lightMedia;
});

[...darkStyles].forEach((link) => {
    link.media = darkMedia;
});

}


function getSystemScheme() {
    const darkScheme = darkSchemeMedia.matches;
    
    return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
    return localStorage.getItem('color-scheme');
}

function savedScheme(scheme) {
    localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
    localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();