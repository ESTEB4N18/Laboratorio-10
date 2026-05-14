class CampusBuilding extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: flex;
          position: absolute;
          left: 50%;
          bottom: 27%;
          width: min(560px, 82%);
          height: 260px;
          justify-content: center;
          align-items: flex-end;
          gap: 12px;
          transform: translateX(-50%);
        }

        .building {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: flex-end;
          gap: inherit;
        }

        building-block {
          --building-shell-background: linear-gradient(180deg, #bd6b63, #98504f);
        }

        building-block[side="left"],
        building-block[side="right"] {
          width: 30%;
          height: 190px;
        }

        building-block[side="center"] {
          width: 34%;
          height: 248px;
          --building-shell-background: linear-gradient(180deg, #c97969, #a55854);
        }

        building-block::part(shell) {
          border: 5px solid rgba(96, 55, 66, 0.18);
          border-bottom: 0;
          box-shadow: 0 16px 28px rgba(78, 70, 75, 0.16);
        }

        @media (max-width: 980px) {
          :host {
            width: min(520px, 86%);
            bottom: 28%;
          }
        }

        @media (max-width: 640px) {
          :host {
            width: 96%;
            height: 214px;
            bottom: 27%;
            gap: 6px;
          }

          building-block[side="left"],
          building-block[side="right"] {
            height: 158px;
          }

          building-block[side="center"] {
            height: 208px;
          }
        }
      </style>
      <div class="building" part="building">
        <slot>
          <building-block side="left" windows="6"></building-block>
          <building-block side="center" windows="9"></building-block>
          <building-block side="right" windows="6"></building-block>
        </slot>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-building", CampusBuilding);
