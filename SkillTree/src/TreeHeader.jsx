import React from "react";
import Context from "./Context";

const TreeHeader = () => {
    const [courseCode, setCourseCode] = React.useState("");
    const [courseData, setCourseData] = React.useState({});
    const [error, setError] = React.useState("");
    const { allExpand, treeChildData, setTreeChildData } = React.useContext(Context);

    React.useEffect(() => {
        console.log(courseCode);
        setCourseCode(courseCode.toUpperCase());
    }, [courseCode]);

    React.useEffect(() => {
        console.log("course data", courseData);
    }, [courseData]);

    React.useEffect(() => {
        console.log("tree child data", treeChildData);
    }, [treeChildData]);

    const handleChange = (event) => {
        setCourseCode(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            codeCheckCallAPI();
        }
    };

    async function codeCheckCallAPI() {
        let courseCodeSpace = "";
        let courseCodeNoSpace = "";


        if (courseCode.includes(" ")) {
            courseCodeSpace = courseCode;
            courseCodeNoSpace = courseCodeSpace.replace(/\s/g, '');
        } else {
            courseCodeNoSpace = courseCode;
            courseCodeSpace = courseCodeNoSpace.replace(/([a-zA-Z])(\d)/, "$1 $2");
        }

        console.log("Checking with original:", courseCode);
        console.log("Checking with space:", courseCodeSpace);
        console.log("Checking without space:", courseCodeNoSpace);

        // Try the original course code
        let result = await callAPI(courseCode);
        if (result && !("error" in result)) {
            console.log("Result found with original course code:", result);
            setCourseData(result);
            console.log("children", result.children)
            setTreeChildData(result.children);
            setError(""); // Clear error if result is found
            return; // Exit if result is found
        }

        // Try the formatted course code with space
        result = await callAPI(courseCodeSpace);
        if (result && !("error" in result)) {
            console.log("Result found with course code with space:", result);
            setCourseData(result);
            setTreeChildData(result.children);
            setError(""); // Clear error if result is found
            return; // Exit if result is found
        }

        // Try the formatted course code without space
        result = await callAPI(courseCodeNoSpace);
        if (result && !("error" in result)) {
            console.log("Result found with course code without space:", result);
            setCourseData(result);
            setTreeChildData(result.children);
            setError(""); // Clear error if result is found
            return; // Exit if result is found
        }

        // If no result is found
        console.log("No result found for any course code variant.");
        setCourseData({});
        setError("No result found for the provided course code.");
    }

    async function callAPI(code) {
        try {
            const response = await fetch(`http://localhost:8080/course/${code}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            return null;
        }
    }

    return (
        <div className="header">
            <div className="course-code-input-cont">
                <input 
                    className="course-code-input"
                    placeholder="Enter course code"
                    value={courseCode}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                />
                <button className="course-code-enter-button" onClick={codeCheckCallAPI}>Enter</button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {courseData && Object.keys(courseData).length > 0 &&
                <div className="course-details">
                    Course Name : {courseData['Course Name'] || 'N/A'} <br />
                    Course Code : {courseData['Course Code'] || 'N/A'} <br />
                    Course Offered : {courseData['Instructor Name'] === 'N/A' ? "No" : "Yes"} <br />
                    {courseData['Instructor Name'] !== 'N/A' && <>Instructor : {courseData['Instructor Name']} <br /> </>} 
                    {courseData['children'].length > 0 ? <span>Any Prerequisites : Yes</span> : <span>Any Prerequisites : <span style={{color: "red"}}>No</span></span>} 
                </div>
            }
        </div>
    );
};

export default TreeHeader;
