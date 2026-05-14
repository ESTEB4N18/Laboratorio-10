class QRCode extends window.ShadowComponent {
  static get observedAttributes() {
    return ["size"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const size = Number(this.getAttribute("size")) || 74;
    this.style.setProperty("--qr-size", `${size}px`);

    this.render(`
      <style>
        :host {
          display: block;
        }

        .qr {
          display: block;
          width: var(--qr-size, 74px);
          aspect-ratio: 1;
          margin: var(--qr-space, 1rem auto 1.8rem);
          background:
            linear-gradient(90deg, #000 12%, transparent 12% 24%, #000 24% 36%, transparent 36% 48%, #000 48% 60%, transparent 60% 72%, #000 72%),
            linear-gradient(#000 12%, transparent 12% 24%, #000 24% 36%, transparent 36% 48%, #000 48% 60%, transparent 60% 72%, #000 72%);
          border: var(--qr-border, 6px solid #fff);
          border-radius: var(--qr-radius, 6px);
          box-shadow: var(--qr-shadow, 0 10px 22px rgba(0, 0, 0, 0.14));
          animation: pulse 2.4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }
      </style>
      <span class="qr" part="qr pattern"></span>
    `);
  }
}

window.ComponentUtils.defineComponent("qr-code", QRCode);
