class CampusSignBoard extends window.ShadowComponent {
  static get observedAttributes() {
    return ["brand"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const brand = this.getAttribute("brand") ?? "UCR";
    const safe = window.ComponentUtils.escapeHTML;

    this.render(`
      <style>
        :host {
          display: block;
          width: min(360px, 70vw);
        }

        .board {
          background: var(--sign-board-background, linear-gradient(180deg, #4b2d7d, #3d235f));
          color: white;
          border-radius: var(--sign-board-radius, 18px);
          box-shadow: var(--sign-board-shadow, 0 22px 50px rgba(52, 28, 88, 0.3));
          overflow: hidden;
          border: var(--sign-board-border, 5px solid rgba(255, 255, 255, 0.18));
        }

        campus-sign-row:not(:last-child)::part(row) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        campus-sign-row:last-child::part(row) {
          border-bottom: none;
        }

        @media (max-width: 640px) {
          :host {
            width: min(300px, 88vw);
          }

          campus-sign-row::part(row) {
            padding: 0.9rem 1rem;
            font-size: 0.95rem;
          }
        }
      </style>
      <nav class="board" part="board" aria-label="R&oacute;tulos de la sede">
        <slot>
          <campus-sign-row label="Aulas 3 y 4"></campus-sign-row>
          <campus-sign-row label="Apoyo Inform&aacute;tico"></campus-sign-row>
          <campus-sign-row label="Servidores"></campus-sign-row>
          <campus-sign-row label="Laboratorio 1 y 2"></campus-sign-row>
          <campus-sign-row label="Coordinaci&oacute;n Inform&aacute;tica"></campus-sign-row>
          <campus-sign-row label="${safe(brand)}" brand></campus-sign-row>
        </slot>
      </nav>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sign-board", CampusSignBoard);
