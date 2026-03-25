/**
 * JobDetails page component.
 */

export const render = async () => {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const jobId = urlParams.get('id');

    if (!jobId) {
        return `
            <div class="h-screen flex items-center justify-center">
                <p>Job not found.</p>
            </div>
        `;
    }

    return `
    <div class="bg-gray-50 pb-20 pt-12">
        <div class="max-w-7xl mx-auto px-4">
            <div id="job-details-content">
                <!-- Skeleton Loader -->
                <div class="animate-pulse space-y-8">
                    <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
                        <div class="w-24 h-24 bg-gray-100 rounded-3xl"></div>
                        <div class="flex-grow space-y-4">
                            <div class="h-8 bg-gray-100 rounded w-1/2"></div>
                            <div class="h-4 bg-gray-50 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
};

export const init = async () => {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const jobId = urlParams.get('id');
    const container = document.getElementById('job-details-content');

    if (!jobId) return;

    try {
        const { JobRepository } = await import('../../data/repositories/JobRepository.js');
        const job = await JobRepository.getJobById(jobId);

        if (!job) {
            container.innerHTML = '<p class="text-center py-20 text-xl font-bold">Job ad no longer available.</p>';
            return;
        }

        container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Job Info -->
            <div class="lg:col-span-2 space-y-8">
                <div class="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
                    <div class="w-24 h-24 bg-navy/5 rounded-3xl flex items-center justify-center shadow-inner">
                        <i data-lucide="building-2" class="w-12 h-12 text-navy"></i>
                    </div>
                    <div class="flex-grow">
                        <h1 class="text-3xl font-black text-navy mb-2">${job.title}</h1>
                        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 font-bold mb-4">
                            <span class="flex items-center"><i data-lucide="building" class="w-4 h-4 mr-2 text-vibrant"></i>${job.companyName}</span>
                            <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-2 text-vibrant"></i>${job.location}</span>
                            <span class="flex items-center"><i data-lucide="calendar" class="w-4 h-4 mr-2 text-vibrant"></i>Posted ${formatDate(job.postedAt)}</span>
                        </div>
                        ${job.labels && job.labels.length > 0 ? `
                        <div class="flex flex-wrap gap-2">
                            ${job.labels.map(l => `<span class="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">${l}</span>`).join('')}
                        </div>
                        ` : ''}
                    </div>
                </div>

                <div class="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-8">
                    <div>
                        <h2 class="text-2xl font-black text-navy mb-4">Job Description</h2>
                        <div class="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">${job.description}</div>
                    </div>
                    <div>
                        <h2 class="text-2xl font-black text-navy mb-4">Requirements</h2>
                        <div class="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-line">${job.requirements}</div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Sidebar Action -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                    <h3 class="text-xl font-black mb-6 text-navy">Apply Now</h3>
                    <div class="space-y-6 mb-8">
                        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span class="text-gray-400 font-medium">Job Type:</span>
                            <span class="font-bold text-navy">${job.type}</span>
                        </div>
                        ${job.category ? `
                        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span class="text-gray-400 font-medium">Category:</span>
                            <span class="font-bold text-navy text-right">${job.category}${job.subcategory ? `<br><span class="text-xs text-gray-400">${job.subcategory}</span>` : ''}</span>
                        </div>` : ''}
                        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span class="text-gray-400 font-medium">Salary Range:</span>
                            <span class="font-bold text-green-600">${job.salaryRange || 'Negotiable'}</span>
                        </div>
                        <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                            <span class="text-gray-400 font-medium">Applicants:</span>
                            <span class="font-bold text-navy">${job.applicantCount || 0}</span>
                        </div>
                    </div>
                    
                    <button id="apply-btn" class="w-full bg-vibrant hover:bg-vibrant-dark text-white py-4 rounded-2xl font-black text-xl shadow-xl transition-all transform hover:-translate-y-1 mb-4">
                        One-Click Apply
                    </button>
                    <button class="w-full bg-navy/5 text-navy py-4 rounded-2xl font-bold hover:bg-navy/10 transition-all flex items-center justify-center space-x-2">
                        <i data-lucide="share-2" class="w-4 h-4"></i>
                        <span>Share this Job</span>
                    </button>
                    <p class="text-center text-xs text-gray-400 mt-6 px-4">By applying, you agree to Sinhala Jobs terms and conditions.</p>
                </div>
                
                <div class="bg-navy-dark p-8 rounded-3xl shadow-xl text-white">
                    <i data-lucide="shield-check" class="w-8 h-8 text-vibrant mb-4"></i>
                    <h4 class="font-black text-lg mb-2">Safe Hiring Tip</h4>
                    <p class="text-sm text-gray-400">Never pay for a job interview. Legitimate companies will never ask for payment during the hiring process.</p>
                </div>
            </div>
        </div>
        `;

        if (window.lucide) window.lucide.createIcons();
        initApplyButton(job);

    } catch (error) {
        console.error('Job details error:', error);
    }
};

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const initApplyButton = (job) => {
    const btn = document.getElementById('apply-btn');
    btn?.addEventListener('click', async () => {
        const { auth, db } = await import('../../core/firebase-config.js');
        const { collection, addDoc, doc, updateDoc, increment } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');

        if (!auth.currentUser) {
            if (window.showToast) window.showToast('Please login to apply for this job.', 'error');
            window.location.hash = '#/login';
            return;
        }

        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');

        try {
            // Check if already applied (simplified for now)
            await addDoc(collection(db, "applications"), {
                jobId: job.id,
                jobTitle: job.title,
                companyId: job.companyId,
                companyName: job.companyName,
                candidateId: auth.currentUser.uid,
                candidateName: auth.currentUser.displayName,
                status: 'pending',
                appliedAt: new Date().toISOString()
            });

            // Increment applicant count
            await updateDoc(doc(db, "jobs", job.id), {
                applicantCount: increment(1)
            });

            btn.innerHTML = 'Applied Successfully!';
            btn.classList.replace('bg-vibrant', 'bg-green-500');
            btn.disabled = true;
            
            if (window.showToast) window.showToast('Your application has been sent successfully!', 'success');
        } catch (error) {
            console.error('Apply error:', error);
            if (window.showToast) window.showToast('Failed to submit application. Please try again.', 'error');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};
