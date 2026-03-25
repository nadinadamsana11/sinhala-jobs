/**
 * Simple router for SPA behavior using window.location.hash.
 */

const routes = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/dashboard': 'Dashboard',
    '/post-job': 'PostJob',
    '/jobs': 'JobList',
    '/profile': 'Profile',
    '/job-details': 'JobDetails',
    '/talent-search': 'TalentSearch'
};

const router = {
    init() {
        window.addEventListener('hashchange', () => this.resolve());
        this.resolve();
    },

    async resolve() {
        let path = window.location.hash.slice(1) || '/';
        
        // Basic path matching (could be improved with regex for params)
        const pageName = routes[path] || 'NotFound';
        
        try {
            const module = await import(`../presentation/pages/${pageName}.js`);
            const app = document.getElementById('app');
            app.innerHTML = await module.render();
            if (module.init) module.init();
            
            // Re-initialize Lucide icons for new content
            if (window.lucide) {
                window.lucide.createIcons();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Routing error:', error);
            document.getElementById('app').innerHTML = `
                <div class="h-screen flex flex-col items-center justify-center p-4">
                    <h1 class="text-4xl font-bold text-navy mb-4">404</h1>
                    <p class="text-gray-600 mb-8">Page not found</p>
                    <a href="#" class="bg-navy text-white px-6 py-2 rounded-full">Go Home</a>
                </div>
            `;
        }
    },

    navigate(path) {
        window.location.hash = path;
    }
};

export { router };
