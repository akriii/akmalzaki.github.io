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

    /* --- Visitor counter: ignore developer & localhost --- */
    var counterBox = document.querySelector(".footer-counter");
    if (counterBox) {
        var params = new URLSearchParams(window.location.search);
        if (params.get("dev") === "1" || params.get("admin") === "1") {
            try { localStorage.setItem("akmal_dev_mode", "1"); } catch (e) {}
            if (window.history && window.history.replaceState) {
                var cleanUrl = window.location.pathname + window.location.hash;
                window.history.replaceState(null, "", cleanUrl);
            }
        } else if (params.get("dev") === "0") {
            try { localStorage.removeItem("akmal_dev_mode"); } catch (e) {}
        }

        var isLocal = location.hostname === "localhost" ||
                      location.hostname === "127.0.0.1" ||
                      location.hostname.endsWith(".test") ||
                      location.protocol === "file:";

        var isDev = false;
        try {
            isDev = isLocal || localStorage.getItem("akmal_dev_mode") === "1";
        } catch (e) {}

        if (isDev) {
            // Render local dev badge without calling hits.sh (prevents inflating view count)
            var devBadge = document.createElement("span");
            devBadge.className = "badge-counter-dev";
            devBadge.title = "Developer Mode Active: visits from this browser are not counted";
            devBadge.innerHTML = '<span class="lbl">Visitors</span><span class="val">Dev Mode</span>';
            counterBox.appendChild(devBadge);
        } else {
            // Real visitor: load hits.sh SVG to record and display visit
            var img = document.createElement("img");
            img.src = "https://hits.sh/akriii.github.io.svg?label=Visitors&color=8b5cf6&labelColor=17171c";
            img.alt = "Visitors";
            img.width = 70;
            img.height = 20;
            counterBox.appendChild(img);
        }
    }
})();
