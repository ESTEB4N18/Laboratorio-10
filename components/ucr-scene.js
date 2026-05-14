class UCRScene extends window.ShadowComponent {
  static get observedAttributes() {
    return [
      "poster-accent",
      "poster-accent-dark",
      "poster-border",
      "poster-image",
      "poster-radius",
      "sign-brand",
    ];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const posterAccent = this.getAttribute("poster-accent") ?? "#e2ba4a";
    const posterAccentDark = this.getAttribute("poster-accent-dark") ?? "#d6aa38";
    const posterBorder = this.getAttribute("poster-border") ?? "#2c3140";
    const posterImage = this.getAttribute("poster-image") ?? "img/acoso.jpg";
    const posterRadius = this.getAttribute("poster-radius") ?? "18px";
    const signBrand = this.getAttribute("sign-brand") ?? "UCR";
    const safe = window.ComponentUtils.escapeHTML;

    this.render(`
      <style>
        :host {
          display: block;
        }

        .layout {
          width: min(var(--scene-width, 1200px), 100%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: var(--scene-poster-width, 420px) 1fr;
          gap: var(--scene-gap, 2rem);
          align-items: center;
          min-height: calc(100vh - 4rem);
        }

        .poster-column {
          --poster-accent: ${safe(posterAccent)};
          --poster-accent-dark: ${safe(posterAccentDark)};
          --poster-border-color: ${safe(posterBorder)};
          --poster-radius: ${safe(posterRadius)};
        }

        @media (max-width: 980px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .layout {
            gap: 1rem;
          }
        }
      </style>
      <section class="layout" part="layout">
        <div class="poster-column" part="poster-column">
          <slot name="poster">
            <poster-zone>
              <support-poster
                accent="${safe(posterAccent)}"
                accent-dark="${safe(posterAccentDark)}"
                border-color="${safe(posterBorder)}"
                radius="${safe(posterRadius)}"
                image="${safe(posterImage)}"
              ></support-poster>
            </poster-zone>
          </slot>
        </div>
        <div class="direction-column" part="direction-column">
          <slot name="directional">
            <directional-zone sign-brand="${safe(signBrand)}"></directional-zone>
          </slot>
        </div>
      </section>
    `);
  }
}

window.ComponentUtils.defineComponent("ucr-scene", UCRScene);
