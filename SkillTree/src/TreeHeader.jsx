import React from "react";
import Context from "./Context";

const TreeHeader = () => {
    const [courseCode, setCourseCode] = React.useState("");
    const [courseData, setCourseData] = React.useState({});
    const [error, setError] = React.useState("");
    const { allExpand } = React.useContext(Context);

    React.useEffect(() => {
        console.log(courseCode);
    }, [courseCode]);

    const handleChange = (event) => {
        setCourseCode(event.target.value);
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
            setError(""); // Clear error if result is found
            return; // Exit if result is found
        }

        // Try the formatted course code with space
        result = await callAPI(courseCodeSpace);
        if (result && !("error" in result)) {
            console.log("Result found with course code with space:", result);
            setCourseData(result);
            setError(""); // Clear error if result is found
            return; // Exit if result is found
        }

        // Try the formatted course code without space
        result = await callAPI(courseCodeNoSpace);
        if (result && !("error" in result)) {
            console.log("Result found with course code without space:", result);
            setCourseData(result);
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
            const response = await fetch(`http://localhost:8000/course/${code}`, {
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
        <div>
            <h1>Welcome to SkillTree</h1>
            <textarea 
                placeholder="Enter course code"
                value={courseCode}
                onChange={handleChange}
            />
            <button onClick={codeCheckCallAPI}>Log In</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                {Object.entries(courseData).map(([key, value]) => (
                    <p key={key}>
                        {key}: {value}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default TreeHeader;
