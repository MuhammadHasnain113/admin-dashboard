document.addEventListener('DOMContentLoaded', () => {
    // Update Stats Cards dynamically
    const users = Storage.getUsers();
    const products = Storage.getProducts();

    document.getElementById('totalUsersCount').innerText = users.length;
    document.getElementById('totalProductsCount').innerText = products.length;

    // Sales Progress Chart (Requirement 4.7)
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue ($)',
                data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // Subscriptions Pie Chart
    const rolesCtx = document.getElementById('rolesChart').getContext('2d');
    new Chart(rolesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Admin', 'Publisher', 'Reviewer'],
            datasets: [{
                data: [
                    users.filter(u => u.role === 'Admin').length,
                    users.filter(u => u.role === 'Publisher').length,
                    users.filter(u => u.role === 'Reviewer').length + 1 // Mock padding
                ],
                backgroundColor: ['#4f46e5', '#10b981', '#f59e0b']
            }]
        }
    });
});
