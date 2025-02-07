// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

// Function to get a cookie
function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// Function to apply saved preferences
function applyPreferences() {
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');

    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', savedFontSize + 'px');
        document.getElementById('fontsize').value = savedFontSize;
    }
    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        document.getElementById('fontcolor').value = savedFontColor;
    }
}

// Event listener for form submission
document.getElementById('fontForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    setCookie('fontsize', fontSize, 7); // Save for 7 days
    setCookie('fontcolor', fontColor, 7); // Save for 7 days

    applyPreferences(); // Apply the preferences immediately
});

// Apply preferences on page load
window.onload = applyPreferences;

