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

// Temporal para capturar la ruta actual
let path = window.location.pathname;
/**
 * Eliminamos el primer item de la cadena
 * Convertimos la cadena en un arreglo siempre y cuando tenga un (.)
 * Tomamos el primer elemento del arreglo
 */
// Para trabajar en local
// menuState.path = path.slice(1).split(".")[0];
// Para trabajar en Github | Pendiente de pasar al bundle
menuState.path = path.slice(1).split(".")[0].split("/")[1];

const toggleMenu = () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  menuState.isOpen = menuState.isOpen ? false : true;
}

const toggleIcon = (route) => {
  if (route == "home") {  
    setHeaderIcon("menu", "Abrir menú");
    menuState.action = 'menu';
  } else {
    setHeaderIcon("arrow-back", "Volver");
    menuState.action = "back";
  }
}

const setHeaderIcon = (iconName, label) => {
  const icon = menuToggle.querySelector("i");  
  console.log(icon);
  
  // Limpia clases previas
  icon.className = "bx";
  // Asigane el nuevo icono
  icon.classList.add(`bx-${iconName}`);
  // Accesibilidad
  menuToggle.setAttribute("aria-label", label);
};
/**
 * Captura el evento click de todo el contenido del elemento (todos lo hijos)
 */
sidebar.addEventListener("click", (event) => {  
  // Detiene el evento que tiene por defecto
  event.preventDefault();
  // captura el elemento que genero el evento
  const link = event.target.closest("[data-route]");
  // Valida que el elemento si tenga una ruta
  if (!link) return; 
  // Extrae la ruta del elemento
  const route = link.getAttribute("data-route");
  toggleIcon(route);
  // Redirige al usuario
  // window.location.href = `/${route}.html`;  
  window.location.href = `${route}.html`;  
  toggleMenu();
});

// Delegación de veentos
document.addEventListener("keydown", (e) => {  
  // Valida que solo se puede cerrar el menu cuando el sidebar conetnga la clase open
  const open = sidebar.classList.contains("open");
  if (e.key === "Escape" && open) {
    toggleMenu();
  }
});

menuToggle.addEventListener("click", () => {
  if (menuState.action === 'menu') {
    toggleMenu();
  }
  if (menuState.action === 'back') {
    window.history.back();
  }
});

menuClose.addEventListener("click", () => {
  toggleMenu();
});

overlay.addEventListener("click", () => {
  toggleMenu();
});

toggleIcon(menuState.path);