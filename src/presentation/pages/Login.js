/**
 * Login page component with Advanced Auth.
 */

export const render = async () => {
    return `
    <div class="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50">
        <div class="max-w-md w-full space-y-10 bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-navy via-vibrant to-navy"></div>
            
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-navy rounded-3xl mb-8 shadow-2xl transform hover:rotate-12 transition-transform">
                    <i data-lucide="log-in" class="text-white w-10 h-10"></i>
                </div>
                <h2 class="text-4xl font-black text-navy tracking-tight">Welcome Back</h2>
                <p class="mt-3 text-gray-500 font-medium">
                    New here? 
                    <a href="#/register" class="font-black text-vibrant hover:underline transition-all">Create Account</a>
                </p>
            </div>
            
            <form id="login-form" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-black text-navy uppercase tracking-widest mb-3">Email Address</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-vibrant transition-colors">
                                <i data-lucide="mail" class="w-5 h-5"></i>
                            </div>
                            <input id="email" name="email" type="email" required 
                                class="appearance-none block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl placeholder-gray-400 focus:outline-none focus:border-navy focus:ring-0 transition-all font-bold text-navy" 
                                placeholder="you@example.com">
                        </div>
                    </div>
                    
                    <div id="password-field">
                        <div class="flex justify-between items-center mb-3">
                            <label for="password" class="block text-sm font-black text-navy uppercase tracking-widest">Password</label>
                            <button type="button" onclick="handleForgotPassword()" class="text-xs font-black text-vibrant hover:underline uppercase tracking-widest">Forgot?</button>
                        </div>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-vibrant transition-colors">
                                <i data-lucide="lock" class="w-5 h-5"></i>
                            </div>
                            <input id="password" name="password" type="password" 
                                class="appearance-none block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl placeholder-gray-400 focus:outline-none focus:border-navy focus:ring-0 transition-all font-bold text-navy" 
                                placeholder="••••••••">
                        </div>
                        <p class="mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                            <i data-lucide="info" class="w-3 h-3 inline mr-1 text-vibrant"></i>
                            Leave password empty for passwordless login.
                        </p>
                    </div>
                </div>

                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-5 w-5 text-navy focus:ring-navy border-gray-300 rounded-lg cursor-pointer">
                    <label for="remember-me" class="ml-3 block text-sm text-gray-600 font-bold cursor-pointer">Stay signed in</label>
                </div>

                <button type="submit" class="w-full flex justify-center py-5 px-4 bg-navy text-white text-lg font-black rounded-2xl shadow-xl hover:bg-navy-dark transition-all transform hover:-translate-y-1 active:scale-95">
                    Sign In to Portal
                </button>
                
                <div id="login-error" class="hidden text-red-500 text-xs text-center font-bold bg-red-50 p-4 rounded-xl border border-red-100 uppercase tracking-wide"></div>
            </form>
        </div>
    </div>
    `;
};

export const init = () => {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    // Handle "Remember Me" initial check
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail && form) {
        form.email.value = savedEmail;
        form['remember-me'].checked = true;
    }

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        const rememberMe = form['remember-me'].checked;
        
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');
        errorDiv?.classList.add('hidden');

        try {
            const { auth } = await import('../../core/firebase-config.js');
            const { signInWithEmailAndPassword, sendSignInLinkToEmail } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
            
            if (rememberMe) {
                localStorage.setItem('remembered_email', email);
            } else {
                localStorage.removeItem('remembered_email');
            }

            if (!password) {
                // Passwordless Login
                const actionCodeSettings = {
                    url: window.location.origin + '/#/login-callback',
                    handleCodeInApp: true,
                };
                await sendSignInLinkToEmail(auth, email, actionCodeSettings);
                window.localStorage.setItem('emailForSignIn', email);
                if (window.showToast) window.showToast('Sign-in link sent to your email!', 'success');
                errorDiv.textContent = 'Sign-in link sent! Check your inbox.';
                errorDiv.classList.replace('text-red-500', 'text-green-600');
                errorDiv.classList.replace('bg-red-50', 'bg-green-50');
                errorDiv.classList.replace('border-red-100', 'border-green-100');
                errorDiv.classList.remove('hidden');
            } else {
                // Password Login
                await signInWithEmailAndPassword(auth, email, password);
                if (window.showToast) window.showToast('Successfully logged in!', 'success');
                window.location.hash = '#/dashboard';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Authentication failed. Please check your credentials.';
            errorDiv.classList.replace('text-green-600', 'text-red-500');
            errorDiv.classList.replace('bg-green-50', 'bg-red-50');
            errorDiv.classList.replace('border-green-100', 'border-red-100');
            errorDiv?.classList.remove('hidden');
            if (window.showToast) window.showToast('Login failed.', 'error');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};

window.handleForgotPassword = async () => {
    const email = document.getElementById('email').value;
    if (!email) {
        if (window.showToast) window.showToast('Enter your email first.', 'error');
        return;
    }

    try {
        const { auth } = await import('../../core/firebase-config.js');
        const { sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
        await sendPasswordResetEmail(auth, email);
        if (window.showToast) window.showToast('Reset email sent!', 'success');
    } catch (error) {
        if (window.showToast) window.showToast('Failed to send reset email.', 'error');
    }
};
