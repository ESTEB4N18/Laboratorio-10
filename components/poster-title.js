class PosterTitle extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
        }

        .title {
          display: flex;
          flex-direction: column;
          gap: var(--poster-title-gap, 0.45rem);
          margin-bottom: var(--poster-title-space, 2rem);
        }

        .title:hover poster-ribbon[tone="blue"],
        .title:hover ::slotted(poster-ribbon[tone="blue"]) {
          transform: translateX(8px) rotate(-2deg);
        }

        .title:hover poster-ribbon[tone="white"],
        .title:hover ::slotted(poster-ribbon[tone="white"]) {
          transform: translateX(18px) rotate(2deg);
        }

        .title:hover poster-ribbon[tone="purple"],
        .title:hover ::slotted(poster-ribbon[tone="purple"]) {
          transform: translateX(28px) rotate(-2deg);
        }
      </style>
      <div class="title" part="title">
        <slot>
          <poster-ribbon tone="blue">&iexcl;La Sede</poster-ribbon>
          <poster-ribbon tone="white">Te</poster-ribbon>
          <poster-ribbon tone="purple">Acompa&ntilde;a !</poster-ribbon>
        </slot>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("poster-title", PosterTitle);
