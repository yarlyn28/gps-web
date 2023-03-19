import { mostrarMapa } from "./mapa";

let clean = null

export function ON_ActualizarLocalizaciones(localizaciones) {
  if (clean !== null) {
    clean();
  }
  clean = mostrarMapa(localizaciones);
}