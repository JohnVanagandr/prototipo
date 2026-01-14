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
const btnConfirmar = document.getElementById("btnConfirmar");
const modalError = document.getElementById("modalError");
const taskList = document.getElementById("taskList");

// Referencia para eliminar la card, esta referencia el global.
let cardAEliminar = null; // Referencia temporal

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

// Simulación de API con Promesa para eliminar tareas
const eliminarTareaAPI = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulamos éxito el 80% de las veces
      const exito = Math.random() > 0.2;
      // const exito = false;
      if (exito) {
        resolve("Tarea eliminada correctamente");
      } else {
        reject("Error de conexión. Inténtalo de nuevo.");
      }
    }, 2000); // 2 segundos de carga
  });
};

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
  taskList.addEventListener("click",async (e) => {
    // Buscamos si el clic (o el clic en el icono de adentro) pertenece al botón
    const deleteBtn = e.target.closest(".delete-btn");
    if (deleteBtn) {
      // Guardamos la card completa (el padre del botón)
      cardAEliminar = deleteBtn.closest(".card");
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

// Evento para simular eliminar una tarea en el Modal.
if (btnConfirmar) {
  btnConfirmar.addEventListener("click", async () => {
    // 1. Estado de carga (BEM)
    btnConfirmar.classList.add("modal__button--loading");
    btnConfirmar.disabled = true;
    btnCancelar.disabled = true;
    modalError.classList.remove("modal__error-message--visible");

    try {
      // 2. Ejecutar la promesa
      await eliminarTareaAPI();
      // 3. Si tiene éxito, cerramos modal
      modal.classList.remove("modal--visible");
      if (cardAEliminar) {
        cardAEliminar.classList.add("card--removing");
        // Esperamos a que termine la animación CSS (500ms) para borrar del DOM
        setTimeout(() => {
          cardAEliminar.remove();
          cardAEliminar = null; // Limpiamos referencia
        }, 500);
      }
    } catch (error) {
      // 4. Si hay error, lo mostramos
      modal.classList.add("modal--error"); // Dispara el shake
      modalError.textContent = error;
      modalError.classList.add("modal__error-message--visible");

      // Removemos la clase de error después de la animación para que pueda volver a vibrar
      setTimeout(() => {
        modal.classList.remove("modal--error");
      }, 1500);
    } finally {
      // 5. Quitamos el estado de carga pase lo que pase
      btnConfirmar.classList.remove("modal__button--loading");
      btnConfirmar.disabled = false;
      btnCancelar.disabled = false;
    }
  });
}