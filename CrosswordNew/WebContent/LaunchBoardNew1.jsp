<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<style>
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

.bg {
	background-image: url('img/b3.jpg');
	/* opacity: 0.2; */
}

table, td {
	border-collapse: collapse;
	padding: 0px;
	border-spacing: 0px 0px;
}

.footer {
	text-align: center;
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	padding: 1rem;
}

tr {
	border-collapse: collapse;
}

#puzzel {
	text-align: center;
	border-collapse: separate;
	border-spacing: 0px 0px;
	border: 1px solid black;
}

tr.highlight {
	background: gold;
	width: auto;
}

.holder {
	position: relative;
}

.holder label {
	position: absolute;
	left: 4px;
	top: 1px;
	font-size: 10px;
}

.holder input {
	height: 30px;
	width: 30px;
	border: 0.2px solid black;
	text-align: center;
	box-sizing: border-box;
}

.shadowBoard {
	box-shadow: 5px 10px 18px #888888;
}

#hints {
	border: 1px double;
	box-shadow: 1px 1px 20px #888888;
	padding: 10px 0px 10px 10px;
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
</style>
<script type="text/javascript">
            var currentTextInput;
            var puzzelArrayData;
var acrosslen;
var downlen;
var hints = new Array();
var answer = new Array();
var fullanswer=[];
var downanswer=[];
var pattern1=[];
var pattern2=[];
var h = new Object;
var h2 = new Object;
            //load cross
            function initializeScreen() {
            <%String fn = request.getParameter("name");
                    String FILENAME = "E:\\java\\" + fn + ".dat";
                    String s = "", s1 = "", t = "", s2 = "", s3 = "";
                    int first = 0;
                    BufferedReader br = null;
                    FileReader fr = null;
                    try {
                        //br = new BufferedReader(new FileReader(FILENAME));
                        fr = new FileReader(FILENAME);
                        br = new BufferedReader(fr);
                        String sCurrentLine = "";
                        while ((sCurrentLine = br.readLine()) != null) {
                            s = s + sCurrentLine;
                        }
                        String ar[] = s.split("\\*");
                        String count[] = ar[0].split("_");
				first = Integer.parseInt(count[0]);
				//answer stored in t
				t = count[1];
				s1 = ar[1];//hints
				s2 = ar[2];//across questions
				s3 = ar[3];//down questions
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				try {
					if (br != null) {
						br.close();
					}
					if (fr != null) {
						fr.close();
					}
				} catch (IOException ex) {
					ex.printStackTrace();
				}
			}%>
                var puzzelTable = document.getElementById("puzzel");
                for (i = 0; i <<%=first%>; i++) {
                    hints[i] = new Array();
                    for (j = 0; j <<%=first%>; j++) {
                        hints[i][j] = 1;
                    }
                }
                var c = 0;
            <%-- hints--%>
                var g = "<%=s1%>";
                var w = g.split(".");
                for (var i = 0; i <<%=first%>; i++)
                {
                    for (j = 0; j <<%=first%>; j++)
                    {
                        hints[i][j] = w[c];
                        c++;
                    }
                }
                for (i = 0; i <<%=first%>; i++) {
                    answer[i] = new Array();
                    for (j = 0; j <<%=first%>; j++) {
                        answer[i][j] = '0';
                    }
                }
                var z = 0;
            <%--answer --%>
                var s = "<%=t%>";
                for (var i = 0; i <<%=first%>; i++)
                {
                    for (var j = 0; j <<%=first%>; j++)
                    {
                        if (s.charAt(z) != '0')
                        {
                            answer[i][j] = s.charAt(z).toLowerCase();
                            z++;
                        } else
                        {
                            answer[i][j] = '0';
                            z++;
                        }
                    }
                }
                var puzzelTable = document.getElementById("puzzel");
                puzzelArrayData = answer;
                for (var i = 0; i < puzzelArrayData.length; i++) {
                    var row = puzzelTable.insertRow(-1);
                    var rowData = puzzelArrayData[i];
                    var len = rowData.length;
                    for (var j = 0; j < len; j++) {
                        var cell = row.insertCell(-1);
                        if (rowData[j] != '0') {
                            var txtID = String('txt' + '_' + i + '_' + j);
                            if (hints[i][j] != 0)
                            {
                                cell.innerHTML = ' <div class="holder"> <label for="' + txtID + '">' + hints[i][j] + '</label> <input type="text"  maxlength="1"  style="font-size:20px;font-weight:bold;text-transform:lowercase;" ' + ' id="' + txtID + '" onkeyup="myFunc('+i+','+j+');cursorMov('+i+','+j+')" > </div>';
                            } else
                            {
                                cell.innerHTML = ' <div class="holder"> <label> </label> <input type="text" maxlength="1" style="font-size:20px;font-weight:bold;text-transform:lowercase;" ' + ' id="' + txtID + '" onkeyup="myFunc('+i+','+j+');cursorMov('+i+','+j+')"> </div>';
                            }
                        } else {
                            cell.innerHTML = '  <div class="holder"> <input type="text" disabled="disabled" maxlength="1" style="background-color:grey;" ' + 'id="' + txtID + '" ></div>';
                        }
                    }
                }
              //to load across questions
                var table = document.getElementById("www");
                var q = "<%=s2%>";
                var div = q.split(",");
                var myarray1 = []; // hint number
                var myarray2=[]; // question with length of the answer in brackets
                
                for (var i = 0; i < div.length; i++) {
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var temp = div[i].split(".");
                    myarray1.push(temp[0]);
                    myarray2.push(temp[1]);
                    row.id = temp[0] + "h";
                    cell1.innerHTML = '<td>' + temp[0] + "." + temp[1] + '</td>';
                }
                //array to store across len temporarily
                var ac = new Array();
                for (i = 0; i <<%=first%>; i++) {
                	ac[i] = new Array();
                    for (j = 0; j <<%=first%>; j++) {
                    	ac[i][j] = 0;
                    }
                }
                for(i=0;i<myarray1.length;i++)
                	{
                	 var que=myarray2[i];
                     var start=que.indexOf("(");
                     var end=que.indexOf(")");
                     var extract=(end-start-1);
                     var wordlen=que.substr(start+1,extract); 
                     for (k = 0; k<<%=first%>; k++) {
                         for (j = 0; j <<%=first%>; j++) {
                             if(hints[k][j]==myarray1[i])
                          	   {
                             	ac[k][j]=wordlen;
                          	   }
                         }
                     }
                	}
                for(var k1=0;k1<<%=first%>;k1++)
                	{
                	var row1=ac[k1];
                	for(var k2=0;k2<row1.length;k2++)
                		{
                		if(row1[k2]!=0)
                			{
                			var pat="";
                			var c=k2;
                			for(var k3=0;k3<row1[k2];k3++)
                				{
                				pat=pat+k1+"."+c+"*";
                				c=c+1;
                				}
                			pattern1.push(pat);
                			}
                		}
                	}
                acrosslen=ac;
                var q1 = "<%=s3%>";
		var table1 = document.getElementById("www1");
		var div1 = q1.split(",");
		var myarray3 = [];
        var myarray4=[];
		for (var i = 0; i < div1.length; i++) {
			var row1 = table1.insertRow(-1);
			var cell11 = row1.insertCell(0);
			var temp1 = div1[i].split(".");
			myarray3.push(temp1[0]);
            myarray4.push(temp1[1]);
			row1.id = temp1[0] + "v";
			cell11.innerHTML = '<td>' + temp1[0] + "." + temp1[1] + '</td>';
		}
            //array to store down len temporarily
            var dc = new Array();
            for (i = 0; i <<%=first%>; i++) {
            	dc[i] = new Array();
                for (j = 0; j <<%=first%>; j++) {
                	dc[i][j] = 0;
                }
            }
            for(i=0;i<myarray3.length;i++)
        	{
        	 var que=myarray4[i];
             var start=que.indexOf("(");
             var end=que.indexOf(")");
             var extract=(end-start-1);
             var wordlen=que.substr(start+1,extract); 
             for (k = 0; k<<%=first%>; k++) {
                 for (j = 0; j <<%=first%>; j++) {
                     if(hints[k][j]==myarray3[i])
                  	   {
                     	dc[k][j]=wordlen;
                  	   }
                 }
             }
        	}
            var a1=new Array();
            for (k = 0; k<<%=first%>; k++) {
               a1[k]=new Array();
                for (j = 0; j <<%=first%>; j++) {
                    	a1[k][j]=0;
                }
            }
            for (k = 0; k<<%=first%>; k++) {
                 for (j = 0; j <<%=first%>; j++) {
                     	a1[k][j]=dc[j][k];
                 }
             }
            for(var k1=0;k1<<%=first%>;k1++)
        	{
        	var row1=a1[k1];
        	for(var k2=0;k2<row1.length;k2++)
        		{
        		if(row1[k2]!=0)
        			{
        			var pat="";
        			var c=k2;
        			for(var k3=0;k3<row1[k2];k3++)
        				{
        				pat=pat+c+"."+ k1 +"*";
        				c=c+1;
        				}
        			pattern2.push(pat);
        			}
        		}
        	}
		downlen=dc;
		for (var i = 0; i <<%=first%>; i++)
   	 {
   		 var word="";
           for (var j = 0; j <<%=first%>
	; j++) {
				word = word + answer[i][j];
			}
			var tt = word.split("0");
			for (var k = 0; k < tt.length; k++) {
				if (tt[k].length > 1) {
					fullanswer.push(tt[k]);
				}
			}
		}
		// or just {}
		for (var i = 0; i < fullanswer.length; i++) {
			h[fullanswer[i]] = pattern1[i];
		}
		var res = [];
		for (var i = 0; i < answer.length; i++) {
			for (var j = 0; j < answer[i].length; j++) {
				res[j] = (res[j] || 0) + answer[i][j];
			}
		}
		for (var i = 0; i < res.length; i++) {
			var word = "";
			word = res[i];
			var tt = word.split("0");
			for (var k = 0; k < tt.length; k++) {
				if (tt[k].length > 1) {
					downanswer.push(tt[k]);
				}
			}
		}
		for (var i = 0; i < downanswer.length; i++) {
			h2[downanswer[i]] = pattern2[i];
		}
		//alert(downanswer);
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
				//for horizontal movement
				temp1 = j + 1;
				document.getElementById('txt' + '_' + (i) + '_' + (temp1))
						.focus();
			}
			if (state == 'down') {
				temp1 = i + 1;
				document.getElementById('txt' + '_' + (temp1) + '_' + (j))
						.focus();
			}
		} else {
			document.getElementById('txt' + '_' + i + '_' + j).value = "";
			document.getElementById('txt' + '_' + i + '_' + j).focus();
		}
	}
	function myFunc(a, b) {
		var letter = document.getElementById('txt' + '_' + a + '_' + b).value;
		var correctpattern = [];
		if (letter == 0) {
			var selectedInputTextElement1 = document.getElementById('txt' + '_'
					+ a + '_' + b);
			selectedInputTextElement1.style.backgroundColor = 'white';
		}
		//across
		for (var i1 = 0; i1 < fullanswer.length; i1++) {
			var t = pattern1[i1];
			var user = "";
			var divarray = t.split("*");
			for (var k1 = 0; k1 < divarray.length - 1; k1++) {
				var temp = divarray[k1].split(".");
				var a = document.getElementById('txt' + '_' + temp[0] + '_'
						+ temp[1]).value;
				user = user + a.toLowerCase();
			}
			if (fullanswer[i1] == user) {
				correctpattern.push(t);
				/* for(var k1=0;k1<divarray.length-1;k1++)
				{
				  var temp=divarray[k1].split(".");
				  var selectedInputTextElement1 = document.getElementById('txt' + '_' + temp[0] + '_' + temp[1]);
				  selectedInputTextElement1.style.backgroundColor = '#9AFF67';
				} */
			} else if (user != fullanswer[i1]
					&& user.length == fullanswer[i1].length) {
				for (var k1 = 0; k1 < divarray.length - 1; k1++) {
					var temp = divarray[k1].split(".");
					var selectedInputTextElement1 = document
							.getElementById('txt' + '_' + temp[0] + '_'
									+ temp[1]);
					selectedInputTextElement1.style.backgroundColor = '#FF3333';
				}
			} else if ((user.length == 0 || user.length < fullanswer[i1].length)
					&& user.length != 1) {
				for (var k1 = 0; k1 < divarray.length - 1; k1++) {
					var temp = divarray[k1].split(".");
					var selectedInputTextElement1 = document
							.getElementById('txt' + '_' + temp[0] + '_'
									+ temp[1]);
					selectedInputTextElement1.style.backgroundColor = 'white';
				}
			}
		}
		//down
		for (var i1 = 0; i1 < downanswer.length; i1++) {
			var t = pattern2[i1];
			var user = "";
			var divarray = t.split("*");
			for (var k1 = 0; k1 < divarray.length - 1; k1++) {
				var temp = divarray[k1].split(".");
				var a = document.getElementById('txt' + '_' + temp[0] + '_'
						+ temp[1]).value;
				user = user + a.toLowerCase();
			}
			if (downanswer[i1] == user) {
				correctpattern.push(t);
			} else if (user != downanswer[i1]
					&& user.length == downanswer[i1].length) {
				for (var k1 = 0; k1 < divarray.length - 1; k1++) {
					var temp = divarray[k1].split(".");
					var selectedInputTextElement1 = document
							.getElementById('txt' + '_' + temp[0] + '_'
									+ temp[1]);
					selectedInputTextElement1.style.backgroundColor = '#FF3333';
				}
			} else if ((user.length == 0 || user.length < downanswer[i1].length)
					&& user.length != 1) {
				for (var k1 = 0; k1 < divarray.length - 1; k1++) {
					var temp = divarray[k1].split(".");
					var selectedInputTextElement1 = document
							.getElementById('txt' + '_' + temp[0] + '_'
									+ temp[1]);
					selectedInputTextElement1.style.backgroundColor = 'white';
				}
			}
		}
		for (var w1 = 0; w1 < correctpattern.length; w1++) {
			var t = correctpattern[w1];
			var user = "";
			var divarray = t.split("*");
			for (var k1 = 0; k1 < divarray.length - 1; k1++) {
				var temp = divarray[k1].split(".");
				var selectedInputTextElement1 = document.getElementById('txt'
						+ '_' + temp[0] + '_' + temp[1]);
				selectedInputTextElement1.style.backgroundColor = '#9AFF67';
			}
		}
		var percent = correctpattern.length;
		var foroneanswer = 100 / (pattern1.length + pattern2.length);
		var progress = document.getElementById("progress");
		progress.style.width = (foroneanswer * percent) + "%";
		document.getElementById("progress").innerHTML = Math
				.round((foroneanswer * percent))
				+ "% complete";
		if ((foroneanswer * percent) == 100) {
			alert('Congratulations for puzzle completion.');
		}
	}

	function resetAll() {
		var con = confirm("Are you sure? \nAs the progress of the crossword state will be lost.");
		if (con == true) {
			var progress = document.getElementById("progress");
			progress.style.width = "0%";
			document.getElementById("progress").innerHTML = "0% complete";

			var puzzelTable = document.getElementById("puzzel");
			puzzelTable.innerHTML = '';

			var acrossHints = document.getElementById("www");
			acrossHints.innerHTML = '';

			var downHints = document.getElementById("www1");
			downHints.innerHTML = '';

			initializeScreen();
		}
	}
</script>
<script type="text/javascript">
	$(document).ready(function() {
		var s;
		$(":input").hover(function() {
			var holder = $('label[for="' + this.id + '"]').html();
			s = "#" + holder;
			$(s + "h").addClass("highlight");
			$(s + "v").addClass("highlight");
		}, function() {
			$(s + "h").removeClass("highlight");
			$(s + "v").removeClass("highlight");
		});
	});
</script>
</head>
<body onload="initializeScreen();" class="bg">
	<Center>
		<h3>Crossword Time</h3>
	</Center>
	<hr>
	<div class="row">
		<div class="col-5 col-m-5">
			<!-- <h5>Completion status</h5>
			<div class="progress">
				<div id="progress"
					class="progress-bar progress-bar-success progress-bar-striped active"
					role="progressbar" aria-valuenow="40" aria-valuemin="0"
					aria-valuemax="100" style="width: 0%">0% complete</div>
			</div> -->
			<div class="row">
				<div class="col-5 col-m-5">&nbsp;</div>
			</div>
			Select auto cursor movement:&nbsp; <input type="radio" name="rad"
				id="astate" value="across" checked="checked" accesskey="a"><u>A</u>cross</input>
			<input type="radio" name="rad" id="dstate" value="down" accesskey="w">Do<u>w</u>n</input>
			<label id="quest"></label>
			<table id="puzzel" class="shadowBoard">
			</table>
		</div>
		<div class="col-7 col-m-12">
			<div class="row">
				<div class="col-9 col-m-9">
					<div style="height: 50px">
						<font style="color: black; font-family: serif; font-size: large;">Crossword
							completion status</font>
						<div class="progress" align="justify" style="width: 100%;">
							<div id="progress"
								class="progress-bar progress-bar-success progress-bar-striped active"
								role="progressbar" aria-valuenow="40" aria-valuemin="0"
								aria-valuemax="100" style="width: 0%">0% complete</div>
						</div>
					</div>
				</div>
				<div class="col-2 col-m-11">
					<div style="padding-top: 15px">
						<button id="resetBtn" type="button" class="btn  btn-danger"
							onclick="resetAll();" accesskey="r"
							style="height: 30px; width: 80px">
							<span class="glyphicon glyphicon-repeat"></span>&nbsp;<u>R</u>eset
						</button>
					</div>
				</div>
			</div>
			<div id="hints">
				<div>
					<br> <B><u>Across</u> </B></font>
					<table id="www">
					</table>
				</div>
				<div>
					<br> <B><u>Down</u></B></font>
					<table id="www1">
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<b><font
			style="color: gray; font-family: serif; font-size: large;">
				Wipro Technologies &copy; 2018 | Talent Transformation</font></b>
	</div>
</body>
</html>