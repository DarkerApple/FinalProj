document.addEventListener('DOMContentLoaded', function() {
    // Theme selector functionality
    const themeSelector = document.getElementById('themeSelector');
    themeSelector.addEventListener('change', function() {
        setTheme(this.value);
    });

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    themeSelector.value = savedTheme;
});

function setTheme(theme) {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-theme';
}

// Call applyTheme when the page loads
window.onload = applyTheme;