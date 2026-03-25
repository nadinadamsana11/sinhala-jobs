/**
 * Custom Toast notification system.
 * Replaces browser alerts for a premium UX.
 */

export const Toast = {
    show(message, type = 'success', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
        const icon = type === 'success' ? 'check-circle' : 'alert-circle';

        toast.className = `${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 transform transition-all duration-300 translate-x-full opacity-0 max-w-sm`;
        toast.innerHTML = `
            <i data-lucide="${icon}" class="w-5 h-5 shrink-0"></i>
            <span class="font-bold text-sm">${message}</span>
        `;

        container.appendChild(toast);
        
        // Re-init lucide for the new icon
        if (window.lucide) window.lucide.createIcons();

        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    success(message) { this.show(message, 'success'); },
    error(message) { this.show(message, 'error'); }
};

// Global access for quick porting from alert()
window.showToast = (msg, type) => Toast.show(msg, type);
