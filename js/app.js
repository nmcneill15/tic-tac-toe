$(function() {
  var turn = 0;
  var x_o = ["X", "O"];
  var x_occupied = [];
  var o_occupied = [];

  var winningCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

  $("#new-game, #play-again").on("click", function() {
    newGame();
  });

  $("#grid").on("click", function(e) {
    cell = e.target;
    add_x_o(cell);
    checkCombo();
  })
  .on("mouseenter", function() {
    var tooltip = $("#tooltip");
    showToolTip();
    $(this).on("mousemove", function(e) {
      mouse = e;
      var mousex = mouse.pageX + 20;
      var mousey = mouse.pageY + 20;
      tooltip.css( {top: mousey, left: mousex });
    });
  })
  .on("mouseleave", function() {
    $("#tooltip").fadeOut();
  });

  function newGame() {
    turn = 0;
    x_occupied = [];
    o_occupied = [];
    $("#modal").fadeOut();
    $("#grid td").text("");
    $("#line").removeAttr("style").fadeOut();
  }



  function add_x_o(cell) {
    if (cell.innerText === "") {
      $(cell).text(x_o[turn]);
      var cellNum = parseInt(cell.id);
      if (x_o[turn] === "X") {
        x_occupied.push(cellNum);
      } else {
        o_occupied.push(cellNum);
      }

      $("#y-turn, #x-turn").toggleClass("my-turn");
      turn--;
      turn = Math.abs(turn);
      showToolTip();
    } else {
      $("#tooltip").text("Choose an Empty Square");
    }

  }

  function showToolTip() {
    $("#tooltip").fadeIn().text(x_o[turn] + "'s turn");
  }

  function checkCombo() {
    x_occupied = x_occupied.sort();
    o_occupied = o_occupied.sort();

    for (i = 0; i < winningCombos.length; i++) {
      console.log(x_occupied.toString().indexOf(winningCombos[i].toString()));
      if (x_occupied.toString().indexOf(winningCombos[i].toString()) !== -1) {
        showLine("x", winningCombos[i].toString());
        $("#modal").fadeIn();
        $("#modal h3").text("Congratulations! X Has Won!");
        console.log(x_occupied.toString());
      } else if (o_occupied.toString().indexOf(winningCombos[i].toString()) !== -1) {
        showLine("o", winningCombos[i].toString());
        $("#modal").fadeIn();
        $("#modal h3").text("Congratulations! O Has Won!");
        console.log("o has won");
      }
    }
  }

  function showLine(x_o, winningCombo) {
    $("#line").attr("class", "line");
    switch (winningCombo) {
      case "1,2,3":
        $("#line").fadeIn().addClass("straight-line")
        .css({ left: 0, top: "3.33rem", width: "20rem", height: ".25rem" });
        break;
      case "4,5,6":
        $("#line").fadeIn().addClass("straight-line")
        .css({ left: 0, top: "10rem", width: "20rem", height: ".25rem" });
        break;
      case "7,8,9":
        $("#line").fadeIn().addClass("straight-line")
        .css({  left: 0, top: "16.667rem", width: "20rem", height: ".25rem" });
        break;
      case "1,4,7":
        $("#line").fadeIn().addClass("straight-line")
        .css({  left: "3.33rem", top: 0, width: ".25rem", height: "20rem" });
        break;
      case "2,5,8":
        $("#line").fadeIn().addClass("straight-line")
        .css({  left: "10rem", top: 0, width: ".25rem", height: "20rem" });
        break;
      case "3,6,9":
        $("#line").fadeIn().addClass("straight-line")
        .css({  left: "16.667rem", top: 0, width: ".25rem", height: "20rem" });
        break;
      case "1,5,9":
        $("#line").fadeIn().addClass("diag-line-down");
        break;
      case "3,5,7":
        $("#line").fadeIn().addClass("diag-line-up");
        break;
    }
  }

});
