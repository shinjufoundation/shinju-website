function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    const menuButton = document.querySelector(".menu-toggle");

    if (!navbar) return;

    const isOpen = navbar.classList.toggle("mobile-open");

    document.body.classList.toggle("menu-open", isOpen);

    if (menuButton) {
        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    }
}

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       1. MOBILE MENU OVERLAY FIX
       Ensures the overlay exists on all pages and closes the menu
       ========================================================= */
    let overlay = document.querySelector(".menu-overlay");
    
    // If the overlay doesn't exist in the HTML (like on subpages), create it
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "menu-overlay";
        document.body.appendChild(overlay);
    }

    // Assign the close function, overriding any inline HTML onclick attributes
    overlay.onclick = function() {
        const navbar = document.querySelector(".navbar");
        if (navbar && navbar.classList.contains("mobile-open")) {
            toggleMenu();
        }
    };


    /* =========================================================
       2. REPORT FORM
       ========================================================= */
    const reportForm = document.querySelector(".report-form");

    if (reportForm) {
        reportForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you. Your report has been received.");
            reportForm.reset();
        });
    }


    /* =========================================================
       3. DONATION BUTTONS
       ========================================================= */
    const donationButtons = document.querySelectorAll(".donation-options button");
    const customAmount = document.querySelector("#customAmount");

    donationButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            
            donationButtons.forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            if (customAmount) {
                customAmount.value = button.dataset.amount;
            }
        });
    });


    /* =========================================================
       4. SCROLL ANIMATIONS
       ========================================================= */
    const workCards = document.querySelectorAll(".work-card");
    const changeSection = document.querySelector(".change-section");
    const animatedElements = [];

    workCards.forEach(function (card) {
        animatedElements.push(card);
    });

    if (changeSection) {
        animatedElements.push(changeSection);
    }

    if (animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    } else {
                        entry.target.classList.remove("is-visible");
                    }
                });
            },
            { threshold: 0.18 }
        );

        animatedElements.forEach(function (element) {
            animationObserver.observe(element);
        });
    }

});

