(async () => {
  const res = await fetch('components/UserCard/UserCard.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class UserCard extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();

      // Setup a click listener on <user-card>
      this.addEventListener('click', e => {
        this.toggleCard();
      });
    }

    toggleCard() {
      console.log("Element was clicked!");
    }
    // Called when element is inserted in DOM
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });

      // Clone the template and the cloned node to the shadowDOM's root.
      const instance = HTMLTemplate.content.cloneNode(true);
      shadowRoot.appendChild(instance);

      const userId = this.getAttribute('user-id');

      // Fetch the data for that user Id from the API and call the render method with this data
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
          .then((response) => response.text())
          .then((responseText) => {
              this.render(JSON.parse(responseText));
          })
          .catch((error) => {
              console.error(error);
          });
    }
    render(userData) {
      // Fill the respective areas of the card using DOM manipulation APIs
      // All of our components elements reside under shadow dom. So we created a this.shadowRoot property
      // We use this property to call selectors so that the DOM is searched only under this subtree
      this.shadowRoot.querySelector('.card__full-name').innerHTML = userData.name;
      this.shadowRoot.querySelector('.card__user-name').innerHTML = userData.username;
      this.shadowRoot.querySelector('.card__website').innerHTML = userData.website;
      this.shadowRoot.querySelector('.card__address').innerHTML = `<h4>Address</h4>
        ${userData.address.suite}, <br />
        ${userData.address.street},<br />
        ${userData.address.city},<br />
        Zipcode: ${userData.address.zipcode}`
    }

    toggleCard() {
      // let elem = this.shadowRoot.querySelector('.card__hidden-content');
      // let btn = this.shadowRoot.querySelector('.card__details-btn');
      // btn.innerHTML = elem.style.display == 'none' ? 'Less Details' : 'More Details';
      // elem.style.display = elem.style.display == 'none' ? 'block' : 'none';
    }

  }

  customElements.define('user-card', UserCard);

})();