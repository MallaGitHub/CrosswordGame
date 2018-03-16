//global variables
var hintrowlen = 0;
var hintcheckArray;
var tableData;
var acrossCount = 0, downCount = 0, questionstofile = "";
var hintstoBoard = new Array();
var crossWordArr;
var gridSize;

// to disable all the div tags and buttons
function disableAll() {
	var divUpdate = document.getElementById("divUpdate");
	divUpdate.style.display = "none";

	var progressBar = document.getElementById("progressBar");
	progressBar.style.display = "none";

	var filePresent = document.getElementById("filePresent");
	filePresent.style.display = "none";

	var resetBtn = document.getElementById("resetBtn");
	resetBtn.style.display = "none";

	var divCrossword = document.getElementById("divCrossword");
	divCrossword.style.display = "none";

	var divFinish = document.getElementById("divFinish");
	divFinish.style.display = "none";

	var divHints = document.getElementById("divHints");
	divHints.style.display = "none";

	var divFile = document.getElementById("divFile");
	divFile.style.display = "none";

	var saveBtn = document.getElementById("saveBtn");
	saveBtn.style.display = "none";

	document.getElementById("generateBtn").disabled = true;
	return false;
}

// to create n x n crossword
function createCrossword() {

	var progressBar = document.getElementById("progressBar");
	progressBar.style.display = "block";

	var divCrossword = document.getElementById("divCrossword");
	divCrossword.style.display = "block";

	var resetBtn = document.getElementById("resetBtn");
	resetBtn.style.display = "block";

	// to reset the previous crossword puzzle if had
	var puzzelTable = document.getElementById("puzzle");
	puzzelTable.innerHTML = '';

	var divHints = document.getElementById("divHints");
	divHints.style.display = "none";

	gridSize = document.getElementById("myList").value;

	var progress = document.getElementById("progress");
	progress.style.width = "5%";
	document.getElementById("progress").innerHTML = "5% complete";

	if (gridSize == 'Select') {
		var progress = document.getElementById("progress");
		progress.style.width = "0%";
		document.getElementById("progress").innerHTML = "0% complete";
		// if the selected value is 'Select' then hide all
		var divFinish = document.getElementById("divFinish");
		divFinish.style.display = "none";
		var divCrossword = document.getElementById("divCrossword");
		divCrossword.style.display = "none";
	} else {
		// disables the crossword selection (drop down)
		document.getElementById("myList").disabled = true;

		// to create new crossword
		puzzelArrayData = preparePuzzelArray();
		for (var i = 0; i < puzzelArrayData.length; i++) {
			var row = puzzelTable.insertRow(-1);
			var rowData = puzzelArrayData[i];
			for (var j = 0; j < rowData.length; j++) {
				var cell = row.insertCell(-1);
				if (rowData[j] != 0) {
					var txtID = String('txt' + '_' + i + '_' + j);
					cell.innerHTML = '<input onkeyup="cursorMov('
							+ i
							+ ','
							+ j
							+ ')" type="text" style="font-family: sans-serif;font-size:20px;font-weight:bold;text-transform:lowercase;" class="inputBox" maxlength="1" '
							+ 'id="' + txtID + '" onfocus="textInputFocus('
							+ "'" + txtID + "'" + ')">';
				} else {
					cell.style.backgroundColor = "black";
				}
			}
		}
		var divFinish = document.getElementById("divFinish");
		divFinish.style.display = "block";
	}
}

function preparePuzzelArray() {
	var x = document.getElementById("myList").value;
	var y = document.getElementById("myList").value;
	var items = new Array();
	for (i = 0; i < x; i++) {
		items[i] = new Array();
		for (j = 0; j < y; j++) {
			items[i][j] = 1;
		}
	}
	return items;
}

function ClearPlaceHolder(input) {
	if (input.value == input.defaultValue) {
		input.value = "";
	}
}
function SetPlaceHolder(input) {
	if (input.value == "") {
		input.value = input.defaultValue;
	}
}
// to save the answers filled by the author
function addAnswers() {
	crossWordArr = new Array();
	var output = new Array();
	var rowHints = new Array();
	var x = document.getElementById("myList").value;

	for (i = 0; i < x; i++) {
		crossWordArr[i] = new Array();
		for (j = 0; j < x; j++) {
			crossWordArr[i][j] = ":";
		}
	}

	for (var i = 0; i < x; i++) {
		for (var j = 0; j < x; j++) {
			var selectedInputTextElement = document.getElementById('txt' + '_'
					+ i + '_' + j);
			if (selectedInputTextElement.value != 0) {
				crossWordArr[i][j] = selectedInputTextElement.value;
			}
		}
	}
	// to remove single characters from the crossword

	var up = 0;
	var right = 0;
	var down = 0;
	var left = 0;
	var row = 0;
	var col = 0;
	for (i = 0; i < x; i++) {
		for (j = 0; j < x; j++) {
			up = 0;
			right = 0;
			down = 0;
			left = 0;
			// to check whether the character contains neighbors or not
			if (crossWordArr[i][j] != ':') {
				// to check whether top cell contains character or not
				row = i;
				row = row - 1;
				if (row >= 0) {
					if (crossWordArr[row][j] != ':') {
						up = 1;
					}
				}
				// to check whether right cell contains character or not
				col = j;
				col = col + 1;
				if (col < x) {
					if (crossWordArr[i][col] != ':') {
						right = 1;
					}
				}
				// to check whether down cell contains character or not
				row = i;
				row = row + 1;
				if (row < x) {
					if (crossWordArr[row][j] != ':') {
						down = 1;
					}
				}
				// to check whether left cell contains character or not
				col = j;
				col = col - 1;
				if (col >= 0) {
					if (crossWordArr[i][col] != ':') {
						left = 1;
					}
				}
			}// end of checking

			/*
			 * replace the single character with default value if neighbors are
			 * not available
			 */
			if (up == 0 && down == 0 && right == 0 && left == 0) {
				crossWordArr[i][j] = ':';
			}
		}
	} // end of removing single characters

	hintcheckArray = crossWordArr;
	var length = x;
	var COLUMN_SIZE = 5;
	var ACROSS = 'A';
	var DOWN = 'D';
	// maximum questions in a crossword is set to 120
	var MAX_QUESTIONS = 120;

	for (i = 0; i < MAX_QUESTIONS; i++) {
		output[i] = new Array();
		for (j = 0; j < COLUMN_SIZE; j++) {
			output[i][j] = "";
		}
	}

	for (i = 0; i < MAX_QUESTIONS; i++) {
		rowHints[i] = new Array();
		for (j = 0; j < 2; j++) {
			rowHints[i][j] = "";
		}
	}

	var acrossQ = 0;
	var downQ = 0;
	var rowHint = 0;
	var colHint = 0;
	var rowCount = 0;
	var colCount = 0;
	var hintNumber = 1;// hint numbers
	var answer = "";
	var rowIndex = 0;
	var colIndex = 0;
	var row = 0;
	var column = 0;

	// for across questions
	for (row = 0; row < length; row++) {
		for (column = 0; column < length; column++) {
			if (crossWordArr[row][column] != ':') {
				rowCount++;
				answer = answer + crossWordArr[row][column];
			} else if (rowCount > 1) {
				var col = column - rowCount;
				rowHints[rowHint][colHint] = row + ":" + col;
				colHint++;
				rowHints[rowHint][colHint] = "" + hintNumber;
				output[rowIndex][colIndex] = hintNumber + ".Across";
				colIndex++;
				output[rowIndex][colIndex] = "Question";
				colIndex++;
				output[rowIndex][colIndex] = " (" + rowCount + ")";
				colIndex++;
				output[rowIndex][colIndex] = answer.toLowerCase();
				colIndex++;
				output[rowIndex][colIndex] = row + ":" + col;
				rowCount = 0;
				hintNumber++;
				answer = "";
				colIndex = 0;
				rowIndex++;
				rowHint++;
				colHint = 0;
				acrossQ = 1;
			} else {
				rowCount = 0;
				answer = "";
			}
		}
		if (rowCount == 1) {
			rowCount = 0;
			answer = "";
		}
		// if a word ends at last column
		if (rowCount > 1) {
			var col = column - rowCount;
			rowHints[rowHint][colHint] = row + ":" + col;
			colHint++;
			rowHints[rowHint][colHint] = "" + hintNumber;
			output[rowIndex][colIndex] = hintNumber + ".Across";
			colIndex++;
			output[rowIndex][colIndex] = "Question";
			colIndex++;
			output[rowIndex][colIndex] = " (" + rowCount + ")";
			colIndex++;
			output[rowIndex][colIndex] = answer.toLowerCase();
			colIndex++;
			output[rowIndex][colIndex] = row + ":" + col;
			rowCount = 0;
			hintNumber++;
			answer = "";
			colIndex = 0;
			rowIndex++;
			rowHint++;
			colHint = 0;
			acrossQ = 1;
		}
	}

	// for down questions
	for (row = 0; row < length; row++) {
		for (column = 0; column < length; column++) {
			if (crossWordArr[column][row] != ':') {
				colCount++;
				answer = answer + crossWordArr[column][row];
			} else if (colCount > 1) {
				var ro = column - colCount;
				var postn = ro + ":" + row;
				var status = 0;
				for (var i = 0; i < rowHints.length; i++) {
					if (postn == rowHints[i][0]) {
						output[rowIndex][colIndex] = rowHints[i][1] + ".Down";
						status = 1;
						break;
					}
				}
				if (status == 0) {
					output[rowIndex][colIndex] = hintNumber + ".Down";
					hintNumber++;
				}
				status = 0;
				colIndex++;
				output[rowIndex][colIndex] = "Question";
				colIndex++;
				output[rowIndex][colIndex] = " (" + colCount + ")";
				colIndex++;
				output[rowIndex][colIndex] = answer.toLowerCase();
				colIndex++;
				output[rowIndex][colIndex] = ro + ":" + row;
				colCount = 0;
				answer = "";
				colIndex = 0;
				rowIndex++;
				downQ = 1;
			} else {
				colCount = 0;
				answer = "";
			}
		}
		if (colCount == 1) {
			colCount = 0;
			answer = "";
		}
		// if a word ends at last row
		if (colCount > 1) {
			var ro = column - colCount;
			var postn = ro + ":" + row;
			var status = 0;
			for (var i = 0; i < rowHints.length; i++) {
				if (postn == rowHints[i][0]) {
					output[rowIndex][colIndex] = rowHints[i][1] + ".Down";
					status = 1;
					break;
				}
			}
			if (status == 0) {
				output[rowIndex][colIndex] = hintNumber + ".Down";
				hintNumber++;
			}
			status = 0;
			colIndex++;
			output[rowIndex][colIndex] = "Question";
			colIndex++;
			output[rowIndex][colIndex] = " (" + colCount + ")";
			colIndex++;
			output[rowIndex][colIndex] = answer.toLowerCase();
			colIndex++;
			output[rowIndex][colIndex] = ro + ":" + row;
			colCount = 0;
			answer = "";
			colIndex = 0;
			rowIndex++;
			downQ = 1;
		}
	}
	if (acrossQ == 1 && downQ == 1) {
		document.getElementById("updateBtn").disabled = false;
		document.getElementById("generateBtn").disabled = true;

		var divFinish = document.getElementById("divFinish");
		divFinish.style.display = "none";

		var divFile = document.getElementById("divFile");
		divFile.style.display = "block";

		var saveBtn = document.getElementById("saveBtn");
		saveBtn.style.display = "block";

		var divUpdate = document.getElementById("divUpdate");
		divUpdate.style.display = "block";

		var progress = document.getElementById("progress");
		progress.style.width = "40%";
		document.getElementById("progress").innerHTML = "40% complete";
		var sta = 0;
		for (row = 0; row < MAX_QUESTIONS; row++) {
			for (column = 0; column < COLUMN_SIZE; column++) {
				if (output[row][column] == "") {
					sta = 1;
					break;
				}
			}
			if (sta == 1) {
				break;
			}
		}
		acrossCount = 0;
		downCount = 0;
		for (var i = 0; i < output.length; i++) {

			var rowData = output[i];
			for (var j = 0; j < 1; j++) {

				var string = rowData[j];

				if (string.indexOf("cross") !== -1) {
					acrossCount++;
				} else if (string.indexOf("own") !== -1) {
					downCount++;
				}
			}
		}
		/* displayHints(output); */

		tableData = output;
		var x = document.getElementById("myList").value;
		for (i = 0; i < x; i++) {
			hintstoBoard[i] = new Array();
			for (j = 0; j < x; j++) {
				hintstoBoard[i][j] = 0;
			}
		}
		for (i = 0; i < downCount + acrossCount; i++) {
			var hint = tableData[i][0].split(".");
			var coordinates = tableData[i][4].split(":");
			hintstoBoard[coordinates[0]][coordinates[1]] = hint[0];
		}
		displayHints(output);
	} else if (acrossQ == 1 || downQ == 1) {
		/* alert('Please provide alteast 1 down and 1 across answers'); */
		dialogAnswerAcrossDown();
		var progress = document.getElementById("progress");
		progress.style.width = "5%";
		document.getElementById("progress").innerHTML = "5% complete";

		var divHints = document.getElementById("divHints");
		divHints.style.display = "none";

		var divFile = document.getElementById("divFile");
		divFile.style.display = "none";

		var saveBtn = document.getElementById("saveBtn");
		saveBtn.style.display = "none";
	} else {
		var divUpdate = document.getElementById("divUpdate");
		divUpdate.style.display = "none";

		var divFile = document.getElementById("divFile");
		divFile.style.display = "none";

		var saveBtn = document.getElementById("saveBtn");
		saveBtn.style.display = "none";
		createCrossword();
		dialogFillAnswers();
		/* alert('Please enter answers in the crossword.'); */
	}
}

function updateCrossword() {
	document.getElementById("generateBtn").disabled = false;
	document.getElementById("updateBtn").disabled = true;

	var puzzelTable = document.getElementById("puzzle");
	// to reset the previous crossword puzzle if had
	puzzelTable.innerHTML = '';
	puzzelArrayData = preparePuzzelArray();
	for (var i = 0; i < gridSize; i++) {
		var row = puzzelTable.insertRow(-1);
		var rowData = puzzelArrayData[i];
		for (var j = 0; j < gridSize; j++) {
			var cell = row.insertCell(-1);
			if (crossWordArr[i][j] != ":") {
				var txtID = String('txt' + '_' + i + '_' + j);
				cell.innerHTML = '<input value='
						+ crossWordArr[i][j]
						+ ' onkeyup="cursorMov('
						+ i
						+ ','
						+ j
						+ ')" type="text" style="font-size:20px;font-weight:bold;text-transform:lowercase;" class="inputBox" maxlength="1" '
						+ 'id="' + txtID + '" onfocus="textInputFocus(' + "'"
						+ txtID + "'" + ')"></input>';
			} else {
				var txtID = String('txt' + '_' + i + '_' + j);
				cell.innerHTML = '<input onkeyup="cursorMov('
						+ i
						+ ','
						+ j
						+ ')" type="text" style="font-size:20px;font-weight:bold;text-transform:lowercase;" class="inputBox" maxlength="1" '
						+ 'id="' + txtID + '" onfocus="textInputFocus(' + "'"
						+ txtID + "'" + ')"></input>';
			}
		}
	}
}

function BoardwithHintsFilled() {
	var puzzelTable = document.getElementById("puzzle");
	puzzelTable.innerHTML = '';
	puzzelArrayData = hintcheckArray;

	for (var i = 0; i < puzzelArrayData.length; i++) {
		var row = puzzelTable.insertRow(-1);
		var rowData = puzzelArrayData[i];
		var len = rowData.length;
		for (var j = 0; j < len; j++) {
			var cell = row.insertCell(-1);
			if (rowData[j] != ':') {
				var txtID = String('txt' + '_' + i + '_' + j);
				if (hintstoBoard[i][j] != 0) {
					cell.innerHTML = ' <div class="holder"> <label for="'
							+ txtID
							+ '">'
							+ hintstoBoard[i][j]
							+ '</label> <input disabled="disabled" type="text" value= "'
							+ rowData[j]
							+ '"  maxlength="1" '
							+ ' id="'
							+ txtID
							+ '"  style="font-size:18px;font-weight:bold;text-transform:lowercase;color: black;" class="inputBox" > </div>';
				} else {
					cell.innerHTML = ' <div class="holder"> <label> </label> <input disabled="disabled" type="text" value= "'
							+ rowData[j]
							+ '"   maxlength="1" '
							+ ' id="'
							+ txtID
							+ '" style="font-size:18px;font-weight:bold;text-transform:lowercase;color:	#737373;" class="inputBox" > </div>';
				}
			} else {
				cell.innerHTML = '  <div class="holder"> <input type="text" disabled="disabled" maxlength="1" style="background-color:#a6a6a6;" '
						+ 'id="' + txtID + '" ></div>';
			}
		}
	}
}

function cursorMov(i, j) {
	var a = document.getElementById('txt' + '_' + i + '_' + j).value;
	var letterNumber = /^[0-9a-zA-Z]+$/;
	if ((a.match(letterNumber))) {

		var state = "";
		if (document.getElementById('astate').checked) {
			state = document.getElementById('astate').value;
		} else {
			state = document.getElementById('dstate').value;
		}
		var temp1 = 0, temp2 = 0;

		if (state == 'across') {
			// for horizontal movement
			temp1 = j + 1;
			document.getElementById('txt' + '_' + (i) + '_' + (temp1)).focus();
		}

		if (state == 'down') {
			temp1 = i + 1;
			document.getElementById('txt' + '_' + (temp1) + '_' + (j)).focus();
		}
	}

	else {
		document.getElementById('txt' + '_' + i + '_' + j).value = "";
		document.getElementById('txt' + '_' + i + '_' + j).focus();
	}
}

function displayHints(output) {
	hintrowlen = 0;
	var progress = document.getElementById("progress");
	progress.style.width = "40%";
	document.getElementById("progress").innerHTML = "40% complete";

	var divHints = document.getElementById("divHints");
	divHints.style.display = "block";

	// to reset the previous crossword puzzle if had
	var HintsTable = document.getElementById("AcrossHints");
	HintsTable.innerHTML = '';
	// across table work
	/*
	 * for (var i = 0; i < 1; i++) { var row = HintsTable.insertRow(-1); var
	 * rowData = [ "Hint No", "Hint description", "Length", "Answer" ]; for (var
	 * j = 0; j < rowData.length; j++) { var cell = row.insertCell(-1); if
	 * (rowData[j] != 0) { if (j == 1) { cell.innerHTML = '<thead><tr><th><label
	 * style="color:Black;" id="' + 1 + '" size="30" maxlength="80">' +
	 * rowData[j] + '</label></th>'; } else if (j == 0) { cell.innerHTML = '<th><label
	 * style="color:Black;" id="' + 0 + '"size="6">' + rowData[j] + ' </label></th>'; }
	 * else if (j == 2) { cell.innerHTML = '<th><label style="color:Black;"
	 * id="' + 2 + '"size="5">' + rowData[j] + ' </label></th>'; } else {
	 * cell.innerHTML = '<th><label style="color:Black;" id="' + 3 + '"
	 * size="15">' + rowData[j] + ' </label></th></tr></thead>'; } } } }
	 */
	for (var i = 0; i < acrossCount; i++) {
		var row = HintsTable.insertRow(-1);
		var rowData = output[i];
		for (var j = 0; j < rowData.length - 1; j++) {
			var cell = row.insertCell(-1);
			if (rowData[j] != 0) {
				var txtID = String('txt' + '$' + i + '$' + j);
				if (j == 1) {
					if (rowData[j] != "") {
						hintrowlen++;
					}
					cell.innerHTML = '<div class="dv"><label class="lbl"><input class="ip" type="text"  id="'
							+ txtID
							+ '"  value="Hint" size="40" maxlength="120" onfocus="ClearPlaceHolder (this)" onblur="SetPlaceHolder (this)">';
				} else if (j == 0) {
					var ar = rowData[j].split(".");
					cell.innerHTML = '<input type="text" class="ip" id="'
							+ txtID + '"  value="' + ar[0] + '"  size="1">';
					document.getElementById(txtID).disabled = true;
				} else if (j == 2) {
					cell.innerHTML = '<input type="text" class="ip" id="'
							+ txtID + '"  value="' + rowData[j]
							+ '" size="1" >';
					document.getElementById(txtID).disabled = true;
				} else {
					cell.innerHTML = '<input type="text" class="ip" id="'
							+ txtID + '"  value="' + rowData[j]
							+ '" size="12" ></label>';
					document.getElementById(txtID).disabled = true;
				}
			}
		}
	}
	// down table work
	var HintsTable = document.getElementById("DownHints");
	HintsTable.innerHTML = '';
	/*
	 * for (var i = 0; i < 1; i++) { var row = HintsTable.insertRow(-1); var
	 * rowData = [ "Hint No", "Hint description", "Length", "Answer" ]; for (var
	 * j = 0; j < rowData.length; j++) { var cell = row.insertCell(-1); if
	 * (rowData[j] != 0) {
	 * 
	 * if (j == 1) {
	 * 
	 * cell.innerHTML = '<label style="color:Black;" id="' + 11 + '" size="30"
	 * maxlength="80" onfocus="ClearPlaceHolder (this)" onblur="SetPlaceHolder
	 * (this)">' + rowData[j] + '</label>';
	 * document.getElementById("11").disabled = true; } else if (j == 0) {
	 * cell.innerHTML = '<label style="color:Black;" id="' + 10 + '" size="6">' +
	 * rowData[j] + '</label>';
	 * 
	 * document.getElementById("10").disabled = true; } else if (j == 2) {
	 * cell.innerHTML = '<label style="color:Black;" id="' + 21 + '" size="5">' +
	 * rowData[j] + '</label>';
	 * 
	 * document.getElementById("21").disabled = true; } else { cell.innerHTML = '<label
	 * style="color:Black;" id="' + 31 + '" size="15">' + rowData[j] + '</label>';
	 * 
	 * document.getElementById("31").disabled = true; } } } }
	 */
	var temp4 = acrossCount + downCount;
	for (var i = acrossCount; i < temp4; i++) {
		var row = HintsTable.insertRow(-1);
		var rowData = output[i];
		for (var j = 0; j < rowData.length - 1; j++) {
			var cell = row.insertCell(-1);
			if (rowData[j] != 0) {

				var txtID = String('txt' + '$' + i + '$' + j);

				if (j == 1) {
					if (rowData[j] != "") {
						hintrowlen++;
					}
					cell.innerHTML = '<div class="dv"><label class="lbl"><input type="text" class="ip" id="'
							+ txtID
							+ '"  value="Hint" size="40" maxlength="120" onfocus="ClearPlaceHolder (this)" onblur="SetPlaceHolder (this)">';
				} else if (j == 0) {
					var ar = rowData[j].split(".");
					cell.innerHTML = '<input type="text" class="ip" id="'
							+ txtID + '"  value="' + ar[0] + '"  size="1">';

					document.getElementById(txtID).disabled = true;
				} else if (j == 2) {
					cell.innerHTML = '<input type="text"class="ip"  id="'
							+ txtID + '"  value="' + rowData[j]
							+ '"  size="1">';

					document.getElementById(txtID).disabled = true;
				} else {
					cell.innerHTML = '<input type="text" class="ip" id="'
							+ txtID + '"  value="' + rowData[j]
							+ '"  size="12"></label>';

					document.getElementById(txtID).disabled = true;
				}

			}
		}
	}
	BoardwithHintsFilled();
}

function addHints() {
	var flag = true;
	for (i = 0; i < hintrowlen; i++) {
		var txtID = String('txt' + '$' + i + '$' + 1);
		if (document.getElementById(txtID).value == ""
				|| document.getElementById(txtID).value == "Hint") {

			flag = false;
			fillAllHintsAlert();
			document.getElementById(txtID).focus();
			break;
		}
	}
	if (flag == true) {
		var progress = document.getElementById("progress");
		progress.style.width = "85%";
		document.getElementById("progress").innerHTML = "85% complete";
		var divFile = document.getElementById("divFile");
		divFile.style.display = "block";
		addQuestions();
	}
}

function fillAllHintsAlert() {
	$(function() {
		$("#dialogFillAllHints").dialog({
			resizable : false,
			modal : true,
			title : "Status",
			width : 280,
			height : 105,
			open : function(event, ui) {
				setTimeout(function() {
					$("#dialogFillAllHints").dialog("close");
				}, 2000);
			}
		});
	});
}

function addQuestions() {
	var queshorizontal = "";
	for (i = 0; i < acrossCount; i++) {
		for (j = 0; j < 3; j++) {
			var txtID = String('txt' + '$' + i + '$' + j);
			var data = document.getElementById(txtID).value;
			if (j == 0) {
				var hintno = data.split(".");
			} else if (j == 1) {
				var ques = data;
			} else if (j == 2) {
				var finalques = hintno[0] + "." + ques + data + ",";
			}
		}
		queshorizontal = queshorizontal + finalques;
	}
	queshorizontal = queshorizontal.substring(0, queshorizontal.length - 1);
	var quesvertical = "";
	for (i = acrossCount; i < downCount + acrossCount; i++) {
		for (j = 0; j < 3; j++) {
			var txtID = String('txt' + '$' + i + '$' + j);
			var data = document.getElementById(txtID).value;
			if (j == 0) {
				var hintno = data.split(".");
			} else if (j == 1) {
				var ques = data;
			} else if (j == 2) {
				var finalques = hintno[0] + "." + ques + data + ",";
			}
		}
		quesvertical = quesvertical + finalques;
	}
	quesvertical = quesvertical.substring(0, quesvertical.length - 1);
	questionstofile = queshorizontal + "*" + quesvertical;
	checkFile();
}

function save() {
	var fileName = document.forms["cross"]["fileName"].value;
	if (fileName != 'eg:TM01') {
		var progress = document.getElementById("progress");
		progress.style.width = "100%";
		document.getElementById("progress").innerHTML = "100% complete";
		var x = document.getElementById("myList").value;
		var h = x;
		var answerstofile = h + "_";
		for (var i = 0; i < x; i++) {
			var rowData = hintcheckArray[i];
			for (var j = 0; j < rowData.length; j++) {
				if (rowData[j] == ":") {
					answerstofile = answerstofile + '0';
				} else {
					answerstofile = answerstofile + rowData[j];
				}
			}
		}
		var hintsArraytoFile = new Array();
		var x = document.getElementById("myList").value;
		for (i = 0; i < x; i++) {
			hintsArraytoFile[i] = new Array();
			for (j = 0; j < x; j++) {
				hintsArraytoFile[i][j] = 0;
			}
		}
		for (i = 0; i < downCount + acrossCount; i++) {
			var hint = tableData[i][0].split(".");
			var coordinates = tableData[i][4].split(":");
			hintsArraytoFile[coordinates[0]][coordinates[1]] = hint[0];
		}
		var ht = "";
		var imp = "";
		for (var k = 0; k < x; k++) {
			var rowData = hintsArraytoFile[k];
			for (var l = 0; l < rowData.length; l++) {
				ht = ht + rowData[l].toString().concat(".");
				imp = ht.substring(0, ht.length - 1);
			}
		}
		var fn1 = fileName + "*" + answerstofile + "*" + imp + "*"
				+ questionstofile;
		// forward the request to Servlet "SaveCrosswordServlet.java"
		/*
		 * document.forms[0].action = "SaveCrosswordServlet?fileName=" + fn1;
		 * document.forms[0].method = "post"; document.forms[0].submit();
		 */

		$(document).ready(function() {
			$.post('SaveCrosswordServlet', {
				fileName : fn1
			}, function(responseText) {
				if (responseText == "Success") {
					createSuccess()
				}
			});
		});
	} else {
		alert('Please enter the name of a file to be saved.');
		document.getElementById("file").focus();
		document.getElementById("filePresent").style.display = "none";
	}

}
function createSuccess() {
	$(function() {
		$("#dialogSuccess").dialog({
			resizable : false,
			modal : true,
			title : "Status",
			width : 260,
			height : 170,
			buttons : {
				"Ok" : function() {
					$(this).dialog("close");
				}
			}
		});
	});
}
function resetWarning() {
	$(function() {
		$("#dialog").dialog({
			resizable : false,
			modal : true,
			title : "Status",
			width : 220,
			height : 110,
			open : function(event, ui) {
				setTimeout(function() {
					$("#dialog").dialog("close");
				}, 200000);
			}
		});
	});
}

function dialogFillAnswers() {
	$(function() {
		$("#dialog-answers").dialog({
			resizable : false,
			width : 280,
			height : 110,
			modal : true,
			title : "Status",
			open : function(event, ui) {
				setTimeout(function() {
					$("#dialog-answers").dialog("close");
				}, 2000);
			}
		});
	});
}

function dialogAnswerAcrossDown() {
	$(function() {
		$("#dialog-answerDownAcross").dialog({
			resizable : false,
			width : 300,
			height : 130,
			modal : true,
			title : "Status",
			open : function(event, ui) {
				setTimeout(function() {
					$("#dialog-answerDownAcross").dialog("close");
				}, 3000);
			}
		});
	});
}

function createNewConfirm() {
	$("#dialog-confirm").dialog({
		resizable : false,
		width : 330,
		height : 190,
		modal : true,
		title : "Status",
		buttons : {
			"Ok" : function() {
				/*
				 * var con = confirm("Progress of the crossword will be
				 * lost.\nDo you want to reset anyway?");
				 */

				var proceedBtn = document.getElementById("proceedBtn");
				proceedBtn.disabled = false;

				/* document.getElementById("hintsSaved").innerHTML = ''; */

				var resetBtn = document.getElementById("resetBtn");
				resetBtn.style.display = "none";

				var progressBar = document.getElementById("progressBar");
				progressBar.style.display = "none";

				var progress = document.getElementById("progress");
				progress.style.width = "0%";
				document.getElementById("progress").innerHTML = "0% complete";

				document.getElementById("astate").checked = "checked";

				var divUpdate = document.getElementById("divUpdate");
				divUpdate.style.display = "none";

				var divCrossword = document.getElementById("divCrossword");
				divCrossword.style.display = "none";

				var divFinish = document.getElementById("divFinish");
				divFinish.style.display = "none";

				var divHints = document.getElementById("divHints");
				divHints.style.display = "none";

				var divFile = document.getElementById("divFile");
				divFile.style.display = "none";

				var saveBtn = document.getElementById("saveBtn");
				saveBtn.style.display = "none";

				var myList = document.getElementById("myList");
				myList.value = "Select";

				myList.disabled = false;
				$(this).dialog("close");
			},
			"Cancel" : function() {
				$(this).dialog("close");
			}
		}
	});
}

function createNew() {
	/*
	 * var con = confirm("Progress of the crossword will be lost.\nDo you want
	 * to reset anyway?");
	 */

	var proceedBtn = document.getElementById("proceedBtn");
	proceedBtn.disabled = false;

	/* document.getElementById("hintsSaved").innerHTML = ''; */

	var resetBtn = document.getElementById("resetBtn");
	resetBtn.style.display = "none";

	var progressBar = document.getElementById("progressBar");
	progressBar.style.display = "none";

	var progress = document.getElementById("progress");
	progress.style.width = "0%";
	document.getElementById("progress").innerHTML = "0% complete";

	document.getElementById("astate").checked = "checked";

	var divUpdate = document.getElementById("divUpdate");
	divUpdate.style.display = "none";

	var divCrossword = document.getElementById("divCrossword");
	divCrossword.style.display = "none";

	var divFinish = document.getElementById("divFinish");
	divFinish.style.display = "none";

	var divHints = document.getElementById("divHints");
	divHints.style.display = "none";

	var divFile = document.getElementById("divFile");
	divFile.style.display = "none";

	var saveBtn = document.getElementById("saveBtn");
	saveBtn.style.display = "none";

	var myList = document.getElementById("myList");
	myList.value = "Select";

	myList.disabled = false;
}

function clearError() {
	var a = document.getElementById("file").value;
	var letterNumber = /^[0-9a-zA-Z_]+$/;
	if ((a.match(letterNumber))) {
		var filePresent = document.getElementById("filePresent");
		filePresent.style.display = "none";
	}
}

function checkFile() {
	$(document).ready(function() {
		var name = $('#file').val();
		$.get('CheckFileServlet', {
			fileName : name
		}, function(responseText) {
			if (responseText == "Invalid") {
				$("#filePresent").show();
			} else {
				$("#filePresent").hide();
				save();
			}
		});
	});
}