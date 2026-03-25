/**
 * Coming Soon page component.
 */

export const render = async () => {
    return `
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20">
        <div class="text-center space-y-8 animate-pulse">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-vibrant/20 rounded-full mb-6">
                <i data-lucide="sparkles" class="text-vibrant w-12 h-12"></i>
            </div>
            <h1 class="text-6xl font-black text-navy tracking-tighter italic">Coming Soon</h1>
            <p class="text-xl text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
                We're building something amazing! This feature is currently under development to provide you with the best experience.
            </p>
            <div class="flex flex-wrap justify-center gap-4 pt-8">
                <a href="#/" class="bg-navy text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-navy-dark transition-all transform hover:-translate-y-1">Go Back Home</a>
            </div>
        </div>
    </div>
    `;
};
