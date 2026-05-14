class CampusSignPost extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
        }

        .post {
          width: 100%;
          height: 100%;
          background: var(--sign-post-background, linear-gradient(180deg, #563d33, #3c281f));
          border-radius: 999px;
        }
      </style>
      <span class="post" part="post"></span>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sign-post", CampusSignPost);
