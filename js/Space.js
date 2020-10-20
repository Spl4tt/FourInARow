class Space {
    constructor(x, y, diameter = 76) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.radius = diameter/2;
        this.id = `space-${x}-${y}`;
        this.token = null;
    }

    drawSBGSpace() {
        // create SVG element
        const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        // set attributes to svgSpace
        svgSpace.setAttributeNS(null, "id", this.id);
        svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
        svgSpace.setAttributeNS(null, "r", this.radius - 8);
        svgSpace.setAttributeNS(null, "fill", "black");
        svgSpace.setAttributeNS(null, "stroke", "none");
        // Attach to the DOM
        document.getElementById("mask").appendChild(svgSpace);
    }
}