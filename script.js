/* =========================================================
   PH SAI NATH PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menu-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const scrollProgress =
        document.getElementById("scroll-progress");

    const contactForm =
        document.getElementById("contact-form");

    const formStatus =
        document.getElementById("form-status");

    const submitButton =
        document.getElementById("submit-btn-element");

    const year =
        document.getElementById("year");

    const heroPortrait =
        document.getElementById("hero-portrait");


    /* =====================================================
       YEAR
    ===================================================== */

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       GSAP
    ===================================================== */

    const gsapAvailable =
        typeof gsap !== "undefined";

    if (gsapAvailable) {

        gsap.registerPlugin(ScrollTrigger);

    }


    /* =====================================================
       LENIS SMOOTH SCROLL
    ===================================================== */

    let lenis = null;

    if (
        typeof Lenis !== "undefined" &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        lenis = new Lenis({
            duration: 1.1,
            smoothWheel: true,
            touchMultiplier: 1.2
        });

        function raf(time) {

            lenis.raf(time);

            requestAnimationFrame(raf);

        }

        requestAnimationFrame(raf);

        if (gsapAvailable) {

            lenis.on("scroll", ScrollTrigger.update);

            gsap.ticker.add((time) => {

                lenis.raf(time * 1000);

            });

            gsap.ticker.lagSmoothing(0);

        }

    }


    /* =====================================================
       ANCHOR SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                if (lenis) {

                    lenis.scrollTo(target, {
                        offset: -70,
                        duration: 1.2
                    });

                } else {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

                closeMobileMenu();

            });

        });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.add("open");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        body.classList.add("menu-open");

    }


    function closeMobileMenu() {

        if (!navMenu || !menuToggle) {
            return;
        }

        navMenu.classList.remove("open");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-open");

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.contains("open");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    let lastScroll = 0;

    function handleNavbar() {

        const currentScroll =
            window.scrollY;

        if (!navbar) {
            return;
        }

        if (currentScroll > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }


        if (
            currentScroll > lastScroll &&
            currentScroll > 300
        ) {

            navbar.classList.add("nav-hidden");

        } else {

            navbar.classList.remove("nav-hidden");

        }

        lastScroll =
            Math.max(currentScroll, 0);

    }

    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            return;
        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            `${percentage}%`;

    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    if (
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                document.documentElement
                    .style
                    .setProperty(
                        "--mouse-x",
                        `${event.clientX}px`
                    );

                document.documentElement
                    .style
                    .setProperty(
                        "--mouse-y",
                        `${event.clientY}px`
                    );

            },
            { passive: true }
        );

    }


    /* =====================================================
       HERO ANIMATION
    ===================================================== */

    if (gsapAvailable) {

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


        heroTimeline
            .from(".hero-eyebrow", {
                opacity: 0,
                y: 25,
                duration: 0.8
            })

            .from(".hero-title", {
                opacity: 0,
                y: 50,
                duration: 1
            }, "-=0.45")

            .from(".hero-description", {
                opacity: 0,
                y: 25,
                duration: 0.7
            }, "-=0.55")

            .from(".hero-actions", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.4")

            .from(".hero-meta", {
                opacity: 0,
                y: 20,
                duration: 0.6
            }, "-=0.35")

            .from(".portrait-frame", {
                opacity: 0,
                scale: 0.85,
                rotation: 8,
                duration: 1.2,
                ease: "power4.out"
            }, "-=1");

    }


    /* =====================================================
       HERO PORTRAIT FLOAT
    ===================================================== */

    if (
        gsapAvailable &&
        heroPortrait &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        gsap.to(
            heroPortrait,
            {
                y: -10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }


    /* =====================================================
       HERO MOUSE PARALLAX
    ===================================================== */

    if (
        gsapAvailable &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        const heroVisual =
            document.querySelector(".hero-visual");

        if (heroVisual) {

            heroVisual.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        heroVisual.getBoundingClientRect();

                    const x =
                        (event.clientX - rect.left) /
                        rect.width -
                        0.5;

                    const y =
                        (event.clientY - rect.top) /
                        rect.height -
                        0.5;


                    gsap.to(".portrait-frame", {
                        rotationY: x * 8,
                        rotationX: y * -8,
                        duration: 0.5,
                        ease: "power2.out"
                    });


                    gsap.to(
                        ".floating-card",
                        {
                            x: x * 15,
                            y: y * 15,
                            duration: 0.7,
                            stagger: 0.02,
                            ease: "power2.out"
                        }
                    );

                }
            );


            heroVisual.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        ".portrait-frame",
                        {
                            rotationY: 0,
                            rotationX: 0,
                            duration: 0.8,
                            ease: "power3.out"
                        }
                    );

                    gsap.to(
                        ".floating-card",
                        {
                            x: 0,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out"
                        }
                    );

                }
            );

        }

    }


    /* =====================================================
       SCROLL REVEALS
    ===================================================== */

    if (gsapAvailable) {

        gsap.utils.toArray(
            ".section-heading"
        ).forEach(element => {

            gsap.from(
                element,
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        once: true
                    },

                    opacity: 0,
                    y: 45,
                    duration: 0.9,
                    ease: "power3.out"
                }
            );

        });


        gsap.utils.toArray(
            ".about-main, .mini-card"
        ).forEach((element, index) => {

            gsap.from(
                element,
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    },

                    opacity: 0,
                    y: 45,

                    duration: 0.8,

                    delay:
                        index * 0.08,

                    ease: "power3.out"
                }
            );

        });


        gsap.utils.toArray(
            ".build-card"
        ).forEach((element, index) => {

            gsap.from(
                element,
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    },

                    opacity: 0,
                    y: 60,

                    duration: 0.9,

                    delay:
                        index * 0.1,

                    ease: "power3.out"
                }
            );

        });


        gsap.utils.toArray(
            ".skill-category"
        ).forEach((element, index) => {

            gsap.from(
                element,
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    },

                    opacity: 0,
                    y: 50,

                    duration: 0.8,

                    delay:
                        index * 0.1,

                    ease: "power3.out"
                }
            );

        });


        gsap.utils.toArray(
            ".project-card"
        ).forEach((element, index) => {

            gsap.from(
                element,
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    },

                    opacity: 0,
                    y: 60,

                    duration: 0.9,

                    delay:
                        index * 0.08,

                    ease: "power3.out"
                }
            );

        });


        gsap.from(
            ".currently-card",
            {
                scrollTrigger: {
                    trigger: ".currently-card",
                    start: "top 85%",
                    once: true
                },

                opacity: 0,
                y: 60,

                duration: 1,

                ease: "power3.out"
            }
        );


        gsap.from(
            ".contact-grid",
            {
                scrollTrigger: {
                    trigger: ".contact-grid",
                    start: "top 85%",
                    once: true
                },

                opacity: 0,
                y: 50,

                duration: 1,

                ease: "power3.out"
            }
        );

    }


    /* =====================================================
       PROJECT CARD TILT
    ===================================================== */

    if (
        window.matchMedia("(pointer: fine)").matches &&
        gsapAvailable
    ) {

        document
            .querySelectorAll(".project-card")
            .forEach(card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            (event.clientX - rect.left) /
                            rect.width -
                            0.5;

                        const y =
                            (event.clientY - rect.top) /
                            rect.height -
                            0.5;

                        gsap.to(card, {
                            rotationY: x * 3,
                            rotationX: y * -3,
                            duration: 0.35,
                            ease: "power2.out"
                        });

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(card, {
                            rotationY: 0,
                            rotationX: 0,
                            duration: 0.6,
                            ease: "power3.out"
                        });

                    }
                );

            });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    if (
        window.matchMedia("(pointer: fine)").matches &&
        gsapAvailable
    ) {

        document
            .querySelectorAll(
                ".hero-btn, .submit-btn, .social-links a"
            )
            .forEach(button => {

                button.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;

                        gsap.to(
                            button,
                            {
                                x: x * 0.08,
                                y: y * 0.08,
                                duration: 0.25,
                                ease: "power2.out"
                            }
                        );

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(
                            button,
                            {
                                x: 0,
                                y: 0,
                                duration: 0.5,
                                ease: "elastic.out(1, 0.5)"
                            }
                        );

                    }
                );

            });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (sections.length) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute(
                                "id"
                            );

                        navLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${id}`
                            );

                        });

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-20% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            observer.observe(section);

        });

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    /*
       IMPORTANT:

       Replace FORM_ENDPOINT with your actual backend/API.

       Example:

       const FORM_ENDPOINT =
           "https://your-domain.com/api/contact";

       If you don't have a backend yet, the form will
       display an instructional message instead of
       pretending the email was sent.
    */

    const FORM_ENDPOINT = "";


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                if (!formStatus || !submitButton) {
                    return;
                }


                const formData =
                    new FormData(contactForm);


                const name =
                    formData.get("name")?.trim();

                const email =
                    formData.get("email")?.trim();

                const message =
                    formData.get("message")?.trim();


                if (!name || !email || !message) {

                    showFormStatus(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;

                }


                if (!FORM_ENDPOINT) {

                    showFormStatus(
                        "The form UI is ready. Connect FORM_ENDPOINT in script.js to your email/backend service.",
                        "error"
                    );

                    return;

                }


                submitButton.classList.add(
                    "loading"
                );

                submitButton.querySelector(
                    ".btn-text"
                ).textContent = "SENDING...";


                try {

                    const response =
                        await fetch(
                            FORM_ENDPOINT,
                            {
                                method: "POST",

                                headers: {
                                    "Accept":
                                        "application/json"
                                },

                                body: formData
                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Request failed"
                        );

                    }


                    contactForm.reset();

                    showFormStatus(
                        "Message sent successfully. I'll get back to you soon.",
                        "success"
                    );


                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );

                    showFormStatus(
                        "Something went wrong. Please email me directly at sainath2005tvm@gmail.com.",
                        "error"
                    );

                } finally {

                    submitButton.classList.remove(
                        "loading"
                    );

                    submitButton.querySelector(
                        ".btn-text"
                    ).textContent =
                        "SEND MESSAGE";

                }

            }
        );

    }


    function showFormStatus(
        message,
        type
    ) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent =
            message;

        formStatus.className =
            `form-status ${type}`;

    }


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image could not be loaded:",
                        image.src
                    );

                    image.style.opacity =
                        "0.25";

                }
            );

        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu?.classList.contains("open")
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navMenu?.classList.contains("open")
            ) {

                closeMobileMenu();

            }

            if (gsapAvailable) {

                ScrollTrigger.refresh();

            }

        }
    );


    /* =====================================================
       INITIAL REFRESH
    ===================================================== */

    if (gsapAvailable) {

        setTimeout(() => {

            ScrollTrigger.refresh();

        }, 500);

    }

});
