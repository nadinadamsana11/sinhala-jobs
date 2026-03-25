/**
 * Register page component.
 */

export const render = async () => {
    return `
    <div class="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div class="max-w-xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-vibrant rounded-2xl mb-6 shadow-lg">
                    <i data-lucide="user-plus" class="text-white w-8 h-8"></i>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900">Create Account</h2>
                <p class="mt-2 text-sm text-gray-500">
                    Already have an account? 
                    <a href="#/login" class="font-bold text-navy hover:text-navy-light transition-colors">Sign in here</a>
                </p>
            </div>
            
            <form id="register-form" class="mt-8 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="fullname" class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                        <input id="fullname" name="fullname" type="text" required 
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant focus:border-transparent transition-all" 
                            placeholder="John Doe">
                    </div>
                    <div>
                        <label for="role" class="block text-sm font-semibold text-gray-700 mb-1">I am a...</label>
                        <select id="role" name="role" required 
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-vibrant focus:border-transparent transition-all cursor-pointer">
                            <option value="candidate">Job Seeker</option>
                            <option value="company">Employer / Company</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input id="email" name="email" type="email" autocomplete="email" required 
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant focus:border-transparent transition-all" 
                            placeholder="you@example.com">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required 
                            class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vibrant focus:border-transparent transition-all" 
                            placeholder="Min. 8 characters">
                    </div>
                </div>

                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="terms" name="terms" type="checkbox" required class="h-4 w-4 text-vibrant focus:ring-vibrant border-gray-300 rounded cursor-pointer">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="text-gray-600">I agree to the <a href="#" class="text-navy font-bold">Terms of Service</a> and <a href="#" class="text-navy font-bold">Privacy Policy</a>.</label>
                    </div>
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-vibrant hover:bg-vibrant-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibrant transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Create My Account
                    </button>
                </div>
                
                <div id="register-error" class="hidden text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100 italic"></div>
            </form>
        </div>
    </div>
    `;
};

export const init = () => {
    const form = document.getElementById('register-form');
    const errorDiv = document.getElementById('register-error');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullname = form.fullname.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;
        
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');
        errorDiv?.classList.add('hidden');

        try {
            const { auth, db } = await import('../../core/firebase-config.js');
            const { createUserWithEmailAndPassword, updateProfile } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
            
            // Create user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update profile
            await updateProfile(user, { displayName: fullname });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: fullname,
                email: email,
                role: role,
                createdAt: new Date().toISOString()
            });

            window.location.hash = '#/dashboard';
        } catch (error) {
            console.error('Registration error:', error);
            errorDiv.textContent = error.message.replace('Firebase: ', '');
            errorDiv?.classList.remove('hidden');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};
