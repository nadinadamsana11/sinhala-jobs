/**
 * TalentSearch page component.
 */

export const render = async () => {
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');

    if (!auth.currentUser) {
        window.location.hash = '#/login';
        return '';
    }

    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();

    if (userData?.role !== 'company') {
        return `
            <div class="h-screen flex flex-col items-center justify-center p-4 text-center">
                <i data-lucide="shield-alert" class="w-16 h-16 text-red-500 mb-4"></i>
                <h1 class="text-2xl font-bold mb-2">Access Denied</h1>
                <p class="text-gray-600 mb-6">Talent Search is only available for Company accounts.</p>
                <a href="#/dashboard" class="bg-navy text-white px-8 py-3 rounded-xl font-bold">Back to Dashboard</a>
            </div>
        `;
    }

    return `
    <div class="bg-gray-50 pb-20 pt-12">
        <div class="max-w-7xl mx-auto px-4">
            <header class="mb-12">
                <h1 class="text-4xl font-black text-navy">Talent Search</h1>
                <p class="text-gray-500 mt-2">Find the best professionals for your company.</p>
            </header>

            <div class="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 mb-12 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div class="flex-grow flex items-center px-6 py-4 bg-gray-50 rounded-2xl">
                    <i data-lucide="search" class="text-gray-400 mr-3"></i>
                    <input id="talent-search-input" type="text" placeholder="Search by skills, bio, or name" class="bg-transparent border-none focus:ring-0 text-gray-800 w-full outline-none font-medium">
                </div>
                <button id="talent-search-btn" class="bg-vibrant hover:bg-vibrant-dark text-white px-10 py-4 rounded-2xl font-black shadow-lg transition-all transform hover:-translate-y-1">Search Talent</button>
            </div>

            <div id="talent-results" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Skeleton Loader -->
                ${renderTalentSkeleton().repeat(6)}
            </div>
        </div>
    </div>
    `;
};

const renderTalentSkeleton = () => `
    <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
        <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 bg-gray-100 rounded-full"></div>
            <div class="flex-grow space-y-3">
                <div class="h-5 bg-gray-100 rounded w-2/3"></div>
                <div class="h-3 bg-gray-50 rounded w-1/3"></div>
            </div>
        </div>
        <div class="space-y-2 mb-6">
            <div class="h-3 bg-gray-50 rounded w-full"></div>
            <div class="h-3 bg-gray-50 rounded w-5/6"></div>
        </div>
        <div class="h-10 bg-gray-100 rounded-xl w-full"></div>
    </div>
`;

export const init = async () => {
    const resultsContainer = document.getElementById('talent-results');
    const searchBtn = document.getElementById('talent-search-btn');
    const searchInput = document.getElementById('talent-search-input');

    const searchTalent = async (queryText = '') => {
        resultsContainer.innerHTML = renderTalentSkeleton().repeat(6);
        if (window.lucide) window.lucide.createIcons();

        try {
            const { db } = await import('../../core/firebase-config.js');
            const { collection, getDocs, query, where } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
            
            // Basic query for candidates
            const q = query(collection(db, "users"), where("role", "==", "candidate"));
            const querySnapshot = await getDocs(q);
            
            let candidates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Simple client-side search for demo (real production would use Algolia/ElasticSearch)
            if (queryText) {
                const term = queryText.toLowerCase();
                candidates = candidates.filter(c => 
                    (c.displayName?.toLowerCase().includes(term)) || 
                    (c.bio?.toLowerCase().includes(term)) ||
                    (c.skills?.some(s => s.toLowerCase().includes(term)))
                );
            }

            if (candidates.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <i data-lucide="user-minus" class="w-16 h-16 mx-auto text-gray-200 mb-4"></i>
                        <p class="text-xl font-bold text-gray-400">No candidates found matching your search.</p>
                    </div>
                `;
            } else {
                resultsContainer.innerHTML = candidates.map(c => renderTalentCard(c)).join('');
            }
            
            if (window.lucide) window.lucide.createIcons();
        } catch (error) {
            console.error('Talent search error:', error);
            resultsContainer.innerHTML = '<p class="text-red-500">Failed to load talent list.</p>';
        }
    };

    searchBtn?.addEventListener('click', () => searchTalent(searchInput.value));
    
    // Initial load
    searchTalent();
};

const renderTalentCard = (user) => `
    <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-vibrant/30 transition-all group">
        <div class="flex items-center space-x-4 mb-6">
            <div class="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ring-4 ring-navy/5">
                ${(user.displayName || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
                <h3 class="font-black text-navy group-hover:text-vibrant transition-colors">${user.displayName}</h3>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">${user.role}</p>
            </div>
        </div>
        
        <p class="text-gray-500 text-sm mb-6 line-clamp-3 min-h-[4.5rem]">
            ${user.bio || 'No bio provided yet. Keep exploring to find the perfect match for your team.'}
        </p>
        
        <div class="flex flex-wrap gap-2 mb-8">
            <span class="bg-gray-50 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold border border-gray-100">Sri Lanka</span>
            <span class="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-xs font-bold border border-green-100">Active Now</span>
        </div>
        
        <button class="w-full py-4 bg-navy hover:bg-navy-dark text-white font-black rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2">
            <i data-lucide="mail" class="w-4 h-4"></i>
            <span>Contact Candidate</span>
        </button>
    </div>
`;
