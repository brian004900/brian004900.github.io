document.addEventListener('DOMContentLoaded', function() {
  observeProjectCards(projectCards);
  document.querySelector('#project').addEventListener('click', () => loadproject());
  document.querySelector('#about').addEventListener('click', () => loadabout());
  if (location.hash === '#about') {
    loadabout();
  } else {
    loadproject();
  }
});

function toTop(){
  window.scrollTo(0, 0);}

var projectDiv = document.querySelector('.project-div');
var aboutDiv = document.querySelector('.about-div');
var projectCards = document.querySelectorAll('.project-card');

// Load project page
function loadproject() {
  toTop();
  document.querySelector('.project-con').style.display = 'block';
  document.querySelector('.about-con').style.display = 'none';
  observeProjectCards(projectCards);
}

function observeProjectCards(cards) {
  var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      entry.target.style.visibility = "hidden";
      entry.target.classList.remove('slide-in');
      if (entry.isIntersecting) {
        // Change visibility to "visible" before adding the slide-in class
        entry.target.style.visibility = "visible";
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  });

  cards.forEach(function(card) {
    // Set initial visibility to "hidden" for each project card
    card.style.visibility = "hidden";
    observer.observe(card);
  });
}




// Load about me page

var allAbout = null; // Declare the variable outside the function

function loadabout() {
  toTop();
  document.querySelector('.project-con').style.display = 'none';
  document.querySelector('.about-con').style.display = 'block';

  var aboutCon = document.querySelector('.about-con');

  if (!allAbout) {
    allAbout = document.createElement('div'); 
    allAbout.classList.add('allAbout');
    allAbout.innerHTML = '<h1>About me</h1>';
    aboutCon.appendChild(allAbout);

    about1 = document.createElement('div'); 
    about1.classList.add('about1');
    
    about1.innerHTML = '<div class="aboutin"><h2 style="color:rgb(150, 150, 150, 0.818)">Education</h3>' +
                   '<hr style="width:70%">' +
                   '<h2>San Diego State University</h3>' +
                   '<h3 style="color:mediumturquoise">Master of Science Degree in Big Data Analytics</h3>'+
                   '<h3>July 2022 - 2024</h3>'+
                   '</br>'+
                   '</br>'+
                   '<div class="aboutin"><h2 style="color:rgb(150, 150, 150, 0.818)">Skills</h3>'+
                   '<hr style="width:70%">'+
                   '<h3>Python (Pandas, Numpy)</h3>'+
                   '<h3>Database (MySQL, MariaDB, MongoDB)</h3>'+
                   '<h3>Artificial Intelligence (Scikit-Learn, Computer Vision, PyTorch, CNN, Transformer, LLM, Machine Learning)</h3>'+
                   '<h3>Web Application (Django, HTML, Javascript, CSS)</h3>'+
                   '<h3>Data Visualization (Power BI, Tableau, Plotly)</h3>'+
                   '<h3>Statistics (R, SPSS)</h3>'+
                   '<h3>Docker, Git, Bash, Data Structure, AWS Relational Database System</h3>'+
                   '</br>'+
                   '</br>'+

                   '<div class="aboutin"><h2 style="color:rgb(150, 150, 150, 0.818)">Research</h3>'+
                   '<hr style="width:70%">'+
                   '<h2>AI4Business Lab, San Diego State University</h2>'+
                   '<h3 style="color:mediumturquoise">Lab Coordinator/Graduate Research Assistant</h3>'+
                   '<h5>2023/3 - 2024/6</h5>'+
                   '<h3>Key words: Pavement distress detection, Image Transformers, Convolutional Neural Networks, image classification</h3>'+
                   '</br>'+
                   '<h2>Department of MIS, San Diego State University</h2>'+
                   '<h3 style="color:mediumturquoise">Teaching Assistant</h3>'+
                   '<h5>2023/8 - 2024/5</h5>'+
                   '<h3>Key words: Python Software Development, data analytics, machine learning, web development</h3>'+
                   '</br>'+
                   '<h2>Jeff Byrd Financial, Inc</h2>'+
                   '<h3 style="color:mediumturquoise">Office Assistant (Temp)</h3>'+
                   '<h5>2022/2 - 2022/6</h5>'+
                   '<h3>Key words: Cloud database management, Database Stadarization</h3>'+
                   '</br>'+
                   '<h2>Tamkang University </h2>'+
                   '<h3 style="color:mediumturquoise">Research Assistant</h3>'+
                   '<h5>2020/3 - 2021/1</h5>'+
                   '<h3>Key words: NLP, Recommendation System, Customer Analysis</h3>'+
                   '</br>'+
                   '</br>'+

                   '<div class="aboutin"><h2 style="color:rgb(150, 150, 150, 0.818)">Reward & Certificate</h3>'+
                   '<hr style="width:70%">'+
                   '<h3>Tamkang University School of Management Sciences Academic Award (2021)</h3>'+
                   '</br>'+
                   "<h3>CS50's Web Programming, Havardx (2023)</h3>"+
                   '</br>'+
                   '<h3>Certified Microsoft Office Specialist Excel 2016 (2019)</h3>'+
                   '</br>'+
                   '<h3>Taiwan Institute of Marketing Science Certificate of Marketing Planning (2019)</h3></div>'+
                   '</br>'+
                   '</br>'+
                   // '</br>'+
                   // '<a href="./pdfs/Brian_CV_.pdf" target="_blank" class="card-button">Résumé</a></div>';
    aboutCon.appendChild(about1);

    allAbout = document.createElement('div'); 
    allAbout.classList.add('allAbout');
    allAbout.innerHTML = '<h1>Get in Touch!</h1>';
    aboutCon.appendChild(allAbout);

    about1 = document.createElement('div'); 
    about1.classList.add('about1');
    about1.innerHTML = `
    <div class="aboutin">
    <div class="container">
      <form action="https://docs.google.com/forms/u/3/d/e/1FAIpQLScA52mI9-sUfV-7K2-8GBI-OxQorCBlMGHazgL3mgonpUomNg/formResponse" method='post'>
        <div class="row">
          <input type="text" class="input" name="entry.1542095054" placeholder="Name*" required>
          <input type="text" class="input" name="entry.75762421" placeholder="Phone">
        </div>
        <div class="row">
          <input type="email" class="input" name="entry.2108674751" placeholder="Email*" required>
        </div>
        <div class="row">
          <textarea class="input textarea" name="entry.1885054033" placeholder="Message*" required></textarea>
        </div>
        <div class="row">
          <button type="submit" class="button">Submit</button>
        </div>
      </form>
    </div>
  </div>
  
  `;
    aboutCon.appendChild(about1);
  }
  var aboutin = document.querySelectorAll('.aboutin');
  observeProjectCards(aboutin);
}


const arrows = document.querySelectorAll('.arrow-con i');

let currentIndex = 0;
let previousIndex = arrows.length - 1;

function changeColor() {
  arrows[currentIndex].classList.add('active');
  arrows[previousIndex].classList.remove('active');

  previousIndex = currentIndex;
  currentIndex = (currentIndex + 1) % arrows.length;
}

// Call the changeColor function periodically
setInterval(changeColor, 300); // Change color every 1 second (adjust as needed)





function submitToGoogleForm() {
  // 获取表单数据
  var form = document.getElementById('myForm');
  var formData = new FormData(form);

  // 使用 AJAX 或其他方法将表单数据发送到 Google 表单的 URL
  // 例如使用 Fetch API 发送 POST 请求
  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(function(response) {
    // 处理响应
    console.log('Form submitted successfully');
  })
  .catch(function(error) {
    // 处理错误
    console.error('Error submitting form:', error);
  });
}

window.addEventListener('scroll', function () {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;
  const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
  const progressBar = document.getElementById('scroll-progress');
  progressBar.style.backgroundColor = 'pink';
  progressBar.style.width = scrolled + '%';
});










