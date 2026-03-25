/**
 * NotFound page component.
 */

export const render = async () => {
    return `
    <div class="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div class="w-64 h-64 bg-navy/5 rounded-full flex items-center justify-center mb-10 relative">
            <div class="absolute inset-0 bg-vibrant/10 blur-3xl animate-pulse"></div>
            <i data-lucide="map" class="w-32 h-32 text-navy opacity-20 relative z-10"></i>
        </div>
        <h1 class="text-6xl font-black text-navy mb-4">404</h1>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Lost in the Job Market?</h2>
        <p class="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#/" class="bg-navy hover:bg-navy-dark text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl mb-4 sm:mb-0 transition-all transform hover:-translate-y-1">Go Home</a>
            <a href="#/jobs" class="bg-vibrant hover:bg-vibrant-dark text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl transition-all transform hover:-translate-y-1">Find Jobs</a>
        </div>
    </div>
    `;
};
