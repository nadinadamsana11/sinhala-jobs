/**
 * Footer component.
 */

export const Footer = () => {
    return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div class="space-y-4">
                <div class="flex items-center space-x-2">
                    <div class="bg-vibrant p-1.5 rounded-lg">
                        <i data-lucide="briefcase" class="text-white w-5 h-5"></i>
                    </div>
                    <span class="text-2xl font-bold tracking-tight">Sinhala<span class="text-vibrant">Jobs</span></span>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed">
                    Sri Lanka's premier job portal connecting top talent with leading companies directly. Empowering careers across the island.
                </p>
                <div class="flex space-x-4 pt-2">
                    <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-bold mb-6">For Candidates</h3>
                <ul class="space-y-4 text-gray-400 text-sm">
                    <li><a href="#/jobs" class="hover:text-vibrant transition-colors">Browse Jobs</a></li>
                    <li><a href="#/register" class="hover:text-vibrant transition-colors">Create Profile</a></li>
                    <li><a href="#" class="hover:text-vibrant transition-colors">Job Alerts</a></li>
                    <li><a href="#" class="hover:text-vibrant transition-colors">Career Advice</a></li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-lg font-bold mb-6">For Employers</h3>
                <ul class="space-y-4 text-gray-400 text-sm">
                    <li><a href="#/post-job" class="hover:text-vibrant transition-colors">Post a Job</a></li>
                    <li><a href="#" class="hover:text-vibrant transition-colors">Talent Search</a></li>
                    <li><a href="#" class="hover:text-vibrant transition-colors">Hiring Solutions</a></li>
                    <li><a href="#" class="hover:text-vibrant transition-colors">Pricing</a></li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-lg font-bold mb-6">Contact Us</h3>
                <ul class="space-y-4 text-gray-400 text-sm">
                    <li class="flex items-center space-x-3">
                        <i data-lucide="mail" class="w-4 h-4 text-vibrant"></i>
                        <span>support@sinhalajobs.lk</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <i data-lucide="phone" class="w-4 h-4 text-vibrant"></i>
                        <span>+94 11 234 5678</span>
                    </li>
                    <li class="flex items-center space-x-3">
                        <i data-lucide="map-pin" class="w-4 h-4 text-vibrant"></i>
                        <span>Colombo, Sri Lanka</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-xs text-center">
            <p>&copy; 2025 Sinhala Jobs (Pvt) Ltd. All Rights Reserved.</p>
            <div class="flex space-x-6">
                <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" class="hover:text-white transition-colors">Cookie Policy</a>
            </div>
        </div>
    </div>
    `;
};
