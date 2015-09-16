// ==UserScript==
// @name           杭电参考绩点计算器@haipz.com
// @namespace      http://www.haipz.com
// @description    杭电参考绩点计算器
// @version        0.1
// @include        http://jxgl.hdu.edu.cn/*
// ==/UserScript==
(function() {
	var div = document.createElement('div');
	div.innerHTML = '<div id="show-gpa"><a href="#">点击计算绩点</a></div>';
	div.style.position = 'fixed';
	div.style.top = '8px';
	div.style.right = '260px';
	div.style.zIndex = "999";
	document.getElementById('headDiv').appendChild(div);

	var btn = document.getElementById('show-gpa');

	btn.onclick = function() {
		//console.log('onclick');
		framesDom = window.frames[0].document;
		var gpas = framesDom.getElementsByClassName('gpa');
		while (gpas.length > 0) {
			gpas[0].remove();
		}
		//console.log(framesDom);
		var datelist = framesDom.getElementsByClassName('datelist')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		var datelisthead = framesDom.getElementsByClassName('datelisthead')[0];
		var newheadtd = document.createElement('td');
		newheadtd.className = 'gpa';
		newheadtd.innerText = "单科绩点";
		datelisthead.insertBefore(newheadtd, datelisthead.childNodes[9]);
		var sumcredit = 0;
		var sumgp = 0;
		for (var i = 1; i < datelist.length; ++i) {
			var newtd = document.createElement('td');
			newtd.className = 'gpa';
			var curtr = datelist[i];
			var credit = curtr.childNodes[7].innerText;
			var score = curtr.childNodes[8].innerText;
			if (score == '优秀') score = 90;
			if (score == '良好') score = 80;
			if (score == '中等') score = 70;
			if (score == '及格') score = 60;
			if (score == '不及格') score = 0;
			if (score < 60) score = 0;
			if (score > 95) score = 95;
			//console.log(credit + ' - ' + score);
			var gp = credit*(score - 45)/10.0;
			if (score == 0) gp = 0;
			newtd.innerText = gp;
			sumcredit += Number(credit);
			sumgp += gp;
			curtr.insertBefore(newtd, curtr.childNodes[9]);
		}
		//console.log(sumcredit + ' - ' + sumgp);
		var gpa = sumgp/sumcredit;
		//console.log(gpa);
		var formlist = framesDom.getElementsByClassName('formlist')[0].getElementsByTagName('tbody')[0];
		var gpatr = document.createElement('tr');
		gpatr.className = 'gpa';
		formlist.appendChild(gpatr);
		var gpatd = document.createElement('td');
		gpatd.className = 'gpa';
		gpatd.style.fontSize = '18px';
		gpatd.style.fontWeight = '900';
		gpatd.innerText = '参考绩点：' + gpa.toFixed(3);
		gpatr.appendChild(gpatd);
		var texttd = document.createElement('td');
		texttd.className = 'gpa';
		texttd.innerText = '计算所得绩点为参考绩点，实际请以学校发布为准，作者不为此负任何责任。';
		gpatr.appendChild(texttd);
		var haipztd = document.createElement('td');
		haipztd.className = 'gpa';
		haipztd.innerHTML = '<a href="http://haipz.com">作者主页</a>';
		gpatr.appendChild(haipztd);
	}
})();
