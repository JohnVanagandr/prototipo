const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menu-close-btn");
const overlay = document.getElementById("overlay");
const logoutBtn = document.getElementById("logoutBtn");
// Elementos para los filtros
const toggleBtn = document.getElementById("toggleFilters");
const advancedFilters = document.getElementById("advancedFilters");
// Elementos para el modal de confirmación
const modal = document.getElementById("modalEliminar");
const modalOverlay = document.querySelector(".modal__overlay");
const btnOpen = document.querySelector(".delete");
const btnClose = document.getElementById("btnCancelar");
const taskList = document.getElementById("taskList");

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
  if (!sidebar) return
  const open = sidebar.classList.contains("open");
  if (e.key === "Escape" && open) {
    toggleMenu();
  }
});

menuToggle.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  console.log(link);
  
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

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    advancedFilters.classList.toggle("open");
  });  
}

// Función para abrir
function openModal() {
  modal.classList.add("modal--visible");
}

// Función para cerrar
function closeModal() {
  modal.classList.remove("modal--visible");
}

// Eventos
if (btnClose) {
  btnClose.addEventListener("click", closeModal);
}
if (modalOverlay) {
  // Si haces clic fuera del contenido, también se cierra
  modalOverlay.addEventListener("click", closeModal);
}

if (taskList) {
  // 1. Delegación de eventos en el contenedor PADRE
  taskList.addEventListener("click", (e) => {
    // Buscamos si el clic (o el clic en el icono de adentro) pertenece al botón
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      // Obtenemos el nombre de la tarea desde el atributo data
      const taskName = deleteBtn.getAttribute("data-task");
      const modalText = modal.querySelector(".modal__text");
      // Personalizamos el mensaje del modal
      modalText.innerHTML = `Esta acción no se puede deshacer. La tarea <strong>"${taskName}"</strong> se borrará permanentemente.`;
      // Abrimos el modal
      modal.classList.add("modal--visible");
    }
  });
}