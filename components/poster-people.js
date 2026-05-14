class PosterPeople extends window.ShadowComponent {
  static get observedAttributes() {
    return ["alt", "image", "size"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const image = this.getAttribute("image") ?? "img/acoso.jpg";
    const alt = this.getAttribute("alt") ?? "Ilustracion contra el acoso";
    const size = Number(this.getAttribute("size")) || 200;
    const safe = window.ComponentUtils.escapeHTML;

    this.style.setProperty("--people-size", `${size}px`);

    this.render(`
      <style>
        :host {
          display: block;
        }

        .people {
          display: block;
          width: var(--people-size, 200px);
          height: var(--people-size, 200px);
          object-fit: contain;
          margin: auto;
        }
      </style>
      <img class="people" part="image artwork" src="${safe(image)}" alt="${safe(alt)}" />
    `);
  }
}

window.ComponentUtils.defineComponent("poster-people", PosterPeople);
