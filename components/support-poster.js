class SupportPoster extends window.ShadowComponent {
  static get observedAttributes() {
    return ["accent", "accent-dark", "border-color", "image", "radius"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const accent = this.getAttribute("accent") ?? "var(--poster-accent, #e2ba4a)";
    const accentDark = this.getAttribute("accent-dark") ?? "var(--poster-accent-dark, #d6aa38)";
    const borderColor = this.getAttribute("border-color") ?? "var(--poster-border-color, #2c3140)";
    const radius = this.getAttribute("radius") ?? "var(--poster-radius, 18px)";
    const image = this.getAttribute("image") ?? "img/acoso.jpg";
    const safe = window.ComponentUtils.escapeHTML;

    this.render(`
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: var(--poster-max-width, 420px);
        }

        .card {
          width: 100%;
          background: linear-gradient(180deg, ${safe(accent)} 0%, ${safe(accentDark)} 100%);
          border-radius: ${safe(radius)};
          padding: var(--poster-padding, 2rem 1.5rem 1.6rem);
          box-shadow: var(--poster-shadow, 0 24px 60px rgba(87, 61, 10, 0.22));
          position: relative;
          overflow: hidden;
          border: var(--poster-border-width, 8px) solid ${safe(borderColor)};
          animation: floatIn 1s ease both;
          box-sizing: border-box;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          pointer-events: none;
        }

        .circle-large {
          width: 200px;
          height: 200px;
          left: -40px;
          bottom: 30px;
        }

        .circle-small {
          width: 160px;
          height: 160px;
          right: -30px;
          top: 30px;
        }

        .content {
          position: relative;
          z-index: 1;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 980px) {
          :host {
            max-width: 420px;
            margin: 0 auto;
          }
        }
      </style>
      <article class="card" part="card">
        <span class="circle circle-large" part="circle"></span>
        <span class="circle circle-small" part="circle"></span>
        <div class="content" part="content">
          <slot name="title">
            <poster-title></poster-title>
          </slot>
          <slot name="message">
            <poster-message></poster-message>
          </slot>
          <slot name="qr">
            <qr-code aria-label="Codigo QR decorativo" size="74"></qr-code>
          </slot>
          <slot name="artwork">
            <poster-people image="${safe(image)}"></poster-people>
          </slot>
        </div>
      </article>
    `);
  }
}

window.ComponentUtils.defineComponent("support-poster", SupportPoster);
