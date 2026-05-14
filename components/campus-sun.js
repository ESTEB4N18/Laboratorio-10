class CampusSun extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
        }

        .sun {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--sun-background, radial-gradient(circle, #ffe78a 0 45%, #f7b733 70%));
          box-shadow:
            0 0 0 14px rgba(255, 218, 105, 0.22),
            0 0 42px rgba(247, 183, 51, 0.55);
        }
      </style>
      <span class="sun" part="sun"></span>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sun", CampusSun);
