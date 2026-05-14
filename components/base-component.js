const defineComponent = (tagName, componentClass) => {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, componentClass);
  }
};

const escapeHTML = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });

class LightComponent extends HTMLElement {
  render(html) {
    if (this._rendered) {
      return;
    }

    this.innerHTML = html;
    this._rendered = true;
  }
}

class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  render(html) {
    this.shadowRoot.innerHTML = html;
    this._rendered = true;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.isConnected) {
      this.renderComponent();
    }
  }

  renderComponent() {}
}

window.ComponentUtils = {
  defineComponent,
  escapeHTML,
};

window.LightComponent = LightComponent;
window.ShadowComponent = ShadowComponent;
