/**
 * Talent Search page component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 pb-24 pt-16">
        <div class="max-w-7xl mx-auto px-4">
            <div class="text-center mb-16">
                <h1 class="text-5xl font-black text-navy italic tracking-tighter mb-4">Talent <span class="text-vibrant underline decoration-navy/10">Scout</span></h1>
                <p class="text-gray-500 font-medium max-w-2xl mx-auto">Find the brightest minds in Sri Lanka to fuel your company's growth.</p>
            </div>
            
            <div class="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 mb-16 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 max-w-4xl mx-auto">
                <div class="flex-grow flex items-center px-8 py-5 bg-gray-50 rounded-2xl focus-within:bg-white transition-colors border-2 border-transparent focus-within:border-vibrant/20">
                    <i data-lucide="search" class="text-gray-400 mr-4"></i>
                    <input id="talent-search-input" type="text" placeholder="Search by name, skills or bio" class="bg-transparent border-none focus:ring-0 text-navy w-full outline-none font-black lg:text-lg">
                </div>
                <button id="talent-search-btn" class="bg-navy hover:bg-navy-dark text-white px-12 py-5 rounded-2xl font-black transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3">
                    <span>Search Talent</span>
                    <i data-lucide="zap" class="w-5 h-5 text-vibrant"></i>
                </button>
            </div>
            
            <div id="talents-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                ${renderTalentSkeleton().repeat(6)}
            </div>
        </div>
    </div>
    `;
};

const renderTalentSkeleton = () => `
    <div class="bg-white p-10 rounded-[3rem] border border-gray-100 animate-pulse text-center">
        <div class="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-8"></div>
        <div class="h-8 bg-gray-100 rounded-lg w-3/4 mx-auto mb-4"></div>
        <div class="h-4 bg-gray-50 rounded-lg w-1/2 mx-auto mb-10"></div>
        <div class="h-12 bg-gray-50 rounded-2xl w-full"></div>
    </div>
`;

export const init = async () => {
    const container = document.getElementById('talents-container');
    const searchBtn = document.getElementById('talent-search-btn');
    const searchInput = document.getElementById('talent-search-input');
    
    const fetchTalents = async () => {
        container.innerHTML = renderTalentSkeleton().repeat(6);
        if (window.lucide) window.lucide.createIcons();

        try {
            const { db } = await import('../../core/firebase-config.js');
            const { collection, getDocs, query, where } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
            
            const q = query(collection(db, 'users'), where('role', '==', 'candidate'));
            const querySnapshot = await getDocs(q);
            
            let talents = querySnapshot.docs.map(doc => doc.data());
            
            // Client side search
            if (searchInput.value) {
                const term = searchInput.value.toLowerCase();
                talents = talents.filter(t => 
                    (t.displayName || '').toLowerCase().includes(term) || 
                    (t.bio || '').toLowerCase().includes(term) || 
                    (t.skills || '').toLowerCase().includes(term)
                );
            }

            if (talents.length === 0) {
                 container.innerHTML = `
                    <div class="col-span-full py-24 text-center bg-white rounded-[3rem] border-4 border-dashed border-gray-50 shadow-inner">
                        <i data-lucide="users" class="w-20 h-20 text-gray-100 mx-auto mb-6"></i>
                        <h3 class="text-2xl font-black text-navy italic">No candidates matched the criteria</h3>
                    </div>
                `;
            } else {
                container.innerHTML = talents.map(talent => renderTalentCard(talent)).join('');
            }
            
            if (window.lucide) window.lucide.createIcons();
        } catch (error) {
            console.error('Talent Search error:', error);
        }
    };

    searchBtn?.addEventListener('click', fetchTalents);
    fetchTalents();
};

const renderTalentCard = (talent) => `
    <div class="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-vibrant/30 transition-all text-center group relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-vibrant/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
        <div class="w-24 h-24 bg-navy rounded-full mx-auto mb-8 shadow-2xl flex items-center justify-center font-black text-white text-3xl ring-8 ring-white transform group-hover:scale-105 transition-all overflow-hidden relative">
            ${(talent.displayName || 'U').charAt(0).toUpperCase()}
        </div>
        <h3 class="text-2xl font-black text-navy mb-2 tracking-tight">${talent.displayName || 'Candidate'}</h3>
        <p class="text-vibrant font-black text-sm uppercase tracking-widest mb-6">${talent.title || 'Professional'}</p>
        
        <p class="text-gray-500 font-medium text-sm line-clamp-3 mb-8 italic">
            "${talent.bio || 'Available for exciting new opportunities in Sri Lanka\'s growing digital economy.'}"
        </p>
        
        <button class="w-full py-4 bg-navy text-white hover:bg-navy-dark rounded-2xl font-black transition-all shadow-xl flex items-center justify-center space-x-2 text-sm uppercase tracking-widest group-hover:-translate-y-1 transform">
            <i data-lucide="mail" class="w-4 h-4 text-vibrant"></i>
            <span>Connect Profile</span>
        </button>
    </div>
`;
