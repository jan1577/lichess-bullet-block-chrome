// buttons in menu div
let bullet1 = document.querySelector('[data-id="1+0"]');
let bullet2 = document.querySelector('[data-id="2+1"]');

// parent element that does not change when lobby/ quick pairing etc. are opened
const parent_lobby = document.querySelector("#main-wrap > main");

const mutationObserver = new MutationObserver(mutations => {
    // lobby is opended
    if (mutations[0].addedNodes[0].className == "lobby__app lobby__app-real_time"){
        ;
    }
    // quick pairing is opened
    else if (mutations[0].addedNodes[0].className == "lobby__app lobby__app-pools"){
        remove_bullet_QP();
    }
})

mutationObserver.observe(parent_lobby, {childList: true})
// mutationObserver.disconnect();

function remove_bullet_QP(){
    bullet1 = document.querySelector('[data-id="1+0"]');
    bullet2 = document.querySelector('[data-id="2+1"]');
    bullet1.remove();
    bullet2.remove();
}

// remove bullet elements when first opening the page
remove_bullet_QP();




