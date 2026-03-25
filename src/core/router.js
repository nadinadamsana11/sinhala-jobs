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
    '/talent-search': 'TalentSearch',
    '/categories': 'Categories',
    '/category/:id': 'CategoryDetails', // Dynamic route
    '/privacy': 'Privacy',
    '/terms': 'Terms',
    '/cookies': 'Cookies',
    '/coming-soon': 'ComingSoon'
};

const router = {
    init() {
        window.addEventListener('hashchange', () => this.resolve());
        this.resolve();
    },

    async resolve() {
        let hash = window.location.hash.slice(1) || '/';
        let [path, queryString] = hash.split('?');
        
        let pageName = routes[path];
        let params = {};

        // Handle dynamic routes (like /category/:id)
        if (!pageName) {
            for (const route in routes) {
                if (route.includes(':')) {
                    const routeParts = route.split('/');
                    const pathParts = path.split('/');
                    if (routeParts.length === pathParts.length) {
                        let match = true;
                        for (let i = 0; i < routeParts.length; i++) {
                            if (routeParts[i].startsWith(':')) {
                                params[routeParts[i].slice(1)] = pathParts[i];
                            } else if (routeParts[i] !== pathParts[i]) {
                                match = false;
                                break;
                            }
                        }
                        if (match) {
                            pageName = routes[route];
                            break;
                        }
                    }
                }
            }
        }

        pageName = pageName || 'NotFound';
        
        try {
            const module = await import(`../presentation/pages/${pageName}.js`);
            const app = document.getElementById('app');
            
            // Pass params to the render/init if needed
            window.routeParams = params;

            app.innerHTML = await module.render();
            if (module.init) module.init();
            
            if (window.lucide) window.lucide.createIcons();
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Routing error:', error);
            this.handle404();
        }
    },

    async handle404() {
        const module = await import('../presentation/pages/NotFound.js');
        const app = document.getElementById('app');
        app.innerHTML = await module.render();
        if (window.lucide) window.lucide.createIcons();
        
        setTimeout(() => {
            window.location.hash = '#/';
        }, 5000);
    }
};

export { router };
