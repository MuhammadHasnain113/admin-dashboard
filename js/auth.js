const currentTheme = localStorage.getItem('theme') || (JSON.parse(localStorage.getItem('admin_settings'))?.theme);

if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

const AuthService = {
    checkAuth: () => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn !== 'true') {
            window.location.href = 'login.html';
        }
    },
    logout: () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : { email: 'Admin' };
    }
};

const currentPage = window.location.pathname;
if (!currentPage.includes('login.html') && 
    !currentPage.includes('signup.html') && 
    !currentPage.includes('index.html')) {
    AuthService.checkAuth();
}
