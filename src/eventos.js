import { OCULTAR } from "./navegacion";
import { mostrarMapa } from "./mapa";

let clean = null;

export function ON_ActualizarLocalizaciones(localizaciones) {
  if (clean !== null) {
    clean();
  }
  clean = mostrarMapa(localizaciones);
}

const paginaLogin = document.getElementById("login-page");
const paginaApp = document.getElementById("app-page");

paginaLogin.classList.add(OCULTAR);
paginaApp.classList.remove(OCULTAR);

export function ON_Login() {
  paginaLogin.classList.add(OCULTAR);
  paginaApp.classList.remove(OCULTAR);
}

export function ON_Logout() {
  paginaLogin.classList.remove(OCULTAR);
  paginaApp.classList.add(OCULTAR);
}
