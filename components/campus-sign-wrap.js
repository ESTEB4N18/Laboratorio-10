class CampusSignWrap extends window.ShadowComponent {
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
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translateX(-50%);
          animation: bob 4s ease-in-out infinite;
        }

        .wrap {
          display: block;
        }

        campus-sign-post {
          width: 18px;
          height: 180px;
          margin: 0 auto;
        }

        campus-sign-post::part(post) {
          background: var(--sign-post-background, linear-gradient(180deg, #563d33, #3c281f));
          border-radius: 999px;
        }

        @keyframes bob {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }

          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }
      </style>
      <div class="wrap" part="wrap">
        <slot name="board">
          <campus-sign-board brand="${safe(signBrand)}"></campus-sign-board>
        </slot>
        <slot name="post">
          <campus-sign-post></campus-sign-post>
        </slot>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sign-wrap", CampusSignWrap);
