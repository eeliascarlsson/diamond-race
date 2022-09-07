class DiamondLane extends HTMLElement{

    // Tells the class (attributeChangedCallback) to listen for changes in "score"
    static get observedAttributes() { 
        return ["score"];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.score = 0;
        this.color = this.getAttribute("color"); 
    }

    connectedCallback() {
        this.render();
    }

    // Is called everytime score is changed
    attributeChangedCallback(prop, oldVal, newVal) {  
        if (prop == 'score') { // Right now score is the only property, but necessary if class is expanded.
            this.render();
        }
    }

    // get score and set score functions are used by attributeChangedCallback
    get score() { 
        return this.getAttribute("score");
    }

    set score(val) {
        this.setAttribute('score', val);
    }

    addScore(){
        if (!document.getElementById("gameOver").isGameOver) this.score ++; 
    }

    handleEvents(){
        // Adds an EventListener everytime the class is rendered.
        let diamond = this.shadowRoot.querySelector('div.diamond');
        diamond.addEventListener('click', this.addScore.bind(this));

        // Diamond increases in size when hovered.
        diamond.style.transform = "scale(1)" // Fixes diamond hitbox
        diamond.addEventListener('mouseover', () => diamond.style.transform = "scale(1.1)");
        diamond.addEventListener('mouseout', () => diamond.style.transform = "scale(1)");
    }

    render() {
        this.shadowRoot.innerHTML = ` 
            <style>
                div.lane {
                   height: 100px;
                    width: auto;
                    position: relative;
                }

                div.diamond {
                    height: 50px;
                    width: 50px;
                    background-color: ${this.color};
                    position: absolute;
                    top: 50%;
                    left: ${this.score*5+5}%;
                    margin-top: -25px;
                    rotate: 45deg;  
                    transition: all 0.2s;
                    z-index: 2;     
                }

                div.colorbar {
                    height: 10px;
                    width: 5%;
                    border-radius: 5px;
                    background-color: ${this.color};
                    position: absolute;
                    right: 10%;
                    top: 50%;
                }

                div.points {
                    position: absolute;
                    right: 10%;
                    margin-right: -20px;
                    top: 45%;
                    color: ${this.score == 10 ? "red" : "black"};
                }
            </style>

            <div class="lane">
                <div class="diamond"></div> 
                <div class="colorbar"></div>
                <div class="points">${this.score}</div>
            </div>
            `    
        this.handleEvents();
    }
    

}

window.customElements.define('diamond-lane', DiamondLane)