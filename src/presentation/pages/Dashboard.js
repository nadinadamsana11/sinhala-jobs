/**
 * Dashboard page component.
 * Acts as a router for different user roles.
 */

export const render = async () => {
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');

    if (!auth.currentUser) {
        window.location.hash = '#/login';
        return '';
    }

    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();

    if (userData?.role === 'company') {
        const module = await import('./CompanyDashboard.js');
        return await module.render(userData);
    } else {
        const module = await import('./CandidateDashboard.js');
        return await module.render(userData);
    }
};

export const init = async () => {
    const { auth, db } = await import('../../core/firebase-config.js');
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js');
    
    if (!auth.currentUser) return;
    
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();

    if (userData?.role === 'company') {
        const module = await import('./CompanyDashboard.js');
        if (module.init) module.init(userData);
    } else {
        const module = await import('./CandidateDashboard.js');
        if (module.init) module.init(userData);
    }
};
