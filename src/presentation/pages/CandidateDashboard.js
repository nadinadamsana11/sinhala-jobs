/**
 * Candidate Dashboard component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 min-h-screen pb-24 pt-10">
        <div class="max-w-7xl mx-auto px-4">
            <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 space-y-6 md:space-y-0">
                <div>
                    <h1 class="text-4xl font-black text-navy italic">My Career <span class="text-vibrant">Hub</span></h1>
                    <p class="text-gray-500 font-medium">Track your applications and professional growth.</p>
                </div>
                <div class="flex space-x-4">
                    <a href="#/jobs" class="bg-navy text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-navy-dark transition-all transform hover:-translate-y-1">Discover Jobs</a>
                    <a href="#/profile" class="bg-white text-navy border-2 border-navy px-8 py-4 rounded-2xl font-black hover:bg-navy hover:text-white transition-all transform hover:-translate-y-1">Edit Profile</a>
                </div>
            </header>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <!-- Stats -->
                <div class="lg:col-span-1 space-y-8">
                    <div class="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center justify-between group hover:border-vibrant transition-all">
                        <div>
                            <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Applications</p>
                            <p id="app-count" class="text-5xl font-black text-navy italic tracking-tighter">0</p>
                        </div>
                        <div class="w-16 h-16 bg-vibrant/10 rounded-2xl flex items-center justify-center group-hover:bg-vibrant text-vibrant group-hover:text-white transition-all">
                            <i data-lucide="send" class="w-8 h-8"></i>
                        </div>
                    </div>
                </div>

                <!-- Applications List -->
                <div class="lg:col-span-2 space-y-8">
                    <h2 class="text-2xl font-black text-navy flex items-center space-x-3 mb-4">
                        <i data-lucide="clock" class="text-vibrant w-6 h-6"></i>
                        <span>Recent Applications</span>
                    </h2>
                    <div id="applications-container" class="space-y-6 text-center py-10">
                        ${renderAppSkeleton().repeat(3)}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

const renderAppSkeleton = () => `
    <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 animate-pulse flex items-center space-x-8">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl"></div>
        <div class="flex-grow space-y-3">
            <div class="h-6 bg-gray-100 rounded w-1/2"></div>
            <div class="h-4 bg-gray-50 rounded w-1/4"></div>
        </div>
        <div class="w-24 h-5 bg-gray-100 rounded-full"></div>
    </div>
`;

export const init = async () => {
    const container = document.getElementById('applications-container');
    const appCount = document.getElementById('app-count');
    
    try {
        const { db } = await import('../../core/firebase-config.js');
        const { collection, query, where, getDocs } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
        
        const q = query(collection(db, 'applications'), where('candidateId', '==', window.currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        appCount.textContent = querySnapshot.size;
        
        if (querySnapshot.empty) {
            container.innerHTML = `
                <div class="bg-navy/5 p-20 rounded-[3rem] border-4 border-dashed border-navy/10">
                    <i data-lucide="folder-search" class="w-16 h-16 text-navy/20 mx-auto mb-6"></i>
                    <p class="text-navy/50 font-black italic">No active applications found.</p>
                </div>
            `;
        } else {
            container.innerHTML = querySnapshot.docs.map(doc => renderApplicationItem(doc.data())).join('');
        }
        
        if (window.lucide) window.lucide.createIcons();
    } catch (error) {
        console.error('Candidate Dashboard Init Error:', error);
    }
};

const renderApplicationItem = (app) => `
    <div class="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:border-vibrant transition-all flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-left group">
        <div class="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center group-hover:bg-vibrant/10 transition-colors">
            <i data-lucide="briefcase" class="text-navy w-8 h-8 group-hover:text-vibrant"></i>
        </div>
        <div class="flex-grow">
            <h3 class="font-black text-xl text-navy tracking-tight">${app.jobTitle}</h3>
            <p class="text-gray-400 font-bold text-sm uppercase tracking-widest">${app.companyName}</p>
        </div>
        <div class="bg-vibrant/10 text-vibrant px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Applied ${new Date(app.appliedAt).toLocaleDateString()}
        </div>
    </div>
`;
