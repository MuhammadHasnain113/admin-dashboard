document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('userTableBody');
    const userForm = document.getElementById('userForm');

    // 1. Render function matching the screenshot style
    function renderTable() {
        const users = Storage.getUsers();
        tableBody.innerHTML = users.map((u, index) => `
            <tr class="border-b hover:bg-gray-50 transition text-sm">
                <td class="p-4 text-gray-400">${index + 1}</td>
                <td class="p-4 flex items-center gap-3">
                    <img src="https://ui-avatars.com/api/?name=${u.name}" class="w-8 h-8 rounded-full">
                    <span class="font-semibold text-blue-600">${u.name}</span>
                </td>
                <td class="p-4 text-gray-500">${u.date || new Date().toLocaleDateString()}</td>
                <td class="p-4 text-gray-500">${u.role}</td>
                <td class="p-4">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${getStatusColor(u.status)}"></span>
                        <span class="${getStatusTextColor(u.status)}">${u.status}</span>
                    </div>
                </td>
                <td class="p-4 text-center text-lg">
                    <button onclick="editUser(${u.id})" class="text-blue-500 hover:text-blue-700 mr-3">⚙️</button>
                    <button onclick="deleteUser(${u.id})" class="text-red-500 hover:text-red-700">⊗</button>
                </td>
            </tr>
        `).join('');
    }

    // Helper functions for Status styling
    function getStatusColor(s) {
        if (s === 'Active') return 'bg-green-500';
        if (s === 'Inactive') return 'bg-orange-500';
        return 'bg-red-500'; // Suspended
    }
    function getStatusTextColor(s) {
        if (s === 'Active') return 'text-green-600';
        if (s === 'Inactive') return 'text-orange-600';
        return 'text-red-600';
    }

    // 2. EXPORT TO EXCEL FUNCTION
    window.exportToExcel = () => {
        const users = Storage.getUsers();
        if (users.length === 0) return alert("No data to export!");

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Download file
        XLSX.writeFile(workbook, "User_Management_Report.xlsx");
    };

    // 3. Add / Edit Logic
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('userId').value;
        const users = Storage.getUsers();

        const userData = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            role: document.getElementById('userRole').value,
            status: document.getElementById('userStatus').value,
            date: new Date().toLocaleDateString()
        };

        if (id) {
            const idx = users.findIndex(u => u.id == id);
            users[idx] = userData;
        } else {
            users.push(userData);
        }

        Storage.save('users', users);
        closeModal();
        renderTable();
    });

    // 4. Global Functions for Buttons
    window.openModal = () => {
        document.getElementById('userModal').classList.replace('hidden', 'flex');
    };

    window.closeModal = () => {
        document.getElementById('userModal').classList.replace('flex', 'hidden');
        userForm.reset();
        document.getElementById('userId').value = "";
    };

    window.deleteUser = (id) => {
        if (confirm("Delete this user?")) {
            const updated = Storage.getUsers().filter(u => u.id !== id);
            Storage.save('users', updated);
            renderTable();
        }
    };

    window.editUser = (id) => {
        const u = Storage.getUsers().find(user => user.id == id);
        document.getElementById('userId').value = u.id;
        document.getElementById('userName').value = u.name;
        document.getElementById('userEmail').value = u.email;
        document.getElementById('userRole').value = u.role;
        document.getElementById('userStatus').value = u.status;
        document.getElementById('modalTitle').innerText = "Edit User";
        openModal();
    };

    renderTable();
});
