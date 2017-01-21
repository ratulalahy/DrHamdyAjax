/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function loadAllData()
{
    readPatents();
    readJournal();
    readConference();
}
//Read Patents //////////////////////////////////////////////////////////////////////
var xmlHttpPatent = createXmlHttpRequestObjectPatent();
var xmlHttpJournal = createXmlHttpRequestObjectJournal();
var xmlHttpConference = createXmlHttpRequestObjectConference();

//create object for reading patent
function createXmlHttpRequestObjectPatent()
{
    var xmlHttpPatent;
    if (window.XMLHttpRequest)
    {
        xmlHttpPatent = new XMLHttpRequest();
    } else
    {
        xmlHttpPatent = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlHttpPatent;
}

function createXmlHttpRequestObjectJournal()
{
    
    var xmlHttpJournal;
    if (window.XMLHttpRequest)
    {
        xmlHttpJournal = new XMLHttpRequest();
    } else
    {
        xmlHttpJournal = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    return xmlHttpJournal;
}

function createXmlHttpRequestObjectConference()
{
    var xmlHttpConference;
    if (window.XMLHttpRequest)
    {
        xmlHttpConference = new XMLHttpRequest();
    } else
    {
        xmlHttpConference = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlHttpConference;
}

//call for all patents
function readPatents()
{
    if (xmlHttpPatent)
    {
        try
        {
            xmlHttpPatent.open("GET", "data/publication_patent.xml", true);
            xmlHttpPatent.onreadystatechange = handleStateChange;
            xmlHttpPatent.send(null);
        } catch (e)
        {
            alert("1 " + e.toString());
        }
    }
}

//call for all Journal
function readJournal()
{
    if (xmlHttpJournal)
    {
        try
        {
            xmlHttpJournal.open("GET", "data/publication_journal.xml", true);
            xmlHttpJournal.onreadystatechange = handleStateChange;
            xmlHttpJournal.send(null);
        } catch (e)
        {
            alert("2 " + e.toString());
        }
    }
}

//call for all Conference
function readConference()
{
    if (xmlHttpConference)
    {
        try
        {
            xmlHttpConference.open("GET", "data/publication_conference.xml", true);
            xmlHttpConference.onreadystatechange = handleStateChange;
            xmlHttpConference.send(null);
        } catch (e)
        {
            alert("3 " + e.toString());
        }
    }
}


//handleStateChange defination

function handleStateChange()
{
    
    if (xmlHttpPatent.readyState == 4)
    {
        
        if (xmlHttpPatent.status == 200)
        {
            try
            {
                handleResponsePatent();
            } catch (e) {
                alert("4 " + e.toString());
            }

        } else
        {
            alert(xmlHttpPatent.statusText);
        }
    }

    //

    if (xmlHttpJournal.readyState == 4)
    {
        
        if (xmlHttpJournal.status == 200)
        {
            try
            {
                handleResponseJournal();
            } catch (e) {
                alert("5 " + e.toString());
            }

        } else
        {
            alert(xmlHttpJournal.statusText);
        }
    }

    //
//alert(xmlHttpConference.readyState);
    if (xmlHttpConference.readyState == 4)
    {
        if (xmlHttpConference.status == 200)
        {
            try
            {
                handleResponseConference();
            } catch (e) {
                alert("6 " + e.toString());
            }

        } else
        {
            alert(xmlHttpConference.statusText);
        }
    }
}

//

function handleResponsePatent()
{
    var xmlResponse = xmlHttpPatent.responseXML;
    root = xmlResponse.documentElement;
    names = root.getElementsByTagName("name");
    uris = root.getElementsByTagName("uri");
    allauthors = root.getElementsByTagName("authors");
    publishers = root.getElementsByTagName("publisher");
    publication_detailss = root.getElementsByTagName("publication_details");
    type_of_publications = root.getElementsByTagName("type_of_publication");
    year_of_publications = root.getElementsByTagName("year_of_publication");
    keyword_primarys = root.getElementsByTagName("keyword_primary");
    keyword_secondarys = root.getElementsByTagName("keyword_secondary");

    var stuff = "";

    for (var i = 0; i < names.length; i++)
    {
        
        stuff += "<tr> <td> <div class='col-md-12 publication_all_holder'>";
        //adding the title with link
        stuff += "<span>" + "<a target='_blank' href= '" + uris.item(i).firstChild.data + "'>" + "<h4>" + names.item(i).firstChild.data + "</h4>" + "</a>" + "</span>";

        //Todo split publisher names and run in loop to add it
        //adding authors
        //var allAuthors = allauthors.item(i).firstChild.data.split(";");
        //for (var i = 0; i < allAuthors.length; i++) {
        stuff += "<p>" + "<span class='badge_author'>" + allauthors.item(i).firstChild.data + "</span>&nbsp;" + "</p>";
        //}

        //adding publisher details
        //Todo check null of publisher
        stuff += "<p>" + "<span class='avoidwrap badge_publisher_name'>" + publishers.item(i).firstChild.data + "</span>"+ "</p>";
        stuff += "<span class='avoidwrap publication_details'>" + publication_detailss.item(i).firstChild.data + "</span>";
        stuff += "&nbsp";
        stuff += "<span class='date_of_publication'>" + year_of_publications.item(i).firstChild.data + "</span>";

        //keyword adding
        //Todo split all keywords
        var allKeywords = keyword_primarys.item(i).firstChild.data.split(",");
        stuff += "<section>";
        /*for (var i = 0; i < allKeywords.length; i++) {
            
            if (allKeywords[i] != null)
            {stuff += "<span class='badge_keyword'>" + allKeywords[i] + "</span>";}

        }*/
        stuff += "<span class='badge_keyword'>" + keyword_primarys.item(i).firstChild.data + "</span>";
        stuff += "</section>";
        stuff += " </div> </td> </tr>";
         //stuff += "text";
    }
    patent_table = document.getElementById("patent_table");
    patent_table.innerHTML = stuff;
}

function handleResponseJournal()
{
    //alert(xmlHttpJournal.readyState);
    var xmlResponse = xmlHttpJournal.responseXML;
    root = xmlResponse.documentElement;
    names = root.getElementsByTagName("name");
    uris = root.getElementsByTagName("uri");
    allauthors = root.getElementsByTagName("authors");
    publishers = root.getElementsByTagName("publisher");
    publication_detailss = root.getElementsByTagName("publication_details");
    type_of_publications = root.getElementsByTagName("type_of_publication");
    year_of_publications = root.getElementsByTagName("year_of_publication");
    keyword_primarys = root.getElementsByTagName("keyword_primary");
    keyword_secondarys = root.getElementsByTagName("keyword_secondary");

    var stuff = "";

    for (var i = 0; i < names.length; i++)
    {
        stuff += "<tr> <td> <div class='col-md-12 publication_all_holder'>";
        //adding the title with link
        stuff += "<span>" + "<a target='_blank' href= '" + uris.item(i).firstChild.data + "'>" + "<h4>" + names.item(i).firstChild.data + "</h4>" + "</a>" + "</span>";

        //Todo split publisher names and run in loop to add it
        //adding authors
        //var allAuthors = allauthors.item(i).firstChild.data.split(";");
        //for (var i = 0; i < allAuthors.length; i++) {
        stuff += "<p>" + "<span class='badge_author'>" + allauthors.item(i).firstChild.data + "</span>&nbsp;" + "</p>";
        //}

        //adding publisher details
        //Todo check null of publisher
        stuff += "<p>" + "<span class='avoidwrap badge_publisher_name'>" + publishers.item(i).firstChild.data + "</span>";
        stuff += "<span class='avoidwrap publication_details'>" + publication_detailss.item(i).firstChild.data + "</span>";
        stuff += "&nbsp";
        stuff += "<span class='date_of_publication'>" + year_of_publications.item(i).firstChild.data + "</span>";

        //keyword adding
        //Todo split all keywords
        //var allKeywords = keyword_primarys.item(i).firstChild.data.split(";");
        stuff += "<section>";
        /*for (var i = 0; i < allKeywords.length; i++) {
            stuff += "<span class='badge_keyword'>" + allKeywords[i] + "</span>";

        }*/
        stuff += "<span class='badge_keyword'>" + keyword_primarys.item(i).firstChild.data + "</span>";
        stuff += "</section>";
        stuff += " </div> </td> </tr>";
    }
    journal_table = document.getElementById("journal_table");
    journal_table.innerHTML = stuff;
}

function handleResponseConference()
{
    //alert(xmlHttpJournal.readyState);
    var xmlResponse = xmlHttpConference.responseXML;
    root = xmlResponse.documentElement;
    names = root.getElementsByTagName("name");
    uris = root.getElementsByTagName("uri");
    allauthors = root.getElementsByTagName("authors");
    publishers = root.getElementsByTagName("publisher");
    publication_detailss = root.getElementsByTagName("publication_details");
    type_of_publications = root.getElementsByTagName("type_of_publication");
    year_of_publications = root.getElementsByTagName("year_of_publication");
    keyword_primarys = root.getElementsByTagName("keyword_primary");
    keyword_secondarys = root.getElementsByTagName("keyword_secondary");

    var stuff = "";

    for (var i = 0; i < names.length; i++)
    {
        stuff += "<tr> <td> <div class='col-md-12 publication_all_holder'>";
        //adding the title with link
        stuff += "<span>" + "<a target='_blank' href= '" + uris.item(i).firstChild.data + "'>" + "<h4>" + names.item(i).firstChild.data + "</h4>" + "</a>" + "</span>";

        //Todo split publisher names and run in loop to add it
        //adding authors
        //var allAuthors = allauthors.item(i).firstChild.data.split(";");
        //for (var i = 0; i < allAuthors.length; i++) {
        stuff += "<p>" + "<span class='badge_author'>" + allauthors.item(i).firstChild.data + "</span>&nbsp;" + "</p>";
        //}

        //adding publisher details
        //Todo check null of publisher
        stuff += "<p>" + "<span class='avoidwrap badge_publisher_name'>" + publishers.item(i).firstChild.data + "</span>";
        stuff += "<span class='avoidwrap publication_details'>" + publication_detailss.item(i).firstChild.data + "</span>";
        stuff += "&nbsp";
        stuff += "<span class='date_of_publication'>" + year_of_publications.item(i).firstChild.data + "</span>";

        //keyword adding
        //Todo split all keywords
        var allKeywords = keyword_primarys.item(i).firstChild.data.split(";");
        stuff += "<section>";
        /*for (var i = 0; i < allKeywords.length; i++) {
            stuff += "<span class='badge_keyword'>" + allKeywords[i] + "</span>";

        }*/
        stuff += "<span class='badge_keyword'>" + keyword_primarys.item(i).firstChild.data + "</span>";
        stuff += "</section>";
        stuff += " </div> </td> </tr>";
    }
    conference_table = document.getElementById("conference_table");
    conference_table.innerHTML = stuff;
}
