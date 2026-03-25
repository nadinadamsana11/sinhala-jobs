/**
 * PostJob page component.
 */

export const render = async () => {
    // Check if user is company
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
    
    if (!auth.currentUser) {
        return `
            <div class="h-screen flex flex-col items-center justify-center">
                <p class="text-xl mb-4">Please login to post a job.</p>
                <a href="#/login" class="bg-navy text-white px-6 py-2 rounded-full">Login</a>
            </div>
        `;
    }

    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();

    if (userData?.role !== 'company') {
        return `
            <div class="h-screen flex flex-col items-center justify-center p-4 text-center">
                <i data-lucide="alert-circle" class="w-16 h-16 text-yellow-500 mb-4"></i>
                <h1 class="text-2xl font-bold mb-2">Access Restricted</h1>
                <p class="text-gray-600 mb-6">Only company accounts can post job advertisements.</p>
                <a href="#/dashboard" class="bg-navy text-white px-8 py-3 rounded-xl font-bold">Back to Dashboard</a>
            </div>
        `;
    }

    return `
    <div class="max-w-4xl mx-auto px-4 py-12">
        <header class="mb-12">
            <h1 class="text-4xl font-extrabold text-navy">Post a New Job</h1>
            <p class="text-gray-500 mt-2">Fill in the details to find your next great hire.</p>
        </header>

        <form id="post-job-form" class="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Job Title</label>
                    <input name="title" type="text" required placeholder="e.g. Senior Frontend Developer" 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Category</label>
                    <select name="category" required class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all cursor-pointer">
                        <option>Technology</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Health Care</option>
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Other</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Job Type</label>
                    <select name="type" required class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all cursor-pointer">
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Remote</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input name="location" type="text" required placeholder="e.g. Colombo, Sri Lanka" 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Salary Range (Optional)</label>
                    <input name="salary" type="text" placeholder="e.g. 150,000 - 200,000 LKR" 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                </div>
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Job Description</label>
                <textarea name="description" rows="6" required placeholder="Describe the role and your company..." 
                    class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all"></textarea>
            </div>

            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Requirements</label>
                <textarea name="requirements" rows="4" required placeholder="List the skills and qualifications needed..." 
                    class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all"></textarea>
            </div>

            <div class="flex justify-end space-x-4 pt-6">
                <button type="button" onclick="location.hash='#/dashboard'" class="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all text-lg">Cancel</button>
                <button type="submit" class="bg-vibrant hover:bg-vibrant-dark text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all transform hover:-translate-y-1">Post Job Ad</button>
            </div>
        </form>
    </div>
    `;
};

export const init = () => {
    const form = document.getElementById('post-job-form');
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');

        try {
            const { JobRepository } = await import('../../data/repositories/JobRepository.js');
            const { auth } = await import('../../core/firebase-config.js');
            
            const jobData = {
                title: form.title.value,
                category: form.category.value,
                type: form.type.value,
                location: form.location.value,
                salaryRange: form.salary.value,
                description: form.description.value,
                requirements: form.requirements.value,
                companyId: auth.currentUser.uid,
                companyName: auth.currentUser.displayName,
                postedAt: new Date().toISOString(),
                applicantCount: 0
            };

            await JobRepository.createJob(jobData);
            alert('Job posted successfully!');
            window.location.hash = '#/dashboard';
        } catch (error) {
            console.error('Post job error:', error);
            alert('Failed to post job. Please try again.');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};
