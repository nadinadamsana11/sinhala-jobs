/**
 * Login page component.
 */

export const render = async () => {
    return `
    <div class="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-navy rounded-2xl mb-6 shadow-lg">
                    <i data-lucide="log-in" class="text-white w-8 h-8"></i>
                </div>
                <h2 class="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                <p class="mt-2 text-sm text-gray-500">
                    Don't have an account? 
                    <a href="#/register" class="font-bold text-vibrant hover:text-vibrant-dark transition-colors">Create one for free</a>
                </p>
            </div>
            
            <form id="login-form" class="mt-8 space-y-6">
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <i data-lucide="mail" class="w-5 h-5"></i>
                            </div>
                            <input id="email" name="email" type="email" autocomplete="email" required 
                                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all" 
                                placeholder="you@example.com">
                        </div>
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <i data-lucide="lock" class="w-5 h-5"></i>
                            </div>
                            <input id="password" name="password" type="password" autocomplete="current-password" required 
                                class="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all" 
                                placeholder="••••••••">
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded cursor-pointer">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-600 cursor-pointer">Remember me</label>
                    </div>
                    <div class="text-sm">
                        <a href="#" class="font-semibold text-navy hover:text-navy-light transition-colors">Forgot password?</a>
                    </div>
                </div>

                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-xl text-white bg-navy hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Sign In
                    </button>
                </div>
                
                <div id="login-error" class="hidden text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100 italic"></div>
            </form>
        </div>
    </div>
    `;
};

export const init = () => {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        
        const loader = document.getElementById('loader');
        loader?.classList.remove('hidden');
        errorDiv?.classList.add('hidden');

        try {
            const { auth } = await import('../../core/firebase-config.js');
            const { signInWithEmailAndPassword } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js');
            
            await signInWithEmailAndPassword(auth, email, password);
            window.location.hash = '#/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            errorDiv.textContent = 'Invalid email or password. Please try again.';
            errorDiv?.classList.remove('hidden');
        } finally {
            loader?.classList.add('hidden');
        }
    });
};
