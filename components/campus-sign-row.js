class CampusSignRow extends window.ShadowComponent {
  static get observedAttributes() {
    return ["brand", "label"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const label = this.getAttribute("label") || this.textContent.trim();
    const safeLabel = window.ComponentUtils.escapeHTML(label);
    const arrow = this.hasAttribute("brand") ? "" : '<span class="arrow" part="arrow" aria-hidden="true">&#10140;</span>';

    this.render(`
      <style>
        :host {
          display: block;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.2rem;
          font-weight: 600;
          transition: transform 0.3s ease, background-color 0.3s ease, padding-left 0.3s ease;
          cursor: pointer;
          box-sizing: border-box;
        }

        :host(:hover) .row {
          transform: translateX(12px);
          background: rgba(255, 255, 255, 0.12);
          padding-left: 1.6rem;
        }

        .arrow {
          font-size: 1.3rem;
          animation: slideArrow 1.3s ease-in-out infinite alternate;
          transition: transform 0.3s ease;
        }

        :host(:hover) .arrow {
          transform: translateX(10px);
        }

        :host([brand]) .row {
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          font-size: 1.5rem;
          letter-spacing: 0.08em;
        }

        :host([brand]:hover) .row {
          transform: none;
          padding-left: 1.2rem;
          background: rgba(255, 255, 255, 0.08);
        }

        @keyframes slideArrow {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(6px);
          }
        }
      </style>
      <div class="row" part="row">
        <span class="label" part="label"><slot>${safeLabel}</slot></span>
        ${arrow}
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sign-row", CampusSignRow);
