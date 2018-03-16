var crosswordBoardData = "";
var dataSplit = new Array();
var answers = "";
var hintsStr = "";
var acrossQuestions = "";
var downQuestions = "";
var hintsArr = new Array();
var answersArr = new Array();
var noOfAcrossQuestions = 0;
var noOfDownQuestions = 0;
var fileNameSelected = "";
var answersToDisplay = new Array();
var ansIndex = 0;

function disableDiv() {
	var divCrossword = document.getElementById("divCrossword");
	divCrossword.style.display = "none";
	var divCrosswordBtns = document.getElementById("divCrosswordBtns");
	divCrosswordBtns.style.display = "none";
	var divQuestionBtns = document.getElementById("divQuestionBtns");
	divQuestionBtns.style.display = "none";
	var divHints = document.getElementById("divHints");
	divHints.style.display = "none";
}

/*
 * function checkFile() { $(document).ready(function() { var name =
 * $('#file').val(); $.get('CheckFileServlet', { fileName : name },
 * function(responseText) { if (responseText == "Invalid") {
 * $("#filePresent").show(); } else { $("#filePresent").hide(); save(); } });
 * }); }
 */

function getCrossword() {
	document.getElementById("editQuestionBtn").disabled = false;
	document.getElementById("updateQuestionBtn").disabled = true;
	document.getElementById("cancelQuestionBtn").disabled = true;

	var fileName = document.getElementById("fileName").value;
	if (fileName == 'Select') {
		var divCrossword = document.getElementById("divCrossword");
		divCrossword.style.display = "none";
		var divCrosswordBtns = document.getElementById("divCrosswordBtns");
		divCrosswordBtns.style.display = "none";
		var divQuestionBtns = document.getElementById("divQuestionBtns");
		divQuestionBtns.style.display = "none";
		var divHints = document.getElementById("divHints");
		divHints.style.display = "none";

	} else {
		$(document).ready(function() {
			var name = $('#fileName').val();
			fileNameSelected = name;
			$.get('FetchCrosswordDataServlet', {
				fileName : name
			}, function(responseText) {
				crosswordBoardData = responseText;
				displayCrossword();
			});
		});
	}
}

function displayCrossword() {
	answersToDisplay = new Array();
	ansIndex = 0;
	answers = "";
	hintsStr = "";
	acrossQuestions = "";
	downQuestions = "";
	hintsArr = new Array();
	answersArr = new Array();
	dataSplit = new Array();
	dataSplit = crosswordBoardData.split("*");
	var firstPart = dataSplit[0].split("_");
	var gridSize = firstPart[0];
	answers = firstPart[1];
	hintsStr = dataSplit[1];
	acrossQuestions = dataSplit[2];
	downQuestions = dataSplit[3];
	var hintsSplit = hintsStr.split(".");
	var inc = 0;

	// to reset the previous crossword puzzle if had
	var crossword = document.getElementById("crossword");
	crossword.innerHTML = '';
	var acrossHints = document.getElementById("acrossHints");
	acrossHints.innerHTML = '';
	var downHints = document.getElementById("downHints");
	downHints.innerHTML = '';
	var divCrossword = document.getElementById("divCrossword");
	divCrossword.style.display = "block";
	var divCrosswordBtns = document.getElementById("divCrosswordBtns");
	divCrosswordBtns.style.display = "block";
	var divQuestionBtns = document.getElementById("divQuestionBtns");
	divQuestionBtns.style.display = "block";
	var divHints = document.getElementById("divHints");
	divHints.style.display = "block";
	var divDetailsBox = document.getElementById("divDetailsBox");
	divDetailsBox.style.display = "block";

	// to store hints in hintsArr[][]
	for (i = 0; i < gridSize; i++) {
		hintsArr[i] = new Array();
		for (j = 0; j < gridSize; j++) {
			hintsArr[i][j] = hintsSplit[inc];
			inc++;
		}
	}

	// to store answers in answersArr[][]
	inc = 0;
	for (i = 0; i < gridSize; i++) {
		answersArr[i] = new Array();
		for (j = 0; j < gridSize; j++) {
			var ch = answers.charAt(inc);
			if (ch == '0') {
				answersArr[i][j] = '0';
				inc++;
			} else {
				answersArr[i][j] = ch.toLowerCase();
				inc++;
			}
		}
	}

	var incValue = 0;
	var rowCount = 0;
	var answer = "";
	// maximum questions in a crossword is set to 120
	var MAX_QUESTIONS = 120;
	/*
	 * To store answers in a 2-D array. index 0-> Hint No & index 1->answer
	 */
	var hintAnswer = new Array(MAX_QUESTIONS);
	// for across questions
	for (var row = 0; row < gridSize; row++) {
		for (var column = 0; column < gridSize; column++) {
			if (answersArr[row][column] != '0') {
				rowCount++;
				answer = answer + answersArr[row][column];
			} else if (rowCount > 1) {
				hintAnswer[incValue] = answer.toLowerCase();
				incValue++;
				rowCount = 0;
				answer = "";
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
			hintAnswer[incValue] = answer.toLowerCase();
			incValue++;
			rowCount = 0;
			answer = "";
		}
	}

	// for down answers
	answer = "";
	var colCount = 0;
	for (var row = 0; row < gridSize; row++) {
		for (var column = 0; column < gridSize; column++) {
			if (answersArr[column][row] != '0') {
				colCount++;
				answer = answer + answersArr[column][row];
			} else if (colCount > 1) {
				hintAnswer[incValue] = answer.toLowerCase();
				incValue++;
				colCount = 0;
				answer = "";
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
			hintAnswer[incValue] = answer.toLowerCase();
			incValue++;
			colCount = 0;
			answer = "";
		}
	}
	answersToDisplay = hintAnswer;
	//

	// TO create crossword and display
	var puzzelArrayData = answersArr;
	for (var i = 0; i < puzzelArrayData.length; i++) {
		var row = crossword.insertRow(-1);
		var rowData = puzzelArrayData[i];
		var len = rowData.length;
		for (var j = 0; j < len; j++) {
			var cell = row.insertCell(-1);
			if (rowData[j] != '0') {
				var txtID = String('txt' + '_' + i + '_' + j);
				if (hintsArr[i][j] != 0) {
					cell.innerHTML = ' <div class="holder"> <label for="'
							+ txtID
							+ '">'
							+ hintsArr[i][j]
							+ '</label> <input type="text"  maxlength="1"  style="font-weight:bold;font-size:17px;text-transform:lowercase;" '
							+ ' id="' + txtID + '" value="' + answersArr[i][j]
							+ '" disabled></div>';
				} else {
					cell.innerHTML = ' <div class="holder"> <label> </label> <input type="text" maxlength="1" style="font-weight:bold;font-size:17px;text-transform:lowercase;" '
							+ ' id="'
							+ txtID
							+ '"  value="'
							+ answersArr[i][j]
							+ '" disabled> </div>';
				}
			} else {
				cell.innerHTML = '  <div class="holder"> <input type="text" disabled="disabled" maxlength="1" style="background-color:grey;" '
						+ 'id="' + txtID + '" ></div>';
			}
		}
	}
	displayAcrossQuestions();
	displayDownQuestions();
}

function displayAcrossQuestions() {
	var acrossHints = document.getElementById("acrossHints");
	acrossHints.innerHTML = '';

	// To display across questions
	var acrossHints = document.getElementById("acrossHints");
	var acrossQuestionsArr = acrossQuestions.split("),");
	noOfAcrossQuestions = acrossQuestionsArr.length;
	var temp1Across;
	var temp2Across;
	var hintNumAcross;
	var questAcross = "";
	var lenAcross;
	var title = document.getElementById("titleAcross");
	title.innerHTML = '';
	var titleRow = title.insertRow(-1);
	var cel1 = titleRow.insertCell(0);
	var cel2 = titleRow.insertCell(0);
	var cel3 = titleRow.insertCell(0);
	var cel4 = titleRow.insertCell(0);
	cel4.innerHTML = '<tr><td><textarea rows="1" cols="6" disabled="disabled" draggable="false">Hint No</textarea></td>';
	cel3.innerHTML = '<td><textarea rows="1" cols="58" disabled="disabled" draggable="false">Question Description</textarea></td>';
	cel2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">Answer</textarea></td>';
	cel1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">Length</textarea></td></tr>';
	ansIndex = 0;
	for (i = 0; i < acrossQuestionsArr.length; i++) {
		var row = acrossHints.insertRow(-1);
		temp1Across = acrossQuestionsArr[i].split(".");
		hintNumAcross = temp1Across[0];
		var len = temp1Across.length;
		if (len != 2) {
			for (var tem = 1; tem < len - 1; tem++) {
				questAcross = questAcross + temp1Across[tem] + ".";
			}
			temp2Across = temp1Across[len - 1].split("(");
			questAcross = questAcross + temp2Across[0];
			lenAcross = temp2Across[1];

		} else {
			temp2Across = temp1Across[1].split("(");
			questAcross = temp2Across[0];
			lenAcross = temp2Across[1];
		}

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(0);
		var cell3 = row.insertCell(0);
		var cell4 = row.insertCell(0);
		cell4.innerHTML = '<td style="top: 0px;"><textarea rows="1" cols="6" disabled="disabled" draggable="false">'
				+ hintNumAcross + '.</textarea></td>';
		cell3.innerHTML = '<td><textarea rows="1" cols="58" disabled="disabled" draggable="false">'
				+ questAcross + '</textarea></td>';
		cell2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">'
				+ answersToDisplay[ansIndex] + '&nbsp;</textarea></td>'
		if (i + 1 == acrossQuestionsArr.length) {
			cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
					+ lenAcross + '&nbsp;</textarea></td>';
		} else {
			cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
					+ lenAcross + ')&nbsp;</textarea></td>';
		}
		ansIndex++;
	}
}

function displayDownQuestions() {
	var downHints = document.getElementById("downHints");
	downHints.innerHTML = '';
	// To display down questions
	var dwnHints = document.getElementById("downHints");
	var downQuestionsArr = downQuestions.split("),");
	noOfDownQuestions = downQuestionsArr.length;
	var temp1Down;
	var temp2Down;
	var hintNumDown;
	var questDown;
	var lenDown;
	var title = document.getElementById("titleDown");
	title.innerHTML = '';
	var titleRow = title.insertRow(-1);
	var cel1 = titleRow.insertCell(0);
	var cel2 = titleRow.insertCell(0);
	var cel3 = titleRow.insertCell(0);
	var cel4 = titleRow.insertCell(0);
	cel4.innerHTML = '<tr><td><textarea rows="1" cols="6" disabled="disabled" draggable="false">Hint No</textarea></td>';
	cel3.innerHTML = '<td><textarea rows="1" cols="58" disabled="disabled" draggable="false">Question Description</textarea></td>';
	cel2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">Answer</textarea></td>';
	cel1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">Length</textarea></td></tr>';
	for (i = 0; i < downQuestionsArr.length; i++) {
		var row = dwnHints.insertRow(-1);
		temp1Down = downQuestionsArr[i].split(".");
		hintNumDown = temp1Down[0];
		temp2Down = temp1Down[1].split("(");
		questDown = temp2Down[0];
		lenDown = temp2Down[1];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(0);
		var cell3 = row.insertCell(0);
		var cell4 = row.insertCell(0);
		cell4.innerHTML = '<td><textarea rows="1" cols="6" disabled="disabled" draggable="false">'
				+ hintNumDown + '.</textarea></td>';
		cell3.innerHTML = '<td><textarea rows="1" cols="58" disabled="disabled" draggable="false">'
				+ questDown + '</textarea></td>';
		cell2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">'
				+ answersToDisplay[ansIndex] + '&nbsp;</textarea></td>'
		if (i + 1 == downQuestionsArr.length) {
			cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
					+ lenDown + '&nbsp;</textarea></td>';
		} else {
			cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
					+ lenDown + ')&nbsp;</textarea></td>';
		}

		ansIndex++;
	}
}

function editQuestions() {

	document.getElementById("fileName").disabled = true;
	document.getElementById("editQuestionBtn").disabled = true;
	document.getElementById("updateQuestionBtn").disabled = false;
	document.getElementById("cancelQuestionBtn").disabled = false;
	document.getElementById("deleteBtn").disabled = true;

	var acrossHints = document.getElementById("acrossHints");
	acrossHints.innerHTML = '';
	var downHints = document.getElementById("downHints");
	downHints.innerHTML = '';

	displayAcrossQuestionsEdit();
	displayDownQuestionsEdit();
}

function displayAcrossQuestionsEdit() {
	var acrossHints = document.getElementById("acrossHints");
	acrossHints.innerHTML = '';
	var acrossHints = document.getElementById("acrossHints");
	var acrossQuestionsArr = acrossQuestions.split(",");
	// To display across questions
	var temp1Across;
	var temp2Across;
	var hintNumAcross;
	var questAcross;
	var lenAcross;
	var id = 1;
	ansIndex = 0;
	for (i = 0; i < acrossQuestionsArr.length; i++) {
		var row = acrossHints.insertRow(-1);
		temp1Across = acrossQuestionsArr[i].split(".");
		hintNumAcross = temp1Across[0];
		temp2Across = temp1Across[1].split("(");
		questAcross = temp2Across[0];
		lenAcross = temp2Across[1];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(0);
		var cell3 = row.insertCell(0);
		var cell4 = row.insertCell(0);
		var quest = "questA" + id;
		cell4.innerHTML = '<td><textarea rows="1" cols="6" disabled="disabled" draggable="false">'
				+ hintNumAcross + '.</textarea></td>';
		cell3.innerHTML = '<td><input type="text" size="57" value="'
				+ questAcross + '" id="' + quest + '"></td>';
		cell2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">'
				+ answersToDisplay[ansIndex] + '&nbsp;</textarea></td>';
		cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
				+ lenAcross + '&nbsp;</textarea></td>';
		id++;
		ansIndex++;
	}
}

function displayDownQuestionsEdit() {
	var downHints = document.getElementById("downHints");
	downHints.innerHTML = '';
	var dwnHints = document.getElementById("downHints");
	var downQuestionsArr = downQuestions.split(",");
	// To display down questions
	var temp1Down;
	var temp2Down;
	var hintNumDown;
	var questDown;
	var lenDown;
	var id = 1;
	for (i = 0; i < downQuestionsArr.length; i++) {
		var row = dwnHints.insertRow(-1);
		temp1Down = downQuestionsArr[i].split(".");
		hintNumDown = temp1Down[0];
		temp2Down = temp1Down[1].split("(");
		questDown = temp2Down[0];
		lenDown = temp2Down[1];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(0);
		var cell3 = row.insertCell(0);
		var cell4 = row.insertCell(0);
		var quest = "questD" + id;
		cell4.innerHTML = '<td><textarea rows="1" cols="6" disabled="disabled" draggable="false">'
				+ hintNumDown + '.</textarea></td>';
		cell3.innerHTML = '<td><input type="text" size="57" value="'
				+ questDown + '" id="' + quest + '"></td>';
		cell2.innerHTML = '<td><textarea rows="1" cols="9" disabled="disabled" draggable="false">'
				+ answersToDisplay[ansIndex] + '&nbsp;</textarea></td>';
		cell1.innerHTML = '<td><textarea rows="1" cols="4" disabled="disabled" draggable="false">&nbsp;('
				+ lenDown + '&nbsp;</textarea></td>';
		id++;
		ansIndex++;
	}
}

function updateQuestions() {
	var val = confirm('Are you sure, you what to update the questions?');
	if (val == true) {
		var questionStatus = 1;
		// to concat all the across questions before updating
		var dataSplt = new Array();
		dataSplt = crosswordBoardData.split("*");
		var firstPart = dataSplt[0].split("_");
		var gridSize = firstPart[0];
		answers = firstPart[1];
		hintsStr = dataSplt[1];
		acrossQuestions = dataSplt[2];
		downQuestions = dataSplt[3];
		var acrossQuestionsArr = acrossQuestions.split(",");
		var temp1Across;
		var temp2Across;
		var hintNumAcross;
		var questAcross;
		var lenAcross;
		var question = "";
		var id = 1;
		var allAcrossQuestions = "";
		for (i = 0; i < acrossQuestionsArr.length; i++) {
			temp1Across = acrossQuestionsArr[i].split(".");
			hintNumAcross = temp1Across[0];
			temp2Across = temp1Across[1].split("(");
			questAcross = temp2Across[0];
			lenAcross = temp2Across[1];
			var questID = "questA" + id;
			questionTemp = document.getElementById(questID).value;
			questionTemp = questionTemp.trim();
			if (questionTemp.length == 0) {
				alert('Please fill all the questions');
				document.getElementById(txtID).focus();
				questionStatus = 0;
				break;
			}
			id++;
			question = hintNumAcross + "." + questionTemp + " (" + lenAcross;
			if (i != 0) {
				allAcrossQuestions = allAcrossQuestions + "," + question;
			} else {
				allAcrossQuestions = question;
			}
		}
		// to concat all the down questions before updating
		if (questionStatus == 1) {
			var downQuestionsArr = downQuestions.split(",");
			var temp1Down;
			var temp2Down;
			var hintNumDown;
			var questDown;
			var lenDown;
			var question = "";
			var id = 1;
			var allDownQuestions = "";
			for (i = 0; i < downQuestionsArr.length; i++) {
				temp1Down = downQuestionsArr[i].split(".");
				hintNumDown = temp1Down[0];
				temp2Down = temp1Down[1].split("(");
				questDown = temp2Down[0];
				lenDown = temp2Down[1];
				var questID = "questD" + id;
				questionTemp = document.getElementById(questID).value;
				questionTemp = questionTemp.trim();
				if (questionTemp.length == 0) {
					alert('Please fill all the questions');
					document.getElementById(txtID).focus();
					questionStatus = 0;
					break;
				}
				id++;
				question = hintNumDown + "." + questionTemp + " (" + lenDown;
				if (i != 0) {
					allDownQuestions = allDownQuestions + "," + question;
				} else {
					allDownQuestions = question;
				}
			}
		}
		var newCrosswordBoardData = fileNameSelected + "*" + gridSize + "_"
				+ answers + "*" + hintsStr + "*" + allAcrossQuestions + "*"
				+ allDownQuestions;
		// alert(':' + newCrosswordBoardData + ':');
		// to do---> Updated questions should be displayed
		if (questionStatus == 1) {
			document.getElementById("fileName").disabled = false;
			document.getElementById("deleteBtn").disabled = false;
			document.getElementById("editQuestionBtn").disabled = false;
			document.getElementById("updateQuestionBtn").disabled = true;
			document.getElementById("cancelQuestionBtn").disabled = true;

			/*
			 * document.forms[0].action = "UpdateQuestionsServlet?fileName=" +
			 * newCrosswordBoardData; document.forms[0].method = "post";
			 * document.forms[0].submit();
			 */

			$(document).ready(function() {
				$.post('UpdateQuestionsServlet', {
					fileName : newCrosswordBoardData
				}, function(responseText) {
					updateSuccess();
					getCrossword();
				});
			});

		}
	}
}
function updateSuccess() {
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
				}, 1000);
			}
		});
	});
}

function deleteSuccess() {
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
				}, 1000);
			}
		});
	});
}
function deleteCrossword() {
	var password = prompt("Please enter password");
	var pwd = password.trim();
	var len = pwd.length;
	if (len > 0) {
		$(document).ready(function() {
			var name = $('#fileName').val();
			var data = name + "," + password;
			$.post('DeleteCrosswordServlet', {
				fileName : data
			}, function(responseText) {
				if (responseText == "Password not correct") {
					alert(responseText);
					displayCrossword();
				} else {
					deleteSuccess();
					displayUpdatedCrossword();
				}
			});
		});
	} else {
		alert('Password cannot be empty');
	}
}
function wait(ms) {
	var d = new Date();
	var d2 = null;
	do {
		d2 = new Date();
	} while (d2 - d < ms);
}
function displayUpdatedCrossword() {
	document.forms[0].action = "DisplayAllServlet";
	document.forms[0].method = "get";
	document.forms[0].submit();
}
function cancelUpdateQuestions() {
	displayAcrossQuestions();
	displayDownQuestions();
	document.getElementById("deleteBtn").disabled = false;
	document.getElementById("fileName").disabled = false;
	document.getElementById("editQuestionBtn").disabled = false;
	document.getElementById("updateQuestionBtn").disabled = true;
	document.getElementById("cancelQuestionBtn").disabled = true;
}
