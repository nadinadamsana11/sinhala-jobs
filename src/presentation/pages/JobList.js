/**
 * JobList page component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 pb-20">
        <!-- Search Header -->
        <header class="bg-navy text-white pt-20 pb-24 relative overflow-hidden">
             <div class="max-w-7xl mx-auto px-4 relative z-10">
                <h1 class="text-4xl font-black mb-8 text-center">Discover Your Next Career Move</h1>
                
                <div class="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 max-w-4xl mx-auto">
                    <div class="flex-grow flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                        <i data-lucide="search" class="text-gray-400 mr-2"></i>
                        <input id="job-search-input" type="text" placeholder="Job title or keywords" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none">
                    </div>
                    <div class="flex-grow flex items-center px-4 py-3 bg-gray-50 rounded-xl md:w-1/4">
                        <i data-lucide="map-pin" class="text-gray-400 mr-2"></i>
                        <select id="location-filter" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none cursor-pointer">
                            <option>All Locations</option>
                            <option>Colombo</option>
                            <option>Kandy</option>
                            <option>Galle</option>
                        </select>
                    </div>
                    <button id="job-search-btn" class="bg-vibrant hover:bg-vibrant-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center space-x-2">
                        <span>Search</span>
                    </button>
                </div>
             </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <!-- Filters Sidebar -->
                <aside class="lg:col-span-1 space-y-6">
                    <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                        <h3 class="font-black text-navy mb-6 flex items-center space-x-2">
                            <i data-lucide="filter" class="w-5 h-5 text-vibrant"></i>
                            <span>Filter Results</span>
                        </h3>
                        
                        <div class="space-y-8">
                            <div>
                                <h4 class="text-sm font-bold text-gray-400 uppercase mb-4">Job Category</h4>
                                <div class="space-y-3">
                                    ${renderFilterCheckbox('Technology')}
                                    ${renderFilterCheckbox('Marketing')}
                                    ${renderFilterCheckbox('Finance')}
                                    ${renderFilterCheckbox('Engineering')}
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="text-sm font-bold text-gray-400 uppercase mb-4">Job Type</h4>
                                <div class="space-y-3">
                                    ${renderFilterCheckbox('Full-time')}
                                    ${renderFilterCheckbox('Part-time')}
                                    ${renderFilterCheckbox('Contract')}
                                    ${renderFilterCheckbox('Remote')}
                                </div>
                            </div>
                            
                            <button class="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all">Clear All Filters</button>
                        </div>
                    </div>
                </aside>

                <!-- Job List -->
                <main class="lg:col-span-3 space-y-6">
                    <div class="flex justify-between items-center mb-4">
                        <p id="results-count" class="text-gray-500 font-medium">Showing <span class="text-navy font-bold">...</span> jobs</p>
                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-400">Sort by:</span>
                            <select class="bg-transparent font-bold text-navy outline-none cursor-pointer border-none focus:ring-0">
                                <option>Newest First</option>
                                <option>Salary: High to Low</option>
                            </select>
                        </div>
                    </div>
                    
                    <div id="jobs-container" class="space-y-4">
                        <!-- Skeleton Loaders -->
                        ${renderJobListSkeleton().repeat(5)}
                    </div>
                </main>
            </div>
        </div>
    </div>
    `;
};

const renderFilterCheckbox = (label) => `
    <label class="flex items-center group cursor-pointer">
        <input type="checkbox" class="w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-navy checked:border-navy focus:ring-navy cursor-pointer transition-all">
        <span class="ml-3 text-gray-600 group-hover:text-navy font-medium transition-colors">${label}</span>
    </label>
`;

const renderJobListSkeleton = () => `
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl shrink-0"></div>
        <div class="flex-grow space-y-3">
            <div class="h-6 bg-gray-100 rounded w-1/3"></div>
            <div class="h-4 bg-gray-50 rounded w-1/4"></div>
        </div>
        <div class="w-24 h-10 bg-gray-100 rounded-xl"></div>
    </div>
`;

export const init = async () => {
    const jobsContainer = document.getElementById('jobs-container');
    const resultsCount = document.getElementById('results-count');

    try {
        const { JobRepository } = await import('../../data/repositories/JobRepository.js');
        const jobs = await JobRepository.getAllJobs({});
        
        resultsCount.innerHTML = `Showing <span class="text-navy font-bold">${jobs.length}</span> jobs`;
        
        if (jobs.length === 0) {
            jobsContainer.innerHTML = `
                <div class="bg-white p-16 text-center rounded-3xl border border-gray-100">
                    <i data-lucide="search-x" class="w-20 h-20 mx-auto text-gray-200 mb-6"></i>
                    <h3 class="text-2xl font-bold text-navy mb-2">No jobs matched your search</h3>
                    <p class="text-gray-500">Try adjusting your filters or search keywords.</p>
                </div>
            `;
        } else {
            jobsContainer.innerHTML = jobs.map(job => renderJobCard(job)).join('');
        }
        
        // Re-init lucide
        if (window.lucide) window.lucide.createIcons();
        
    } catch (error) {
        console.error('Fetch jobs error:', error);
    }
};

const renderJobCard = (job) => `
    <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-vibrant/30 transition-all group flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div class="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-vibrant/10 transition-colors">
            <i data-lucide="building-2" class="text-navy w-8 h-8 group-hover:text-vibrant transition-colors"></i>
        </div>
        <div class="flex-grow">
            <h3 class="text-xl font-bold text-navy group-hover:text-vibrant transition-colors mb-1">${job.title}</h3>
            <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-medium text-gray-500">
                <span class="flex items-center"><i data-lucide="building" class="w-4 h-4 mr-1"></i>${job.companyName}</span>
                <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>${job.location}</span>
                <span class="flex items-center"><i data-lucide="clock" class="w-4 h-4 mr-1"></i>${job.type}</span>
            </div>
        </div>
        <div class="flex flex-col items-end space-y-2">
            <span class="text-navy font-black text-lg">${job.salaryRange || 'Negotiable'}</span>
            <a href="#/job-details?id=${job.id}" class="bg-gray-100 text-navy px-6 py-2.5 rounded-xl font-bold hover:bg-navy hover:text-white transition-all text-sm">View Details</a>
        </div>
    </div>
`;
