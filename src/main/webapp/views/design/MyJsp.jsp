<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'MyJsp.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

</head>

<body>
	<svg> <g class="ele"> <line class="scrollbar-line" x1="306"
		y1="189" x2="502" y2="189"
		style="stroke: rgb(51, 255, 102); stroke-width: 20; stroke-dasharray: 5, 5; stroke-dashoffset: -425.133px;"></line>
	<polygon class="scrollbar-border" stroke="#000000"
		points="306,177 502,177 502,201 306,201" style="opacity: 0;"></polygon>
	</g> </svg>
</body>
</html>
