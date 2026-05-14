class PosterMessage extends window.ShadowComponent {
  static get observedAttributes() {
    return ["highlight", "line-one", "line-two"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const lineOne = this.getAttribute("line-one") ?? "El respeto no se negocia";
    const lineTwo = this.getAttribute("line-two") ?? "\u00a1Par\u00e1 ya de acosar!";
    const highlight = this.getAttribute("highlight") ?? "var(--message-highlight, #6d60db)";
    const safe = window.ComponentUtils.escapeHTML;

    this.render(`
      <style>
        :host {
          display: block;
        }

        .message {
          text-align: center;
          font-size: clamp(1.2rem, 1.8vw, 1.7rem);
          line-height: 1.35;
          font-weight: 800;
          color: var(--message-color, rgba(91, 84, 144, 0.9));
          margin: var(--message-space, 1.2rem 0 1rem);
        }

        .highlight {
          color: ${safe(highlight)};
        }
      </style>
      <p class="message" part="message">
        <slot>
          ${safe(lineOne)}<br />
          <span class="highlight" part="highlight">${safe(lineTwo)}</span>
        </slot>
      </p>
    `);
  }
}

window.ComponentUtils.defineComponent("poster-message", PosterMessage);
