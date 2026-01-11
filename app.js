const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menu-close-btn");
const overlay = document.getElementById("overlay");
const logoutBtn = document.getElementById("logoutBtn");

const menuState = {
  isOpen: false,  // false | true
  action: 'menu', // 'menu' | 'back'
  path: location, // 'home' | 'detail' | 'etc'
};

const toggleMenu = () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  menuState.isOpen = menuState.isOpen ? false : true;
}

/**
 * Captura el evento click de todo el contenido del elemento (todos lo hijos)
 */
if (sidebar) {
 sidebar.addEventListener("click", (event) => {
   toggleMenu();
 }); 
}

// Delegación de veentos
document.addEventListener("keydown", (e) => {  
  // Valida que solo se puede cerrar el menu cuando el sidebar conetnga la clase open
  const open = sidebar.classList.contains("open");
  if (e.key === "Escape" && open) {
    toggleMenu();
  }
});

menuToggle.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (link) {
    const route = link.dataset.route;
    window.location.href = `${route}.html`;
  } else {
    toggleMenu();
  }
});

if (sidebar) {
 menuClose.addEventListener("click", () => {
   toggleMenu();
 });
 overlay.addEventListener("click", () => {
   toggleMenu();
 }); 
}