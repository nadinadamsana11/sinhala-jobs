/**
 * Register page component: Multi-step Wizard.
 */

export const render = async () => {
    return `
    <div class="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-gray-50">
        <div class="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vibrant via-navy to-vibrant"></div>
            
            <div class="p-12 space-y-10">
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
                
                <!-- Stepper -->
                <div class="flex items-center justify-center space-x-4 mb-8">
                    <div id="step-1-dot" class="w-12 h-3 rounded-full bg-navy transition-colors"></div>
                    <div id="step-2-dot" class="w-12 h-3 rounded-full bg-gray-200 transition-colors"></div>
                    <div id="step-3-dot" class="w-12 h-3 rounded-full bg-gray-200 transition-colors"></div>
                </div>

                <form id="register-wizard" class="relative min-h-[400px]">
                    <!-- Step 1: Role -->
                    <div id="step-1" class="absolute inset-0 transition-all duration-500 transform translate-x-0 opacity-100 bg-white">
                        <h3 class="text-2xl font-black text-navy mb-8 text-center italic">What are you looking for?</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label class="cursor-pointer group relative">
                                <input type="radio" name="role" value="candidate" class="peer hidden" checked>
                                <div class="p-8 border-4 border-gray-100 rounded-3xl peer-checked:border-vibrant peer-checked:bg-vibrant/5 hover:border-vibrant/50 transition-all text-center h-full flex flex-col items-center justify-center space-y-4 shadow-sm peer-checked:shadow-xl">
                                    <div class="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-vibrant/20 transition-colors peer-checked:bg-vibrant/20">
                                        <i data-lucide="user" class="w-8 h-8 text-navy peer-checked:text-vibrant"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-xl font-black text-navy">Find a Job</h4>
                                        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Job Seeker</p>
                                    </div>
                                    <div class="absolute top-4 right-4 text-vibrant opacity-0 peer-checked:opacity-100 transition-opacity">
                                        <i data-lucide="check-circle-2" class="w-6 h-6"></i>
                                    </div>
                                </div>
                            </label>
                            
                            <label class="cursor-pointer group relative">
                                <input type="radio" name="role" value="company" class="peer hidden">
                                <div class="p-8 border-4 border-gray-100 rounded-3xl peer-checked:border-navy peer-checked:bg-navy/5 hover:border-navy/50 transition-all text-center h-full flex flex-col items-center justify-center space-y-4 shadow-sm peer-checked:shadow-xl">
                                    <div class="w-16 h-16 bg-vibrant/5 rounded-full flex items-center justify-center group-hover:bg-navy/20 transition-colors peer-checked:bg-navy/20">
                                        <i data-lucide="building-2" class="w-8 h-8 text-vibrant peer-checked:text-navy"></i>
                                    </div>
                                    <div>
                                        <h4 class="text-xl font-black text-navy">Hire Talent</h4>
                                        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Employer / Company</p>
                                    </div>
                                    <div class="absolute top-4 right-4 text-navy opacity-0 peer-checked:opacity-100 transition-opacity">
                                        <i data-lucide="check-circle-2" class="w-6 h-6"></i>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div class="mt-12 text-right">
                            <button type="button" onclick="window.nextStep(2)" class="bg-navy text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-navy-dark transition-all inline-flex items-center space-x-2">
                                <span>Continue</span>
                                <i data-lucide="arrow-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Step 2: Account Details -->
                    <div id="step-2" class="absolute inset-0 transition-all duration-500 transform translate-x-full opacity-0 invisible bg-white">
                        <h3 class="text-2xl font-black text-navy mb-8 text-center italic">Account Details</h3>
                        <div class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Email Address</label>
                                <input id="email" name="email" type="email" autocomplete="email" 
                                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none transition-all font-bold text-navy" 
                                    placeholder="you@example.com">
                                <p id="email-error" class="hidden text-xs text-red-500 font-bold mt-2">Valid email required.</p>
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Password</label>
                                <input id="password" name="password" type="password" autocomplete="new-password" 
                                    onkeyup="checkPasswordStrength(this.value)"
                                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none transition-all font-bold text-navy" 
                                    placeholder="Min. 8 characters">
                                
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
                        <div class="mt-12 flex justify-between">
                            <button type="button" onclick="window.prevStep(1)" class="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all">Back</button>
                            <button type="button" id="step2-next-btn" onclick="window.nextStep(3)" class="bg-navy text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-navy-dark transition-all disabled:opacity-50 inline-flex items-center space-x-2" disabled>
                                <span>Continue</span>
                                <i data-lucide="arrow-right" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Step 3: Profile Setup -->
                    <div id="step-3" class="absolute inset-0 transition-all duration-500 transform translate-x-full opacity-0 invisible bg-white">
                        <h3 class="text-2xl font-black text-navy mb-8 text-center italic" id="step3-title">Profile Setup</h3>
                        
                        <div class="space-y-6 overflow-y-auto max-h-[300px] pr-2 pb-4">
                            <!-- Dynamic fields based on role -->
                            <div id="dynamic-profile-fields"></div>

                            <div class="flex items-start pt-4">
                                <div class="flex items-center h-6">
                                    <input id="terms" name="terms" type="checkbox" required class="h-5 w-5 text-vibrant focus:ring-vibrant border-gray-300 rounded-lg cursor-pointer">
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="text-gray-600 font-bold">I agree to the <a href="#/terms" class="text-navy underline">Terms of Service</a> and <a href="#/privacy" class="text-navy underline">Privacy Policy</a>.</label>
                                </div>
                            </div>
                        </div>

                        <div class="mt-10 flex justify-between">
                            <button type="button" onclick="window.prevStep(2)" class="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black hover:bg-gray-200 transition-all">Back</button>
                            <button type="submit" id="reg-submit-btn" class="bg-vibrant text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-vibrant-dark transition-all flex items-center space-x-2">
                                <span>Complete Sign Up</span>
                                <i data-lucide="check" class="w-5 h-5"></i>
                            </button>
                        </div>
                        
                        <div id="register-error" class="hidden mt-4 text-red-500 text-xs text-center font-bold bg-red-50 p-4 rounded-xl border border-red-100 uppercase tracking-wide"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};

window.checkPasswordStrength = (pwd) => {
    const meter = document.getElementById('strength-meter');
    const text = document.getElementById('strength-text');
    const btn = document.getElementById('step2-next-btn');
    
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

window.nextStep = (step) => {
    // Validate Step 1 -> 2
    if (step === 2) {
        // Automatically handled by radio buttons
    }
    
    // Validate Step 2 -> 3
    if (step === 3) {
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
             document.getElementById('email-error').classList.remove('hidden');
             return;
        } else {
             document.getElementById('email-error').classList.add('hidden');
        }
        
        // Setup dynamic profile fields based on role
        const role = document.querySelector('input[name="role"]:checked').value;
        setupProfileFields(role);
    }

    // Hide all
    for(let i=1; i<=3; i++) {
        const el = document.getElementById(`step-${i}`);
        el.classList.add('translate-x-full', 'opacity-0', 'invisible');
        el.classList.remove('translate-x-0', 'opacity-100');
        el.classList.remove('-translate-x-full'); // clear left state
    }

    // Show current
    const current = document.getElementById(`step-${step}`);
    current.classList.remove('translate-x-full', 'opacity-0', 'invisible');
    current.classList.add('translate-x-0', 'opacity-100');

    // Move previous to left
    for(let i=1; i<step; i++) {
        const prev = document.getElementById(`step-${i}`);
        prev.classList.add('-translate-x-full');
    }

    // Update dots
    for(let i=1; i<=3; i++) {
        const dot = document.getElementById(`step-${i}-dot`);
        if (i <= step) {
             dot.classList.replace('bg-gray-200', 'bg-navy');
        } else {
             dot.classList.replace('bg-navy', 'bg-gray-200');
        }
    }
};

window.prevStep = (step) => {
    // Hide all
    for(let i=1; i<=3; i++) {
        const el = document.getElementById(`step-${i}`);
        el.classList.add('translate-x-full', 'opacity-0', 'invisible');
        el.classList.remove('translate-x-0', 'opacity-100', '-translate-x-full');
    }

    // Show current
    const current = document.getElementById(`step-${step}`);
    current.classList.remove('translate-x-full', 'opacity-0', 'invisible');
    current.classList.add('translate-x-0', 'opacity-100');

    // Move previous to left
    for(let i=1; i<step; i++) {
        const prev = document.getElementById(`step-${i}`);
        prev.classList.add('-translate-x-full');
    }

    // Update dots
    for(let i=1; i<=3; i++) {
        const dot = document.getElementById(`step-${i}-dot`);
        if (i <= step) {
             dot.classList.replace('bg-gray-200', 'bg-navy');
        } else {
             dot.classList.replace('bg-navy', 'bg-gray-200');
        }
    }
};

const setupProfileFields = (role) => {
    const container = document.getElementById('dynamic-profile-fields');
    const title = document.getElementById('step3-title');
    
    if (role === 'company') {
        title.textContent = 'Company Profile';
        container.innerHTML = `
            <div>
                <label for="displayName" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Company Name</label>
                <input id="displayName" name="displayName" type="text" required 
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-navy outline-none font-bold text-navy" 
                    placeholder="E.g. TechCorp Sri Lanka">
            </div>
            <div>
                <label for="industry" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Industry</label>
                <input id="industry" name="industry" type="text" required 
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-navy outline-none font-bold text-navy" 
                    placeholder="E.g. Software Development">
            </div>
            <div>
                <label for="bio" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Company Description</label>
                <textarea id="bio" name="bio" rows="3" required
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-navy outline-none font-bold text-navy" 
                    placeholder="Briefly describe what your company does..."></textarea>
            </div>
        `;
    } else {
        title.textContent = 'Candidate Profile';
        container.innerHTML = `
            <div>
                <label for="displayName" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Full Name</label>
                <input id="displayName" name="displayName" type="text" required 
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none font-bold text-navy" 
                    placeholder="John Doe">
            </div>
            <div>
                <label for="title" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Professional Title</label>
                <input id="title" name="title" type="text" required 
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none font-bold text-navy" 
                    placeholder="E.g. Frontend Developer">
            </div>
            <div>
                <label for="bio" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Bio / Summary</label>
                <textarea id="bio" name="bio" rows="3" required
                    class="w-full px-5 py-4 border-2 border-gray-100 rounded-2xl focus:ring-0 focus:border-vibrant outline-none font-bold text-navy" 
                    placeholder="Highlight your key skills and experience..."></textarea>
            </div>
        `;
    }
};

export const init = () => {
    const form = document.getElementById('register-wizard');
    const errorDiv = document.getElementById('register-error');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.email.value;
        const password = form.password.value;
        const role = document.querySelector('input[name="role"]:checked').value;
        const displayName = form.displayName.value;
        const bio = form.bio.value;
        const extraField = role === 'company' ? { industry: form.industry.value } : { title: form.title.value };
        
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
            await updateProfile(user, { displayName: displayName });

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: displayName,
                email: email,
                role: role,
                bio: bio,
                ...extraField,
                createdAt: new Date().toISOString()
            });

            if (window.showToast) window.showToast(`Welcome to the team, ${displayName}!`, 'success');
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
    
    if (window.lucide) window.lucide.createIcons();
};
