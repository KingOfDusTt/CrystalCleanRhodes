// Περιμένουμε να φορτώσει όλη η σελίδα
document.addEventListener('DOMContentLoaded', () => {
    
    // Επιλογή των στοιχείων
    const mobileBtn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    // Όταν κάποιος πατάει το burger μενού
    mobileBtn.addEventListener('click', () => {
        // Εμφάνιση/Απόκρυψη του μενού προσθέτοντας μια κλάση στο CSS
        nav.classList.toggle('active');
        
        // Αλλαγή του εικονιδίου από γραμμές (bars) σε Χ (times)
        const icon = mobileBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});