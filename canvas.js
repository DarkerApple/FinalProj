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

    // Drawing functionality
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clearButton');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    clearButton.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
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