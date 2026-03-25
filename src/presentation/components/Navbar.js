/**
 * Navbar component.
 */

export const Navbar = (user = window.currentUser) => {
    return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
            <div class="flex items-center space-x-2 cursor-pointer" onclick="location.hash='#/'">
                <div class="bg-vibrant p-1.5 rounded-lg">
                    <i data-lucide="briefcase" class="text-white w-6 h-6"></i>
                </div>
                <span class="text-2xl font-bold tracking-tight">Sinhala<span class="text-vibrant">Jobs</span></span>
            </div>
            
            <div class="hidden md:flex items-center space-x-8">
                <a href="#/jobs" class="hover:text-vibrant transition-colors font-medium">Find Jobs</a>
                <a href="#/post-job" class="hover:text-vibrant transition-colors font-medium">Post a Job</a>
                ${user && user.role === 'company' ? `<a href="#/talent-search" class="hover:text-vibrant transition-colors font-medium">Talent Search</a>` : ''}
                ${user ? `
                    <div class="flex items-center space-x-4 border-l pl-8 border-navy-light text-navy">
                        <a href="#/dashboard" class="bg-white text-navy px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors">Dashboard</a>
                        <button onclick="handleLogout()" class="text-white hover:text-vibrant transition-colors">
                            <i data-lucide="log-out" class="w-5 h-5"></i>
                        </button>
                    </div>
                ` : `
                    <div class="flex items-center space-x-4 border-l pl-8 border-navy-light text-navy">
                        <a href="#/login" class="text-white hover:text-vibrant transition-colors font-medium">Login</a>
                        <a href="#/register" class="bg-vibrant text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-vibrant-dark transition-all transform hover:scale-105">Register</a>
                    </div>
                `}
            </div>
            
            <div class="md:hidden">
                <button class="p-2 rounded-md hover:bg-navy-light transition-colors">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>
    `;
};

// Global logout handler
window.handleLogout = async () => {
    const { auth } = await import('../core/firebase-config.js');
    const { signOut } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
    try {
        await signOut(auth);
        location.hash = '#/';
    } catch (error) {
        console.error('Logout error:', error);
    }
};
