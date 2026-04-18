const Storage = {
    // Generic Save/Load
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    load: (key) => JSON.parse(localStorage.getItem(key)) || [],

    // User Operations
    getUsers: () => Storage.load('users'),
    saveUser: (user) => {
        const users = Storage.getUsers();
        users.push({ ...user, id: Date.now() });
        Storage.save('users', users);
    },
    deleteUser: (id) => {
        const users = Storage.getUsers().filter(u => u.id !== id);
        Storage.save('users', users);
    },

    // Product Operations
    getProducts: () => Storage.load('products'),
    saveProduct: (product) => {
        const products = Storage.getProducts();
        products.push({ ...product, id: Date.now() });
        Storage.save('products', products);
    },

    // Initialize Mock Data if empty
    init: () => {
        if (Storage.getUsers().length === 0) {
            Storage.save('users', [
                { id: 1, name: 'Michael Holz', email: 'michael@mail.com', role: 'Admin', status: 'Active' },
                { id: 2, name: 'Paula Wilson', email: 'paula@mail.com', role: 'Publisher', status: 'Active' }
            ]);
        }
        if (Storage.getProducts().length === 0) {
            Storage.save('products', [
                { id: 1, name: 'Dignissim Clock', price: 229, stock: 23, status: 'In Stock' },
                { id: 2, name: 'Steelio Watch', price: 119, stock: 12, status: 'In Stock' }
            ]);
        }
    }
};

// Run initialization immediately
Storage.init();
