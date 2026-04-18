document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');
    const modeIcon = document.getElementById('modeIcon');

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('admin_settings')) || {
            name: "Admin User",
            email: "admin@pro.com",
            theme: "light"
        };
        
        document.getElementById('set_name').value = settings.name;
        document.getElementById('set_email').value = settings.email;
        
        if (document.documentElement.classList.contains('dark')) {
            modeIcon.innerText = "☀️";
        } else {
            modeIcon.innerText = "🌙";
        }
    }

    profileForm.onsubmit = (e) => {
        e.preventDefault();
        const settings = JSON.parse(localStorage.getItem('admin_settings')) || {};
        
        settings.name = document.getElementById('set_name').value;
        settings.email = document.getElementById('set_email').value;
        
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        alert("Settings saved successfully!");
    };

    document.getElementById('passwordForm').onsubmit = (e) => {
        e.preventDefault();
        alert("Password updated (Simulation only)");
        e.target.reset();
    };

    window.toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        const settings = JSON.parse(localStorage.getItem('admin_settings')) || {};
        
        const newTheme = isDark ? 'dark' : 'light';
        settings.theme = newTheme;
        modeIcon.innerText = isDark ? "☀️" : "🌙";
        
        localStorage.setItem('admin_settings', JSON.stringify(settings));
        localStorage.setItem('theme', newTheme);
    };

    loadSettings();
});
