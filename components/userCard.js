const template = document.createElement('template');

template.innerHTML = `
    <style>

        h3 {
            color: coral;
        }
        
        p {
            margin: 0;
            color: #3d3d3d;
            padding-bottom: 10px;
            display: flex;
            flex-direction: row;
        }

        p ::slotted(*) {
            padding-left: 5px;
        }

        .user-card {
            width: 500px;
            font-family: sans-serif;
            display: grid;
            grid-template-columns: 1fr 2fr;
            column-gap: 10px;
            background-color: #fff;
            margin-bottom: 15px;
            border-bottom: 10px solid #3F51B5;
        }

        .user-card img {
            width: 100%;
            max-width: 100%;
        }

        button#toggle-info {
            border: none;
            border-radius: 5px;
            background-color: #2196F3;
            padding: 7px 15px;
            color: #fff;
            font-weight: bold;
            outline: none;
        }

    </style>

    <div class="user-card">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p>Email: <slot name="email" /></p>
                <p>Phone: <slot name="phone" /></p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`;

class UserCard extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo) {
            info.style.display = 'block';
            toggleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toggleBtn.innerText = 'Show Info';
        }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define('user-card', UserCard);