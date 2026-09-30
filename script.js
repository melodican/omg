// Where booking enquiries are sent. Change this if you use a different address.
const BOOKING_EMAIL = "hello@omglive.co.uk";

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Reveal sections on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Booking form: validates, then opens the visitor's email app with the enquiry filled in
const form = document.getElementById("booking-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();

  form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  const bad = [];
  if (!name) bad.push(form.elements.name);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) bad.push(form.elements.email);
  if (bad.length) {
    bad.forEach((el) => el.setAttribute("aria-invalid", "true"));
    bad[0].focus();
    note.textContent = "Please add your name and a valid email address.";
    note.className = "form__note error";
    return;
  }

  const services = data.getAll("services").join(", ") || "Not sure yet";
  const date = data.get("date")
    ? new Date(data.get("date")).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "TBC";
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${data.get("phone") || "-"}`,
    `Event date: ${date}`,
    `Event type: ${data.get("type")}`,
    `Venue / town: ${data.get("venue") || "-"}`,
    `Looking for: ${services}`,
    "",
    data.get("message") || "",
  ].join("\n");
  const subject = `Booking enquiry: ${data.get("type")} (${date})`;

  window.location.href =
    `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Your email app should now open with your enquiry ready to send. If it doesn't, message us on Facebook.";
  note.className = "form__note";
});
