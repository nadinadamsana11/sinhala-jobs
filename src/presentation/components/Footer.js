/**
 * Footer component.
 */

export const Footer = () => {
    return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div class="space-y-8">
                <div class="flex items-center space-x-3">
                    <div class="bg-vibrant p-2 rounded-xl">
                        <i data-lucide="briefcase" class="text-white w-6 h-6"></i>
                    </div>
                    <span class="text-3xl font-black tracking-tighter">Sinhala<span class="text-vibrant">Jobs</span></span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed font-medium">
                    Sri Lanka's premier job portal connecting top talent with leading companies directly. Empowering careers across the island with transparency and speed.
                </p>
                <div class="flex space-x-5 pt-2">
                    <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-vibrant hover:text-white transition-all"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-vibrant hover:text-white transition-all"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:bg-vibrant hover:text-white transition-all"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-black mb-8 text-white uppercase tracking-widest text-xs">For Candidates</h3>
                <ul class="space-y-5 text-gray-400 text-sm font-bold">
                    <li><a href="#/jobs" class="hover:text-vibrant transition-colors">Browse Jobs</a></li>
                    <li><a href="#/categories" class="hover:text-vibrant transition-colors">Job Categories</a></li>
                    <li><a href="#/coming-soon" class="hover:text-vibrant transition-colors">Job Alerts</a></li>
                    <li><a href="#/coming-soon" class="hover:text-vibrant transition-colors">Career Advice</a></li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-lg font-black mb-8 text-white uppercase tracking-widest text-xs">For Employers</h3>
                <ul class="space-y-5 text-gray-400 text-sm font-bold">
                    <li><a href="#/post-job" class="hover:text-vibrant transition-colors">Post a Job</a></li>
                    <li><a href="#/talent-search" class="hover:text-vibrant transition-colors">Talent Search</a></li>
                    <li><a href="#/coming-soon" class="hover:text-vibrant transition-colors">Hiring Solutions</a></li>
                    <li><a href="#/coming-soon" class="hover:text-vibrant transition-colors">Pricing</a></li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-lg font-black mb-8 text-white uppercase tracking-widest text-xs">Quick Support</h3>
                <ul class="space-y-5 text-gray-400 text-sm font-bold">
                    <li class="flex items-center space-x-4 group cursor-pointer">
                        <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-vibrant/20 transition-colors">
                            <i data-lucide="mail" class="w-5 h-5 text-vibrant"></i>
                        </div>
                        <span class="group-hover:text-white transition-colors">support@sinhalajobs.lk</span>
                    </li>
                    <li class="flex items-center space-x-4 group cursor-pointer">
                        <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-vibrant/20 transition-colors">
                            <i data-lucide="phone" class="w-5 h-5 text-vibrant"></i>
                        </div>
                        <span class="group-hover:text-white transition-colors">+94 11 234 5678</span>
                    </li>
                    <li class="flex items-start space-x-4 group cursor-default pt-4 border-t border-white/5">
                        <div class="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                            <i data-lucide="map-pin" class="w-5 h-5 text-vibrant"></i>
                        </div>
                        <span class="text-gray-400 mt-2 font-black">Horana, Sri Lanka</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-white/5 pt-10 pb-10 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">
            <p>&copy; 2025 Sinhala Jobs (Pvt) Ltd. All Rights Reserved.</p>
            <div class="flex flex-wrap justify-center gap-x-10 gap-y-4">
                <a href="#/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#/terms" class="hover:text-white transition-colors">Terms of Service</a>
                <a href="#/cookies" class="hover:text-white transition-colors">Cookie Policy</a>
            </div>
        </div>
    </div>
    `;
};
