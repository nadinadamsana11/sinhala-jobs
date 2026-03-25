/**
 * Home page component.
 */

export const render = async () => {
    return `
    <!-- Hero Section -->
    <section class="bg-navy text-white relative overflow-hidden py-24 lg:py-40">
        <div class="absolute inset-0 opacity-10">
            <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <div class="max-w-4xl space-y-10 animate-fade-in">
                <h1 class="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                    Empowering Sri Lanka's <br>
                    <span class="text-vibrant">Digital Workforce</span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                    The #1 platform for direct connection between top local talent and visionary companies in the pearl of the Indian Ocean.
                </p>
                
                <div class="bg-white p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full max-w-4xl">
                    <div class="flex-grow flex items-center px-6 py-4 bg-gray-50 rounded-2xl">
                        <i data-lucide="search" class="text-gray-400 mr-3"></i>
                        <input id="hero-search-input" type="text" placeholder="Job title, keywords, or company" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none font-bold">
                    </div>
                    <div class="flex-grow flex items-center px-6 py-4 bg-gray-50 rounded-2xl md:w-1/4">
                        <i data-lucide="map-pin" class="text-gray-400 mr-3"></i>
                        <select id="hero-location-select" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none cursor-pointer font-bold">
                            <option>All Locations</option>
                            <option>Colombo</option>
                            <option>Kandy</option>
                            <option>Galle</option>
                        </select>
                    </div>
                    <button onclick="handleHeroSearch()" class="bg-vibrant hover:bg-vibrant-dark text-white px-10 py-5 rounded-2xl font-black transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                        <span>Find Jobs</span>
                        <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="flex flex-wrap justify-center gap-4 text-sm font-bold pt-4">
                    <span class="text-gray-400">Popular Searches:</span>
                    <button onclick="triggerSearch('Software')" class="text-vibrant hover:underline">Software</button>
                    <button onclick="triggerSearch('Marketing')" class="text-vibrant hover:underline">Marketing</button>
                    <button onclick="triggerSearch('Design')" class="text-vibrant hover:underline">Design</button>
                    <button onclick="triggerSearch('Remote')" class="text-vibrant hover:underline">Remote</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Category Section -->
    <section class="max-w-7xl mx-auto px-4 py-24">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
            <div>
                <h2 class="text-4xl font-black text-navy mb-3 italic underline decoration-vibrant/30">Explore by Category</h2>
                <p class="text-gray-500 font-medium">Find your specialty and kickstart your next adventure.</p>
            </div>
            <a href="#/categories" class="text-navy font-black hover:text-vibrant transition-all flex items-center space-x-2 group">
                <span class="border-b-2 border-navy group-hover:border-vibrant transition-colors">View all categories</span>
                <i data-lucide="arrow-right" class="w-5 h-5 transition-transform group-hover:translate-x-2"></i>
            </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            ${renderCategoryCard('Technology', 'code', 'Technology')}
            ${renderCategoryCard('Marketing', 'megaphone', 'Marketing')}
            ${renderCategoryCard('Finance', 'pie-chart', 'Finance')}
            ${renderCategoryCard('Design', 'palette', 'Design')}
        </div>
    </section>

    <!-- Recent Jobs Section -->
    <section class="bg-navy-dark py-24">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left">
                <div class="mb-8 md:mb-0">
                    <h2 class="text-4xl font-black text-white mb-3">Latest Job <span class="text-vibrant">Openings</span></h2>
                    <p class="text-gray-400 font-medium">Discover fresh opportunities posted in the last 24 hours.</p>
                </div>
                <a href="#/jobs" class="inline-flex items-center space-x-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black hover:bg-white/10 transition-all shadow-2xl">
                    <span>Browse All Jobs</span>
                    <i data-lucide="layout-grid" class="w-5 h-5 text-vibrant"></i>
                </a>
            </div>
            
            <div id="latest-jobs-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Skeleton Loader (Gray Box Style) -->
                ${renderJobSkeleton().repeat(6)}
            </div>
        </div>
    </section>

    <!-- Trust Section -->
    <section class="py-24 max-w-7xl mx-auto px-4">
        <div class="bg-vibrant/5 rounded-[3rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between border border-vibrant/10">
            <div class="lg:w-1/2 space-y-8 text-center lg:text-left">
                <div class="inline-flex items-center space-x-2 bg-vibrant/10 text-vibrant px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                    <i data-lucide="award" class="w-4 h-4"></i>
                    <span>Trusted by 1200+ Companies</span>
                </div>
                <h2 class="text-4xl lg:text-5xl font-black text-navy leading-tight">Your gateway to Sri Lanka's top talent.</h2>
                <p class="text-gray-500 text-xl font-medium">Whether you're hiring or looking to be hired, we provide the most direct and efficient way to connect.</p>
                <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                    <a href="#/post-job" class="bg-navy text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-navy-dark transition-all transform hover:-translate-y-1">For Employers</a>
                    <a href="#/register" class="bg-white text-navy border-2 border-navy px-10 py-5 rounded-2xl font-black text-lg hover:bg-navy hover:text-white transition-all transform hover:-translate-y-1">For Job Seekers</a>
                </div>
            </div>
            <div class="lg:w-1/3 mt-16 lg:mt-0 relative">
                 <div class="absolute inset-0 bg-vibrant blur-[100px] opacity-20 rounded-full"></div>
                 <i data-lucide="rocket" class="text-navy w-64 h-64 lg:w-80 lg:h-80 opacity-5 relative animate-bounce"></i>
            </div>
        </div>
    </section>
    `;
};

const renderCategoryCard = (name, icon, query) => `
    <div onclick="location.hash='#/category/${query}'" class="bg-white p-10 rounded-[2rem] border border-gray-100 hover:border-vibrant transition-all hover:shadow-2xl cursor-pointer group relative overflow-hidden">
        <div class="absolute -right-4 -bottom-4 bg-gray-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform"></div>
        <div class="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-vibrant/10 transition-colors relative z-10">
            <i data-lucide="${icon}" class="text-navy w-8 h-8 group-hover:text-vibrant transition-colors"></i>
        </div>
        <h3 class="font-black text-xl text-navy mb-2 group-hover:text-vibrant transition-colors relative z-10">${name}</h3>
        <p class="text-gray-400 text-sm font-bold relative z-10 uppercase tracking-widest">Explore Jobs</p>
    </div>
`;

const renderJobSkeleton = () => `
    <div class="bg-navy p-8 rounded-3xl shadow-sm border border-white/5 bg-opacity-50 animate-pulse">
        <div class="flex justify-between items-start mb-8">
            <div class="w-16 h-16 bg-white/10 rounded-2xl"></div>
            <div class="w-20 h-8 bg-white/10 rounded-xl"></div>
        </div>
        <div class="h-8 bg-white/10 rounded-lg w-3/4 mb-4"></div>
        <div class="h-4 bg-white/5 rounded-lg w-1/2 mb-10"></div>
        <div class="h-12 bg-white/5 rounded-2xl w-full"></div>
    </div>
`;

window.handleHeroSearch = () => {
    const query = document.getElementById('hero-search-input').value;
    const location = document.getElementById('hero-location-select').value;
    window.location.hash = `#/jobs?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
};

window.triggerSearch = (term) => {
    window.location.hash = `#/jobs?q=${encodeURIComponent(term)}`;
};

export const init = async () => {
    const container = document.getElementById('latest-jobs-container');
    
    try {
        const { JobRepository } = await import('../../data/repositories/JobRepository.js');
        const jobs = await JobRepository.getAllJobs({}, 6); // FETCH ONLY 6
        
        if (jobs.length === 0) {
            container.innerHTML = '<p class="text-white/50 text-center col-span-full py-10">No recent jobs found.</p>';
        } else {
            container.innerHTML = jobs.map(job => renderRecentJobCard(job)).join('');
        }
        
        if (window.lucide) window.lucide.createIcons();
    } catch (error) {
        console.error('Home Page Init Error:', error);
    }
};

const renderRecentJobCard = (job) => `
    <div class="bg-navy p-8 rounded-[2rem] border border-white/5 hover:border-vibrant/50 transition-all group shadow-xl">
        <div class="flex justify-between items-start mb-8">
            <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-vibrant/20 transition-colors">
                <i data-lucide="building-2" class="text-white w-8 h-8"></i>
            </div>
            <span class="bg-white/5 text-vibrant px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                ${job.type}
            </span>
        </div>
        <h3 class="text-2xl font-black text-white group-hover:text-vibrant transition-colors mb-2">${job.title}</h3>
        <p class="text-gray-400 font-bold text-sm mb-8 flex items-center">
            <i data-lucide="map-pin" class="w-4 h-4 mr-2"></i> ${job.location}
        </p>
        <a href="#/job-details?id=${job.id}" class="block w-full text-center bg-white/10 text-white hover:bg-vibrant hover:text-white py-4 rounded-2xl font-black transition-all shadow-lg text-sm uppercase tracking-widest">
            View details
        </a>
    </div>
`;
