class BuildingBlock extends window.ShadowComponent {
  static get observedAttributes() {
    return ["side", "windows"];
  }

  connectedCallback() {
    this.renderComponent();
  }

  renderComponent() {
    const windowCount = Number(this.getAttribute("windows")) || 6;
    const windows = Array.from({ length: windowCount }, () => '<span class="window" part="window"></span>').join("");

    this.render(`
      <style>
        :host {
          display: block;
          position: relative;
        }

        .shell {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 8px 8px 0 0;
          background: var(--building-shell-background, linear-gradient(180deg, #bd6b63, #98504f));
          box-sizing: border-box;
        }

        .roof {
          position: absolute;
          top: -32px;
          left: 7%;
          right: 7%;
          height: 36px;
          background: var(--building-roof-background, linear-gradient(180deg, #7b3842, #5c2530));
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
        }

        .windows {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--building-window-gap, 12px);
          padding: var(--building-window-padding, 42px 18px 20px);
        }

        :host([side="left"]) .windows,
        :host([side="right"]) .windows {
          grid-template-columns: repeat(2, 1fr);
        }

        .window {
          height: var(--building-window-height, 34px);
          border-radius: 5px;
          background: var(--building-window-background, linear-gradient(180deg, #fdf3b4, #94c4ff));
          border: var(--building-window-border, 3px solid rgba(58, 44, 63, 0.22));
          box-shadow: inset 0 -10px 0 rgba(77, 141, 247, 0.18);
        }

        @media (max-width: 640px) {
          .windows {
            gap: 8px;
            padding: 34px 10px 14px;
          }

          .window {
            height: 27px;
            border-width: 2px;
          }
        }
      </style>
      <div class="shell" part="shell">
        <div class="roof" part="roof"></div>
        <div class="windows" part="windows">${windows}</div>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("building-block", BuildingBlock);
