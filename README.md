# Laboratorio 9 - Web Components

Este proyecto usa Web Components, shadow DOM, variables css, slots y css parts

## Donde customizar 

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

Los tamanos de letra estan dentro de los componentes porque se usa Shadow DOM. Esto significa que el CSS global no entra directamente a sus clases internas.

Para cambiar el texto principal del poster lo puede hacer en `components/poster-message.js`:

```css
.message {
  font-size: clamp(1.2rem, 1.8vw, 1.7rem);
}
```

Para cambiar las cintas del titulo se hace editando `components/poster-ribbon.js`:

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

Para cambiar los textos del rotulo se hace en `components/campus-sign-row.js`:

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

cambiar estilos sin tocar tanto el HTML usando variables css
Ejemplos utiles en `styles.css`:

```css
:root {
  --poster-accent: #f3ca4d;
  --poster-radius: 24px;
  --message-highlight: #8f52ff;
  --scene-gap: 3rem;
}
```

se crearon variables en un `::part`, por ejemplo:

```css
ucr-scene::part(poster-column) {
  --poster-max-width: 460px;
}
```

## Customizar con CSS Parts

 Permite modificar partes internas de componentes Shadow DOM usando ::part.

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

Con esto se puede modificar una parte interna de otro componente sin romper el encapsulamiento completo del Shadow DOM.

## Customizar contenido con slots

Los slots permiten personalizar el contenido interno del componente como segun indica cada nombre
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


