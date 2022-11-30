/**
    File: index.js
    Name: Chris Olah
    Github Username: Colah2122
    Date: 11/28/2022
    Email: christopher_olah@student.uml.edu
    Information: GUI Homework 4 Part 2 javascript/jquery. This file contains the 
    javascript and jquery to make saving and deleting table tabs possible. Also, 
    incorporation of UI sliders for determing the column/row min and max values is 
    programmed as well.
    Sources: 
        https://www.tutorialspoint.com/jqueryui/jqueryui_tabs.htm
**/ 

// Declare variables for use for jquery and javascript
var tab_choice = [];
var tab_current = "";
var num_tabs = 1;
var min_col;
var max_col;
var min_row;
var max_row;
const user_values = document.querySelector('.user_values');
const min_col_input = document.getElementById("min_col_input");
const max_col_input = document.getElementById("max_col_input");
const min_row_input = document.getElementById("min_row_input");
const max_row_input = document.getElementById("max_row_input");
const table = document.getElementById("table");
var min_col, max_col, min_row, max_row;


// Updates table when presented with new values for columns and rows
function update_table() {
    if ($("#user_values").valid() == true) {
      min_col = Math.round(document.getElementById("min_col").value);
      max_col = Math.round(document.getElementById("max_col").value);
      min_row = Math.round(document.getElementById("min_row").value);
      max_row = Math.round(document.getElementById("max_row").value);
      text.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
      table.innerHTML = create_table(min_col, max_col, min_row, max_row);
    }
}

// Creates multiplication table and fills it with correct calculations
function create_table(min_col, max_col, min_row, max_row) {
    var values = "";
    values += "<center><table>";
    values +="<tr><th id = \"space\"><center>x</center></th>"
    for (var a = min_col; a <= max_col; a++) {
        values +="<th id=\"row\"><center>" + a + "</center></th>";
    }
    values += "</tr>";
    for (var i = min_row; i <= max_row; i++) {
        values += "<tr>";
        values += "<th id=\"row\"><center>" + i + "</center></th>"
        for (var j = min_col; j <= max_col; j++) {
          values += "<td><center>" + i * j + "</center></td>";
        }
        values += "</tr>";
    }

    values += "</table></center>";
    return values;
}

// Adding select tab feature that will turn table green when it has been selected 
function choose_tab() {
    tab_current = $("#tabs_table .ui-tabs-panel:visible").attr("id");
    if (tab_current != null) {
      if (!tab_choice.includes(tab_current)) {
          tab_choice.push(tab_current);
          // make green
          document.getElementById(tab_current).style.color = "green";
      } else {
          tab_choice.splice(tab_choice.indexOf(tab_current), 1);
          // make black again
          document.getElementById(tab_current).style.color = "black";
      }
  }
}

// Adding feature that removes all selected tabs when removed tabs is clicked
function remove_tabs() {
    while (tab_choice.length > 0) {
        $("li[aria-controls='" + tab_choice[tab_choice.length-1] +"']").remove();
        $("#" + tab_choice[tab_choice.length-1]).remove();
        tab_choice.pop();
    }
}

// main jquery source that checks input and gives error messages if necessary while displaying multiplicaiton table
$(function() {
    // Sliders
    $("#min_col_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#min_col").val(ui.value);
            update_table();
        }
    });
    $("#min_col").on("keyup", function() {
        $("#min_col_slider").slider("value", this.value);
        update_table();
    });
    $("#max_col_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#max_col").val(ui.value);
            update_table();
        }
    });
    $("#max_col").on("keyup", function() {
        $("#max_col_slider").slider("value", this.value);
        update_table();
    });
    $("#min_row_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#min_row").val(ui.value);
            $(".user_values").validate();
            update_table();
        }
    });
    $("#min_row").on("keyup", function() {
        $("#min_row_slider").slider("value", this.value);
        update_table();
    });
    $("#max_row_slider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#max_row").val(ui.value);
            update_table();
        }
    });
    $("#max_row").on("keyup", function() {
        $("#max_row_slider").slider("value", this.value);
        update_table();
    });
    $("#tabs_table").tabs();
    // verify function that gives error message if column/row values are in wrong order (min above max/max above min)
    jQuery.validator.addMethod("verify", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return n1 <= n2;
          } else {
              return n1 >= n2;
          }
    }, "<p>Mininum {1} value must be</p><p> <= Maximum {1} value!</p>");
    // verify_range function to assure range is correct
    jQuery.validator.addMethod("verify_range", function(value, element, params) {
          var n1 = parseInt(value);
          var n2 = parseInt($('input[name="' + params[0] +'"]').val());
          if (isNaN(n1) || isNaN(n2)) {
              return true;
          }
          if (params[2]) {
              return Math.abs(n2 - n1) <= 200;
          } else {
              return Math.abs(n1 - n2) <= 200;
          }
    },"<p>{1} range cannot exceed 200</p><p>between minimum and maximum values!</p>");
    // validates that user input for values are in fact numbers and are usable for calculation
    $("#user_values").validate({
        rules: {
            min_col : {
                required: true,
                number: true,
                verify: ['max_col', 'Column', true],
                verify_range: ['max_col', 'Column', true]
            },
            max_col : {
                required: true,
                number: true,
                verify: ['min_col', 'Column', false],
                verify_range: ['min_col', 'Column', false]
            },
            min_row : {
                required: true,
                number: true,
                verify: ['max_row', 'Row', true],
                verify_range: ['max_row', 'Row', true]
            },
            max_row : {
                required: true,
                number: true,
                verify: ['min_row', 'Row', false],
                verify_range: ['min_row', 'Row', false]
            }
        },
        messages: {
            min_col: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            max_col: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            min_row: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            },
            max_row: {
                required: "<p>Please enter a number</p>",
                number: "<p>Value must be a number</p><p>No letters or Mathematical symbols allowed</p>"
            }
        },
        // Designate error messages to correct location
        errorPlacement: function(error, element) {
            if (element.attr("name") == "min_col") {
                error.appendTo($("#min_col_input"));
            } else if (element.attr("name") == "max_col") {
                error.appendTo($("#max_col_input"));
            } else if (element.attr("name") == "min_row") {
                error.appendTo($("#min_row_input"));
            } else if (element.attr("name") == "max_row") {
                error.appendTo($("#max_row_input"));
            }
        },
        // Rounds off decimal values
        submitHandler: function(form, e) {
            // table
            e.preventDefault();
            min_col = Math.round(document.getElementById("min_col").value);
            max_col = Math.round(document.getElementById("max_col").value);
            min_row = Math.round(document.getElementById("min_row").value);
            max_row = Math.round(document.getElementById("max_row").value);
            text.innerHTML = "<p>Decimal numbers are rounded to whole numbers.</p>";
            table.innerHTML = create_table(min_col, max_col, min_row, max_row);
            // tab
            var tab_title = "(" + min_col + "," + max_col + ") x (" + min_row + "," + max_row + ")";
            $("#tabs_table").tabs("destroy");
            $("#tab_all").html($("#tab_all").html() +"<li><a href='#divTab" + num_tabs +"'>" + tab_title + "</a><span class='ui-icon ui-icon-close' role='presentation'></span></li>");
            $("#tabs_table").html($("#tabs_table").html() + "<div id='divTab" + num_tabs + "'>" +"<div id='table'>" + $("#table").html() + "</div>" + "</div>");
            num_tabs++;
            $("#tabs_table").tabs({ active: (num_tabs - 2)});
            $('#buttons').html("<button id='choose_tab' onclick='choose_tab()'>Select Tab</button>" + "<button id='delete_tab' onclick='remove_tabs()'>Remove Selected Tabs</button>");
            $("#tabs_table").delegate( "span.ui-icon-close", "click", function() {
                var panelID = $( this ).closest( "li" ).remove().attr( "aria-controls" );
                $( "#" + panelID ).remove();
                $("#tabs_table").tabs("refresh");
                num_tabs--;
                if (tab_choice.includes(panelID)) {
                    var index = tab_choice.indexOf(panelID);
                    tab_choice.splice(index, 1);
                }
            });
        }

    });
});