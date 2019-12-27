$(function () {
    var ar = new Array(7);
    for (let cki = 0; cki < ar.length; cki++) {
        ar[cki] = [];
    }
    var ar2 = new Array(12);
    for (let cki2 = 0; cki2 < ar2.length; cki2++) {
        ar2[cki2] = [];
    }
    var j = 0; //used as a counter in timeinterval function
    var dif = 0; //difficulty
    var timerr; //timer
    $("#menudiv").animate({ "left": "0", "opacity": "1" }, 1000); //the cover comes in
    $("#playb").one("click", function () { //playbutton click function
        $("#menudiv").fadeOut(800);
        $("#playt").delay(800).fadeIn(800);
        dif = $("#sbox").val();
        $("body").css({"background-image": "url(\"images/space.jpg\")", "background-size": "cover"});
        for (let i = 0; i < dif; i++) {
            do {
                var num1 = Math.floor(Math.random() * 4) + 1;
                var num2 = Math.floor(Math.random() * 6) + 1;
            } while (ar[num1][num2] != null);
            ar[num1][num2] = i;
            ar2[i][0] = num1;
            ar2[i][1] = num2;
            $(`#playt tr:nth-of-type(${num1}) td:nth-of-type(${num2})`).css("opacity", '1');
        }
        timerr = setInterval(function () {//numbers show up
            $(`#playt tr:nth-of-type(${ar2[j][0]}) td:nth-of-type(${ar2[j][1]}) div`).text(j + 1)
                .animate({ "opacity": "0" }, 0)
                .animate({ "opacity": "1" }, 300).delay(1000)
                .animate({ "opacity": "0" }, 700).addClass("popped");
            j++;
            if (dif == j) {
                window.clearTimeout(timerr);
            }
        }, 2000);
    });
    var counter = 0;
    $("#playt tr td").on("click", ".popped", function () {//user clicks on the boxes
        counter++;
        if ($(this).text() == counter) {
            $(this).parent().html(`<img style="width: 50px; height: 50px; margin-top: 15px;" src="images/right.png" alt="">`);
            if (counter == dif) {
                $("h1").text("Congratulations").css("color", "green");
                $("p:first").text(`You completed level ${counter}`);
                $("p:last").text(`F5 to restart game.`);
                $("#playt tr td").off("click", ".popped");
            }
        } else {
            $("p:first").text(`You failed in level ${counter}`);
            $(this).parent().html(`<img style="width: 50px; height: 50px; margin-top: 15px;" src="images/wrong.png" alt="">`);
            $("h1").text("Failed").css("color", "red");
            $("p:last").text(`F5 to restart game.`);
            $("#playt tr td").off("click", ".popped");
            window.clearTimeout(timerr);
        }
    });
});
