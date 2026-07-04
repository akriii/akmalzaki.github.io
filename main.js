/* Shared behaviour across all pages */
(function () {
    "use strict";

    /* --- Mobile nav toggle --- */
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav-toggle");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
        // Close menu when a link is tapped
        nav.querySelectorAll(".nav-links a").forEach(function (a) {
            a.addEventListener("click", function () { nav.classList.remove("open"); });
        });
    }

    /* --- Highlight the active nav link based on current file --- */
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
        var target = a.getAttribute("href");
        if (target === here || (here === "" && target === "index.html")) {
            a.classList.add("active");
        }
    });

    /* --- Footer year --- */
    var yr = document.querySelector("[data-year]");
    if (yr) { yr.textContent = new Date().getFullYear(); }

    /* --- Scroll reveal (IntersectionObserver) --- */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && reveals.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target); // reveal once, then stop watching
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add("is-visible"); });
    }

    /* --- Pointer-following glow on cards --- */
    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
            var r = card.getBoundingClientRect();
            card.style.setProperty("--mx", (e.clientX - r.left) + "px");
            card.style.setProperty("--my", (e.clientY - r.top) + "px");
        });
    });
})();
