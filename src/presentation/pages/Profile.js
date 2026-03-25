/**
 * Profile page component.
 */

export const render = async () => {
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');

    if (!auth.currentUser) {
        window.location.hash = '#/login';
        return '';
    }

    return `
    <div class="max-w-4xl mx-auto px-4 py-12">
        <header class="mb-12 flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-extrabold text-navy">Update Profile</h1>
                <p class="text-gray-500 mt-2">Manage your personal information and resume.</p>
            </div>
            <button onclick="location.hash='#/dashboard'" class="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all">
                <i data-lucide="x" class="text-gray-600"></i>
            </button>
        </header>

        <form id="profile-form" class="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-10">
            <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 pb-10 border-b border-gray-50">
                <div class="relative group">
                    <div class="w-32 h-32 bg-navy rounded-3xl flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl relative overflow-hidden">
                        <span id="initials-avatar"></span>
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <i data-lucide="camera" class="w-8 h-8"></i>
                        </div>
                    </div>
                </div>
                <div class="flex-grow space-y-2 text-center md:text-left">
                    <h2 class="text-2xl font-black text-navy" id="profile-name-display">...</h2>
                    <p class="text-gray-400 font-medium" id="profile-email-display">...</p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                        <span class="bg-vibrant/10 text-vibrant px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest" id="profile-role-display">...</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
                    <input name="displayName" type="text" required placeholder="Your full name" 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input name="phoneNumber" type="tel" placeholder="+94 7X XXX XXXX" 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Bio / About Me</label>
                    <textarea name="bio" rows="4" placeholder="Tell us about yourself..." 
                        class="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all"></textarea>
                </div>
            </div>

            <div class="pt-6">
                <h3 class="text-xl font-black text-navy mb-6">Social Links</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="relative">
                        <i data-lucide="linkedin" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                        <input name="linkedin" type="url" placeholder="LinkedIn Profile URL" 
                            class="w-full pl-12 pr-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                    </div>
                    <div class="relative">
                        <i data-lucide="globe" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                        <input name="website" type="url" placeholder="Personal Website / Portfolio" 
                            class="w-full pl-12 pr-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-vibrant outline-none transition-all">
                    </div>
                </div>
            </div>

            <div class="flex justify-end pt-8">
                <button type="submit" class="bg-navy hover:bg-navy-dark text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all transform hover:-translate-y-1 flex items-center space-x-3">
                    <i data-lucide="save" class="w-6 h-6"></i>
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    </div>
    `;
};

export const init = async () => {
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc, updateDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
    
    if (!auth.currentUser) return;
    
    const form = document.getElementById('profile-form');
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();

    if (userData) {
        form.displayName.value = userData.displayName || '';
        form.phoneNumber.value = userData.phoneNumber || '';
        form.bio.value = userData.bio || '';
        form.linkedin.value = userData.linkedin || '';
        form.website.value = userData.website || '';
        
        document.getElementById('profile-name-display').textContent = userData.displayName;
        document.getElementById('profile-email-display').textContent = userData.email;
        document.getElementById('profile-role-display').textContent = userData.role;
        document.getElementById('initials-avatar').textContent = (userData.displayName || 'U').charAt(0).toUpperCase();
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');

        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                displayName: form.displayName.value,
                phoneNumber: form.phoneNumber.value,
                bio: form.bio.value,
                linkedin: form.linkedin.value,
                website: form.website.value,
                updatedAt: new Date().toISOString()
            });
            if (window.showToast) window.showToast('Profile updated successfully!');
        } catch (error) {
            console.error('Update profile error:', error);
            if (window.showToast) window.showToast('Failed to update profile.', 'error');
        } finally {
            loader?.classList.add('hidden');
        }
    });

    if (window.lucide) window.lucide.createIcons();
};
