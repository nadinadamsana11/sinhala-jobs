/**
 * JobList page component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 pb-24">
        <!-- Search Header -->
        <header class="bg-navy text-white pt-24 pb-32 relative overflow-hidden">
             <div class="absolute inset-0 opacity-10">
                <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <pattern id="grid-header" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-header)" />
                </svg>
            </div>

             <div class="max-w-7xl mx-auto px-4 relative z-10">
                <h1 class="text-5xl font-black mb-10 text-center tracking-tighter">Find Your <span class="text-vibrant italic">Perfect</span> Career</h1>
                
                <div class="bg-white p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 max-w-5xl mx-auto ring-8 ring-white/10">
                    <div class="flex-grow flex items-center px-6 py-4 bg-gray-50 rounded-2xl group focus-within:bg-white transition-colors border-2 border-transparent focus-within:border-vibrant/20">
                        <i data-lucide="search" class="text-gray-400 mr-3 group-focus-within:text-vibrant transition-colors"></i>
                        <input id="job-search-input" type="text" placeholder="Job title, keywords, or company" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none font-bold">
                    </div>
                    <div class="flex-grow flex items-center px-6 py-4 bg-gray-50 rounded-2xl md:w-1/4 group focus-within:bg-white transition-colors border-2 border-transparent focus-within:border-vibrant/20">
                        <i data-lucide="map-pin" class="text-gray-400 mr-3 group-focus-within:text-vibrant transition-colors"></i>
                        <select id="location-filter" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none cursor-pointer font-bold">
                            <option>All Locations</option>
                            <option>Colombo</option>
                            <option>Kandy</option>
                            <option>Galle</option>
                        </select>
                    </div>
                    <button id="job-search-btn" class="bg-vibrant hover:bg-vibrant-dark text-white px-12 py-5 rounded-2xl font-black transition-all shadow-xl flex items-center justify-center space-x-3 transform active:scale-95">
                        <span>Search Now</span>
                        <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>
             </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <!-- Filters Sidebar -->
                <aside class="lg:col-span-1 space-y-8">
                    <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-28">
                        <h3 class="font-black text-navy mb-8 flex items-center space-x-3 text-xl tracking-tight">
                            <i data-lucide="sliders-horizontal" class="w-6 h-6 text-vibrant"></i>
                            <span>Refine Search</span>
                        </h3>
                        
                        <div class="space-y-10">
                            <div>
                                <h4 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Job Category</h4>
                                <div class="space-y-4" id="category-filters">
                                    ${renderFilterCheckbox('Technology')}
                                    ${renderFilterCheckbox('Marketing')}
                                    ${renderFilterCheckbox('Finance')}
                                    ${renderFilterCheckbox('Engineering')}
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Employment Type</h4>
                                <div class="space-y-4" id="type-filters">
                                    ${renderFilterCheckbox('Full-time')}
                                    ${renderFilterCheckbox('Part-time')}
                                    ${renderFilterCheckbox('Contract')}
                                    ${renderFilterCheckbox('Remote')}
                                </div>
                            </div>
                            
                            <button id="clear-filters-btn" class="w-full py-5 bg-navy/5 text-navy font-black rounded-2xl hover:bg-navy hover:text-white transition-all text-sm uppercase tracking-widest shadow-inner">
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </aside>

                <!-- Job List -->
                <main class="lg:col-span-3 space-y-8">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p id="results-count" class="text-gray-500 font-bold">Showing <span class="text-navy font-black text-xl">...</span> jobs</p>
                        <div class="flex items-center space-x-3 mt-4 md:mt-0">
                            <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Sort by:</span>
                            <div class="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                <select class="bg-transparent font-black text-navy outline-none cursor-pointer border-none focus:ring-0 text-sm">
                                    <option>Newest Application</option>
                                    <option>Salary: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div id="jobs-container" class="space-y-6">
                        <!-- Skeleton Loaders (Gray Box Style) -->
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
        <div class="relative flex items-center">
            <input type="checkbox" value="${label}" class="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-100 bg-gray-50 checked:bg-vibrant checked:border-vibrant transition-all shadow-sm">
            <i data-lucide="check" class="absolute left-1.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></i>
        </div>
        <span class="ml-4 text-gray-600 group-hover:text-navy font-black transition-colors text-sm uppercase tracking-wide">${label}</span>
    </label>
`;

const renderJobListSkeleton = () => `
    <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm animate-pulse flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-10">
        <div class="w-20 h-20 bg-gray-100 rounded-3xl shrink-0"></div>
        <div class="flex-grow space-y-4">
            <div class="h-8 bg-gray-100 rounded-lg w-2/3"></div>
            <div class="h-5 bg-gray-50 rounded-lg w-1/3"></div>
        </div>
        <div class="w-32 h-12 bg-gray-100 rounded-2xl"></div>
    </div>
`;

export const init = async () => {
    const jobsContainer = document.getElementById('jobs-container');
    const resultsCount = document.getElementById('results-count');
    const searchBtn = document.getElementById('job-search-btn');
    const searchInput = document.getElementById('job-search-input');
    const locationSelect = document.getElementById('location-filter');

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const categoryParam = urlParams.get('category');
    const qParam = urlParams.get('q');
    
    if (qParam) searchInput.value = decodeURIComponent(qParam);

    const fetchJobs = async () => {
        jobsContainer.innerHTML = renderJobListSkeleton().repeat(5);
        if (window.lucide) window.lucide.createIcons();
        
        try {
            const { JobRepository } = await import('../../data/repositories/JobRepository.js');
            const filters = {
                category: categoryParam || '',
                location: locationSelect.value === 'All Locations' ? '' : locationSelect.value,
                q: searchInput.value
            };
            
            const jobs = await JobRepository.getAllJobs(filters);
            
            // Client side search for text query
            let filteredJobs = jobs;
            if (searchInput.value) {
                const term = searchInput.value.toLowerCase();
                filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(term) || j.companyName.toLowerCase().includes(term));
            }

            resultsCount.innerHTML = `Showing <span class="text-navy font-black text-2xl">${filteredJobs.length}</span> jobs`;
            
            if (filteredJobs.length === 0) {
                jobsContainer.innerHTML = `
                    <div class="bg-white p-24 text-center rounded-[3rem] border-4 border-dashed border-gray-50 shadow-inner">
                        <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <i data-lucide="search-x" class="w-12 h-12 text-gray-200"></i>
                        </div>
                        <h3 class="text-3xl font-black text-navy mb-4 italic">No matched career paths</h3>
                        <p class="text-gray-500 font-medium max-w-sm mx-auto">Try adjusting your filters or search terms to uncover new opportunities.</p>
                        <button onclick="location.hash='#/jobs'" class="mt-10 bg-navy text-white px-10 py-4 rounded-2xl font-black shadow-lg">View All Jobs</button>
                    </div>
                `;
            } else {
                jobsContainer.innerHTML = filteredJobs.map(job => renderJobCard(job)).join('');
            }
            
            if (window.lucide) window.lucide.createIcons();
        } catch (error) {
            console.error('Fetch jobs error:', error);
        }
    };

    searchBtn?.addEventListener('click', fetchJobs);
    fetchJobs();
};

const renderJobCard = (job) => `
    <div class="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-vibrant/30 transition-all group flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-10 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-2 h-full bg-navy group-hover:bg-vibrant transition-colors"></div>
        <div class="w-20 h-20 bg-navy/5 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-vibrant/10 transition-colors shadow-inner">
            <i data-lucide="building-2" class="text-navy w-10 h-10 group-hover:text-vibrant transition-colors"></i>
        </div>
        <div class="flex-grow space-y-3">
            <h3 class="text-2xl font-black text-navy group-hover:text-vibrant transition-colors tracking-tight">${job.title}</h3>
            <div class="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <span class="flex items-center"><i data-lucide="building" class="w-4 h-4 mr-2 text-vibrant"></i>${job.companyName}</span>
                <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-2 text-vibrant"></i>${job.location}</span>
                <span class="flex items-center"><i data-lucide="briefcase" class="w-4 h-4 mr-2 text-vibrant"></i>${job.type}</span>
            </div>
        </div>
        <div class="flex flex-col items-center md:items-end space-y-4 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
            <span class="text-navy font-black text-2xl tracking-tighter">${job.salaryRange || 'NEGOTIABLE'}</span>
            <a href="#/job-details?id=${job.id}" class="bg-navy hover:bg-navy-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95">
                Review Offer
            </a>
        </div>
    </div>
`;
