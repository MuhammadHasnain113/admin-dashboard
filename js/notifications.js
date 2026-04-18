document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('notificationList');
    const emptyState = document.getElementById('emptyState');

    // Initialize with 5 notifications if empty (Requirement 4.8)
    function initNotifications() {
        let notes = JSON.parse(localStorage.getItem('notifications'));
        if (!notes || notes.length === 0) {
            notes = [
                { id: 1, text: "New user registered: Brandon Newman", time: "5 mins ago", read: false, type: "user" },
                { id: 2, text: "Order #4420 was successfully placed.", time: "1 hour ago", read: false, type: "order" },
                { id: 3, text: "Product 'Dignissim Clock' is low on stock.", time: "3 hours ago", read: true, type: "stock" },
                { id: 4, text: "System update scheduled for 2:00 AM.", time: "Yesterday", read: false, type: "system" },
                { id: 5, text: "New feedback received from Paula Wilson.", time: "2 days ago", read: true, type: "user" }
            ];
            localStorage.setItem('notifications', JSON.stringify(notes));
        }
        return notes;
    }

    function renderNotifications() {
        const notes = JSON.parse(localStorage.getItem('notifications')) || [];
        
        if (notes.length === 0) {
            listContainer.innerHTML = "";
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        listContainer.innerHTML = notes.map(n => `
            <div class="p-5 flex items-center gap-4 transition hover:bg-gray-50 ${n.read ? 'opacity-60' : 'border-l-4 border-[#8b5cf6]'}">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg 
                    ${n.read ? 'bg-gray-200' : 'bg-purple-100 text-[#8b5cf6]'}">
                    ${getIcon(n.type)}
                </div>
                <div class="flex-1">
                    <p class="text-gray-800 ${n.read ? 'font-normal' : 'font-bold'}">${n.text}</p>
                    <span class="text-xs text-gray-400">${n.time}</span>
                </div>
                <div class="flex gap-2">
                    ${!n.read ? `<button onclick="markRead(${n.id})" class="text-xs font-bold text-[#8b5cf6] hover:underline">Mark Read</button>` : ''}
                    <button onclick="deleteNote(${n.id})" class="text-xs font-bold text-red-400 hover:underline">Delete</button>
                </div>
            </div>
        `).join('');
    }

    function getIcon(type) {
        switch(type) {
            case 'user': return '👤';
            case 'order': return '📦';
            case 'stock': return '⚠️';
            default: return '🔔';
        }
    }

    // Functional Features (1 Mark Each)
    window.markRead = (id) => {
        const notes = JSON.parse(localStorage.getItem('notifications'));
        const idx = notes.findIndex(n => n.id === id);
        notes[idx].read = true;
        localStorage.setItem('notifications', JSON.stringify(notes));
        renderNotifications();
    };

    window.deleteNote = (id) => {
        let notes = JSON.parse(localStorage.getItem('notifications'));
        notes = notes.filter(n => n.id !== id);
        localStorage.setItem('notifications', JSON.stringify(notes));
        renderNotifications();
    };

    window.markAllAsRead = () => {
        const notes = JSON.parse(localStorage.getItem('notifications')).map(n => ({ ...n, read: true }));
        localStorage.setItem('notifications', JSON.stringify(notes));
        renderNotifications();
    };

    initNotifications();
    renderNotifications();
});
