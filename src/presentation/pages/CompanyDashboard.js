/**
 * Company Dashboard component.
 */

export const render = async (user) => {
    return `
    <div class="max-w-7xl mx-auto px-4 py-12">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
            <div>
                <h1 class="text-3xl font-black text-navy">Employer Dashboard</h1>
                <p class="text-gray-500">Manage your job postings and applicants.</p>
            </div>
            <a href="#/post-job" class="bg-vibrant hover:bg-vibrant-dark text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all transform hover:-translate-y-1 flex items-center space-x-2">
                <i data-lucide="plus-circle" class="w-5 h-5"></i>
                <span>Post a New Job</span>
            </a>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            ${renderStatCard('Active Jobs', '0', 'briefcase', 'text-blue-600', 'bg-blue-50')}
            ${renderStatCard('Total Applications', '0', 'users', 'text-purple-600', 'bg-purple-50')}
            ${renderStatCard('Unread Messages', '0', 'mail', 'text-vibrant', 'bg-vibrant/10')}
        </div>

        <section class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div class="p-8 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-xl font-bold">Your Job Postings</h2>
                <div class="relative">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                    <input type="text" placeholder="Search postings..." class="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-1 focus:ring-navy outline-none text-sm">
                </div>
            </div>
            
            <div id="company-jobs-list" class="divide-y divide-gray-50">
                <div class="p-12 text-center text-gray-400">
                    <i data-lucide="inbox" class="w-16 h-16 mx-auto mb-4 opacity-20"></i>
                    <p class="font-medium">No job postings found.</p>
                    <a href="#/post-job" class="text-vibrant mt-2 inline-block font-bold">Create your first ad now</a>
                </div>
            </div>
        </section>
    </div>
    `;
};

const renderStatCard = (label, value, icon, iconColor, bgColor) => `
    <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-6">
        <div class="w-16 h-16 ${bgColor} ${iconColor} rounded-2xl flex items-center justify-center">
            <i data-lucide="${icon}" class="w-8 h-8"></i>
        </div>
        <div>
            <div class="text-3xl font-black text-navy">${value}</div>
            <div class="text-sm font-bold text-gray-400 uppercase tracking-wider">${label}</div>
        </div>
    </div>
`;

export const init = async (user) => {
    // Fetch and render company jobs
};
