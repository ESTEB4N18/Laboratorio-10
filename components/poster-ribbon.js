class PosterRibbon extends window.ShadowComponent {
  static get observedAttributes() {
    return ["label", "tone"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const label = this.getAttribute("label") || this.textContent.trim();
    const safeLabel = window.ComponentUtils.escapeHTML(label);

    this.render(`
        <style>
          :host {
            display: block;
            width: fit-content;
            color: white;
            font-weight: 900;
            text-transform: uppercase;
            transition: transform 0.35s ease, filter 0.35s ease, box-shadow 0.35s ease;
            cursor: pointer;
          }

          :host(:hover) {
            transform: translateX(12px) rotate(-3deg) scale(1.06);
            filter: brightness(1.08);
          }

          .ribbon {
            display: block;
            padding: var(--ribbon-padding, 0.55rem 1rem);
            box-shadow: var(--ribbon-shadow, 0 10px 20px rgba(0, 0, 0, 0.12));
          }

          :host(:hover) .ribbon {
            box-shadow: 0 16px 28px rgba(0, 0, 0, 0.18);
          }

          :host([tone="blue"]) .ribbon {
            background: var(--ribbon-blue, #63a8ff);
            clip-path: polygon(0 0, 100% 0, 94% 100%, 0 100%);
            font-size: clamp(1.6rem, 2vw, 2.2rem);
          }

          :host([tone="white"]) {
            color: #96a843;
            margin-left: 1rem;
            transform: rotate(-3deg);
          }

          :host([tone="white"]) .ribbon {
            background: var(--ribbon-white, white);
            clip-path: polygon(6% 0, 100% 0, 94% 100%, 0 100%);
            font-size: 1.1rem;
          }

          :host([tone="purple"]) {
            margin-left: 2rem;
            transform: rotate(-2deg);
          }

          :host([tone="purple"]) .ribbon {
            background: var(--ribbon-purple, #aa63ff);
            clip-path: polygon(0 0, 100% 0, 94% 100%, 8% 100%);
            font-size: clamp(1.35rem, 1.8vw, 1.8rem);
          }
        </style>
        <span class="ribbon" part="ribbon label">
          <slot>${safeLabel}</slot>
        </span>
      `);
  }
}

window.ComponentUtils.defineComponent("poster-ribbon", PosterRibbon);
