class DirectionalZone extends window.ShadowComponent {
  static get observedAttributes() {
    return ["sign-brand"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const signBrand = this.getAttribute("sign-brand") ?? "UCR";
    const safe = window.ComponentUtils.escapeHTML;

    this.render(`
      <style>
        :host {
          display: block;
        }

        .zone {
          position: relative;
          min-height: var(--directional-height, 700px);
          border-radius: var(--directional-radius, 28px);
          overflow: hidden;
          box-shadow: var(--shadow, 0 20px 50px rgba(30, 45, 90, 0.18));
          background:
            linear-gradient(180deg, rgba(98, 171, 255, 0.22), rgba(86, 146, 233, 0.1)),
            linear-gradient(180deg, var(--sky-color, #d9ecff) 0 56%, #bfdcfb 56% 70%, var(--ground-color, #b2cb8d) 70% 100%);
        }

        @media (max-width: 980px) {
          .zone {
            min-height: 620px;
          }
        }

        @media (max-width: 640px) {
          .zone {
            min-height: 560px;
          }
        }
      </style>
      <section class="zone" part="zone">
        <slot name="sky">
          <campus-sky></campus-sky>
        </slot>
        <slot name="building">
          <campus-building></campus-building>
        </slot>
        <slot name="sign">
          <campus-sign-wrap sign-brand="${safe(signBrand)}"></campus-sign-wrap>
        </slot>
      </section>
    `);
  }
}

window.ComponentUtils.defineComponent("directional-zone", DirectionalZone);
