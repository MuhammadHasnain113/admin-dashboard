document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('productTableBody');
    const productForm = document.getElementById('productForm');
    const searchInput = document.getElementById('prodSearch');
    const sortSelect = document.getElementById('prodSort');

    // 1. Render Table with Filter and Sort
    function renderProducts() {
        let products = Storage.getProducts();

        // Filtering
        const query = searchInput.value.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(query));

        // Sorting
        const sortVal = sortSelect.value;
        if (sortVal === 'price-low') products.sort((a, b) => a.price - b.price);
        if (sortVal === 'price-high') products.sort((a, b) => b.price - a.price);
        if (sortVal === 'qty-low') products.sort((a, b) => a.qty - b.qty);

        tableBody.innerHTML = products.map(p => `
            <tr class="border-b hover:bg-gray-50 transition text-sm">
                <td class="p-4">
                    <img src="${p.img || 'https://via.placeholder.com/40'}" class="w-10 h-10 rounded border object-cover">
                </td>
                <td class="p-4 font-semibold text-gray-700">${p.name}</td>
                <td class="p-4 text-gray-600">$${parseFloat(p.price).toFixed(2)}</td>
                <td class="p-4 text-gray-600">${p.qty}</td>
                <td class="p-4">
                    <span class="px-2 py-1 rounded text-xs font-bold 
                        ${p.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${p.status}
                    </span>
                </td>
                <td class="p-4 text-center space-x-2">
                    <button onclick="editProduct(${p.id})" class="text-blue-500 font-bold hover:underline">Edit</button>
                    <button onclick="deleteProduct(${p.id})" class="text-red-500 font-bold hover:underline">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // 2. Add / Update Logic (3 + 2 Marks)
    productForm.onsubmit = (e) => {
        e.preventDefault();
        const id = document.getElementById('prodId').value;
        let products = Storage.getProducts();

        const data = {
            name: document.getElementById('pName').value,
            price: document.getElementById('pPrice').value,
            qty: document.getElementById('pQty').value,
            img: document.getElementById('pImg').value,
            status: document.getElementById('pStatus').value
        };

        if (id) {
            // Update logic
            const idx = products.findIndex(p => p.id == id);
            products[idx] = { ...data, id: parseInt(id) };
        } else {
            // Add logic
            data.id = Date.now();
            products.push(data);
        }

        Storage.save('products', products);
        closeProductModal();
        renderProducts();
    };

    // 3. Delete Functionality (2 Marks)
    window.deleteProduct = (id) => {
        if (confirm("Remove item?")) {
            const updated = Storage.getProducts().filter(p => p.id !== id);
            Storage.save('products', updated);
            renderProducts();
        }
    };

    // 4. Edit Functionality (Pre-fill)
    window.editProduct = (id) => {
        const p = Storage.getProducts().find(item => item.id == id);
        document.getElementById('modalTitle').innerText = "Update Product";
        document.getElementById('prodId').value = p.id;
        document.getElementById('pName').value = p.name;
        document.getElementById('pPrice').value = p.price;
        document.getElementById('pQty').value = p.qty;
        document.getElementById('pImg').value = p.img || "";
        document.getElementById('pStatus').value = p.status;
        openProductModal();
    };

    // 5. Global Modal Controls
    window.openProductModal = () => document.getElementById('productModal').classList.replace('hidden', 'flex');
    window.closeProductModal = () => {
        document.getElementById('productModal').classList.replace('flex', 'hidden');
        productForm.reset();
        document.getElementById('prodId').value = "";
    };

    // Event Listeners for Filter/Sort
    searchInput.addEventListener('input', renderProducts);
    sortSelect.addEventListener('change', renderProducts);

    renderProducts();
});
