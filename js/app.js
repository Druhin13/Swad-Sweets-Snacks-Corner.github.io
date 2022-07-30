$(function () {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $("html, body").css({ "width": w, "height": h });
});


// item name search function

const search_input = document.querySelector("[data-search]");

search_input.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();;
    //console.log(value);

    items = document.querySelectorAll(".item");
    //console.log(items);

    for (i = 0; i < items.length; i++) {
        if (items[i].innerText.toLowerCase().includes(value)) {
            //items[i].addClass("hide");
            items[i].classList.remove("hide");
        }
        else {
            //items[i].removeClass("hide");
            items[i].classList.add("hide");
        }
    }

    listupdate();

})


function listupdate() {
    // list item update

    let c1_length = 0;
    //let c1_hidden = 0;

    for (i = 0; i < $("#category1-list").children().length; i++) {
        if ($("#category1-list").children()[i].classList.contains("hide") == false) {
            c1_length++;
        }
    }

    c1_term = " items"

    if (c1_length == 0) {
        $("#menu-category1").css("display", "none");
    }
    else if (c1_length == 1) {
        c1_term = " item";
        $("#menu-category1").css("display", "flex");
    }
    else {
        c1_term = " items";
        $("#menu-category1").css("display", "flex");
    }

    $("#category1-items").text(c1_length + c1_term);
}




//clear search term

$('#clear_search').click(function (e) {
    var searchform = document.getElementById("wf-form-Search");
    searchform.reset();

    items = document.querySelectorAll(".item");
    for (i = 0; i < items.length; i++) {
        items[i].classList.remove("hide");
    }

    listupdate();
});



// list update when page loaded

c1_length = $("#category1-list").children().length;

c1_term = " items"

if (c1_length == 0) {
    $("#menu-category1").css("display", "none");
}
else if (c1_length == 1) {
    c1_term = " item";
    $("#menu-category1").css("display", "flex");
}
else {
    c1_term = " items";
    $("#menu-category1").css("display", "flex");
}

$("#category1-items").text(c1_length + c1_term);




// total price div show up / hide

let timer1 = setInterval(totalpricediv, 10);
function totalpricediv() {
    checked_items = document.querySelectorAll(".w--redirected-checked");
    if (checked_items.length > 0) {
        $("#total-price-div").addClass("open");
    }
    else {
        $("#total-price-div").removeClass("open");
    }
}




//item names


//item order counter (add/subtract)


//delivery code generator


//payment code generator
/*
upi://pay?pa=druhin13@okicici&pn=Druhin&am=500&cu=INR&tn=Juicy Orange x1&
*/
