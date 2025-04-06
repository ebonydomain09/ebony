//Every time a key is pressed
// in any of these fields it calls the autoTab function.
// This checks whether the current length of the field is within its limits.
// If not then it is clipped and focus is given to the next field on the form.
// Checks are also made as to the Unicode character of the key that is pressed
// to verify it was not simply a key such as shift or ctrl or whatevere
//
// 8 = [Backspace], 9 = [Tab], 16 = [Shift], 17 = [Ctrl], 18 = [Alt], 37 = [LeftArrow],
// 38 = [UpArrow], 39 = [RightArrow], 40 = [DownArrow], 46 =[Delete] 

var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e)
{
    var keyCode = (isNN) ? e.which : e.keyCode;
    var filter = (isNN) ? [0,8,9,16] : [0,8,9,16,17,18,37,38,39,40,46];
    if(input.value.length >= len && !containsElement(filter,keyCode))
    {
        input.value = input.value.slice(0, len);
        input.form[(getIndex(input)+1) % input.form.length].focus();
    }
    
    function containsElement(arr, ele) 
    {
        var found = false, index = 0;
        while(!found && index < arr.length)
            if(arr[index] == ele)
                found = true;
            else
                index++;
        return found;
    }
    
    function getIndex(input) 
    {
		var index = -1, i = 0, found = false;
		while (i < input.form.length && index == -1)
			if (input.form[i] == input)index = i;
				else i++;
			return index;
    }
    
    return true;
}

var IsSubmitting=false;
function OnFormSubmit()
{
    if(IsSubmitting)
        return false;
    IsSubmitting=true;
    return true;
}

function DependencyMatch(targetId, match, value)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        alert("no element found: " + targetId);
        return false;
    }
    var val = elem.Value;
    var chk = value;
    var found;
    found = false;
    if (val == chk || (val == "*" && chk != "NULL"))
	{
        found = match;
    }

    return found;
}

function IsChecked(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        return false;
    }
    return elem.checked;
}

function IsSelected(targetId, value)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        return false;
    }
    return elem.value == value;
}

function EnableSelectList(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.disabled = false;
    }
}

function ShowRequiredIcon(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.style.visibility = "visible";
    }
}

function HideRequiredIcon(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.style.visibility = "hidden";
    }
}

function EnableRBList(targetId, numItems)
{
    $("#" + targetId).find("span").removeAttr("disabled");
	var i;
    for (i = 0; i < numItems; ++i)
	{
		var elem = $("#" + targetId + "_" + i);
        if (elem != null)
		{ 
			// removes the disabled attribute from the radio button
			elem.removeAttr("disabled");   
        }
    }
}

function DisableRBList(targetId, numItems)
{
    var i;
    for (i = 0; i < numItems; ++i)
	{
		var elem = $("#" + targetId + "_" + i);
		if (elem != null)
		{
		    // disables the radio button
            elem.attr("disabled", "disabled");
			// uncheck the radio button
			elem.prop("checked", false);
        }
    }
}

function EnableControl(targetId)
{
    var elem = $("#" + targetId);
    if (elem != null)
	{
        // clear disabled attribute
        elem.parent().prop("disabled", false);
        elem.prop("disabled", false);
    }
}

function DisableControl(targetId)
{
    var elem = $("#" + targetId);
    if (elem != null)
	{
		if (elem.is("textarea") || elem.attr("type") == "text")
		{
			// clear contents
			elem.val("");
		}
		else if (elem.attr("type") == "radio" || elem.attr("type") == "checkbox")
		{
			// unchecks the control
			elem.attr("checked", false);
		}	
		else if (elem.is("select"))
		{
			// resets the selected element in the select control
		    elem.prop('selectedIndex', 0);
		}
		
        // disable element
        elem.prop("disabled", true);
    }
}

function HideControls(document) {

    var tbs = document.getElementsByTagName('input');

    for (i = 0; i < tbs.length; i++) {
        var input = tbs[i];
        if (input.type == 'text') {
            input.readOnly = "readonly";
        }
        if (input.type == 'image') {
            input.style.display = 'none';
        }
        if (input.type == 'checkbox') {
            input.disabled = 'true';
        }
        if (input.type == 'radio') {
            input.disabled = 'true';
        }

    }

    var selects = document.getElementsByTagName('select');
    for (i = 0; i < selects.length; i++) {
        var select = selects[i];
        select.disabled = 'true';
    }

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < (links.length); i++) {
        var link = links[i];
        link.removeAttribute("href")
    }

    return true;
}
function CopyHTML(print_area) {

    var p = window.opener;

    var elem = document.getElementById("PrintContent");
    elem.innerHTML = p.document.getElementById(print_area).innerHTML;
    HideControls(document);

}

function getPrint(print_area) {

    var pp = window.open("/Core/PrintPreview.aspx?" + print_area);
    pp.moveTo(0, 0);
    pp.resizeTo(screen.width, screen.height);
}



window.addEventListener("load", function () {
    var today = new Date();
    var week = new Array(
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      );
      var day = week[today.getDay()];
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      var hour = today.getHours();
      var minu = today.getMinutes();

      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (minu < 10) {
        minu = "0" + minu;
      }

    
       var text = day + " - " + mm + "/" + dd + "/" + yyyy + " " + hour + ":" + minu
       console.log(text);
      document.getElementById("ctl00_ctl00_cphMain_lblDateTime").innerHTML = text;
   
});