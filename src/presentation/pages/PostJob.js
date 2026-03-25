/**
 * PostJob page component: Multi-step Wizard.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 min-h-screen pb-24 pt-10">
        <div class="max-w-4xl mx-auto px-4">
            <header class="mb-12 text-center">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-vibrant rounded-3xl mb-6 shadow-2xl">
                    <i data-lucide="megaphone" class="text-white w-10 h-10"></i>
                </div>
                <h1 class="text-4xl font-black text-navy italic tracking-tight">Post a <span class="text-vibrant">Job Opening</span></h1>
                <p class="text-gray-500 font-medium mt-2">Find the perfect candidate by providing detailed information.</p>
            </header>
            
            <!-- Stepper -->
            <div class="flex items-center justify-between max-w-2xl mx-auto mb-12 relative">
                <div class="absolute left-0 top-1/2 -mt-1 w-full h-2 bg-gray-200 rounded-full z-0"></div>
                <div id="progress-bar" class="absolute left-0 top-1/2 -mt-1 w-0 h-2 bg-navy rounded-full z-0 transition-all duration-500"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <div id="step-1-icon" class="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center font-black shadow-xl ring-4 ring-gray-50 transition-colors">1</div>
                    <span class="text-[10px] font-black uppercase tracking-widest mt-3 text-navy">Basics</span>
                </div>
                <div class="relative z-10 flex flex-col items-center">
                    <div id="step-2-icon" class="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-black ring-4 ring-gray-50 transition-colors">2</div>
                    <span class="text-[10px] font-black uppercase tracking-widest mt-3 text-gray-400" id="step-2-text">Details</span>
                </div>
                <div class="relative z-10 flex flex-col items-center">
                    <div id="step-3-icon" class="w-12 h-12 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-black ring-4 ring-gray-50 transition-colors">3</div>
                    <span class="text-[10px] font-black uppercase tracking-widest mt-3 text-gray-400" id="step-3-text">Requirements</span>
                </div>
            </div>

            <form id="post-job-wizard" class="bg-white p-10 lg:p-14 rounded-[3rem] shadow-2xl border border-gray-100 relative min-h-[500px] overflow-hidden">
                
                <!-- Step 1: Basic Info -->
                <div id="job-step-1" class="absolute inset-x-10 lg:inset-x-14 top-10 lg:top-14 transition-all duration-500 transform translate-x-0 opacity-100">
                    <h2 class="text-2xl font-black text-navy mb-8">Basic Information</h2>
                    <div class="space-y-6">
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Job Title</label>
                            <input id="title" type="text" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="E.g. Senior Frontend Developer">
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Employment Type</label>
                                <select id="type" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy cursor-pointer appearance-none bg-white">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Location</label>
                                <input id="location" type="text" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="E.g. Colombo, Sri Lanka or Remote">
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Salary Range (Optional)</label>
                            <input id="salary" type="text" class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="E.g. LKR 150,000 - 250,000">
                        </div>
                    </div>
                    <div class="mt-12 flex justify-end">
                        <button type="button" onclick="window.nextJobStep(2)" class="bg-navy text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-navy-dark inline-flex items-center space-x-2">
                            <span>Next Step</span><i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <!-- Step 2: Categorization -->
                <div id="job-step-2" class="absolute inset-x-10 lg:inset-x-14 top-10 lg:top-14 transition-all duration-500 transform translate-x-full opacity-0 invisible">
                    <h2 class="text-2xl font-black text-navy mb-8">Categorization & Tags</h2>
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Main Category</label>
                                <select id="category" required onchange="window.updateSubcategories()" class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-vibrant outline-none font-bold text-navy cursor-pointer appearance-none bg-white">
                                    <option value="">Select Category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Health Care">Health Care</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Design">Design</option>
                                    <option value="Customer Service">Customer Service</option>
                                    <option value="Human Resources">Human Resources</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Sub-category</label>
                                <select id="subcategory" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-vibrant outline-none font-bold text-navy cursor-pointer appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-400" disabled>
                                    <option value="">First select a category</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Labels / Skills (Comma separated)</label>
                            <input id="labels" type="text" class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-vibrant outline-none font-bold text-navy" placeholder="E.g. JavaScript, React, Leadership, SEO">
                            <p class="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">These help candidates find your job faster.</p>
                        </div>
                    </div>
                    <div class="mt-12 flex justify-between">
                        <button type="button" onclick="window.prevJobStep(1)" class="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-200">Back</button>
                        <button type="button" onclick="window.nextJobStep(3)" class="bg-navy text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-navy-dark inline-flex items-center space-x-2">
                            <span>Next Step</span><i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <!-- Step 3: In-depth Details -->
                <div id="job-step-3" class="absolute inset-x-10 lg:inset-x-14 top-10 lg:top-14 transition-all duration-500 transform translate-x-full opacity-0 invisible h-full bg-white z-20">
                    <h2 class="text-2xl font-black text-navy mb-8">Role Requirements</h2>
                    <div class="space-y-6 h-full overflow-y-auto pb-32 pr-2">
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Job Description</label>
                            <textarea id="description" rows="4" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="Detail the day-to-day responsibilities..."></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Requirements</label>
                            <textarea id="requirements" rows="4" required class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="List required experience, degrees, certifications..."></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Benefits & Perks (Optional)</label>
                            <textarea id="benefits" rows="3" class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:border-navy outline-none font-bold text-navy" placeholder="Health insurance, flexible hours, annual bonuses..."></textarea>
                        </div>
                        
                        <div class="flex justify-between pt-8 pb-10 border-t border-gray-50">
                            <button type="button" onclick="window.prevJobStep(2)" class="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-200">Back</button>
                            <button type="submit" class="bg-vibrant text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-vibrant-dark inline-flex items-center space-x-2">
                                <span>Post Job Now</span><i data-lucide="check" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
};

const subcategoriesMap = {
    'Technology': ['Software Development', 'Data Science', 'IT Support', 'Cybersecurity', 'Product Management'],
    'Marketing': ['Digital Marketing', 'SEO', 'Content Creation', 'Social Media', 'Public Relations'],
    'Finance': ['Accounting', 'Financial Analysis', 'Auditing', 'Banking', 'Taxation'],
    'Health Care': ['Nursing', 'Medical Practice', 'Pharmacy', 'Healthcare Administration'],
    'Engineering': ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Architecture'],
    'Design': ['UI/UX Design', 'Graphic Design', 'Motion Graphics', 'Interior Design'],
    'Customer Service': ['Call Center', 'Client Success', 'Technical Support'],
    'Human Resources': ['Recruiting', 'Employee Relations', 'Training & Development']
};

window.updateSubcategories = () => {
    const cat = document.getElementById('category').value;
    const subSelect = document.getElementById('subcategory');
    
    if (cat && subcategoriesMap[cat]) {
        const options = subcategoriesMap[cat].map(sub => `<option value="${sub}">${sub}</option>`);
        subSelect.innerHTML = options.join('');
        subSelect.disabled = false;
        subSelect.classList.remove('bg-gray-50', 'text-gray-400');
    } else {
        subSelect.innerHTML = '<option value="">First select a category</option>';
        subSelect.disabled = true;
        subSelect.classList.add('bg-gray-50', 'text-gray-400');
    }
};

window.nextJobStep = (step) => {
    // Validation
    if (step === 2) {
        if (!document.getElementById('title').value || !document.getElementById('location').value) {
            if(window.showToast) window.showToast('Please fill all required fields.', 'error');
            return;
        }
    }
    if (step === 3) {
        if (!document.getElementById('category').value || !document.getElementById('subcategory').value) {
            if(window.showToast) window.showToast('Please select a category and sub-category.', 'error');
            return;
        }
    }

    // Hide all
    for(let i=1; i<=3; i++) {
        const el = document.getElementById(`job-step-${i}`);
        el.classList.add('translate-x-full', 'opacity-0', 'invisible');
        el.classList.remove('translate-x-0', 'opacity-100', '-translate-x-full');
    }

    // Show current
    const current = document.getElementById(`job-step-${step}`);
    current.classList.remove('translate-x-full', 'opacity-0', 'invisible');
    current.classList.add('translate-x-0', 'opacity-100');

    // Move prev to left
    for(let i=1; i<step; i++) {
        document.getElementById(`job-step-${i}`).classList.add('-translate-x-full');
    }

    // Update progress bar and icons
    const progress = document.getElementById('progress-bar');
    progress.style.width = step === 1 ? '0%' : step === 2 ? '50%' : '100%';

    for(let i=1; i<=3; i++) {
        const icon = document.getElementById(`step-${i}-icon`);
        const text = document.getElementById(`step-${i}-text`);
        if (i <= step) {
             icon.classList.add('bg-navy', 'text-white');
             icon.classList.remove('bg-gray-200', 'text-gray-400');
             if(text) text.classList.replace('text-gray-400', 'text-navy');
        } else {
             icon.classList.replace('bg-navy', 'bg-gray-200');
             icon.classList.replace('text-white', 'text-gray-400');
             if(text) text.classList.replace('text-navy', 'text-gray-400');
        }
    }
};

window.prevJobStep = (step) => {
    // Hide all
    for(let i=1; i<=3; i++) {
        const el = document.getElementById(`job-step-${i}`);
        el.classList.add('translate-x-full', 'opacity-0', 'invisible');
        el.classList.remove('translate-x-0', 'opacity-100', '-translate-x-full');
    }

    // Show current
    const current = document.getElementById(`job-step-${step}`);
    current.classList.remove('translate-x-full', 'opacity-0', 'invisible');
    current.classList.add('translate-x-0', 'opacity-100');

    for(let i=1; i<step; i++) {
        document.getElementById(`job-step-${i}`).classList.add('-translate-x-full');
    }

    const progress = document.getElementById('progress-bar');
    progress.style.width = step === 1 ? '0%' : step === 2 ? '50%' : '100%';

    for(let i=1; i<=3; i++) {
        const icon = document.getElementById(`step-${i}-icon`);
        const text = document.getElementById(`step-${i}-text`);
        if (i <= step) {
             icon.classList.add('bg-navy', 'text-white');
             icon.classList.remove('bg-gray-200', 'text-gray-400');
             if(text) text.classList.replace('text-gray-400', 'text-navy');
        } else {
             icon.classList.replace('bg-navy', 'bg-gray-200');
             icon.classList.replace('text-white', 'text-gray-400');
             if(text) text.classList.replace('text-navy', 'text-gray-400');
        }
    }
};

export const init = () => {
    const form = document.getElementById('post-job-wizard');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');

        try {
            const { JobRepository } = await import('../../data/repositories/JobRepository.js');
            const { auth, db } = await import('../../core/firebase-config.js');
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
            
            // Get Company Data safely
            const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
            const companyData = userDoc.data();

            const jobData = {
                title: document.getElementById('title').value,
                companyName: companyData.displayName || 'Unknown Company',
                location: document.getElementById('location').value,
                type: document.getElementById('type').value,
                salaryRange: document.getElementById('salary').value || 'Negotiable',
                category: document.getElementById('category').value,
                subcategory: document.getElementById('subcategory').value,
                labels: document.getElementById('labels').value.split(',').map(l => l.trim()).filter(l => l),
                description: document.getElementById('description').value,
                requirements: document.getElementById('requirements').value,
                benefits: document.getElementById('benefits').value,
                companyId: auth.currentUser.uid,
                applicantCount: 0
            };

            await JobRepository.addJob(jobData);
            
            if (window.showToast) window.showToast('Job posted successfully!', 'success');
            window.location.hash = '#/dashboard';
        } catch (error) {
            console.error('Adding job error:', error);
            if (window.showToast) window.showToast('Failed to post job. Please try again.', 'error');
        } finally {
            loader?.classList.add('hidden');
        }
    });

    if (window.lucide) window.lucide.createIcons();
};
