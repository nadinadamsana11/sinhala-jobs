/**
 * Specific Category Details page.
 */

export const render = async () => {
    const categoryName = window.routeParams?.id || 'Unknown';
    return `
    <div class="bg-gray-50 pb-24">
        <header class="bg-navy text-white pt-24 pb-32 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <div class="inline-flex items-center space-x-2 bg-vibrant text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6">
                    <i data-lucide="tag" class="w-4 h-4"></i>
                    <span>Category Archive</span>
                </div>
                <h1 class="text-6xl font-black italic tracking-tighter mb-4">${categoryName} <span class="text-vibrant">Opportunities</span></h1>
                <p class="text-gray-400 font-medium max-w-2xl mx-auto">Discover the latest career openings specifically curated for the ${categoryName} industry in Sri Lanka.</p>
            </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
            <div id="category-jobs-container" class="space-y-6">
                ${renderJobSkeleton().repeat(4)}
            </div>
            
            <div class="mt-16 text-center">
                <a href="#/categories" class="bg-white text-navy border-2 border-navy px-12 py-5 rounded-2xl font-black hover:bg-navy hover:text-white transition-all shadow-xl inline-block">Explore Other Categories</a>
            </div>
        </div>
    </div>
    `;
};

const renderJobSkeleton = () => `
    <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 animate-pulse flex items-center space-x-8">
        <div class="w-20 h-20 bg-gray-100 rounded-3xl"></div>
        <div class="flex-grow space-y-4">
            <div class="h-8 bg-gray-100 rounded-lg w-1/2"></div>
            <div class="h-4 bg-gray-50 rounded-lg w-1/3"></div>
        </div>
        <div class="w-32 h-12 bg-gray-100 rounded-2xl"></div>
    </div>
`;

export const init = async () => {
    const container = document.getElementById('category-jobs-container');
    const categoryName = window.routeParams?.id;

    try {
        const { JobRepository } = await import('../../data/repositories/JobRepository.js');
        const jobs = await JobRepository.getAllJobs({ category: categoryName });
        
        if (jobs.length === 0) {
            container.innerHTML = `
                <div class="bg-white p-24 text-center rounded-[3rem] border-4 border-dashed border-gray-50">
                    <i data-lucide="package-search" class="w-20 h-20 text-gray-100 mx-auto mb-6"></i>
                    <h3 class="text-2xl font-black text-navy italic">No jobs currently listed in ${categoryName}</h3>
                </div>
            `;
        } else {
            container.innerHTML = jobs.map(job => renderCategoryJobCard(job)).join('');
        }
        
        if (window.lucide) window.lucide.createIcons();
    } catch (error) {
        console.error('Category Details Init Error:', error);
    }
};

const renderCategoryJobCard = (job) => `
    <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-10 group">
        <div class="w-20 h-20 bg-navy/5 rounded-3xl flex items-center justify-center group-hover:bg-vibrant/10 transition-colors">
            <i data-lucide="building-2" class="text-navy w-10 h-10 group-hover:text-vibrant"></i>
        </div>
        <div class="flex-grow">
            <h3 class="text-2xl font-black text-navy group-hover:text-vibrant transition-colors mb-2 tracking-tight">${job.title}</h3>
            <div class="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <span>${job.companyName}</span>
                <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
                <span>${job.location}</span>
                <span class="w-1 h-1 bg-gray-200 rounded-full"></span>
                <span class="text-vibrant">${job.type}</span>
            </div>
        </div>
        <a href="#/job-details?id=${job.id}" class="bg-navy text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-navy-dark transition-all transform hover:-translate-y-1">View Offer</a>
    </div>
`;
