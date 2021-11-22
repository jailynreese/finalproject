"use strict";

var handleEntry = function handleEntry(e) {
  e.preventDefault();

  if ($("#entryDate").val() == '' || $("#entryMood").val() == '' || $("#entryMain").val() == '') {
    responseText("All fields are required");
    return false;
  }

  console.dir($("#entryForm").serialize());
  sendAjax('POST', $("#entryForm").attr("action"), $("#entryForm").serialize(), function () {
    loadEntriesFromServer();
  });
  return false;
};

var EntryForm = function EntryForm(props) {
  var clicked = false;

  var mouseOnStar = function mouseOnStar(e) {
    if (e.target.id === "svg1") {
      $("#svg1").css("fill", "yellow");
    } else if (e.target.id === "svg2") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
    } else if (e.target.id === "svg3") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
    } else if (e.target.id === "svg4") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
    } else {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
      $("#svg5").css("fill", "yellow");
    }
  };

  var mouseOffStar = function mouseOffStar(e) {
    if (!clicked) {
      $("#svg1").css("fill", "black");
      $("#svg2").css("fill", "black");
      $("#svg3").css("fill", "black");
      $("#svg4").css("fill", "black");
      $("#svg5").css("fill", "black");
    }
  };

  var svgStyle = {
    stroke: "black",
    strokeWidth: "1.2",
    padding: "5px"
  };
  var padding = {
    padding: "5px"
  };
  return /*#__PURE__*/React.createElement("form", {
    id: "entryForm",
    onSubmit: handleEntry,
    name: "entryForm",
    action: "/maker",
    method: "POST",
    className: "entryForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "entryDate",
    value: props.today
  }, "Date: "), /*#__PURE__*/React.createElement("input", {
    id: "entryDate",
    type: "date",
    name: "entryDate"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "entryRating"
  }, "Rate Your Day: "), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg1",
    value: 1
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg2",
    value: 2
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg3",
    value: 3
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg4",
    value: 4
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg5",
    value: 5
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "entryMood"
  }, "Overall Mood: "), /*#__PURE__*/React.createElement("input", {
    id: "entryMood",
    type: "text",
    name: "entryMood"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "entryMood"
  }, "Write Your Journal Entry Here: "), /*#__PURE__*/React.createElement("textarea", {
    id: "entryMain",
    name: "entryMain",
    rows: "4",
    cols: "50"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeentrySubmit",
    type: "submit",
    value: "Make entry"
  }));
};

var StarSVG = function StarSVG(props) {
  var clicked = false;

  var mouseOnStar = function mouseOnStar(e, clickedBool) {
    clicked = clickedBool;

    if (e.target.id === "svg1") {
      $("#svg1").css("fill", "yellow");
    } else if (e.target.id === "svg2") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
    } else if (e.target.id === "svg3") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
    } else if (e.target.id === "svg4") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
    } else {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
      $("#svg5").css("fill", "yellow");
    }
  };

  var mouseOffStar = function mouseOffStar() {
    if (!clicked) {
      $("#svg1").css("fill", "black");
      $("#svg2").css("fill", "black");
      $("#svg3").css("fill", "black");
      $("#svg4").css("fill", "black");
      $("#svg5").css("fill", "black");
    }
  };

  var svgStyle = {
    stroke: "black",
    strokeWidth: "1.2",
    padding: "5px"
  };
  var padding = {
    padding: "5px"
  };
  return /*#__PURE__*/React.createElement("svg", {
    id: props.id,
    value: props.value,
    onMouseEnter: mouseOnStar,
    onMouseLeave: mouseOffStar,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    style: padding
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z",
    style: svgStyle
  }));
};

var EntryList = function EntryList(props) {
  if (props.entries.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "entryList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyList"
    }, "No entries yet"));
  }

  var mouseOnEntry = function mouseOnEntry(e) {
    $(e.target).css("background-color", "blue");
  };

  var mouseOffEntry = function mouseOffEntry(e) {
    $(e.target).css("background-color", "transparent");
  };

  var clickedEntry = function clickedEntry(id, mood, main) {
    console.log("clicked"); //$(id).append('<h3>' + mood + '</h3><p>' + main + '</p>');
  };

  var journalNodes = props.entries.map(function (entry) {
    return /*#__PURE__*/React.createElement("div", {
      key: entry._id,
      id: entry._id,
      className: "entry",
      onMouseEnter: mouseOnEntry,
      onMouseLeave: mouseOffEntry,
      onClick: clickedEntry(entry._id, entry.entryMood, entry.entryMain)
    }, /*#__PURE__*/React.createElement("h3", {
      className: "entryDate"
    }, "Date: ", entry.date, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "entryList"
  }, journalNodes);
};

var loadEntriesFromServer = function loadEntriesFromServer() {
  sendAjax('GET', '/getEntries', null, function (data) {
    console.log(data.entries);
    ReactDOM.render( /*#__PURE__*/React.createElement(EntryList, {
      entries: data.entries
    }), document.querySelector("#entries"));
  });
};

var setup = function setup(csrf) {
  // let date = new Date();
  // let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  ReactDOM.render( /*#__PURE__*/React.createElement(EntryForm, {
    csrf: csrf
  }), document.querySelector("#makeEntry"));
  ReactDOM.render( /*#__PURE__*/React.createElement(EntryList, {
    entries: []
  }), document.querySelector("#entries"));
  loadEntriesFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var responseText = function responseText(message) {
  $("#feedback").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      responseText(messageObj.error);
    }
  });
};
