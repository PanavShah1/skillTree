<h1>Skill Tree</h1>
This tree helps manage courses and their prerequisite offered each semester in IIT Bombay. <br><br>
Link to the website : https://panavshah1.github.io/skillTree/

<h2>Description</h2>
On entering a course code, this application will provide you with a tree which contains all the prerequisite of that course along with the prerequisites of those prerequisites, until a course without a prerequisite is reached. <br><br>
<img width="1792" alt="image" src="https://github.com/user-attachments/assets/b5b22f94-8f5b-4875-85cc-aa85626686bb">

<h2>Running the program</h2>
<ul>
  <li>Clone this repository <code>git clone https://github.com/PanavShah1/skillTree</code></li>
  <li>Go to the frontend directory <code>cd SkillTree</code></li>
  <li>Run the React server <code>npm start</code></li>
  <li>Open a new terminal</li>
  <li>Go to the backend directory<code>cd skillTree-api</code></li>
  <li>Run the uvicorn server <code>uvicorn api:app --reload</code></li>
  <li>Since we are running it locally go to <code>SkillTree/src/TreeHeader.jsx</code> and in the <code>async function callAPI</code> replace the api endpoint <code>https://2bdb-2409-40c0-1052-3fc3-90e4-5fe6-e945-a203.ngrok-free.app</code> with <code>http://127.0.0.1:8000</code></li>
</ul>
