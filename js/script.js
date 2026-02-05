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

    /* --- Formspree AJAX Submission --- */
    // Βρίσκουμε τη φόρμα με βάση το ID
    const form = document.getElementById("my-form");

    if (form) { // Έλεγχος ότι βρισκόμαστε στη σελίδα contact
    
        async function handleSubmit(event) {
            event.preventDefault(); // Σταματάμε την κανονική αποστολή (για να μην κάνει reload)
        
            const status = document.getElementById("form-status");
            const errorMsg = document.getElementById("form-error");
            const submitBtn = document.getElementById("submit-btn");
            const originalBtnText = submitBtn.innerHTML;

            // Αλλάζουμε το κείμενο του κουμπιού για να δείξουμε ότι κάτι γίνεται
            submitBtn.innerHTML = "Αποστολή...";
            submitBtn.disabled = true; // Απενεργοποίηση για να μην πατήσει 2 φορές
        
            const data = new FormData(event.target);

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // ΕΠΙΤΥΧΙΑ!
                    // Κρύβουμε τη φόρμα
                    form.style.display = "none";
                    // Εμφανίζουμε το μήνυμα επιτυχίας
                    status.style.display = "block";
                
                // ΠΡΟΑΙΡΕΤΙΚΑ: Αν θες παρόλα αυτά να τον πας στο thank-you.html,
                // σβήσε τις 2 από πάνω γραμμές και βάλε μόνο αυτό:
                // window.location.href = "thank-you.html";
                
                } else {
                    // ΛΑΘΟΣ από το server
                    const jsonData = await response.json();
                    if (Object.hasOwn(jsonData, 'errors')) {
                        errorMsg.textContent = jsonData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        errorMsg.textContent = "Υπήρξε ένα πρόβλημα κατά την αποστολή. Δοκιμάστε ξανά.";
                    }
                    errorMsg.style.display = "block";
                    // Επαναφορά κουμπιού
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                // ΛΑΘΟΣ δικτύου
                errorMsg.textContent = "Πρόβλημα σύνδεσης. Ελέγξτε το ίντερνετ σας.";
                errorMsg.style.display = "block";
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }

        form.addEventListener("submit", handleSubmit);
    }

});