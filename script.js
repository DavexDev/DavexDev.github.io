// script.js

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector("button");

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    // Guardar preferencia en localStorage (opcional)
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });

  // Restaurar preferencia previa (si existe)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
});
