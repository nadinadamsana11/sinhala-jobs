/**
 * Navbar component.
 */

export const Navbar = (user = window.currentUser) => {
    return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
            <div class="flex items-center space-x-2 cursor-pointer" onclick="location.hash='#/'">
                <div class="bg-vibrant p-1.5 rounded-lg">
                    <i data-lucide="briefcase" class="text-white w-6 h-6"></i>
                </div>
                <span class="text-2xl font-black tracking-tight">Sinhala<span class="text-vibrant">Jobs</span></span>
            </div>
            
            <div class="hidden md:flex items-center space-x-10">
                <a href="#/jobs" class="hover:text-vibrant transition-colors font-bold text-sm uppercase tracking-wide">Find Jobs</a>
                <a href="#/post-job" class="hover:text-vibrant transition-colors font-bold text-sm uppercase tracking-wide">Post a Job</a>
                ${user && user.role === 'company' ? `<a href="#/talent-search" class="hover:text-vibrant transition-colors font-bold text-sm uppercase tracking-wide">Talent Search</a>` : ''}
                
                ${user ? `
                    <div class="flex items-center space-x-6 border-l pl-8 border-white/10">
                        <div class="relative group">
                            <button class="flex items-center space-x-3 focus:outline-none">
                                <div class="w-10 h-10 bg-vibrant rounded-xl flex items-center justify-center font-black text-white shadow-lg overflow-hidden ring-4 ring-white/5">
                                    ${(user.displayName || 'U').charAt(0).toUpperCase()}
                                </div>
                                <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors"></i>
                            </button>
                            <!-- Dropdown Menu -->
                            <div class="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl py-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] transform origin-top-right group-hover:translate-y-0 translate-y-2">
                                <div class="px-6 py-3 border-b border-gray-50 mb-2">
                                    <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                                    <p class="text-navy font-black truncate">${user.displayName || 'User'}</p>
                                </div>
                                <a href="#/dashboard" class="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-navy transition-colors font-bold text-sm">
                                    <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
                                    <span>Dashboard</span>
                                </a>
                                <a href="#/profile" class="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-navy transition-colors font-bold text-sm">
                                    <i data-lucide="user" class="w-4 h-4"></i>
                                    <span>My Profile</span>
                                </a>
                                <div class="h-px bg-gray-50 my-2"></div>
                                <button onclick="handleLogout()" class="w-full flex items-center space-x-3 px-6 py-3 text-red-500 hover:bg-red-50 transition-colors font-bold text-sm">
                                    <i data-lucide="log-out" class="w-4 h-4"></i>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="flex items-center space-x-6 border-l pl-8 border-white/10">
                        <a href="#/login" class="text-white hover:text-vibrant transition-colors font-bold text-sm uppercase tracking-wide">Login</a>
                        <a href="#/register" class="bg-vibrant text-white px-8 py-3 rounded-xl text-sm font-black hover:bg-vibrant-dark transition-all transform hover:scale-105 shadow-xl">Join Now</a>
                    </div>
                `}
            </div>
            
            <div class="md:hidden">
                <button class="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </div>
    </div>
    `;
};

// Global logout handler
window.handleLogout = async () => {
    const { auth } = await import('../../core/firebase-config.js');
    const { signOut } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
    try {
        await signOut(auth);
        window.location.href = '#/login';
        if (window.showToast) window.showToast('Logged out successfully!');
    } catch (error) {
        console.error('Logout error:', error);
    }
};
