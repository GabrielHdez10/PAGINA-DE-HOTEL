import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGt8kUIJkqhTLx2wN1ieaY-8oON05VId0",
  authDomain: "hotel-project-a24d0.firebaseapp.com",
  projectId: "hotel-project-a24d0",
  storageBucket: "hotel-project-a24d0.firebasestorage.app",
  messagingSenderId: "14169222389",
  appId: "1:14169222389:web:3fb8f24c04ac829d66e9bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.toggleMenu = function () {
  const menu = document.getElementById("mobile-menu");
  if (menu) {
    menu.classList.toggle("hidden");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  console.log("¡JavaScript y Firebase cargados correctamente! 🚀");

  // Slider
  const container = document.getElementById("slider-container");
  const next = document.getElementById("nextBtn");
  const prev = document.getElementById("prevBtn");

  if (container && next && prev) {
    const imgs = container.querySelectorAll("img");

    if (imgs.length > 0) {
      let index = 0;

      next.addEventListener("click", () => {
        index = (index + 1) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
      });

      prev.addEventListener("click", () => {
        index = (index - 1 + imgs.length) % imgs.length;
        container.style.transform = `translateX(-${index * 100}%)`;
      });
    }
  }

  // Formulario
  const form = document.getElementById("comentario-form");
  const mensajeEstado = document.getElementById("mensaje-estado");
  const listaComentarios = document.getElementById("lista-comentarios");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombreInput = document.getElementById("nombre");
      const comentarioInput = document.getElementById("comentario");

      const nombre = nombreInput.value.trim();
      const comentario = comentarioInput.value.trim();

      if (!nombre || !comentario) {
        mensajeEstado.textContent = "Completa todos los campos.";
        return;
      }

      try {
        await addDoc(collection(db, "comentarios"), {
          nombre,
          comentario,
          fecha: serverTimestamp()
        });

        mensajeEstado.textContent = "Comentario guardado correctamente.";
        form.reset();
      } catch (error) {
        console.error("Error al guardar comentario:", error);
        mensajeEstado.textContent = "No se pudo guardar el comentario.";
      }
    });
  }

  // Mostrar comentarios en tiempo real
  if (listaComentarios) {
    const comentariosRef = collection(db, "comentarios");
    const q = query(comentariosRef, orderBy("fecha", "desc"));

    onSnapshot(q, (snapshot) => {
      listaComentarios.innerHTML = "";

      if (snapshot.empty) {
        listaComentarios.innerHTML = `
          <div class="col-span-full text-center text-gray-500">
            Aún no hay comentarios. Sé el primero en escribir uno.
          </div>
        `;
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();

        const iniciales = obtenerIniciales(data.nombre || "HU");
        const tarjeta = document.createElement("div");

        tarjeta.className = "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between";

        tarjeta.innerHTML = `
          <div>
            <div class="text-amber-500 mb-4">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p class="text-gray-600 italic mb-6">"${data.comentario || ""}"</p>
          </div>
          <div class="flex items-center">
            <div class="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center text-white font-bold mr-3 text-xs">
              ${iniciales}
            </div>
            <span class="font-bold text-blue-950 text-sm tracking-widest uppercase">
              ${data.nombre || "Huésped"}
            </span>
          </div>
        `;

        listaComentarios.appendChild(tarjeta);
      });
    }, (error) => {
      console.error("Error al leer comentarios:", error);
      listaComentarios.innerHTML = `
        <div class="col-span-full text-center text-red-500">
          No se pudieron cargar los comentarios.
        </div>
      `;
    });
  }
});

function obtenerIniciales(nombre) {
  return nombre
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((palabra) => palabra.charAt(0).toUpperCase())
    .join("");
}