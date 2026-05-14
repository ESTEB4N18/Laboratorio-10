class PosterZone extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
        }

        .zone {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <div class="zone" part="zone">
        <slot>
          <support-poster></support-poster>
        </slot>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("poster-zone", PosterZone);
