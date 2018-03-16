<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.wipro.crossword.bean.CrosswordBean"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
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
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script
	src="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.9/jquery-ui.js"
	type="text/javascript"></script>
<link
	href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.9/themes/blitzer/jquery-ui.css"
	rel="stylesheet" type="text/css" />
<title>Crossword</title>
<style>
#acrossHints {
	display: block;
	height: 200px;
	overflow: auto;
}

#downHints {
	display: block;
	height: 200px;
	overflow: auto;
}

.divScroll {
	height: scroll;
	overflow: auto;
}

textarea {
	resize: none;
	overflow: auto;
}

.holder {
	position: relative;
}

.holder label {
	position: absolute;
	left: 2px;
	top: 1px;
	font-size: 9px;
}

.holder input {
	height: 29px;
	width: 29px;
	border: 0.2px solid black;
	text-align: center;
	box-sizing: border-box;
}

.bg {
	background-image: url('img/b3.jpg');
	/* opacity: 0.2; */
}

.shadowBoard {
	box-shadow: 5px 10px 18px #888888;
}

.hints {
	border: 1px double;
	padding: 10px 0px 10px 10px;
	box-shadow: 1px 1px 20px #888888;
}

.detailsShadow {
	box-shadow: 1px 1px 20px #888888;
	padding: 5px 0px 5px 5px;
	border: 1px double;
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
</style>
<script language="JavaScript" type="text/javascript"
	src="ScriptToDisplayBoard.js">
	
</script>
</head>

<body onload="disableDiv()" class="bg">
	<form>
		<div align="center">
			<div class="row">
				<div class="col-10 col-m-10" align="center">
					<font style="font-size: 25px"> Crossword </font>
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
			<div class="col-5 col-m-5">
				<div>
					<font style="color: black; font-family: serif; font-size: 17px;">Select
						crossword:</font> <font
						style="font-size: 13px; color: gray; font-family: sans-serif;"><select
						onchange="getCrossword()" id="fileName">
							<option>Select</option>
							<%
								List<String> crosswordList = (List<String>) session
										.getAttribute("crossList");
								CrosswordBean crosswordBean = (CrosswordBean) session
										.getAttribute("details");
								SimpleDateFormat sd = new SimpleDateFormat("dd-MMM-yyyy");
								String createDate = sd.format(crosswordBean.getCreatedOn());
								for (Iterator iterator = crosswordList.iterator(); iterator
										.hasNext();) {
									String fileName = (String) iterator.next();
							%>
							<option>
								<%=fileName%>
							</option>
							<%
								}
							%>
					</select></font>
				</div>
				<div id="divCrossword">
					<div class="row" style="padding: 0px 0px 0px 5px">
						<div class="col-10 col-m-10">
							<div class="detailsShadow" id="divDetailsBox"
								style="display: none;">

								<table border="0">
									<tr>
										<td></td>
										<td></td>
										<td><font
											style="color: black; font-family: serif; font-size: 13px;"><u>File
													Details:</u></font></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td><font
											style="color: black; font-family: serif; font-size: 13px;">File
												Name:</font></td>
										<td><font
											style="color: grey; font-family: serif; font-size: 13px;"><%=crosswordBean.getFileName()%></font></td>
										<td></td>
										<td></td>
										<td><font
											style="color: black; font-family: serif; font-size: 13px;">Stream:
										</font></td>
										<td><font
											style="color: grey; font-family: serif; font-size: 13px;"><%=crosswordBean.getStream()%></font></td>
									</tr>
									<tr>
										<td><font
											style="color: black; font-family: serif; font-size: 13px;">Creadted
												by: </font></td>
										<td><font
											style="color: grey; font-family: serif; font-size: 13px;"><%=crosswordBean.getUserName()%></font></td>
										<td></td>
										<td></td>
										<td><font
											style="color: black; font-family: serif; font-size: 13px;">Creadted
												on: </font></td>
										<td><font
											style="color: grey; font-family: serif; font-size: 13px;"><%=createDate%></font></td>
									</tr>
									<tr>

										<td><font
											style="color: black; font-family: serif; font-size: 13px;">Grid
												Size: </font></td>
										<td><font
											style="color: grey; font-family: serif; font-size: 13px;">10&nbsp;x&nbsp;10</font></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="row" style="padding: 10px 0px 0px 20px">
						<div>
							<table class="shadowBoard" id="crossword">
							</table>
						</div>
					</div>
				</div>
				<br>
				<div id="divCrosswordBtns" style="display: none;">
					<!-- class="btn-group" -->
					<!-- <button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="editCrossword();" accesskey="b" disabled="disabled"
						id="editBoardBtn">
						<span class="glyphicon glyphicon-th"></span>&nbsp;Edit Crossword
					</button> -->
					<button type="button" class="btn btn-custom btn-danger btn-sm "
						id="deleteBtn" onclick="deleteCrossword()">
						<span class="glyphicon glyphicon-trash"></span>&nbsp;Delete
						Crossword
					</button>
				</div>
			</div>
			<!-- ///// -->
			<div class="col-7 col-m-12">
				<div class="row" style="height: 22px"></div>
				<!-- <div class="row" style="height: 130px"></div> -->
				<div class="row">
					<div class="col-11 col-m-12">
						<div id="divHints" class="hints" style="display: none;">
							<h5 align="left">
								<b> Across:</b>
							</h5>
							<div class="divScroll">
								<table id="titleAcross">
								</table>
								<table id="acrossHints">
								</table>
							</div>
							<h5>
								<b>Down:</b>
							</h5>
							<div class="divScroll">
								<table id="titleDown">
								</table>
								<table id="downHints">
								</table>
							</div>
							<!-- <h4 style="color: red;" id="info"></h4>
					<h4 style="color: green;" id="hintsSaved"></h4> -->
						</div>
					</div>
				</div>
				<div id="divQuestionBtns" style="display: none;">
					<!-- class="btn-group" -->
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="editQuestions();" id="editQuestionBtn">
						<span class="glyphicon glyphicon-th-list"></span>&nbsp;Edit
						Questions
					</button>
					<button type="button" class="btn btn-custom btn-primary btn-sm"
						onclick="updateQuestions();" id="updateQuestionBtn">
						<span class="glyphicon glyphicon-upload"></span>&nbsp;Update
						Questions
					</button>
					<button type="button" class="btn btn-custom btn-danger btn-sm "
						id="cancelQuestionBtn" onclick="cancelUpdateQuestions();">
						<span class="glyphicon glyphicon-ban-circle"></span>&nbsp;Cancel
					</button>
				</div>
			</div>
		</div>
		<div class="footer">
			<b><font
				style="color: gray; font-family: serif; font-size: large;">
					Wipro Technologies &copy; 2018 | Talent Transformation</font></b>
		</div>
	</form>
	<div id="dialog" style="display: none; color: Green">
		<img alt="success" src="img/tick41.png" height="45px" width="130px"
			align="middle">
	</div>
</body>
</html>