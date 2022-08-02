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
    let price_needed = 0;
    if ($(".w--redirected-checked").length > 0) {
        $("#total-price-div").addClass("open");
    }
    else {
        $("#total-price-div").removeClass("open");
    }

    // update total price div amount

    for (i = 0; i < $(".w--redirected-checked").length; i++) {
        let full_text = $(".w--redirected-checked")[i].closest(".item").innerText;  // Classic Chocolate (Square)\n₹ 200 / pound\n₹ 400\nWeight (pound)\n1\n1\nQuantity\n02
        price_needed = price_needed + parseInt(full_text.substring(full_text.indexOf("d\n₹ ") + 1, full_text.indexOf("\nWeight")).replace('₹ ', ''));  // 400  
    }
    //console.log(price_needed);
    $("#total-price").text(price_needed);
}






//item names




// what if a cake is selected with multiple quantities, with different weights
// need to multiple the weight div, based on the number of quantities selected

let item_price1 = parseInt($("#item1-price").text().replace('₹ ', '').replace(' / pound', '')); //item price

$("#item1-plus").click(function () {

    let item_total1 = 0;

    let id_naming = 'item1-weight' + ($(".counter-div.item1").length + 1);

    $('#item1-weight1')
        .clone()
        .attr('id', id_naming)
        .insertAfter($('[id^=item1-weight]:last'));

    $('#' + id_naming).children()[1].textContent = 1;

    let quan = parseInt($("#item1-quan")[0].innerText); // 1
    let no_of_weights = $(".counter-div.item1").length; // no. of times weight div cloned

    //update the price based on weight
    for (i = 0; i < no_of_weights; i++) {
        item_total1 = item_total1 + (parseInt($(".counter-div.item1")[i].childNodes[1].innerText) * item_price1); // weight value (Eg: '2' pound)
    }

    if (parseInt($("#item1-quan")[0].innerText) >= 1) {
        quan++;
        1 == quan && (quan = "01"), 2 == quan && (quan = "02"), 3 == quan && (quan = "03"), 4 == quan && (quan = "04"), 5 == quan && (quan = "05"), 6 == quan && (quan = "06"), 7 == quan && (quan = "07"), 8 == quan && (quan = "08"), 9 == quan && (quan = "09")
        $("#item1-quan").text(quan);

        //let item_total1 = item_price1 * quan; //item price (total) calculated (based on quantity)
        $("#item1-total").text("₹ " + item_total1); //printing the item price (total) with ₹ sign

    }
});

$("#item1-minus").click(function () {

    let item_total1 = 0;

    let quan = parseInt($("#item1-quan")[0].innerText); //more than 1
    let no_of_weights = $(".counter-div.item1").length; //no. of times weight div cloned

    if (no_of_weights > 1) {
        $('[id^=item1-weight]:last').remove();
    }

    if (parseInt($("#item1-quan")[0].innerText) > 1) {
        quan--;

        1 == quan && (quan = "01"), 2 == quan && (quan = "02"), 3 == quan && (quan = "03"), 4 == quan && (quan = "04"), 5 == quan && (quan = "05"), 6 == quan && (quan = "06"), 7 == quan && (quan = "07"), 8 == quan && (quan = "08"), 9 == quan && (quan = "09")
        $("#item1-quan").text(quan);

        //update the price based on weight
        for (i = 0; i < no_of_weights - 1; i++) {
            item_total1 = item_total1 + (parseInt($(".counter-div.item1")[i].childNodes[1].innerText) * item_price1); // weight value (Eg: '2' pound)
        }

        //let item_total1 = item_price1 * quan; //item price (total) calculated (based on quantity)
        $("#item1-total").text("₹ " + item_total1); //printing the item price (total) with ₹ sign

    }
});



// weight counter click function

//$(".weight-plus").click(function () {

Gator(document).on('click', '.weight-plus', function (e) {
    console.log('clicked on', this);


    //$(".weight-plus").on("click", function () {
    //if($(".counter-div.item1").length == 1)
    //{

    let selected_weight = parseInt($(this).parent()[0].childNodes[1].innerText);
    if (selected_weight >= 1) {
        selected_weight++;
        $(this).parent()[0].childNodes[1].textContent = selected_weight;
    }

    console.log(selected_weight);

    //testing
    let item_total1 = 0;
    let quan = parseInt($("#item1-quan")[0].innerText); // 1
    let no_of_weights = $(".counter-div.item1").length; // no. of times weight div cloned
    //update the price based on weight
    for (i = 0; i < no_of_weights; i++) {
        item_total1 = item_total1 + (parseInt($(".counter-div.item1")[i].childNodes[1].innerText) * item_price1); // weight value (Eg: '2' pound)
    }
    $("#item1-total").text("₹ " + item_total1); //printing the item price (total) with ₹ sign
    //testing

    //}
    //}
    //});

});



Gator(document).on('click', '.weight-minus', function (e) {
    console.log('clicked on', this);

    //$(".weight-minus").click(function () {
    //$(".weight-minus").on("click", function () {
    //if($(".counter-div.item1").length == 1)
    //{

    let selected_weight = parseInt($(this).parent()[0].childNodes[1].innerText);
    if (selected_weight > 1) {
        selected_weight--;
        $(this).parent()[0].childNodes[1].textContent = selected_weight;
    }

    console.log(selected_weight);

    //testing
    let item_total1 = 0;
    let quan = parseInt($("#item1-quan")[0].innerText); // 1
    let no_of_weights = $(".counter-div.item1").length; // no. of times weight div cloned
    //update the price based on weight
    for (i = 0; i < no_of_weights; i++) {
        item_total1 = item_total1 + (parseInt($(".counter-div.item1")[i].childNodes[1].innerText) * item_price1); // weight value (Eg: '2' pound)
    }
    $("#item1-total").text("₹ " + item_total1); //printing the item price (total) with ₹ sign
    //testing

    //}
    //}
    //});
});



//delivery code generator


//payment code generator
/*
upi://pay?pa=druhin13@okicici&pn=Druhin&am=500&cu=INR&tn=Juicy Orange x1&
*/
