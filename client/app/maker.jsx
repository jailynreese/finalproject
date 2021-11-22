const handleEntry = (e) => {
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

const EntryForm = (props) => {
    return (
        <form id="entryForm"
            onSubmit={handleEntry}
            name="entryForm"
            action="/maker"
            method="POST"
            className="entryForm"
        >
            <label htmlFor="entryDate" value={props.today} >Date: </label>
            <input id="entryDate" type="date" name="entryDate" />
            <label htmlFor="entryRating">Rate Your Day: </label>
            <StarSVG id={"svg1"} value={1}></StarSVG>
            <StarSVG id={"svg2"} value={2}></StarSVG>
            <StarSVG id={"svg3"} value={3}></StarSVG>
            <StarSVG id={"svg4"} value={4}></StarSVG>
            <StarSVG id={"svg5"} value={5}></StarSVG>
            <label htmlFor="entryMood">Overall Mood: </label>
            <input id="entryMood" type="text" name="entryMood" />
            <label htmlFor="entryMood">Write Your Journal Entry Here: </label>
            <textarea id="entryMain" name="entryMain" rows="4" cols="50"></textarea>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeentrySubmit" type="submit" value="Make entry" />
        </form>
    );
};

const StarSVG = function(props) {
    let clicked = false;

    const mouseOnStar = (e, clickedBool) => {
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
    }

    const mouseOffStar = () => {
        if(!clicked){
            $("#svg1").css("fill", "black");
            $("#svg2").css("fill", "black");
            $("#svg3").css("fill", "black");
            $("#svg4").css("fill", "black");
            $("#svg5").css("fill", "black");
        }   
    }

    const svgStyle = {
        stroke: "black",
        strokeWidth: "1.2",
        padding: "5px"
    }

    const padding = {
        padding: "5px"
    }
    return (
        <svg id={props.id} value={props.value} onMouseEnter={mouseOnStar} onMouseLeave={mouseOffStar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={padding}><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" style={svgStyle} /></svg>
    );
}

const EntryList = function (props) {
    if (props.entries.length === 0) {
        return (
            <div className="entryList">
                <h3 className="emptyList">No entries yet</h3>
            </div>
        );
    }

    const mouseOnEntry = (e) => {
        $(e.target).css("background-color", "blue");
    }

    const mouseOffEntry = (e) => {
        $(e.target).css("background-color", "transparent");
    }

    const clickedEntry = (entry) => {
        console.log("clicked");
        //$(entry._id).append('<h3>' + entry.mood + '</h3><p>' + entry.entryMain + '</p>');
    }

    const journalNodes = props.entries.map(function (entry) {
        return (
            <div key={entry._id} id={entry._id} className="entry" onMouseEnter={mouseOnEntry} onMouseLeave={mouseOffEntry} onClick={clickedEntry(entry)}>
                <h3 className="entryDate">Date: {entry.date} </h3>
            </div>
        );
    });

    return (
        <div className="entryList">
            {journalNodes}
        </div>
    );
};

const loadEntriesFromServer = () => {
    sendAjax('GET', '/getEntries', null, (data) => {
        console.log(data.entries);
        ReactDOM.render(
            <EntryList entries={data.entries} />, document.querySelector("#entries")
        );
    });
};

const setup = function (csrf) {
    // let date = new Date();
    // let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    ReactDOM.render(
        <EntryForm csrf={csrf} />, document.querySelector("#makeEntry")
    );

    ReactDOM.render(
        <EntryList entries={[]} />, document.querySelector("#entries")
    );

    loadEntriesFromServer();
};

const settings = () => {
    return (
        <button href="/updatePass">Update Password</button>
        <button clicked={newsFeature}>Upgrade to get news feature</button>
    );
};

const newsFeature = () => {
    //fetch API
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});