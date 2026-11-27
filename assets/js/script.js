document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       1. NAVBAR SCROLL EFFECT
       ========================================= */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }

        });

    }


    /* =========================================
       2. MOBILE NAVBAR
       ========================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");

    const navbarCollapse =
        document.querySelector(".navbar-collapse");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {

                const toggleButton =
                    document.querySelector(".navbar-toggler");

                if (toggleButton) {
                    toggleButton.click();
                }

            }

        });

    });


    /* =========================================
       3. SMOOTH SCROLL
       ========================================= */

    const smoothLinks =
        document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       4. SCROLL ANIMATION
       ========================================= */

    const animatedItems =
        document.querySelectorAll(
            ".category-card, .product-card, .why-card"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show-element"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        animatedItems.forEach(function (item) {

            item.classList.add(
                "hidden-element"
            );

            observer.observe(item);

        });

    } else {

        animatedItems.forEach(function (item) {

            item.classList.add(
                "show-element"
            );

        });

    }


    /* =========================================
       5. ADD TO CART
       ========================================= */

    const productButtons =
        document.querySelectorAll(".product-btn");

    let cartCount = 0;


    productButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            cartCount++;

            const oldText =
                button.innerHTML;

            button.innerHTML =
                '<i class="bi bi-check-circle"></i> Added';

            button.classList.add("added");


            showNotification(
                "Product added to cart!"
            );


            setTimeout(function () {

                button.innerHTML =
                    oldText;

                button.classList.remove(
                    "added"
                );

            }, 1500);

        });

    });


    /* =========================================
       6. NOTIFICATION
       ========================================= */

    function showNotification(message) {

        const oldNotification =
            document.querySelector(
                ".cart-notification"
            );


        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            "cart-notification";


        notification.innerHTML =
            '<i class="bi bi-check-circle-fill"></i>' +
            '<span>' +
            message +
            '</span>';


        document.body.appendChild(
            notification
        );


        setTimeout(function () {

            notification.classList.add(
                "hide"
            );

        }, 2000);


        setTimeout(function () {

            if (notification) {
                notification.remove();
            }

        }, 2500);

    }


    /* =========================================
       7. CATEGORY CARD EFFECT
       ========================================= */

    const categoryCards =
        document.querySelectorAll(
            ".category-card"
        );


    categoryCards.forEach(function (card) {

        card.addEventListener("click", function () {

            card.classList.add(
                "category-click"
            );


            setTimeout(function () {

                card.classList.remove(
                    "category-click"
                );

            }, 200);

        });

    });


    /* =========================================
       8. CURRENT YEAR
       ========================================= */

    const footerText =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerText) {

        const currentYear =
            new Date().getFullYear();


        footerText.textContent =
            "© " +
            currentYear +
            " FreshMart Supermarket. All Rights Reserved.";

    }


    /* =========================================
       9. BACK TO TOP
       ========================================= */

    const backToTop =
        document.createElement("button");


    backToTop.className =
        "back-to-top";


    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    backToTop.innerHTML =
        '<i class="bi bi-arrow-up"></i>';


    document.body.appendChild(
        backToTop
    );


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add(
                "active"
            );

        } else {

            backToTop.classList.remove(
                "active"
            );

        }

    });


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================================
       10. HERO ANIMATION
       ========================================= */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    if (heroContent) {

        setTimeout(function () {

            heroContent.classList.add(
                "hero-loaded"
            );

        }, 100);

    }


    /* =========================================
       11. CONTACT FORM
       GOOGLE SHEETS SUBMISSION
       ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const submitButton =
                    contactForm.querySelector(
                        ".submit-btn"
                    );


                if (!submitButton) {
                    return;
                }


                const originalText =
                    submitButton.innerHTML;


                submitButton.disabled = true;


                submitButton.innerHTML = `
                    Sending...
                    <i class="bi bi-arrow-repeat"></i>
                `;


                const formData =
                    new FormData(
                        contactForm
                    );


                try {

                    await fetch(
                        "https://script.google.com/macros/s/AKfycbysN2n9LyfGCPUS4_ArzRMJAYXqLYySAk-zwLTDij3s1CqWIv4pGVR_ZczTrtMudbf5/exec",
                        {
                            method: "POST",
                            body: formData,
                            mode: "no-cors"
                        }
                    );


                    /* -------------------------
                       SUCCESS
                    ------------------------- */

                    alert(
                        "Your message has been submitted successfully!"
                    );


                    contactForm.reset();


                } catch (error) {

                    console.error(
                        "Contact Form Error:",
                        error
                    );


                    alert(
                        "Sorry, your message could not be sent. Please try again."
                    );

                }


                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalText;

            }
        );

    }


});



