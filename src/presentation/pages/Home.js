/**
 * Home page component.
 */

export const render = async () => {
    return `
    <!-- Hero Section -->
    <section class="bg-navy text-white relative overflow-hidden py-20 lg:py-32">
        <div class="absolute inset-0 opacity-10">
            <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center">
            <div class="lg:w-2/3 space-y-8 animate-fade-in">
                <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
                    Find Your Dream Job <br class="hidden md:block">
                    In <span class="text-vibrant">Sri Lanka</span> Today
                </h1>
                <p class="text-xl text-gray-300 max-w-2xl leading-relaxed">
                    Connecting talented professionals with the best companies across the island. Discover thousands of opportunities and advance your career.
                </p>
                
                <div class="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 max-w-3xl">
                    <div class="flex-grow flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                        <i data-lucide="search" class="text-gray-400 mr-2"></i>
                        <input type="text" placeholder="Job title, keywords, or company" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none">
                    </div>
                    <div class="flex-grow flex items-center px-4 py-3 bg-gray-50 rounded-xl md:w-1/3">
                        <i data-lucide="map-pin" class="text-gray-400 mr-2"></i>
                        <select class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none cursor-pointer">
                            <option>All Locations</option>
                            <option>Colombo</option>
                            <option>Kandy</option>
                            <option>Galle</option>
                            <option>Jaffna</option>
                        </select>
                    </div>
                    <button class="bg-vibrant hover:bg-vibrant-dark text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                        <span>Search Jobs</span>
                        <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="flex flex-wrap gap-4 text-sm text-gray-400 pt-4">
                    <span class="font-medium text-white">Popular:</span>
                    <a href="#" class="hover:text-vibrant transition-colors underline decoration-vibrant/30">Software Engineer</a>
                    <a href="#" class="hover:text-vibrant transition-colors underline decoration-vibrant/30">Marketing Manager</a>
                    <a href="#" class="hover:text-vibrant transition-colors underline decoration-vibrant/30">Data Entry</a>
                    <a href="#" class="hover:text-vibrant transition-colors underline decoration-vibrant/30">Sales Executive</a>
                </div>
            </div>
            
            <div class="lg:w-1/3 mt-16 lg:mt-0 hidden lg:block">
                <div class="relative">
                    <div class="absolute -inset-4 bg-vibrant/20 blur-3xl rounded-full"></div>
                    <div class="bg-navy-light/50 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative">
                        <div class="space-y-6">
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <i data-lucide="users" class="text-navy w-6 h-6"></i>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">15,000+</div>
                                    <div class="text-xs text-gray-400">Active Candidates</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-vibrant rounded-full flex items-center justify-center shadow-lg">
                                    <i data-lucide="building-2" class="text-white w-6 h-6"></i>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">1,200+</div>
                                    <div class="text-xs text-gray-400">Verified Companies</div>
                                </div>
                            </div>
                            <div class="flex items-center space-x-4">
                                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                    <i data-lucide="check-circle" class="text-white w-6 h-6"></i>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold">8,500+</div>
                                    <div class="text-xs text-gray-400">Jobs Filled Recently</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-3xl font-bold mb-2">Explore by Category</h2>
                <p class="text-gray-500">Find the right role for your skillset</p>
            </div>
            <a href="#/jobs" class="text-navy font-bold hover:text-vibrant transition-colors flex items-center space-x-1">
                <span>View all categories</span>
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            ${renderCategoryCard('Technology', 'code', '452 Jobs')}
            ${renderCategoryCard('Marketing', 'megaphone', '215 Jobs')}
            ${renderCategoryCard('Finance', 'pie-chart', '132 Jobs')}
            ${renderCategoryCard('Health Care', 'heart-pulse', '89 Jobs')}
            ${renderCategoryCard('Engineering', 'cog', '310 Jobs')}
            ${renderCategoryCard('Design', 'palette', '156 Jobs')}
            ${renderCategoryCard('Customer Service', 'headphones', '287 Jobs')}
            ${renderCategoryCard('Human Resources', 'users-2', '74 Jobs')}
        </div>
    </section>

    <!-- Recent Jobs Section -->
    <section class="bg-gray-100 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Latest Job Openings</h2>
                <p class="text-gray-500 max-w-2xl mx-auto">Handpicked opportunities from top employers in Sri Lanka. Apply today before they're gone!</p>
            </div>
            
            <div id="latest-jobs-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Skeleton Loader -->
                ${renderJobSkeleton().repeat(6)}
            </div>
            
            <div class="text-center mt-12">
                <a href="#/jobs" class="inline-flex items-center space-x-2 bg-navy text-white px-10 py-4 rounded-xl font-bold hover:bg-navy-dark transition-all shadow-xl">
                    <span>Explore All Jobs</span>
                    <i data-lucide="layout-grid" class="w-5 h-5"></i>
                </a>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="bg-vibrant rounded-3xl p-8 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 shadow-2xl">
            <div class="relative z-10 text-white lg:w-2/3">
                <h2 class="text-3xl lg:text-5xl font-black mb-6 leading-tight">Ready to hire world-class <br> Sri Lankan talent?</h2>
                <p class="text-vibrant-light text-xl mb-8 font-medium">Post your first job for free and reach thousands of qualified candidates instantly.</p>
                <div class="flex flex-wrap gap-4">
                    <a href="#/post-job" class="bg-white text-vibrant px-8 py-4 rounded-xl font-black text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">Post a Job Now</a>
                    <a href="#" class="bg-navy/20 border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-navy/40 transition-all">Learn More</a>
                </div>
            </div>
            <div class="lg:w-1/3 relative flex justify-center">
                 <div class="w-64 h-64 bg-white/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                 <i data-lucide="rocket" class="text-white w-48 h-48 lg:w-64 lg:h-64 opacity-20 relative z-0"></i>
            </div>
        </div>
    </section>
    `;
};

const renderCategoryCard = (name, icon, count) => `
    <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-vibrant transition-all hover:shadow-xl cursor-pointer group">
        <div class="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-vibrant/10 transition-colors">
            <i data-lucide="${icon}" class="text-navy w-7 h-7 group-hover:text-vibrant transition-colors"></i>
        </div>
        <h3 class="font-bold text-lg mb-1 group-hover:text-vibrant transition-colors">${name}</h3>
        <p class="text-gray-400 text-sm font-medium">${count}</p>
    </div>
`;

const renderJobSkeleton = () => `
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
        <div class="flex justify-between items-start mb-6">
            <div class="w-14 h-14 bg-gray-200 rounded-xl"></div>
            <div class="w-20 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div class="h-6 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-100 rounded-lg w-1/2 mb-8"></div>
        <div class="flex space-x-4">
            <div class="h-4 bg-gray-100 rounded-lg w-1/4"></div>
            <div class="h-4 bg-gray-100 rounded-lg w-1/4"></div>
        </div>
    </div>
`;

export const init = () => {
    // Initial fetch of jobs or any other logic
    console.log('Home page initialized');
};
