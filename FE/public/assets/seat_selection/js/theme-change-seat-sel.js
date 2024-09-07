const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);



    if (currentTheme === 'dark') {

    }
}

function switchTheme(e) {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');

    }
}
window.addEventListener('storage', switchTheme, false);