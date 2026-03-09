// Περιμένουμε να φορτώσει όλη η σελίδα
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ΛΕΙΤΟΥΡΓΙΑ MOBILE MENU ---
    const mobileBtn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. ΣΥΝΔΕΣΗ ΦΟΡΜΑΣ (FORMSPREE + MAKE.COM) ---
    const contactForm = document.getElementById("my-form");

    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault(); // Σταματάμε την κανονική αποστολή της σελίδας

            // Βρίσκουμε τα στοιχεία της οθόνης
            const status = document.getElementById("form-status");
            const errorMsg = document.getElementById("form-error");
            const submitBtn = document.getElementById("submit-btn");
            const originalBtnText = submitBtn.innerHTML;

            // Αλλάζουμε το κουμπί σε "Αποστολή..."
            submitBtn.innerHTML = "Αποστολή...";
            submitBtn.disabled = true;
            errorMsg.style.display = "none"; 

            // Μαζεύουμε τα δεδομένα της φόρμας
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            const formspreeUrl = contactForm.action; // Το link του Formspree
            const makeWebhookUrl = "https://hook.eu1.make.com/l1oir326gg217l9v91m6b8zn52uve2te"; // Το link του Make.com

            try {
                // Στέλνουμε στο Make.com "στο παρασκήνιο" (δεν περιμένουμε να τελειώσει για να προχωρήσουμε)
                fetch(makeWebhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                }).catch(err => console.log("Make.com background Info:", err));

                // Στέλνουμε στο Formspree (Το βασικό μας Email)
                const formspreeResponse = await fetch(formspreeUrl, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (formspreeResponse.ok) {
                    // ΕΠΙΤΥΧΙΑ!
                    contactForm.style.display = "none"; // Κρύβουμε τη φόρμα
                    status.style.display = "block"; // Δείχνουμε το πράσινο τικ και το μήνυμα!
                    contactForm.reset(); // Αδειάζουμε τα πεδία
                } else {
                    // Λάθος από το Formspree
                    const jsonData = await formspreeResponse.json();
                    if (Object.hasOwn(jsonData, 'errors')) {
                        errorMsg.textContent = jsonData["errors"].map(error => error["message"]).join(", ");
                    } else {
                        errorMsg.textContent = "Υπήρξε ένα πρόβλημα. Δοκιμάστε ξανά.";
                    }
                    errorMsg.style.display = "block";
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }

            } catch (error) {
                // Λάθος δικτύου (π.χ. κόπηκε το ίντερνετ του χρήστη)
                console.error("Σφάλμα:", error);
                errorMsg.textContent = "Πρόβλημα σύνδεσης. Ελέγξτε το ίντερνετ σας και δοκιμάστε ξανά.";
                errorMsg.style.display = "block";
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});