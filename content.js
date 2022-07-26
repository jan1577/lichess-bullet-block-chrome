
// parent element that does not change when lobby/ quick pairing etc. are opened
const parent_lobby = document.querySelector("#main-wrap > main");


const mutationObserver = new MutationObserver(mutations => {

    // lobby is opended
    if (mutations[0].addedNodes[0].className == "lobby__app lobby__app-real_time"){
        lobby_open();
    }

    // quick pairing is opened
    else if (mutations[0].addedNodes[0].className == "lobby__app lobby__app-pools"){
        remove_bullet_QP();
    }
});

mutationObserver.observe(parent_lobby, {childList: true});


function remove_bullet_QP(){
    let _bullet1 = document.querySelector('[data-id="1+0"]');
    let _bullet2 = document.querySelector('[data-id="2+1"]');
    _bullet1.remove();
    _bullet2.remove();
}


function lobby_open(){

    // add Mutation observer to <table class"hools__list"> to check if lobby is updated
    games_table = document.querySelector(
        "#main-wrap > main > div.lobby__app.lobby__app-real_time > div.lobby__app__content.lreal_time > table"
    );

    const mutationObserver_lobby = new MutationObserver(mutations => {
        // lobby is refreshed -> remove games once again
        remove_bullet_lobby();
    });
    
    mutationObserver_lobby.observe(games_table, {childList: true, subtree: true})
    
}


function remove_bullet_lobby(){

    games_table = document.querySelector(
        "#main-wrap > main > div.lobby__app.lobby__app-real_time > div.lobby__app__content.lreal_time > table"
    );
    
    var tbody = games_table.getElementsByTagName('tbody')[0];
    var tableRow = tbody.getElementsByTagName('tr');

    // loop through all games. if Bullet -> set display to none 
    for (var t = 0; t < tableRow.length; t++){
        var game_title = tableRow[t].title;
        // use substring bullet to remove both bullet and ultrabullet
        if (game_title.includes("Bullet")){
            tableRow[t].style.display = "none";
        }
    }
}


// remove bullet elements when first opening the page 
// if statement to ensure that QP is open in case of reload
if (document.querySelector('[data-id="1+0"]')){
    remove_bullet_QP();
}
// remove bullet games when page is refreshed while lobby is opened
else if (document.querySelector("#main-wrap > main > div.lobby__app.lobby__app-real_time > div.lobby__app__content.lreal_time > table > thead > tr > th:nth-child(2)")){
    lobby_open();
}


// slider to create game
// change min value to 7 (3 min)
if (document.querySelector("#modal-wrap > div > div.setup-content > div.time-mode-config.optional-config > div.time-choice.range > input")){
    let slider = document.querySelector(
        "#modal-wrap > div > div.setup-content > div.time-mode-config.optional-config > div.time-choice.range > input"
    );
    slider.min = 7;
}


//  remove new opponent button in played games
if (document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.rcontrols > div")){
    let new_opponent = document.querySelector(
        "#main-wrap > main > div.round__app.variant-standard > div.rcontrols > div > a"
    );
    console.log(new_opponent);
    console.log(new_opponent.href);
    let link = new_opponent.href.toString();
    if (link.includes("1+0") || link.includes("2+1")){
        console.log("bullet detected")
        document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.rcontrols > div > a:nth-child(2)").style.display = "none";
        // document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.rcontrols").stlye.display = "none";
    }
    else {
        console.log(" no bullet")
        // document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.rcontrols").style.display = "block";
        document.querySelector("#main-wrap > main > div.round__app.variant-standard > div.rcontrols > div > a:nth-child(2)").style.display = "block";
    }
}
