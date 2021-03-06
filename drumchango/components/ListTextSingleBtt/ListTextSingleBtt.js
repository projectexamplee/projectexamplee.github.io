(async () => {
  const res = await fetch('components/ListTextSingleBtt/ListTextSingleBtt.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListTextSingleBtt extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const title = this.getAttribute("title");
      const placeholder = this.getAttribute("placeholder");
      const btt_label = this.getAttribute("button");
      const value = this.getAttribute("input_value");


      this.appendChild(templete);

      this.querySelector("#title").innerHTML= title;
      this.querySelector("#value").setAttribute("placeholder",placeholder);
      if(value)this.querySelector("#value").setAttribute("value",value);
      if(btt_label)this.querySelector(".button").innerHTML= btt_label;
      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
    }
  }

  customElements.define('list-text-single-btt', ListTextSingleBtt);

})();
