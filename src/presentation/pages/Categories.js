/**
 * Categories page component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 pb-20 pt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-5xl font-black text-navy mb-4 italic">Browse by Category</h1>
            <p class="text-gray-500 max-w-2xl mx-auto font-medium mb-16">Discover opportunities across diverse industries and find the perfect match for your expertise.</p>
            
            <div id="categories-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${renderCategorySkeleton().repeat(6)}
            </div>
        </div>
    </div>
    `;
};

const renderCategorySkeleton = () => `
    <div class="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm animate-pulse">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl mb-6 mx-auto"></div>
        <div class="h-6 bg-gray-100 rounded w-1/2 mx-auto mb-4"></div>
        <div class="h-4 bg-gray-50 rounded w-1/4 mx-auto"></div>
    </div>
`;

export const init = async () => {
    const grid = document.getElementById('categories-grid');
    
    // Mock data for categories with job and seeker counts as requested
    const categories = [
        { name: 'Technology', icon: 'code', jobs: 452, seekers: 1240 },
        { name: 'Marketing', icon: 'megaphone', jobs: 215, seekers: 850 },
        { name: 'Finance', icon: 'pie-chart', jobs: 132, seekers: 420 },
        { name: 'Health Care', icon: 'heart-pulse', jobs: 89, seekers: 310 },
        { name: 'Engineering', icon: 'cog', jobs: 310, seekers: 980 },
        { name: 'Design', icon: 'palette', jobs: 156, seekers: 1100 },
        { name: 'Customer Service', icon: 'headphones', jobs: 287, seekers: 1500 },
        { name: 'Human Resources', icon: 'users-2', jobs: 74, seekers: 240 }
    ];

    setTimeout(() => {
        grid.innerHTML = categories.map(cat => renderCategoryItem(cat)).join('');
        if (window.lucide) window.lucide.createIcons();
    }, 500);
};

const renderCategoryItem = (cat) => `
    <div onclick="location.hash='#/category/${cat.name}'" class="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-vibrant transition-all hover:shadow-2xl cursor-pointer group text-center relative overflow-hidden">
        <div class="w-20 h-20 bg-navy/5 rounded-3xl flex items-center justify-center mb-6 mx-auto group-hover:bg-vibrant/10 transition-colors">
            <i data-lucide="${cat.icon}" class="text-navy w-10 h-10 group-hover:text-vibrant transition-colors"></i>
        </div>
        <h3 class="font-black text-2xl text-navy mb-4 group-hover:text-vibrant transition-colors">${cat.name}</h3>
        
        <div class="flex justify-center space-x-6">
            <div class="text-center">
                <p class="text-vibrant font-black text-lg leading-none">${cat.jobs}</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Jobs</p>
            </div>
            <div class="w-px h-8 bg-gray-100"></div>
            <div class="text-center">
                <p class="text-navy font-black text-lg leading-none">${cat.seekers}</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Seekers</p>
            </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center space-x-2 text-navy font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore Jobs</span>
            <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </div>
    </div>
`;
