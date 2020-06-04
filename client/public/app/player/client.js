let token = sessionStorage.getItem("chemanimate-token");
let state = { step: 0 };
let objects;
let states;
let elements = {
    "O": {
        "name": "Oxygen",
        "type": "nonmetal",
        "oxidation_number": -2,
        "color": {
            "background": "#e13646",
            "text": "white",
        },
    },
    "H": {
        "name": "Hydrogen",
        "type": "nonmetal",
        "oxidation_number": [-1, 1],
        "color": {
            "background": "black",
            "text": "white",
        },
    },
    "Na": {
        "name": "Sodium",
        "type":"metal",
        "oxidation_number": 1,
        "color": {
            "background": "#f0ef8a",
            "text": "black",
        },
    },
    "N": {
        "name": "Nitrogen",
        "type": "nonmetal",
        "oxidation_number": [-3, 3, 5],
        "color": {
            "background": "#154e96",
            "text": "white",
        },
    },
    "Cl": {
        "name": "Chlorine",
        "type": "nonmetal",
        "oxidation_number": [-1, 1, 3, 5, 7],
        "color": {
            "background": "#c3e67c",
            "text": "black",
        },
    },
    "C": {
        "name": "Carbon",
        "type": "nonmetal",
        "oxidation_number": [-4, 4],
        "color": {
            "background": "#78532c",
            "text": "white",
        },
    },
    "Zn": {
        "name": "Zinc",
        "type": "metal",
        "oxidation_number": 2,
        "color": {
            "background": "#cfc8d0",
            "text": "black",
        },
    },
    "Sn": {
        "name": "Tin",
        "type": "metal",
        "oxidation_number": [-4, 2, 4],
        "color": {
            "background": "#c8cdd8",
            "text": "black",
        },
    },
    "Ni": {
        "name": "Nickel",
        "type": "metal",
        "oxidation_number": 2,
        "color": {
            "background": "#bbc1c1",
            "text": "black",
        },
    },
    "Al": {
        "name": "Aluminum",
        "type": "metal",
        "oxidation_number": 3,
        "color": {
            "background": "#acabb2",
            "text": "black",
        },
    },
    "Fe": {
        "name": "Iron",
        "type": "metal",
        "oxidation_number": [2, 3, 6],
        "color": {
            "background": "#413f40",
            "text": "white",
        },
    },
    "Pb": {
        "name": "Lead",
        "type": "metal",
        "oxidation_number": [2, 3, 6],
        "color": {
            "background": "#5c5969",
            "text": "white",
        },
    },
    "Cu": {
        "name": "Copper",
        "type": "metal",
        "oxidation_number": 2,
        "color": {
            "background": "#dcaf3e",
            "text": "black",
        },
    },
    "Br": {
        "name": "Bromine",
        "type": "nonmetal",
        "oxidation_number": [-1, 1, 3, 5],
        "color": {
            "background": "#4f2a81",
            "text": "white",
        },
    },
    "Au": {
        "name": "Gold",
        "type": "metal",
        "oxidation_number": [1, 3],
        "color": {
            "background": "#f2e15b",
            "text": "black",
        },
    },
    "Ag": {
        "name": "Silver",
        "type": "metal",
        "oxidation_number": 1,
        "color": {
            "background": "#e0e6e8",
            "text": "black",
        },
    },
    "Mn": {
        "name": "Manganese",
        "type": "metal",
        "oxidation_number": [2, 4, 7],
        "color": {
            "background": "#1d285e",
            "text": "white",
        },
    },
    "Mg": {
        "name": "Magnesium",
        "type": "metal",
        "oxidation_number": 2,
        "color": {
            "background": "#cb9add",
            "text": "black",
        },
    },
    "Pt": {
        "name": "Platinum",
        "type": "metal",
        "oxidation_number": [2, 4],
        "color": {
            "background": "#969fab",
            "text": "black",
        },
    },
    "Ca": {
        "name": "Calcium",
        "type": "metal",
        "oxidation_number": 2,
        "color": {
            "background": "#f0b55f",
            "text": "black",
        },
    },
    "K": {
        "name": "Potassium",
        "type": "metal",
        "oxidation_number": 1,
        "color": {
            "background": "#ea8a51",
            "text": "black",
        },
    },
    "Rb": {
        "name": "Rubidium",
        "type": "metal",
        "oxidation_number": 1,
        "color": {
            "background": "#e14090",
            "text": "black",
        },
    },
    "Li": {
        "name": "Lithium",
        "type": "metal",
        "oxidation_number": 1,
        "color": {
            "background": "#f1aed5",
            "text": "black",
        },
    },
    "S": {
        "name": "Sulphur",
        "type": "nonmetal",
        "oxidation_number": [-2, 2, 4, 6],
        "color": {
            "background": "#aac752",
            "text": "black",
        },
    },
}



let descriptions = {
    0: "atoms move, as positive and negative ions are attracted to eachother",
    1: "atoms move due to energy in the environment",
    2: "molecules were moved to clearly show products",
    3: "covalent bonds form between positive and negative ions that are both non-metals",
    4: "covalent bonds break, forming ions",
    5: "ionic bonds form between positive metal ions and negative non-metal ions",
    6: "ionic bonds break",
    7: "the more reactive metal gets to bond with the negative ions",
    8: "new products are formed in a double replacement reaction if one of them is not soluble in the solution",
    9: "atoms turn into ions due to energy in the environment",
    10: "ions turn back into neutral atoms"
}

let activitySeries = [
    "Li",
    "Rb",
    "K",
    "Ca",
    "Na",
    "Mg",
    "Al",
    "Mn",
    "Zn",
    "Fe",
    "Ni",
    "Sn",
    "Pb",
    "H",
    "Cu",
    "Ag",
    "Pt",
    "Au",
];

//insane regex check for mobile phone
window.mobileCheck = function () {
    let check = false;
    (function (a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v1050|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

// const browserOnPhone = window.mobileCheck()
const browserOnPhone = window.mobileCheck();

//SVG CONSTRUCTORS
const Line = (
    ids,
    center1,
    center2,
    color = "black",
    thickness = 2,
    dashed = false,
    outerId = "#svg"
) => {
    return $(`<line  
    ${dashed && 'stroke-dasharray="1,1"'}
    class='atom atom-${ids[0]} atom-${ids[1]} atom-bond' x1=${center1.x} y1=${
        center1.y
        } x2=${center2.x} y2=${
        center2.y
        } style="stroke:${color};stroke-width:${thickness}"></line>`);
};

const Circle = (id, center, color = "black", radius = 10, outerId = "#svg") => {
    return $(
        `<circle draggable="true" class='atom atom-${id}' r=${radius} cx=${center.x} cy=${center.y} fill=${color} stroke='black' ondragstart='handleCircleClick("${id}")'></circle>`
    );
};

const SvgText = (
    id,
    center,
    text,
    length,
    color = "black",
    size = 12,
    outerId = "#svg",
    className
) => {
    return $(
        `<text  draggable="true" ondragstart='handleTextClick("${id}")' style='font-size: ${size}px;' text-anchor="middle" alignment-baseline="central"  class='atom atom-${id} ${className}' x=${center.x} y=${center.y} fill=${color} textLength=${length} >${text}</text>`
    );
};

const Bond = (ids, center1, center2, outerId = "#svg") => {
    if (ids[2] == "triple") {
        $(outerId).append(Line(ids, center1, center2, "black", 8));
        $(outerId).append(Line(ids, center1, center2, "white", 4));
        $(outerId).append(Line(ids, center1, center2, "black", 2));
    } else if (ids[2] == "double") {
        $(outerId).append(Line(ids, center1, center2, "black", 6));
        $(outerId).append(Line(ids, center1, center2, "white"));
    } else if (ids[2] == "ionic") {
        $(outerId).append(Line(ids, center1, center2, "#cccccc", 2, "dashed"));
    } else {
        $(outerId).append(Line(ids, center1, center2));
    }
};

const Electrons = (id, pos, num, outerId = "#svg") => {
    $(outerId).append(SvgText(id, pos, "e", 8, "black", 5));
    $(outerId).append(
        SvgText(id, { x: pos.x + 4, y: pos.y - 2 }, "-" + num, 4, "black", 3)
    );
};

const Atom = (
    id,
    center,
    text,
    color = "black",
    charge = 0,
    outerId = "#svg"
) => {
    $(outerId).append(Circle(id, center, color.background, 10, outerId));
    $(outerId).append(
        SvgText(
            id,
            { x: center.x, y: center.y },
            text,
            14,
            color.text,
            12,
            outerId,
            "symbol"
        )
    );

    if (charge !== 0) {
        $(outerId).append(
            Circle(id, { x: center.x + 8, y: center.y - 8 }, "white", 5)
        );

        if (charge == -1) charge = "-";

        if (charge == 1) charge = "+";

        if (charge > 1) charge = "+" + charge;

        $(outerId).append(
            SvgText(
                id,
                { x: center.x + 8, y: center.y - 9 },
                charge,
                8,
                "black",
                7
            )
        );
    }
};

//functions
const render = () => {
    const step = state.step;
    $("#description").empty();
    $("#svg").empty();
    $("#previousStep").show();
    $("#nextStep").show();
    $("#reactants").removeClass('text-underline')
    $("#products").removeClass('text-underline')

    // if first step
    if (step < 1 && !chemAnimateConfig.urlPrevious) {
        $("#reactants").addClass('text-underline')
        $("#previousStep").hide();
    }

    // if last step
    if (step == states.length - 1 && !chemAnimateConfig.urlNext) {
        $("#products").addClass('text-underline')
        $("#nextStep").hide();
    }

    let positions = states[step].positions;

    //render bonds
    states[step].bonds.forEach((bond) => {
        object1 = positions.find((obj) => bond[0] == obj.id);
        object2 = positions.find((obj) => bond[1] == obj.id);
        Bond(bond, object1, object2);
    });

    //render atoms
    positions.forEach((position) => {
        if (position.close) return false;

        object = objects.find((obj) => obj.id == position.id);

        if (object.type == "electron")
            Electrons(position.id, position, object.amount);
        else
            Atom(
                position.id,
                position,
                object.text,
                elements[object.text].color,
                position.charge
            );
    });

    //render extra info
    $("#description").text(descriptions[states[step].description]);
    $("#step").html(step + 1);
    document.getElementById("chemAnimate-display").innerHTML += "";
};

const nextStep = () => {
    if (state.step == states.length - 1) {
        location.href = chemAnimateConfig.urlNext;
        return null;
    }

    let translation = false;
    states[state.step].positions.forEach((obj) => {
        let obj2 = states[state.step + 1].positions.find(
            (obj2) => obj2.id === obj.id
        );
        let dx = obj2.x - obj.x;
        let dy = obj2.y - obj.y;
        if (dx !== 0 || dy !== 0) {
            translation = true;
            $(".atom-" + obj.id).css(
                "transform",
                `translate(${dx}px, ${dy}px)`
            );
            if (browserOnPhone) {
                $("text.atom-" + obj.id).hide();
            }
        }
    });
    state.step += 1;
    if (translation) {
        setTimeout(() => {
            if (browserOnPhone) {
                $("text.atom").show();
            }
            render();
        }, 1200);
    } else {
        render();
    }
};

const previousStep = () => {
    if (state.step == 0) {
        location.href = chemAnimateConfig.urlPrevious;
        return null;
    }

    let translation = false;

    states[state.step].positions.forEach((obj) => {
        try {
            let obj2 = states[state.step - 1].positions.find(
                (obj2) => obj2.id === obj.id
            );
            let dx = obj2.x - obj.x;
            let dy = obj2.y - obj.y;
            if (dx !== 0 || dy !== 0) {
                translation = true;
                $(".atom-" + obj.id).css(
                    "transform",
                    `translate(${dx}px, ${dy}px)`
                );
                if (browserOnPhone) {
                    $("text.atom-" + obj.id).hide();
                }
            }
        } catch {

        }
    });
    state.step -= 1;

    if (translation) {
        setTimeout(() => {
            render();
            if (browserOnPhone) {
                $("text.atom").show();
            }
        }, 1200);
    } else {
        render();
    }
};

const loadAnimation = (name) => {
    // PRODUCTION MODE
    fetch("../../api/animations/" + name, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            state.step = 0;

            console.log(data);
            objects = data.objects;
            states = data.states;

            $("#formula").html(`<span id='reactants'>${data.reactants}</span> → <span id='products'>${data.products}</span>`);
            $("#animation-name").text(data.name);
            $("#chemAnimate-display").html(`<svg viewBox='0 0 
                ${data.svgDimensions ? data.svgDimensions.x : 200} 
                ${data.svgDimensions ? data.svgDimensions.y : 100}
            ' id='svg'></svg>`);

            render();

            if (data.animation.showActivitySeries) {
                $(`#activity-series .list-group`).append(
                    `<p class='text-center text-white mb-0'><b>ACTIVITY SERIES</b></p>`
                );
                $(`#activity-series .list-group`).append(
                    `<p class='text-center text-white mb-0'>MOST REACTIVE</p>`
                );

                activitySeries.forEach((element) => {
                    $(`#activity-series .list-group`).append(`
                    <li class="list-group-item"><span class='element' style='background:${
                        elements[element]
                            ? elements[element].color.background
                            : "black"
                        };color:${
                        elements[element]
                            ? elements[element].color.text
                            : "white"
                        }'> ${element}</span> ${
                        elements[element] ? elements[element].name : null
                        }</li>
                    `);
                });

                $(`#activity-series .list-group`).append(
                    `<p class='text-center text-white mb-0'>LEAST REACTIVE</p>`
                );
            }
        });
};

const init = () => {
    state.step = $("#description").empty();
    $("#formula").html("");
};

const autoPlay = () => {
    let direction = "forwards";
    setInterval(() => {
        if (direction == "forwards") {
            nextStep();
            if (state.step == states.length - 1) {
                direction = "backwards";
            }
        } else if (direction == "backwards") {
            previousStep();
            if (state.step == 0) {
                direction = "forwards";
            }
        }
    }, 1700);
};

$("#nextStep").on("click", nextStep);

$("#previousStep").on("click", previousStep);

$(document).ready(() => {
    init();
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("a")) {
        loadAnimation(urlParams.get("a"));
    } else if (!chemAnimateConfig.animationName) {
        loadAnimation("default");
    } else {
        loadAnimation(chemAnimateConfig.animationName);
    }

    if (chemAnimateConfig.autoPlay) {
        autoPlay();
    }
});
