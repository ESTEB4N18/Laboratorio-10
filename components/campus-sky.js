class CampusSky extends window.ShadowComponent {
  connectedCallback() {
    this.render(`
      <style>
        :host {
          display: block;
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .sky {
          position: absolute;
          inset: 0;
        }

        campus-sun {
          position: absolute;
          top: 3.5rem;
          right: 4rem;
          width: 92px;
          aspect-ratio: 1;
          animation: glow 3s ease-in-out infinite;
        }

        campus-cloud {
          position: absolute;
          width: 150px;
          height: 54px;
          --cloud-color: rgba(255, 255, 255, 0.9);
          --cloud-shadow: 0 12px 30px rgba(69, 105, 145, 0.13);
          animation: cloudMove 32s linear infinite;
        }

        campus-cloud[variant="1"] {
          top: 7rem;
          left: -180px;
        }

        campus-cloud[variant="2"] {
          top: 11rem;
          left: 18%;
          width: 118px;
          height: 44px;
          opacity: 0.86;
          animation-delay: -15s;
          animation-duration: 40s;
        }

        @keyframes cloudMove {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(120vw);
          }
        }

        @keyframes glow {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        @media (max-width: 640px) {
          campus-sun {
            top: 2rem;
            right: 2rem;
            width: 68px;
          }

          campus-cloud[variant="1"] {
            top: 6rem;
          }

          campus-cloud[variant="2"] {
            top: 9rem;
          }
        }
      </style>
      <div class="sky" part="sky">
        <slot>
          <campus-sun></campus-sun>
          <campus-cloud variant="1"></campus-cloud>
          <campus-cloud variant="2"></campus-cloud>
        </slot>
      </div>
    `);
  }
}

window.ComponentUtils.defineComponent("campus-sky", CampusSky);
