<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ page import="java.io.*"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control"
	content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />

<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="http://code.jquery.com/jquery-1.10.2.js"
	type="text/javascript"></script>

<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script
	src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.9/jquery-ui.js"
	type="text/javascript"></script>
<link
	href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.9/themes/blitzer/jquery-ui.css"
	rel="stylesheet" type="text/css" />
<title>Insert title here</title>

<!-- CSS work -->
<style>
.ui-widget-header {
	border: 1px solid #1f4e14;
	background: #6891a0d6;
	color: #ffffff;
	font-weight: bold;
}

.ui-dialog .ui-dialog-titlebar {
	padding: .2em 1em;
	position: relative;
}

* {
	box-sizing: border-box;
}

table, td {
	border-collapse: collapse;
	padding: 0px;
	border-spacing: 0px 0px;
	border-collapse: collapse;
	padding-top: 0;
}

#buttons {
	width: 30%;
	float: right;
}

tr {
	border-collapse: collapse;
}

#puzzle {
	text-align: center;
	border-collapse: separate;
	border-spacing: 0px 0px;
	border: 1px solid black;
}

#Hints {
	text-align: center;
	border-collapse: separate;
	border-spacing: 0px 0px;
	border: 1px solid black;
}

.inputBox {
	height: 30px;
	width: 30px;
	border: 0.2px solid black;
	text-align: center;
	box-sizing: border-box;
}

.inputBox:focus {
	background-color: #99cfff;
}

#hintsTable {
	width: 480px;
	float: left;
	clear: left;
}

.holder {
	position: relative;
}

.holder label {
	position: absolute;
	left: 4px;
	top: 1px;
	font-size: 8px;
}

.holder input {
	height: 30px;
	width: 30px;
	border: 0.2px solid black;
	text-align: center;
	box-sizing: border-box;
}

.divScroll {
	height: scroll;
	max-height: 215px;
	overflow: auto;
}

.bg {
	background-image: url('img/b3.jpg');
	/* opacity: 0.2; */
}

.gap {
	/*margin-bottom: 1px; or whatever you want the spacing to be*/
	margin: 0 0 2px 0;
}

.dv {
	display: table;
	border: 1;
}

.lbl {
	display: table-row;
	padding-top: 0;
	padding-bottom: 0;
}

.ip {
	display: table-cell;
}

html {
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
}

body {
	position: relative;
	margin: 0;
	padding-bottom: 6rem;
	min-height: 100%;
}

* {
	box-sizing: border-box;
}

.row::after {
	content: "";
	clear: both;
	display: table;
}

[class*="col-"] {
	float: left;
	padding: 15px;
}

.footer {
	text-align: center;
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	padding: 1rem;
}

.shadowBoard {
	/* border: 1px solid;
	padding: 10px; */
	box-shadow: 5px 10px 18px #888888;
}

.shadowHints {
	/* border: 1px solid; */
	/* padding: 10px; */
	/* box-shadow: 5px 10px 18px #888888; */
	border: 1px double;
	box-shadow: 1px 1px 20px #888888;
	padding: 10px 0px 10px 10px;

	/* border: 1px double;
	width: auto;
	padding: 0px 0px 20px 10px;
	box-shadow: 5px 10px 8px #8888ca; */
}
/* For mobile phones: */
[class*="col-"] {
	width: 100%;
}

@media only screen and (min-width: 600px) {
	/* For tablets: */
	.col-m-1 {
		width: 8.33%;
	}
	.col-m-2 {
		width: 16.66%;
	}
	.col-m-3 {
		width: 25%;
	}
	.col-m-4 {
		width: 33.33%;
	}
	.col-m-5 {
		width: 41.66%;
	}
	.col-m-6 {
		width: 50%;
	}
	.col-m-7 {
		width: 58.33%;
	}
	.col-m-8 {
		width: 66.66%;
	}
	.col-m-9 {
		width: 75%;
	}
	.col-m-10 {
		width: 83.33%;
	}
	.col-m-11 {
		width: 91.66%;
	}
	.col-m-12 {
		width: 100%;
	}
}

@media only screen and (min-width: 768px) {
	/* For desktop: */
	.col-1 {
		width: 8.33%;
	}
	.col-2 {
		width: 16.66%;
	}
	.col-3 {
		width: 25%;
	}
	.col-4 {
		width: 33.33%;
	}
	.col-5 {
		width: 41.66%;
	}
	.col-6 {
		width: 50%;
	}
	.col-7 {
		width: 58.33%;
	}
	.col-8 {
		width: 66.66%;
	}
	.col-9 {
		width: 75%;
	}
	.col-10 {
		width: 83.33%;
	}
	.col-11 {
		width: 91.66%;
	}
	.col-12 {
		width: 100%;
	}
}
</style>
</head>

<script language="JavaScript" type="text/javascript"
	src="ScriptToCreateBoard.js">
	
</script>
<body onload="disableAll()" class="bg">
	<div align="center">
		<div class="row">
			<div class="col-10 col-m-10" align="center">
				<font style="font-size: 25px"> Create Crossword </font>
			</div>
			<div class="col-2 col-m-12">
				<div align="right" style="padding-right: 10px">
					<a href="Home.html">
						<button type="button" class="btn btn-custom">
							<span class="glyphicon glyphicon-home"></span>
						</button>
					</a>
				</div>
			</div>

		</div>


		<hr>
	</div>
	<div class="row">
		<form name="cross">
			<div class="col-5 col-m-5">
				<div class="row" style="padding: 14px">
					<div id="divSelect">
						<font style="color: black; font-family: serif; font-size: 17px;">Select
							crossword board size:</font> <font
							style="color: gray; font-family: sans-serif;"><select
							id="myList" onchange="createCrossword();">
								<option value="Select">&nbsp;Select</option>
								<option value="5">&nbsp;5 &nbsp;x &nbsp;5</option>
								<option value="6">&nbsp;6 &nbsp;x &nbsp;6</option>
								<option value="7">&nbsp;7 &nbsp;x &nbsp;7</option>
								<option value="8">&nbsp;8 &nbsp;x &nbsp;8</option>
								<option value="9">&nbsp;9 &nbsp;x &nbsp;9</option>
								<option value="10">10 x 10</option>
								<option value="11">11 x 11</option>
								<option value="12">12 x 12</option>
								<option value="13">13 x 13</option>
								<option value="14">14 x 14</option>
								<option value="15">15 x 15</option>
								<option value="16">16 x 16</option>
								<option value="17">17 x 17</option>
						</select> </font>
					</div>
				</div>
				<div id="divCrossword" style="display: none;">
					<font style="color: black; font-family: serif; font-size: medium;">
						Please provide answers in the below crossword.</font> <br /> <font
						style="color: black; font-family: serif; font-size: medium;">
						Select cursor movement:&nbsp; <input type="radio" name="rad"
						id="astate" value="across" checked="checked" accesskey="a"><u>A</u>cross</input>
						<input type="radio" name="rad" id="dstate" value="down"
						accesskey="w">Do<u>w</u>n</input>
					</font> <br>
					<div>
						<table class="shadowBoard" id="puzzle">
						</table>
					</div>
				</div>
				<br>
				<div id="divFinish" style="display: none;">
					<!-- <font style="color: black; font-family: serif; font-size: medium;">Proceed
						to add hints:</font> -->
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="addAnswers();" id="proceedBtn" accesskey="g">
						<span class="glyphicon glyphicon-hand-right"></span>&nbsp;<u>G</u>enerate
						hints
					</button>

				</div>
				<div id="divUpdate" style="display: none;">
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="updateCrossword();" id="updateBtn" accesskey="b">
						<span class="glyphicon glyphicon-th"></span>&nbsp;Edit <u>b</u>oard
					</button>
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="addAnswers();" id="generateBtn" accesskey="u">
						<span class="glyphicon glyphicon-th-list"></span>&nbsp;<u>U</u>pdate
						hints
					</button>
				</div>

				<br>

			</div>
			<div class="col-7 col-m-12">
				<div class="row">
					<div class="col-9 col-m-9">
						<div style="height: 50px; display: none" id="progressBar">
							<font style="color: black; font-family: serif; font-size: large;">Crossword
								creation progress</font>
							<div class="progress" align="justify" style="width: 100%;">
								<div id="progress"
									class="progress-bar progress-bar-success progress-bar-striped active"
									role="progressbar" aria-valuenow="40" aria-valuemin="0"
									aria-valuemax="100" style="width: 0%">0% complete</div>
							</div>
						</div>
					</div>
					<div class="col-2 col-m-11">
						<div id="resetBtn" style="padding-top: 15px; display: none;">
							<button id="resetBtn" type="button" class="btn  btn-danger"
								onclick="createNewConfirm();" accesskey="r"
								style="height: 30px; width: 80px">
								<span class="glyphicon glyphicon-repeat"></span>&nbsp;<u>R</u>eset
							</button>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-11 col-m-12">
						<div id="divHints" class="shadowHints" style="display: none;">
							<h5 align="left">
								<b> Across:</b>
							</h5>
							<table>
								<thead>
									<tr>
										<th width="67px">Hint No</th>
										<th width="366px">Hint description</th>
										<th width="58px">Length</th>
										<th width="150px">Answer</th>
									</tr>
								</thead>
							</table>
							<div class="divScroll">
								<table id="AcrossHints" class="table w3-hoverable"
									style="width: 100px">
								</table>
							</div>
							<h5>
								<b>Down:</b>
							</h5>
							<table>
								<thead>
									<tr>
										<th width="67px">Hint No</th>
										<th width="366px">Hint description</th>
										<th width="58px">Length</th>
										<th width="150px">Answer</th>
									</tr>
								</thead>
							</table>
							<div class="divScroll">
								<table id="DownHints" class="table w3-hoverable"
									style="width: 100px">
								</table>
							</div>
							<!-- <h4 style="color: red;" id="info"></h4>
					<h4 style="color: green;" id="hintsSaved"></h4> -->
						</div>
					</div>
				</div>
				<!-- <div id="saveHintsBtn">
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="addHints();" accesskey="h">
						<span class="glyphicon glyphicon-plus-sign"></span>&nbsp;Save <u>H</u>ints
					</button>
				</div> -->
				<br>
				<div id="divFile" style="display: none;">
					<div style="float: left; width: auto;">
						<label>Enter file name : <input id="file" type="text"
							name="fileName" value="eg:TM01" size=25 maxlength="30"
							onfocus="ClearPlaceHolder (this)" onblur="SetPlaceHolder (this)"
							onkeyup="clearError()" />
						</label>
					</div>
					<div style="float: left; width: auto;" id="filePresent">
						<!-- <font style="color: red; font-style: oblique;">File already
							exists!!</font> <br> -->
						<font
							style="color: red; font-style: oblique; font-family: cursive;">File
							already exists!!</font>
					</div>
				</div>
				<br> <br>
				<div>
					<button id="saveBtn" type="button" class="btn btn-success"
						value="Save" accesskey="s" onclick="addHints();"
						style="display: none;">
						<!-- onclick="myCall();" -->
						<span class="glyphicon glyphicon-floppy-save"></span>&nbsp;<u>S</u>ave
					</button>
				</div>
			</div>
		</form>
	</div>
	<div class="footer">
		<b><font
			style="color: gray; font-family: serif; font-size: large;">
				Wipro Technologies &copy; 2018 | Talent Transformation</font></b>
	</div>
	<div id="dialogSuccess" style="display: none; width: 170px; height: 155px;">
		<img alt="warning" src="img/tick41.png" height="35px" width="100px"
			align="middle">
	</div>
	<!-- <div id="dialog"
		style="display: none; color: green; height: 70px; width: auto; min-height: 70px;">
		<img alt="success" src="img/tick41.png" height="40px" width="120px"
			align="middle">
	</div> -->
	<div id="dialogFillAllHints"
		style="display: none; width: auto; min-height: 0px; height: 70.16px;">
		<img alt="warning" src="img/warning555.jpg" height="35px"
			width="200px" align="middle">
	</div>
	<div id="dialog-confirm"
		style="display: none; color: green; height: 70px; width: auto; min-height: 70px;">
		<img alt="success" src="img/info44.png" height="50px" width="280px"
			align="middle">
	</div>
	<div id="dialog-answers"
		style="display: none; color: green; height: 70px; width: auto; min-height: 70px;">
		<img alt="success" src="img/infoAnswers.png" height="40px"
			width="230px" align="middle">
	</div>
	<div id="dialog-answerDownAcross"
		style="display: none; color: green; height: 70px; width: auto; min-height: 70px;">
		<img alt="success" src="img/infoAcrossDown.png" height="50px"
			width="240px" align="middle">
	</div>
</body>
</html>