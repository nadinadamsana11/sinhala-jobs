/**
 * Candidate Dashboard component.
 */

export const render = async (user) => {
    return `
    <div class="max-w-7xl mx-auto px-4 py-12">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
                <h1 class="text-3xl font-black text-navy">Welcome, ${user.displayName || 'Candidate'}</h1>
                <p class="text-gray-500">Track your applications and explore new opportunities.</p>
            </div>
            <a href="#/jobs" class="bg-navy hover:bg-navy-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center space-x-2">
                <i data-lucide="search" class="w-5 h-5"></i>
                <span>Browse New Jobs</span>
            </a>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Sidebar / Profile Summary -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                    <div class="w-24 h-24 bg-navy-light rounded-full mx-auto mb-4 flex items-center justify-center text-white">
                        <i data-lucide="user" class="w-12 h-12"></i>
                    </div>
                    <h3 class="font-black text-xl">${user.displayName}</h3>
                    <p class="text-gray-400 text-sm mb-6">${user.email}</p>
                    <a href="#/profile" class="block w-full py-3 border-2 border-navy text-navy font-bold rounded-xl hover:bg-navy hover:text-white transition-all text-sm">Edit Profile</a>
                </div>
                
                <div class="bg-navy p-8 rounded-3xl shadow-xl text-white">
                    <h4 class="font-bold mb-4">Profile Strength</h4>
                    <div class="w-full bg-white/20 rounded-full h-2 mb-2">
                        <div class="bg-vibrant h-full rounded-full" style="width: 45%"></div>
                    </div>
                    <p class="text-xs text-navy-light font-medium">Complete your profile to get 3x more views from employers.</p>
                </div>
            </div>

            <!-- Main Dashboard Area -->
            <div class="lg:col-span-3 space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${renderMiniStat('Applications Sent', '0', 'send', 'text-blue-600', 'bg-blue-50')}
                    ${renderMiniStat('Interviews', '0', 'video', 'text-purple-600', 'bg-purple-50')}
                    ${renderMiniStat('Saved Jobs', '0', 'bookmark', 'text-vibrant', 'bg-vibrant/10')}
                </div>

                <div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div class="p-8 border-b border-gray-100">
                        <h2 class="text-xl font-bold">Recent Applications</h2>
                    </div>
                    <div id="applications-list" class="divide-y divide-gray-50">
                        <div class="p-12 text-center text-gray-400">
                            <i data-lucide="briefcase" class="w-16 h-16 mx-auto mb-4 opacity-20"></i>
                            <p class="font-medium">You haven't applied for any jobs yet.</p>
                            <a href="#/jobs" class="text-vibrant mt-2 inline-block font-bold">Start your job search now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

const renderMiniStat = (label, value, icon, iconColor, bgColor) => `
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div class="w-12 h-12 ${bgColor} ${iconColor} rounded-xl flex items-center justify-center">
            <i data-lucide="${icon}" class="w-6 h-6"></i>
        </div>
        <div>
            <div class="text-xl font-black text-navy">${value}</div>
            <div class="text-xs font-bold text-gray-400 uppercase tracking-tight">${label}</div>
        </div>
    </div>
`;

export const init = async (user) => {
    // Fetch applications
};
