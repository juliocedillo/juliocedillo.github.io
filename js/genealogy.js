/* =========================================
   Scholar Data
   ========================================= */

const genealogy = {

    /* =========================================
       Original Lineage
       ========================================= */

    giddings: {
        name: "Franklin Henry Giddings",
        role: "Sociologist",
        institution: "Columbia University",
        relationship: "Academic Lineage",
        generation: 6,
        areas: [
            "Sociological Theory",
            "Social Organization",
            "Political Sociology"
        ]
    },

    chapin: {
        name: "F. Stuart Chapin",
        role: "Sociologist",
        institution: "Smith College",
        relationship: "Academic Lineage",
        generation: 5,
        areas: [
            "Sociology",
            "Social Research",
            "Urban Studies"
        ]
    },

    sewell: {
        name: "William H. Sewell",
        role: "Sociologist",
        institution: "University of Wisconsin–Madison",
        relationship: "Academic Lineage",
        generation: 4,
        areas: [
            "Historical Sociology",
            "Social Theory",
            "Political Sociology"
        ]
    },

    haller: {
        name: "Archibald O. Haller",
        role: "Sociologist",
        institution: "University of Wisconsin–Madison",
        relationship: "Academic Lineage",
        generation: 3,
        areas: [
            "Social Stratification",
            "Status Attainment",
            "Education"
        ]
    },

    portes: {
        name: "Alejandro Portes",
        role: "Sociologist",
        institution: "Johns Hopkins University",
        relationship: "Academic Lineage",
        generation: 2,
        areas: [
            "Immigration",
            "Economic Sociology",
            "Social Capital"
        ]
    },

    itzigsohn: {
        name: "José Itzigsohn",
        role: "Sociologist",
        institution: "Brown University",
        relationship: "Academic Lineage",
        generation: 1,
        areas: [
            "Race & Ethnicity",
            "Immigration",
            "Political Sociology",
            "Du Boisian Sociology"
        ]
    },


    /* =========================================
       José's Two Mentorship Branches
       ========================================= */

    "rodriguez-muniz": {
        name: "Michael Rodríguez-Muñiz",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Mentor",
        generation: 0,
        areas: [
            "Race & Ethnicity",
            "Latinx Sociology",
            "Political Sociology",
            "Social Theory"
        ]
    },

    hammer: {
        name: "Ricarda Hammer",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Mentor",
        generation: 0,
        areas: [
            "Political Sociology",
            "Race & Empire",
            "Historical Sociology",
            "Postcolonial Sociology"
        ]
    },


    /* =========================================
       Second Lineage
       ========================================= */

    ogles: {
        name: "Richard Ogles",
        role: "Sociologist",
        institution: "Academic Lineage",
        relationship: "Academic Lineage",
        generation: 4,
        areas: [
            "Sociology"
        ]
    },

    "william-julius-wilson": {
        name: "William Julius Wilson",
        role: "Sociologist",
        institution: "Harvard University",
        relationship: "Academic Lineage",
        generation: 3,
        areas: [
            "Urban Sociology",
            "Race & Ethnicity",
            "Social Stratification",
            "Poverty"
        ]
    },

    "pattillo": {
        name: "Mary Pattillo",
        role: "Sociologist",
        institution: "Northwestern University",
        relationship: "Academic Lineage",
        generation: 2,
        areas: [
            "Race & Ethnicity",
            "Urban Sociology",
            "Housing",
            "Social Inequality"
        ]
    },

    "lara-millan": {
        name: "Armando Lara-Millán",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Mentor",
        generation: 0,
        areas: [
            "Urban Sociology",
            "Race & Ethnicity",
            "Political Sociology",
            "Social Inequality"
        ]
    },


    /* =========================================
       Current Scholar
       ========================================= */

    julio: {
        name: "Julio Cedillo",
        role: "Sociologist",
        institution: "University of California, Berkeley",
        relationship: "Current Scholar",
        generation: -1,
        areas: [
            "Citizenship",
            "Immigration",
            "Race & Ethnicity",
            "Military Sociology",
            "Political Sociology",
            "Social Theory"
        ]
    }

};


/* =========================================
   Academic Relationships
   ========================================= */

const relationships = [

    /* Original lineage */

    ["giddings", "chapin"],
    ["chapin", "sewell"],
    ["sewell", "haller"],
    ["haller", "portes"],
    ["portes", "itzigsohn"],

    /* José's two branches */

    ["itzigsohn", "rodriguez-muniz"],
    ["itzigsohn", "hammer"],

    /* Both original branches lead to Julio */

    ["rodriguez-muniz", "julio"],
    ["hammer", "julio"],


    /* =========================================
       Second lineage
       ========================================= */

    ["ogles", "william-julius-wilson"],
    ["william-julius-wilson", "pattillo"],
    ["pattillo", "lara-millan"],
    ["lara-millan", "julio"]

];


/* =========================================
   Network Setup
   ========================================= */

function initializeGenealogy() {

    const container =
        document.getElementById("genealogyNetwork");

    if (!container) {
        console.warn(
            "genealogyNetwork container not found."
        );
        return;
    }


    /* Clear anything already inside */

    container.innerHTML = "";


    const width =
        container.clientWidth;

    const height =
        container.clientHeight;


    /* =========================================
       Create SVG
       ========================================= */

    const svg =
        d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr(
                "viewBox",
                `0 0 ${width} ${height}`
            );


    /* =========================================
       Main zoom container
       ========================================= */

    const network =
        svg.append("g");


    /* =========================================
       Zoom / Pan
       ========================================= */

    const zoom =
        d3.zoom()
            .scaleExtent([0.35, 4])
            .on("zoom", event => {

                network.attr(
                    "transform",
                    event.transform
                );

            });


    svg.call(zoom);


    /* =========================================
       Convert Data
       ========================================= */

    const nodeData =
        Object.entries(genealogy)
            .map(([id, person]) => ({
                id,
                ...person
            }));


    const linkData =
        relationships.map(
            ([source, target]) => ({
                source,
                target
            })
        );


    /* =========================================
       Links
       ========================================= */

    const links =
        network
            .append("g")
            .attr("class", "genealogy-links")
            .selectAll("line")
            .data(linkData)
            .enter()
            .append("line")
            .attr("class", "genealogy-link");


    /* =========================================
       Nodes
       ========================================= */

    const nodes =
        network
            .append("g")
            .attr("class", "genealogy-nodes")
            .selectAll("g")
            .data(nodeData)
            .enter()
            .append("g")
            .attr("class", "person-node")
            .attr(
                "data-person",
                d => d.id
            )
            .attr(
                "tabindex",
                0
            )
            .attr(
                "role",
                "button"
            );


    /* =========================================
       Node Circles
       ========================================= */

    nodes
        .append("circle")
        .attr(
            "class",
            "person-circle"
        )
        .attr(
            "r",
            d => {

                if (
                    d.id === "julio"
                ) {
                    return 8;
                }

                if (
                    d.id === "itzigsohn"
                ) {
                    return 7;
                }

                return 5.5;

            }
        );


    /* =========================================
       Names
       ========================================= */

    nodes
        .append("text")
        .attr(
            "class",
            "person-label"
        )
        .attr(
            "x",
            12
        )
        .attr(
            "y",
            4
        )
        .text(
            d => d.name
        );


    /* =========================================
       Hover
       ========================================= */

    nodes
        .on(
            "mouseenter",
            function(event, d) {

                highlightConnections(
                    d.id
                );

            }
        )

        .on(
            "mouseleave",
            clearConnections
        );


    /* =========================================
       Click
       ========================================= */

    nodes
        .on(
            "click",
            function(event, d) {

                event.stopPropagation();

                selectPerson(
                    d.id
                );

            }
        );


    /* =========================================
       Keyboard
       ========================================= */

    nodes
        .on(
            "keydown",
            function(event, d) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    selectPerson(
                        d.id
                    );

                }

            }
        );


    /* =========================================
       Dragging
       ========================================= */

    nodes.call(

        d3.drag()

            .on(
                "start",
                dragStarted
            )

            .on(
                "drag",
                dragged
            )

            .on(
                "end",
                dragEnded
            )

    );


    /* =========================================
       Force Simulation
       ========================================= */

    const simulation =
        d3.forceSimulation(nodeData)

            .force(
                "link",

                d3.forceLink(linkData)
                    .id(
                        d => d.id
                    )
                    .distance(105)
                    .strength(0.9)
            )

            .force(
                "charge",

                d3.forceManyBody()
                    .strength(-180)
            )

            .force(
                "center",

                d3.forceCenter(
                    width / 2,
                    height / 2
                )
            )

            .force(
                "collision",

                d3.forceCollide()
                    .radius(35)
            )

            .on(
                "tick",
                ticked
            );


    /* =========================================
       Clean Two-Lineage Layout
       ========================================= */

    const layoutPositions = {

        /* -----------------------------------------
           Original lineage
           ----------------------------------------- */

        giddings: {
            x: width * 0.25,
            y: height * 0.16
        },

        chapin: {
            x: width * 0.25,
            y: height * 0.27
        },

        sewell: {
            x: width * 0.25,
            y: height * 0.38
        },

        haller: {
            x: width * 0.25,
            y: height * 0.49
        },

        portes: {
            x: width * 0.25,
            y: height * 0.60
        },

        itzigsohn: {
            x: width * 0.25,
            y: height * 0.71
        },

        "rodriguez-muniz": {
            x: width * 0.15,
            y: height * 0.84
        },

        hammer: {
            x: width * 0.35,
            y: height * 0.84
        },


        /* -----------------------------------------
           Second lineage
           ----------------------------------------- */

        ogles: {
            x: width * 0.75,
            y: height * 0.16
        },

        "william-julius-wilson": {
            x: width * 0.75,
            y: height * 0.32
        },

        pattillo: {
            x: width * 0.75,
            y: height * 0.48
        },

        "lara-millan": {
            x: width * 0.75,
            y: height * 0.64
        },


        /* -----------------------------------------
           Shared endpoint
           ----------------------------------------- */

        julio: {
            x: width * 0.50,
            y: height * 0.91
        }

    };


    /* Give the simulation initial positions */

    nodeData.forEach(d => {

        const position =
            layoutPositions[d.id];

        if (position) {

            d.x = position.x;
            d.y = position.y;

        }

    });


    /* =========================================
       Tick
       ========================================= */

    function ticked() {

        links

            .attr(
                "x1",
                d => d.source.x
            )

            .attr(
                "y1",
                d => d.source.y
            )

            .attr(
                "x2",
                d => d.target.x
            )

            .attr(
                "y2",
                d => d.target.y
            );


        nodes

            .attr(
                "transform",
                d =>
                    `translate(${d.x}, ${d.y})`
            );

    }


    /* =========================================
       Drag Start
       ========================================= */

    function dragStarted(event, d) {

        if (!event.active) {

            simulation
                .alphaTarget(0.3)
                .restart();

        }

        d.fx = d.x;
        d.fy = d.y;

    }


    /* =========================================
       Drag
       ========================================= */

    function dragged(event, d) {

        d.fx = event.x;
        d.fy = event.y;

    }


    /* =========================================
       Drag End
       ========================================= */

    function dragEnded(event, d) {

        if (!event.active) {

            simulation
                .alphaTarget(0);

        }

        d.fx = null;
        d.fy = null;

    }


    /* =========================================
       Click Background
       ========================================= */

    svg.on(
        "click",
        () => {

            closePanel();

        }
    );


    /* =========================================
       Resize
       ========================================= */

    window.addEventListener(
        "resize",
        () => {

            const newWidth =
                container.clientWidth;

            const newHeight =
                container.clientHeight;


            svg
                .attr(
                    "width",
                    newWidth
                )

                .attr(
                    "height",
                    newHeight
                )

                .attr(
                    "viewBox",
                    `0 0 ${newWidth} ${newHeight}`
                );


            simulation
                .force(
                    "center",
                    d3.forceCenter(
                        newWidth / 2,
                        newHeight / 2
                    )
                )

                .alpha(
                    0.2
                )

                .restart();

        }
    );


    /* =========================================
       Reset Button
       ========================================= */

    const reset =
        document.getElementById(
            "resetGenealogy"
        );


    if (reset) {

        reset.addEventListener(
            "click",
            () => {

                closePanel();

                simulation
                    .alpha(1)
                    .restart();

                svg
                    .transition()
                    .duration(400)
                    .call(
                        zoom.transform,
                        d3.zoomIdentity
                    );

            }
        );

    }

}


/* =========================================
   Highlight Connections
   ========================================= */

function highlightConnections(
    selectedId
) {

    const connected =
        new Set();


    connected.add(
        selectedId
    );


    relationships.forEach(
        ([source, target]) => {

            if (
                source === selectedId
            ) {

                connected.add(
                    target
                );

            }

            if (
                target === selectedId
            ) {

                connected.add(
                    source
                );

            }

        }
    );


    document
        .querySelectorAll(
            ".person-node"
        )
        .forEach(node => {

            const id =
                node.dataset.person;

            node.classList.toggle(
                "dimmed",
                !connected.has(id)
            );

        });


    document
        .querySelectorAll(
            ".genealogy-link"
        )
        .forEach(link => {

            link.classList.add(
                "dimmed"
            );

        });

}


/* =========================================
   Clear Highlight
   ========================================= */

function clearConnections() {

    document
        .querySelectorAll(
            ".person-node"
        )
        .forEach(node => {

            node.classList.remove(
                "dimmed"
            );

        });


    document
        .querySelectorAll(
            ".genealogy-link"
        )
        .forEach(link => {

            link.classList.remove(
                "dimmed"
            );

        });

}


/* =========================================
   Select Person
   ========================================= */

function selectPerson(id) {

    const person =
        genealogy[id];


    if (!person) {
        return;
    }


    document
        .querySelectorAll(
            ".person-node"
        )
        .forEach(node => {

            node.classList.remove(
                "selected"
            );

        });


    const node =
        document.querySelector(
            `[data-person="${id}"]`
        );


    if (node) {

        node.classList.add(
            "selected"
        );

    }


    const panel =
        document.getElementById(
            "personPanel"
        );


    if (!panel) {
        return;
    }


    const areas =
        person.areas
            .map(
                area =>
                    `<span>${area}</span>`
            )
            .join("");


    panel.innerHTML = `

        <button
            type="button"
            class="close-panel"
            id="closePanel"
            aria-label="Close"
        >
            ×
        </button>

        <p class="panel-label">
            ${person.relationship}
        </p>

        <h2>
            ${person.name}
        </h2>

        <p class="panel-role">
            ${person.role}
        </p>

        <div class="panel-detail">

            <span>
                Institution
            </span>

            <strong>
                ${person.institution}
            </strong>

        </div>

        <div class="panel-detail">

            <span>
                Areas of Work
            </span>

            <div class="panel-areas">
                ${areas}
            </div>

        </div>

        <div class="panel-detail">

            <span>
                Place in Genealogy
            </span>

            <strong>
                ${person.relationship}
            </strong>

        </div>

    `;


    panel.classList.add(
        "open"
    );


    panel.setAttribute(
        "aria-hidden",
        "false"
    );


    const close =
        document.getElementById(
            "closePanel"
        );


    if (close) {

        close.addEventListener(
            "click",
            closePanel
        );

    }

}


/* =========================================
   Close Panel
   ========================================= */

function closePanel() {

    const panel =
        document.getElementById(
            "personPanel"
        );


    if (panel) {

        panel.classList.remove(
            "open"
        );

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    document
        .querySelectorAll(
            ".person-node"
        )
        .forEach(node => {

            node.classList.remove(
                "selected"
            );

        });


    clearConnections();

}


/* =========================================
   Initialize
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeGenealogy
);
