/**
 * Register page component with Password Strength Validation.
 */

export const render = async () => {
    return `
    <div class="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-gray-50">
        <div class="max-w-xl w-full space-y-10 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
             <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vibrant via-navy to-vibrant"></div>
             
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-vibrant rounded-3xl mb-8 shadow-2xl transform -rotate-6 transition-transform">
                    <i data-lucide="user-plus" class="text-white w-10 h-10"></i>
                </div>
                <h2 class="text-4xl font-black text-navy tracking-tight">Create Account</h2>
                <p class="mt-3 text-gray-500 font-medium">
                    Already a member? 
                    <a href="#/login" class="font-black text-navy hover:underline transition-all">Sign in here</a>
                </p>
            </div>
            
            <form id="register-form" class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label for="fullname" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Full Name</label>
                        <input id="fullname" name="fullname" type="text" required 
                            class="appearance-none block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none transition-all font-bold text-navy" 
                            placeholder="John Doe">
                    </div>
                    <div>
                        <label for="role" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">I am a...</label>
                        <select id="role" name="role" required 
                            class="appearance-none block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl text-navy font-bold focus:ring-0 focus:border-vibrant outline-none transition-all cursor-pointer">
                            <option value="candidate">Job Seeker</option>
                            <option value="company">Employer / Company</option>
                        </select>
                    </div>
                </div>

                <div class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Email Address</label>
                        <input id="email" name="email" type="email" autocomplete="email" required 
                            class="appearance-none block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none transition-all font-bold text-navy" 
                            placeholder="you@example.com">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Password</label>
                        <input id="password" name="password" type="password" autocomplete="new-password" required 
                            onkeyup="checkPasswordStrength(this.value)"
                            class="appearance-none block w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none transition-all font-bold text-navy" 
                            placeholder="Min. 8 characters">
                        
                        <!-- Strength Meter -->
                        <div class="mt-3">
                            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div id="strength-meter" class="h-full w-0 transition-all duration-500 bg-red-500"></div>
                            </div>
                            <div class="flex justify-between items-center mt-2">
                                <span id="strength-text" class="text-[10px] font-black uppercase tracking-widest text-gray-400">Enter password</span>
                                <span class="text-[10px] text-gray-400 font-bold italic">Rule: 8+ chars, numbers & symbols</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-start">
                    <div class="flex items-center h-6">
                        <input id="terms" name="terms" type="checkbox" required class="h-5 w-5 text-vibrant focus:ring-vibrant border-gray-300 rounded-lg cursor-pointer">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="text-gray-600 font-bold">I agree to the <a href="#/terms" class="text-navy underline">Terms of Service</a> and <a href="#/privacy" class="text-navy underline">Privacy Policy</a>.</label>
                    </div>
                </div>

                <button type="submit" id="reg-submit-btn" class="w-full flex justify-center py-5 px-4 bg-vibrant text-white text-lg font-black rounded-2xl shadow-xl hover:bg-vibrant-dark transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                    Create My Account
                </button>
                
                <div id="register-error" class="hidden text-red-500 text-xs text-center font-bold bg-red-50 p-4 rounded-xl border border-red-100 uppercase tracking-wide"></div>
            </form>
        </div>
    </div>
    `;
};

window.checkPasswordStrength = (pwd) => {
    const meter = document.getElementById('strength-meter');
    const text = document.getElementById('strength-text');
    const btn = document.getElementById('reg-submit-btn');
    
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25;

    meter.style.width = strength + '%';
    
    if (strength === 0) {
        meter.className = 'h-full bg-red-500 transition-all';
        text.textContent = 'Too weak';
        text.className = 'text-[10px] font-black uppercase tracking-widest text-red-500';
        btn.disabled = true;
    } else if (strength <= 50) {
        meter.className = 'h-full bg-yellow-500 transition-all';
        text.textContent = 'Weak';
        text.className = 'text-[10px] font-black uppercase tracking-widest text-yellow-500';
        btn.disabled = true;
    } else if (strength <= 75) {
        meter.className = 'h-full bg-blue-500 transition-all';
        text.textContent = 'Medium';
        text.className = 'text-[10px] font-black uppercase tracking-widest text-blue-500';
        btn.disabled = false;
    } else {
        meter.className = 'h-full bg-green-500 transition-all';
        text.textContent = 'Strong';
        text.className = 'text-[10px] font-black uppercase tracking-widest text-green-500';
        btn.disabled = false;
    }
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

            if (window.showToast) window.showToast(`Welcome to the team, ${fullname}!`, 'success');
            window.location.hash = '#/dashboard';
        } catch (error) {
            console.error('Registration error:', error);
            errorDiv.textContent = error.message.replace('Firebase: ', '');
            errorDiv?.classList.remove('hidden');
            if (window.showToast) window.showToast('Registration failed.', 'error');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};
