class CampusCloud extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
        }

        .cloud {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background: var(--cloud-color, rgba(255, 255, 255, 0.9));
          box-shadow: var(--cloud-shadow, 0 12px 30px rgba(69, 105, 145, 0.13));
        }

        .cloud::before,
        .cloud::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: inherit;
        }

        .cloud::before {
          width: 48%;
          height: 134%;
          left: 15%;
          top: -62%;
        }

        .cloud::after {
          width: 39%;
          height: 107%;
          right: 18%;
          top: -44%;
        }
      </style>
      <span class="cloud" part="cloud body"></span>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-cloud", CampusCloud);
