# Laboratorio 9 - Web Components

Este proyecto usa Web Components para construir una escena con un poster de apoyo y un rotulo direccional. Los componentes estan organizados en `components/` y se importan desde `main.js`.

## Donde customizar rapido

La mayoria de cambios visuales globales se hacen en `styles.css`, dentro de `:root`.

```css
:root {
  --scene-width: 1200px;
  --scene-gap: 2rem;
  --poster-accent: #e2ba4a;
  --poster-accent-dark: #d6aa38;
  --poster-border-color: #2c3140;
  --poster-radius: 18px;
  --message-highlight: #6d60db;
  --ribbon-blue: #63a8ff;
  --ribbon-purple: #aa63ff;
  --sky-color: #d9ecff;
  --ground-color: #b2cb8d;
}
```

Si queres cambiar colores, espacios, radios, fondos o sombras, revisa primero `styles.css`.

## Cambiar atributos desde la etiqueta

Algunos valores se pasan directamente desde la etiqueta del componente en `index.html`.

```html
<ucr-scene
  poster-accent="#e2ba4a"
  poster-accent-dark="#d6aa38"
  poster-border="#2c3140"
  poster-image="img/acoso.jpg"
  poster-radius="18px"
  sign-brand="UCR"
></ucr-scene>
```

Estos atributos son leidos con `getAttribute()` dentro de `components/ucr-scene.js`. Por ejemplo, si queres cambiar la imagen del poster:

```html
<ucr-scene poster-image="img/otra-imagen.jpg"></ucr-scene>
```

## Cambiar tamanos de letra

Los tamanos de letra estan dentro de los componentes porque usan Shadow DOM. Eso significa que el CSS global no entra directamente a sus clases internas.

Para cambiar el texto principal del poster, edita `components/poster-message.js`:

```css
.message {
  font-size: clamp(1.2rem, 1.8vw, 1.7rem);
}
```

Para cambiar las cintas del titulo, edita `components/poster-ribbon.js`:

```css
:host([tone="blue"]) .ribbon {
  font-size: clamp(1.6rem, 2vw, 2.2rem);
}

:host([tone="white"]) .ribbon {
  font-size: 1.1rem;
}

:host([tone="purple"]) .ribbon {
  font-size: clamp(1.35rem, 1.8vw, 1.8rem);
}
```

Para cambiar los textos del rotulo, edita `components/campus-sign-row.js`:

```css
.arrow {
  font-size: 1.3rem;
}

:host([brand]) .row {
  font-size: 1.5rem;
}
```

Tambien hay un ajuste responsive para el rotulo en `components/campus-sign-board.js`:

```css
@media (max-width: 640px) {
  campus-sign-row::part(row) {
    font-size: 0.95rem;
  }
}
```

## Customizar con CSS variables

Las variables CSS sirven para cambiar estilos sin tocar tanto el HTML interno de cada componente.

Ejemplos utiles en `styles.css`:

```css
:root {
  --poster-accent: #f3ca4d;
  --poster-radius: 24px;
  --message-highlight: #8f52ff;
  --scene-gap: 3rem;
}
```

Tambien podes crear variables en un `::part`, por ejemplo:

```css
ucr-scene::part(poster-column) {
  --poster-max-width: 460px;
}
```

## Customizar con CSS Parts

Como los componentes usan Shadow DOM, se exponen partes internas con `part="..."`. Desde `styles.css` se pueden tocar usando `::part`.

Ejemplos:

```css
ucr-scene::part(layout) {
  isolation: isolate;
}

ucr-scene::part(poster-column) {
  --poster-max-width: 420px;
}
```

Dentro de otros componentes tambien se usa `::part`, por ejemplo en `components/campus-building.js`:

```css
building-block::part(shell) {
  border: 5px solid rgba(96, 55, 66, 0.18);
}
```

Esto permite modificar una parte interna de otro componente sin romper el encapsulamiento completo del Shadow DOM.

## Customizar contenido con slots

Los slots permiten reemplazar partes internas desde afuera del componente.

`support-poster` tiene estos slots:

- `title`: titulo del poster.
- `message`: mensaje central.
- `qr`: codigo QR decorativo.
- `artwork`: imagen del poster.

Ejemplo:

```html
<support-poster>
  <poster-message
    slot="message"
    line-one="Nuevo mensaje"
    line-two="Texto destacado"
  ></poster-message>
</support-poster>
```

`ucr-scene` tiene estos slots:

- `poster`: reemplaza toda la zona del poster.
- `directional`: reemplaza toda la zona del rotulo direccional.

## Guia rapida

| Quiero cambiar | Archivo recomendado |
| --- | --- |
| Color principal del poster | `styles.css` o atributo `poster-accent` en `index.html` |
| Imagen del poster | Atributo `poster-image` en `index.html` |
| Radio/bordes del poster | `--poster-radius` en `styles.css` o atributo `poster-radius` |
| Tamano del mensaje del poster | `components/poster-message.js` |
| Tamano de las cintas del titulo | `components/poster-ribbon.js` |
| Texto del rotulo final | Atributo `sign-brand` en `index.html` |
| Colores del rotulo | `--sign-board-background` en `styles.css` |
| Tamano de la escena | `--scene-width` en `styles.css` |
| Separacion entre poster y escena | `--scene-gap` en `styles.css` |
| Tamano del QR | Atributo `size` en `<qr-code>` |
| Cantidad de ventanas del edificio | Atributo `windows` en `<building-block>` |

## Como correrlo

Abrilo con un servidor local porque `main.js` usa modulos ES.

Si tenes Node instalado, podes usar cualquier servidor estatico. En este ambiente se probo con:

```bash
http://127.0.0.1:8123/
```

