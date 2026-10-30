"use strict";

/* QuizNova: interactive quiz, timer, bookmarks, score history and review. */
const QUESTION_BANK = {
  cs: { name: "Computer Science", questions: [
    {q:"Which of these is an example of an operating system?",o:["Windows","HTML","Google Search","Python"],a:0,d:"easy",e:"Windows is an operating system that manages computer hardware and software."},
    {q:"What does CPU stand for?",o:["Central Processing Unit","Computer Personal Utility","Central Program User","Control Processing Usage"],a:0,d:"easy",e:"The CPU executes instructions and coordinates processing tasks."},
    {q:"Which memory is volatile?",o:["ROM","RAM","SSD","DVD"],a:1,d:"easy",e:"RAM normally loses its contents when power is removed."},
    {q:"Which number system uses only 0 and 1?",o:["Decimal","Octal","Binary","Hexadecimal"],a:2,d:"easy",e:"Binary uses two digits: 0 and 1."},
    {q:"Which data structure follows FIFO order?",o:["Stack","Tree","Queue","Graph"],a:2,d:"mixed",e:"A queue follows First In, First Out."},
    {q:"Which language is primarily used to style web pages?",o:["CSS","SQL","C","Bash"],a:0,d:"easy",e:"CSS controls the visual presentation of HTML documents."},
    {q:"What is the smallest unit of digital information?",o:["Byte","Bit","Kilobyte","Nibble"],a:1,d:"mixed",e:"A bit represents a binary value, either 0 or 1."},
    {q:"Which component performs arithmetic and logical operations?",o:["ALU","UPS","RAM","Router"],a:0,d:"mixed",e:"The Arithmetic Logic Unit performs arithmetic and logical operations."},
    {q:"What does DBMS stand for?",o:["Data Backup Management Setup","Database Management System","Digital Binary Memory Storage","Data Build Machine Software"],a:1,d:"mixed",e:"A DBMS is software used to create, maintain and access databases."},
    {q:"Which protocol is commonly used for secure web browsing?",o:["HTTP only","FTP","HTTPS","SMTP"],a:2,d:"hard",e:"HTTPS uses encryption through TLS to protect web communication."}
  ]},
  programming: { name:"Programming", questions:[
    {q:"Which HTML tag creates a hyperlink?",o:["<link>","<a>","<href>","<url>"],a:1,d:"easy",e:"The anchor element <a> creates a hyperlink."},
    {q:"Which is a JavaScript data type?",o:["Boolean","Paragraph","Heading","Browser tab"],a:0,d:"easy",e:"Boolean represents true or false."},
    {q:"Which operator checks strict equality in JavaScript?",o:["=","==","===","!="],a:2,d:"mixed",e:"=== compares value and type without type coercion."},
    {q:"Which CSS property changes text colour?",o:["font-style","background","text-size","color"],a:3,d:"easy",e:"The color property specifies the foreground colour of text."},
    {q:"What is a loop used for?",o:["Repeating instructions","Deleting every file","Changing a monitor","Turning off a browser"],a:0,d:"easy",e:"Loops repeat instructions according to a condition or iteration rule."},
    {q:"Which keyword declares a block-scoped variable in JavaScript?",o:["varies","let","define","dim"],a:1,d:"mixed",e:"let declares a block-scoped variable."},
    {q:"Which SQL command retrieves data from a table?",o:["FETCHFILE","SELECT","PUSH","OPEN"],a:1,d:"easy",e:"SELECT is used to query data from database tables."},
    {q:"What is a function parameter?",o:["A value returned only by CSS","A named input to a function","A database row","A loop error"],a:1,d:"mixed",e:"Parameters receive input values when a function is called."},
    {q:"What does API stand for?",o:["Application Programming Interface","Applied Program Internet","Advanced Processing Input","Application Page Instruction"],a:0,d:"mixed",e:"An API defines ways for software components to communicate."},
    {q:"Which concept lets a class derive behaviour from another class?",o:["Iteration","Inheritance","Compilation","Indexing"],a:1,d:"hard",e:"Inheritance allows a class to derive properties and behaviour from another class."}
  ]},
  general: { name:"General Knowledge", questions:[
    {q:"What is the capital of India?",o:["Mumbai","New Delhi","Chennai","Jaipur"],a:1,d:"easy",e:"New Delhi is the capital of India."},
    {q:"Which planet is known as the Red Planet?",o:["Venus","Jupiter","Mars","Mercury"],a:2,d:"easy",e:"Iron-rich dust gives Mars its reddish appearance."},
    {q:"How many days are in a standard leap year?",o:["364","365","366","367"],a:2,d:"easy",e:"A leap year normally has 366 days."},
    {q:"Which is the largest ocean on Earth?",o:["Atlantic","Indian","Arctic","Pacific"],a:3,d:"easy",e:"The Pacific Ocean is the largest ocean."},
    {q:"Which gas do plants absorb during photosynthesis?",o:["Carbon dioxide","Oxygen","Helium","Hydrogen"],a:0,d:"easy",e:"Plants use carbon dioxide, water and light energy to make sugars."},
    {q:"What is the currency of Japan?",o:["Yuan","Won","Yen","Ringgit"],a:2,d:"easy",e:"The Japanese currency is the yen."},
    {q:"Which instrument measures temperature?",o:["Barometer","Thermometer","Altimeter","Compass"],a:1,d:"easy",e:"A thermometer measures temperature."},
    {q:"How many sides does a hexagon have?",o:["Five","Six","Seven","Eight"],a:1,d:"mixed",e:"A hexagon has six sides."},
    {q:"Which organisation is associated with the United Nations' global health work?",o:["WHO","FIFA","WTO only","OPEC"],a:0,d:"mixed",e:"The World Health Organization is the UN agency focused on international public health."},
    {q:"What is the process of liquid changing into gas called?",o:["Condensation","Freezing","Evaporation","Deposition"],a:2,d:"mixed",e:"Evaporation is the change from liquid to gas at a surface."}
  ]},
  math: { name:"Mathematics", questions:[
    {q:"What is 12 × 8?",o:["84","96","108","88"],a:1,d:"easy",e:"12 multiplied by 8 equals 96."},
    {q:"What is the square root of 144?",o:["10","11","12","14"],a:2,d:"easy",e:"12 × 12 = 144, so the square root is 12."},
    {q:"What is 15% of 200?",o:["15","20","30","35"],a:2,d:"mixed",e:"0.15 × 200 = 30."},
    {q:"What is the value of π rounded to two decimal places?",o:["3.12","3.14","3.16","3.41"],a:1,d:"easy",e:"Pi is approximately 3.14159, which rounds to 3.14."},
    {q:"If x + 7 = 19, what is x?",o:["10","11","12","13"],a:2,d:"mixed",e:"Subtract 7 from both sides: x = 19 − 7 = 12."},
    {q:"What is the area of a rectangle 9 cm long and 4 cm wide?",o:["13 cm²","26 cm²","36 cm²","40 cm²"],a:2,d:"mixed",e:"Area of a rectangle = length × width = 9 × 4 = 36 cm²."},
    {q:"What is 7 squared?",o:["14","42","49","56"],a:2,d:"easy",e:"7 squared means 7 × 7, which equals 49."},
    {q:"A triangle has angles of 50° and 60°. What is the third angle?",o:["60°","70°","80°","90°"],a:1,d:"mixed",e:"Triangle angles total 180°; 180° − 50° − 60° = 70°."},
    {q:"What is the median of 3, 8, 4, 9, 6?",o:["4","5","6","8"],a:2,d:"mixed",e:"Sorted values are 3, 4, 6, 8, 9; the middle value is 6."},
    {q:"If 3x = 27, what is x?",o:["6","8","9","12"],a:2,d:"easy",e:"Divide both sides by 3: x = 27 ÷ 3 = 9."},
  ]},
  science: { name:"Science & Nature", questions:[
    {q:"Which planet is closest to the Sun?",o:["Venus","Earth","Mercury","Mars"],a:2,d:"easy",e:"Mercury is the closest planet to the Sun."},
    {q:"What is the chemical symbol for water?",o:["CO₂","H₂O","O₂","NaCl"],a:1,d:"easy",e:"A water molecule contains two hydrogen atoms and one oxygen atom."},
    {q:"Which organ pumps blood around the human body?",o:["Lungs","Brain","Liver","Heart"],a:3,d:"easy",e:"The heart pumps blood through the circulatory system."},
    {q:"What force pulls objects toward Earth?",o:["Friction","Gravity","Magnetism","Pressure"],a:1,d:"easy",e:"Gravity attracts objects with mass toward Earth."},
    {q:"What is the process by which plants make food using sunlight?",o:["Respiration","Digestion","Photosynthesis","Fermentation"],a:2,d:"mixed",e:"Photosynthesis uses light energy to make sugars from carbon dioxide and water."},
    {q:"Which particle has a negative electric charge?",o:["Proton","Neutron","Electron","Nucleus"],a:2,d:"mixed",e:"Electrons carry a negative electric charge."},
    {q:"Which part of a plant mainly absorbs water from soil?",o:["Flower","Roots","Fruit","Leaves"],a:1,d:"easy",e:"Roots absorb water and minerals from the soil."},
    {q:"What is the approximate speed of light in a vacuum?",o:["300,000 km/s","30,000 km/s","3,000 km/s","300 km/s"],a:0,d:"mixed",e:"Light travels at about 300,000 kilometres per second in a vacuum."},
    {q:"Which state of matter has a fixed volume but takes the shape of its container?",o:["Solid","Liquid","Gas","Plasma only"],a:1,d:"mixed",e:"A liquid keeps a nearly fixed volume but flows to match its container."},
    {q:"Which organelle produces much of the usable energy in eukaryotic cells?",o:["Mitochondrion","Ribosome","Nucleus","Vacuole"],a:0,d:"hard",e:"Mitochondria produce much of the ATP used by eukaryotic cells."},
  ]},
  english: { name:"English & Vocabulary", questions:[
    {q:"Choose the synonym of 'rapid'.",o:["Slow","Quick","Quiet","Late"],a:1,d:"easy",e:"Rapid means fast or quick."},
    {q:"Which word is a noun?",o:["Beautiful","Quickly","Happiness","Run"],a:2,d:"easy",e:"Happiness names a state or feeling, so it is a noun."},
    {q:"Choose the correctly spelled word.",o:["Recieve","Receive","Receeve","Receve"],a:1,d:"easy",e:"The correct spelling is receive: i before e except after c is a useful guide here."},
    {q:"What is the past tense of 'go'?",o:["Goed","Gone","Went","Going"],a:2,d:"easy",e:"Went is the simple past tense of go."},
    {q:"Choose the antonym of 'generous'.",o:["Kind","Giving","Selfish","Helpful"],a:2,d:"mixed",e:"Selfish is an antonym of generous."},
    {q:"Which punctuation mark usually ends a direct question?",o:["Comma","Full stop","Question mark","Colon"],a:2,d:"easy",e:"A question mark is used at the end of a direct question."},
    {q:"Choose the correctly punctuated sentence.",o:["Let’s eat, Grandma.","Let’s eat Grandma.","Let’s, eat Grandma.","Let’s eat Grandma?"],a:0,d:"mixed",e:"The comma addresses Grandma directly and separates the name from the invitation."},
    {q:"Which word is an adjective in the phrase a bright day?",o:["a","bright","day","phrase"],a:1,d:"easy",e:"Bright describes the noun day, so it functions as an adjective."},
    {q:"What is the plural of child?",o:["Childs","Childes","Children","Childrens"],a:2,d:"easy",e:"Children is the standard irregular plural of child."},
    {q:"Choose the word closest in meaning to reluctant.",o:["Eager","Unwilling","Certain","Cheerful"],a:1,d:"mixed",e:"Reluctant means hesitant or unwilling to do something."},
  ]},
  history: { name:"History & Geography", questions:[
    {q:"Who was the first Prime Minister of independent India?",o:["Sardar Patel","Jawaharlal Nehru","Rajendra Prasad","B. R. Ambedkar"],a:1,d:"easy",e:"Jawaharlal Nehru became India's first Prime Minister in 1947."},
    {q:"Which is the largest continent by area?",o:["Africa","Europe","Asia","South America"],a:2,d:"easy",e:"Asia is the world's largest continent by area."},
    {q:"The Taj Mahal is located in which city?",o:["Delhi","Agra","Jaipur","Lucknow"],a:1,d:"easy",e:"The Taj Mahal is in Agra, Uttar Pradesh."},
    {q:"Which imaginary line divides Earth into Northern and Southern Hemispheres?",o:["Prime Meridian","Tropic of Cancer","Equator","Arctic Circle"],a:2,d:"mixed",e:"The Equator is at 0° latitude and divides the hemispheres."},
    {q:"In which year did India become a republic?",o:["1947","1949","1950","1952"],a:2,d:"mixed",e:"India's Constitution came into effect on 26 January 1950."},
    {q:"Which ocean lies to the west of India?",o:["Pacific Ocean","Atlantic Ocean","Indian Ocean","Arabian Sea"],a:3,d:"mixed",e:"The Arabian Sea, part of the Indian Ocean, lies to India's west."},
    {q:"Which ancient civilisation developed along the Nile River?",o:["Ancient Egypt","Maya civilisation","Indus Valley only","Roman Empire"],a:0,d:"easy",e:"Ancient Egyptian civilisation grew along the Nile River."},
    {q:"What is the capital of Maharashtra?",o:["Pune","Nagpur","Mumbai","Nashik"],a:2,d:"easy",e:"Mumbai is the capital of Maharashtra."},
    {q:"Which latitude is known as the Tropic of Cancer?",o:["0°","23.5° north","23.5° south","66.5° north"],a:1,d:"mixed",e:"The Tropic of Cancer lies at approximately 23.5 degrees north latitude."},
    {q:"The First World War ended in which year?",o:["1914","1916","1918","1920"],a:2,d:"mixed",e:"The armistice ending the fighting on the Western Front took effect in 1918."},
  ]},
  cyber: { name:"Cybersecurity", questions:[
    {q:"Which is the strongest password practice?",o:["Use your name","Reuse one password everywhere","Use a long unique password","Share it with friends"],a:2,d:"easy",e:"Long, unique passwords reduce the risk from password reuse and guessing."},
    {q:"What is phishing?",o:["A computer upgrade","A scam that tricks users into revealing information","A backup method","A type of monitor"],a:1,d:"easy",e:"Phishing messages impersonate trusted sources to steal data or credentials."},
    {q:"What does MFA stand for?",o:["Multiple File Access","Multi-Factor Authentication","Main Firewall App","Managed Folder Account"],a:1,d:"mixed",e:"Multi-factor authentication adds another proof of identity beyond a password."},
    {q:"Why should software updates be installed?",o:["Only to change icons","They can fix security vulnerabilities","They always make devices faster","They remove the need for passwords"],a:1,d:"mixed",e:"Updates often include important security patches and bug fixes."},
    {q:"What should you do with an unexpected attachment from an unknown sender?",o:["Open it immediately","Forward it to everyone","Avoid opening it and verify the sender","Disable antivirus"],a:2,d:"easy",e:"Unexpected attachments may contain malware; verify before opening."},
    {q:"Which connection is encrypted for normal secure website browsing?",o:["HTTP","HTTPS","FTP","Telnet"],a:1,d:"mixed",e:"HTTPS uses TLS to encrypt data between the browser and website."},
    {q:"What is the safest response to a suspicious password-reset email?",o:["Click its link immediately","Reply with your password","Visit the service using its official app or typed address","Forward it to strangers"],a:2,d:"easy",e:"Use the official app or type the known website address instead of trusting an unexpected link."},
    {q:"What does ransomware typically try to do?",o:["Encrypt or lock data and demand payment","Improve Wi-Fi speed","Clean a keyboard","Update a browser theme"],a:0,d:"mixed",e:"Ransomware commonly blocks access to files or systems and demands a ransom."},
    {q:"Why is a password manager useful?",o:["It makes every account public","It can generate and store unique passwords","It removes all phishing risk","It replaces software updates"],a:1,d:"mixed",e:"Password managers help create and manage strong, unique passwords for different accounts."},
    {q:"On public Wi-Fi, which practice helps protect sensitive accounts?",o:["Disable all security checks","Use the same password everywhere","Use HTTPS and avoid sensitive activity on untrusted networks","Share a one-time code"],a:2,d:"hard",e:"HTTPS protects data in transit, but untrusted networks still call for caution with sensitive activity."},
  ]},
  aptitude: { name:"Aptitude & Reasoning", questions:[
    {q:"What comes next: 2, 4, 6, 8, ...?",o:["9","10","12","16"],a:1,d:"easy",e:"The sequence increases by 2 each time."},
    {q:"If all roses are flowers, which statement must be true?",o:["All flowers are roses","Every rose is a flower","No roses are flowers","All flowers are red"],a:1,d:"easy",e:"This restates the given relationship without reversing it."},
    {q:"A shirt costs ₹500 and has a 10% discount. What is the sale price?",o:["₹400","₹450","₹475","₹490"],a:1,d:"mixed",e:"10% of ₹500 is ₹50, so the sale price is ₹450."},
    {q:"Which number does not belong: 3, 6, 9, 12, 14?",o:["6","9","12","14"],a:3,d:"mixed",e:"The other numbers are multiples of 3; 14 is not."},
    {q:"If today is Monday, what day will it be 10 days later?",o:["Tuesday","Wednesday","Thursday","Friday"],a:2,d:"mixed",e:"Ten days is one week plus three days; Monday plus three days is Thursday."},
    {q:"A train travels 60 km in 1 hour. How far does it travel in 3 hours at the same speed?",o:["120 km","150 km","180 km","240 km"],a:2,d:"easy",e:"Distance = speed × time = 60 × 3 = 180 km."},
    {q:"What comes next: 5, 10, 20, 40, ...?",o:["45","60","80","100"],a:2,d:"mixed",e:"Each term doubles: 40 × 2 = 80."},
    {q:"A car travels 150 km in 3 hours. What is its average speed?",o:["30 km/h","45 km/h","50 km/h","60 km/h"],a:2,d:"mixed",e:"Average speed = distance ÷ time = 150 ÷ 3 = 50 km/h."},
    {q:"If 4 workers finish a task in 6 days at the same rate, how many worker-days of work is that?",o:["10","12","20","24"],a:3,d:"hard",e:"Total work at this rate is 4 workers × 6 days = 24 worker-days."},
    {q:"Find the odd one out: square, triangle, circle, cube.",o:["Square","Triangle","Circle","Cube"],a:3,d:"easy",e:"A cube is three-dimensional; the other shapes are two-dimensional."},
  ]},
  sports: { name:"Sports & Games", questions:[
    {q:"How many players from one team are on the field in a standard football (soccer) match?",o:["9","10","11","12"],a:2,d:"easy",e:"A standard football team fields 11 players, including the goalkeeper."},
    {q:"In cricket, how many runs are scored when the ball crosses the boundary after bouncing?",o:["2","3","4","6"],a:2,d:"easy",e:"A boundary after the ball has bounced scores four runs."},
    {q:"Which sport uses the terms love, deuce and ace?",o:["Tennis","Hockey","Basketball","Kabaddi"],a:0,d:"easy",e:"Love, deuce and ace are terms used in tennis scoring and play."},
    {q:"How many rings appear on the Olympic symbol?",o:["Four","Five","Six","Seven"],a:1,d:"easy",e:"The Olympic symbol contains five interlocking rings."},
    {q:"Which piece moves in an L-shape in chess?",o:["Bishop","Rook","Knight","Queen"],a:2,d:"mixed",e:"The knight moves two squares in one direction and one perpendicular square."},
    {q:"A badminton game is usually played to how many points under rally scoring?",o:["11","15","21","25"],a:2,d:"mixed",e:"Standard badminton games are played to 21 points, with a two-point lead needed to win."},
    {q:"How many points is a successful free throw worth in basketball?",o:["1","2","3","4"],a:0,d:"easy",e:"A made free throw is worth one point."},
    {q:"Which country hosted the 2016 Summer Olympics?",o:["China","Brazil","Japan","United Kingdom"],a:1,d:"mixed",e:"The 2016 Summer Olympics were held in Rio de Janeiro, Brazil."},
    {q:"In cricket, how many legal deliveries are in a standard over?",o:["4","5","6","8"],a:2,d:"easy",e:"A standard over consists of six legal deliveries."},
    {q:"Which surface is traditionally associated with the French Open tennis tournament?",o:["Grass","Hard court","Clay","Carpet"],a:2,d:"mixed",e:"The French Open is played on clay courts."},
  ]},
  webdev: { name:"Web Development", questions:[
    {q:"Which language provides the structure of a web page?",o:["HTML","CSS","SQL","Bash"],a:0,d:"easy",e:"HTML describes page structure and content."},
    {q:"Which language is mainly used to style a web page?",o:["Python","CSS","C","SQL"],a:1,d:"easy",e:"CSS controls layout, colours, spacing and typography."},
    {q:"Which JavaScript method selects an element by its ID?",o:["getElementById()","selectClass()","findHTML()","queryID()"],a:0,d:"mixed",e:"document.getElementById() returns the element with the matching ID."},
    {q:"What does responsive design help a website do?",o:["Work across different screen sizes","Only run offline","Remove all images","Prevent scrolling"],a:0,d:"easy",e:"Responsive layouts adapt to mobile, tablet and desktop screens."},
    {q:"Which HTML element is used for the main heading level?",o:["<head>","<h1>","<title>","<meta>"],a:1,d:"easy",e:"The h1 element represents a top-level heading in the page content."},
    {q:"What does JSON commonly represent?",o:["A stylesheet language","A data-interchange format","A web browser","An image format only"],a:1,d:"mixed",e:"JSON is a text format used to store and exchange structured data."},
    {q:"Which HTML attribute provides alternative text for an image?",o:["title","alt","srcset","href"],a:1,d:"easy",e:"The alt attribute provides a text alternative for an image."},
    {q:"Which CSS layout system is especially useful for arranging items in one dimension?",o:["Flexbox","SQL","JSON","SVG"],a:0,d:"mixed",e:"Flexbox is designed for arranging items along a row or column."},
    {q:"Which HTTP status code commonly means Not Found?",o:["200","301","404","500"],a:2,d:"mixed",e:"HTTP 404 indicates that the requested resource was not found."},
    {q:"What does DOM stand for in web development?",o:["Document Object Model","Data Output Method","Digital Ordinance Map","Document Order Mode"],a:0,d:"hard",e:"The Document Object Model represents a document as a tree of objects that scripts can access."},
  ]}
};
const $ = id => document.getElementById(id);
const state = {category:"cs", questions:[], index:0, answers:[], bookmarks:new Set(), timer:null, seconds:20, timed:true, paused:false, sound:false, startTime:0, practiceOnly:false};
const KEY="quiznova_v2_history", BEST="quiznova_v2_best";
const screens = ["home-screen","quiz-screen","result-screen"];
function showScreen(id){screens.forEach(s=>$(s).classList.toggle("hidden",s!==id));window.scrollTo({top:0,behavior:"smooth"});}
function shuffle(array){for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;}
function historyRead(){try{const v=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(v)?v:[];}catch{return [];}}
function safeStore(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{notify("Your browser blocked saving data. Quiz play still works, but results may not persist.");return false;}}
function notify(message){const el=$("question-feedback");if(el)el.textContent=message;}
function stopTimer(){if(state.timer){clearInterval(state.timer);state.timer=null;}}
function startTimer(reset=true){stopTimer();if(reset)state.seconds=20;updateTimer();if(!state.timed||state.paused)return;state.timer=setInterval(()=>{if(state.paused)return;state.seconds--;updateTimer();if(state.seconds<=0){stopTimer();notify("Time is up for this question.");playTone(220,.08);if(state.index<state.questions.length-1){state.index++;renderQuestion();}else finishQuiz(true);}},1000);}
function updateTimer(){ $("timer-label").textContent=state.timed?`${state.seconds}s`:"∞";$("timer-fill").style.width=state.timed?`${state.seconds/20*100}%`:"100%";$("timer-box")?.classList.toggle("warning",state.seconds<=5);}
function playTone(freq=440,duration=.08){if(!state.sound)return;try{const ctx=new(window.AudioContext||window.webkitAudioContext)();const osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=freq;gain.gain.value=.04;osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration);osc.onended=()=>ctx.close();}catch{}}
function chooseCategory(key){if(!QUESTION_BANK[key])return;state.category=key;document.querySelectorAll(".category-card").forEach(b=>{const selected=b.dataset.category===key;b.classList.toggle("selected-category",selected);b.setAttribute("aria-pressed",String(selected));});$("selection-hint").textContent=`Selected: ${QUESTION_BANK[key].name}`;renderLeaderboard();}
function startQuiz(onlyWrong=false){
  stopTimer();state.practiceOnly=onlyWrong;
  let bank=QUESTION_BANK[state.category].questions.slice();
  const difficulty=$("difficulty").value;
  if(difficulty!=="mixed")bank=bank.filter(q=>q.d===difficulty || (difficulty==="hard"&&q.d==="mixed"));
  if(onlyWrong && state.lastWrong?.length)bank=state.lastWrong.slice();
  if(!bank.length){alert("No questions available for this selection. Try Mixed difficulty.");return;}
  if($("shuffle-setting").checked)bank=shuffle(bank);
  const limit=$("question-limit").value;
  if(!onlyWrong && limit!=="all")bank=bank.slice(0,Number(limit));
  state.questions=bank;state.index=0;state.answers=new Array(bank.length).fill(null);state.bookmarks=new Set();state.timed=$("timer-setting").checked;state.paused=false;state.startTime=Date.now();
  $("subject-badge").textContent=QUESTION_BANK[state.category].name;
  $("pause-overlay").classList.add("hidden");$("pause-btn").textContent="Ⅱ Pause";$("bookmark-btn").textContent="☆ Bookmark";
  showScreen("quiz-screen");renderQuestion();
}
function renderQuestion(resetClock=true){
  const q=state.questions[state.index];if(!q)return;
  $("question-count").textContent=`QUESTION ${String(state.index+1).padStart(2,"0")} OF ${String(state.questions.length).padStart(2,"0")}`;$("question-text").setAttribute("tabindex","-1");
  $("answered-count").textContent=`${state.answers.filter(x=>x!==null).length} answered`;
  $("progress-fill").style.width=`${(state.index+1)/state.questions.length*100}%`;$("progress-fill").parentElement.setAttribute("aria-valuenow",String(Math.round((state.index+1)/state.questions.length*100)));
  $("question-text").textContent=q.q;$("options-list").replaceChildren();$("question-feedback").textContent="";
  q.o.forEach((option,i)=>{const btn=document.createElement("button");btn.type="button";btn.className="answer-option"+(state.answers[state.index]===i?" selected":"");btn.setAttribute("aria-pressed",String(state.answers[state.index]===i));const letter=document.createElement("span");letter.className="answer-letter";letter.textContent=["A","B","C","D"][i];const text=document.createElement("span");text.className="answer-text";text.textContent=option;const check=document.createElement("span");check.className="answer-check";check.textContent=state.answers[state.index]===i?"✓":"";btn.append(letter,text,check);btn.addEventListener("click",()=>selectAnswer(i));$("options-list").appendChild(btn);});
  $("prev-btn").disabled=state.index===0;$("skip-btn").disabled=state.index===state.questions.length-1;
  $("next-btn").classList.toggle("hidden",state.index===state.questions.length-1);$("submit-btn").classList.toggle("hidden",state.index!==state.questions.length-1);
  $("bookmark-btn").textContent=state.bookmarks.has(state.index)?"★ Bookmarked":"☆ Bookmark";
  startTimer(resetClock);
}
function selectAnswer(i){if(state.paused)return;state.answers[state.index]=i;renderQuestion(false);notify("Answer saved. You can change it before submitting.");playTone(520,.06);}
function nextQuestion(){if(state.index<state.questions.length-1){state.index++;renderQuestion();}else finishQuiz();}
function previousQuestion(){if(state.index>0){state.index--;renderQuestion();}}
function finishQuiz(timeEnded=false){
  stopTimer();state.paused=false;$("pause-overlay").classList.add("hidden");
  const total=state.questions.length;let correct=0;
  state.questions.forEach((q,i)=>{if(state.answers[i]===q.a)correct++;});
  const wrong=total-correct,percent=Math.round(correct/total*100);
  $("score-value").textContent=`${correct}/${total}`;$("correct-value").textContent=correct;$("wrong-value").textContent=wrong;$("percent-value").textContent=`${percent}%`;
  $("result-icon").textContent=percent===100?"🏆":percent>=60?"🌟":"🧠";
  $("result-heading").textContent=percent===100?"Perfect score!":percent>=60?"Look at you go!":"Keep learning!";
  $("result-message").textContent=(timeEnded?"Time ran out. ":"")+`You completed ${QUESTION_BANK[state.category].name}. Review your answers to learn more.`;
  state.lastWrong=state.questions.filter((q,i)=>state.answers[i]!==q.a);
  renderReview();
  const entry={category:QUESTION_BANK[state.category].name,categoryKey:state.category,correct,total,percent,date:new Date().toLocaleString(),seconds:Math.max(1,Math.round((Date.now()-state.startTime)/1000)),name:"You",source:"player"};
  const h=historyRead();h.unshift(entry);safeStore(KEY,h.slice(0,10));saveLeaderboardEntry(entry);
  let best={};try{best=JSON.parse(localStorage.getItem(BEST)||"{}")||{};}catch{}best[entry.category]=Math.max(best[entry.category]||0,percent);safeStore(BEST,best);
  renderDashboard();renderLeaderboard();showScreen("result-screen");
}
function renderReview(){
  $("review-list").replaceChildren();
  state.questions.forEach((q,i)=>{const item=document.createElement("article");item.className="review-item";const title=document.createElement("h3");title.textContent=`${i+1}. ${q.q}`;const your=document.createElement("p");your.className=state.answers[i]===q.a?"review-correct":"review-wrong";your.textContent=`Your answer: ${state.answers[i]===null?"Skipped":q.o[state.answers[i]]}`;const correct=document.createElement("p");correct.className="review-correct";correct.textContent=`Correct answer: ${q.o[q.a]}`;const explanation=document.createElement("p");explanation.textContent=`Why: ${q.e}`;item.append(title,your,correct,explanation);$("review-list").appendChild(item);});
}
function renderDashboard(){
  const h=historyRead();$("total-played").textContent=h.length;
  $("best-score").textContent=h.length?`${Math.max(...h.map(x=>x.percent))}%`:"—";
  $("average-score").textContent=h.length?`${Math.round(h.reduce((a,x)=>a+x.percent,0)/h.length)}%`:"—";
  $("score-history").replaceChildren();
  if(!h.length){const p=document.createElement("p");p.className="muted";p.textContent="Your completed quizzes will appear here."; $("score-history").appendChild(p);}
  h.slice(0,5).forEach(x=>{const div=document.createElement("div");div.className="history-item";const b=document.createElement("strong");b.textContent=`${x.category}: ${x.correct}/${x.total} (${x.percent}%)`;const small=document.createElement("div");small.textContent=x.date;div.append(b,small);$("score-history").appendChild(div);});
}
const LEADERBOARD_KEY="quiznova_v1_leaderboard";
const DEMO_NAMES=["Aarav Shah","Mia Patel","Kabir Mehta","Anaya Rao","Rohan Desai","Isha Kulkarni","Dev Malhotra","Sara Khan","Vihaan Joshi","Zoya Singh","Arjun Nair","Myra Kapoor"];
function seededLeaderboard(){
  let data={};
  try { const saved=JSON.parse(localStorage.getItem(LEADERBOARD_KEY)||"null"); if(saved && typeof saved==="object") data=saved; } catch {}
  let changed=false;
  Object.keys(QUESTION_BANK).forEach(key=>{if(!Array.isArray(data[key])){data[key]=DEMO_NAMES.slice(0,8).map((name,i)=>({name,percent:[100,100,90,90,80,80,70,60][i],correct:[10,10,9,9,8,8,7,6][i],total:10,seconds:[48,55,62,70,75,82,90,105][i]+(key.length%7),source:"demo"}));changed=true;}});
  if(changed || !(()=>{try{return !!localStorage.getItem(LEADERBOARD_KEY)}catch{return false}})()) safeStore(LEADERBOARD_KEY,data);
  return data;
}
function renderLeaderboard(){
  const all=seededLeaderboard(); const rows=(all[state.category]||[]).slice().sort((a,b)=>b.percent-a.percent || a.seconds-b.seconds).slice(0,8);
  $("leaderboard-title").textContent=`🏆 ${QUESTION_BANK[state.category].name} leaderboard`;
  const perfect=rows.filter(x=>x.percent===100);
  $("fastest-record").textContent=perfect.length?`${perfect.reduce((a,x)=>x.seconds<a.seconds?x:a).seconds}s`:`No perfect run yet`;
  $("leader-best").textContent=rows.length?`${Math.max(...rows.map(x=>x.percent))}%`:"—";
  const list=$("leaderboard-list"); list.replaceChildren();
  if(!rows.length){const p=document.createElement("p");p.className="muted";p.textContent="Play this quiz to start the leaderboard.";list.appendChild(p);return;}
  rows.forEach((r,i)=>{const row=document.createElement("div");row.className="leaderboard-row";const rank=document.createElement("span");rank.className="leader-rank";rank.textContent=["🥇","🥈","🥉"][i]||String(i+1);const name=document.createElement("strong");name.textContent=r.name;const score=document.createElement("span");score.className="leader-score";score.textContent=`${r.percent}%`;const time=document.createElement("small");time.textContent=`${r.seconds}s`;row.append(rank,name,score,time);if(r.source==="player")row.classList.add("leader-you");list.appendChild(row);});
}
function saveLeaderboardEntry(entry){const all=seededLeaderboard();const rows=all[entry.categoryKey]||(all[entry.categoryKey]=[]);rows.push({name:"You",percent:entry.percent,correct:entry.correct,total:entry.total,seconds:entry.seconds,source:"player"});all[entry.categoryKey]=rows.sort((a,b)=>b.percent-a.percent||a.seconds-b.seconds).slice(0,30);safeStore(LEADERBOARD_KEY,all);}
function exitQuiz(){const answered=state.answers.some(x=>x!==null);if(answered&&!confirm("Leave this quiz? Your current answers will not be scored."))return;stopTimer();state.paused=false;showScreen("home-screen");}
function togglePause(){state.paused=!state.paused;$("pause-overlay").classList.toggle("hidden",!state.paused);$("pause-btn").textContent=state.paused?"▶ Resume":"Ⅱ Pause";if(state.paused)stopTimer();else startTimer(false);}
function toggleBookmark(){if(state.bookmarks.has(state.index))state.bookmarks.delete(state.index);else state.bookmarks.add(state.index);$("bookmark-btn").textContent=state.bookmarks.has(state.index)?"★ Bookmarked":"☆ Bookmark";notify(state.bookmarks.has(state.index)?"Question bookmarked for review.":"Bookmark removed.");}
function saveResult(){const text=`QuizNova Result\nCategory: ${QUESTION_BANK[state.category].name}\nScore: ${$("score-value").textContent}\nPercentage: ${$("percent-value").textContent}\nDate: ${new Date().toLocaleString()}\n\nAnswer review:\n${state.questions.map((q,i)=>`${i+1}. ${q.q}\nYour answer: ${state.answers[i]===null?"Skipped":q.o[state.answers[i]]}\nCorrect answer: ${q.o[q.a]}\nExplanation: ${q.e}`).join("\n\n")}`;const blob=new Blob([text],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="quiznova-result.txt";a.click();URL.revokeObjectURL(url);}
function goHome(){stopTimer();state.paused=false;showScreen("home-screen");renderDashboard();}
document.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>chooseCategory(b.dataset.category)));
$("start-btn").addEventListener("click",()=>startQuiz());
$("brand-home").addEventListener("click",e=>{e.preventDefault();goHome();});
$("exit-btn").addEventListener("click",exitQuiz);$("prev-btn").addEventListener("click",previousQuestion);$("next-btn").addEventListener("click",nextQuestion);$("submit-btn").addEventListener("click",()=>{if(state.answers.some(x=>x===null)&&!confirm("Some questions are unanswered. Submit anyway?"))return;finishQuiz();});
$("skip-btn").addEventListener("click",()=>{state.answers[state.index]=null;nextQuestion();});
$("pause-btn").addEventListener("click",togglePause);$("resume-btn").addEventListener("click",togglePause);$("bookmark-btn").addEventListener("click",toggleBookmark);
$("sound-toggle").addEventListener("click",()=>{state.sound=!state.sound;$("sound-toggle").textContent=state.sound?"🔊 Sound on":"🔇 Sound off";$("sound-toggle").setAttribute("aria-pressed",String(state.sound));if(state.sound)playTone();});
$("theme-toggle").addEventListener("click",()=>{const dark=document.body.classList.toggle("dark-theme");$("theme-toggle").textContent=dark?"☀ Light mode":"☾ Dark mode";$("theme-toggle").setAttribute("aria-pressed",String(dark));try{localStorage.setItem("quiznova_theme",dark?"dark":"light");}catch{}});
$("review-btn").addEventListener("click",()=>{$("review-panel").classList.toggle("hidden");$("review-btn").textContent=$("review-panel").classList.contains("hidden")?"🔎 Review answers":"✕ Hide review";if(!$("review-panel").classList.contains("hidden"))$("review-panel").scrollIntoView({behavior:"smooth"});});
$("retry-btn").addEventListener("click",()=>startQuiz());$("home-btn").addEventListener("click",goHome);$("download-result").addEventListener("click",saveResult);
$("practice-wrong").addEventListener("click",()=>{if(!state.lastWrong?.length){alert("Great work! There are no incorrect answers to practise.");return;}startQuiz(true);});
$("clear-history").addEventListener("click",()=>{if(confirm("Clear all recent quiz history?")){localStorage.removeItem(KEY);renderDashboard();}});
$("reset-stats").addEventListener("click",()=>{if(confirm("Reset all saved QuizNova statistics on this browser?")){localStorage.removeItem(KEY);localStorage.removeItem(BEST);renderDashboard();}});
document.addEventListener("keydown",e=>{if(!$("quiz-screen").classList.contains("hidden")&&!state.paused){if(["1","2","3","4"].includes(e.key))selectAnswer(Number(e.key)-1);if(e.key==="ArrowRight")nextQuestion();if(e.key==="ArrowLeft")previousQuestion();if(e.key==="Escape")togglePause();}});
try { if(localStorage.getItem("quiznova_theme")==="dark"){document.body.classList.add("dark-theme");$("theme-toggle").textContent="☀ Light mode";$("theme-toggle").setAttribute("aria-pressed","true");} } catch {}
chooseCategory(state.category);
renderDashboard();
renderLeaderboard();
