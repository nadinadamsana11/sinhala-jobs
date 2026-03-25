/**
 * Cookie Policy page component.
 */

export const render = async () => {
    return `
    <div class="bg-gray-50 py-20 px-4">
        <div class="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] shadow-xl border border-gray-100">
            <h1 class="text-5xl font-black text-navy mb-8 italic">Cookie Policy</h1>
            <p class="text-gray-400 font-bold uppercase tracking-widest text-xs mb-12">Last Updated: March 2025</p>
            
            <div class="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8 font-medium">
                <section>
                    <h2 class="text-2xl font-black text-navy mb-4">1. What are Cookies?</h2>
                    <p>Cookies are small text files stored on your device to help websites work efficiently and provide us with information about how you use our site.</p>
                </section>
                
                <section>
                    <h2 class="text-2xl font-black text-navy mb-4">2. How we use Cookies</h2>
                    <p>We use cookies to maintain your session (like "Remember Me"), analyze our traffic, and personalize your experience.</p>
                </section>
            </div>
            
            <div class="mt-16 pt-10 border-t border-gray-100 text-center">
                <a href="#/" class="bg-navy text-white px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-navy-dark transition-all inline-block">Back to Home</a>
            </div>
        </div>
    </div>
    `;
};
