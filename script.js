document.addEventListener('DOMContentLoaded', function () {
  const projectBtn = document.querySelector('#project');
  const aboutBtn = document.querySelector('#about');
  const projectCon = document.querySelector('.project-con');
  const aboutCon = document.querySelector('.about-con');
  const projectCards = document.querySelectorAll('.project-card');

  projectBtn?.addEventListener('click', loadProject);
  aboutBtn?.addEventListener('click', loadAbout);

  if (location.hash === '#about') {
    loadAbout();
  } else {
    loadProject();
  }

  observeElements(projectCards);

  /* ---------------- HELPERS ---------------- */

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function observeElements(elements) {
    if (!elements || !elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          entry.target.classList.add('slide-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      el.style.visibility = 'hidden';
      el.classList.remove('slide-in');
      observer.observe(el);
    });
  }

  /* ---------------- PROJECT ---------------- */

  function loadProject() {
    toTop();
    projectCon.style.display = 'block';
    aboutCon.style.display = 'none';
    observeElements(projectCards);
  }

  /* ---------------- ABOUT ---------------- */

  let aboutInitialized = false;

  function loadAbout() {
    toTop();
    projectCon.style.display = 'none';
    aboutCon.style.display = 'block';

    if (aboutInitialized) {
      observeElements(document.querySelectorAll('.aboutin'));
      return;
    }

    aboutInitialized = true;

    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'allAbout';
    sectionTitle.innerHTML = '<h1>About Me</h1>';
    aboutCon.appendChild(sectionTitle);

    const aboutContent = document.createElement('div');
    aboutContent.className = 'about1';
    aboutContent.innerHTML = `
      <div class="aboutin">
        <h2 style="color:rgba(150,150,150,.8)">Education</h2>
        <hr style="width:70%">
        <h2>San Diego State University</h2>
        <h3 style="color:mediumturquoise">M.S. in Big Data Analytics</h3>
        <h3>2022 – 2024</h3>
      </div>

      <div class="aboutin">
        <h2 style="color:rgba(150,150,150,.8)">Skills</h2>
        <hr style="width:70%">
        <h3>Python, Pandas, NumPy</h3>
        <h3>MySQL, MongoDB</h3>
        <h3>ML, CNN, Transformer, LLM</h3>
        <h3>Django, HTML, CSS, JavaScript</h3>
        <h3>Power BI, Tableau</h3>
        <h3>Docker, Git, AWS</h3>
      </div>

      <div class="aboutin">
        <h2 style="color:rgba(150,150,150,.8)">Research</h2>
        <hr style="width:70%">
        <h3>AI4Business Lab – Graduate Research Assistant</h3>
        <h5>2023 – 2024</h5>
      </div>

      <div class="aboutin">
        <h2 style="color:rgba(150,150,150,.8)">Awards</h2>
        <hr style="width:70%">
        <h3>Tamkang University Academic Award</h3>
        <h3>CS50 Web Programming (HarvardX)</h3>
      </div>
    `;
    aboutCon.appendChild(aboutContent);

    // const contactTitle = document.createElement('div');
    // contactTitle.className = 'allAbout';
    // contactTitle.innerHTML = '<h1>Get in Touch!</h1>';
    // aboutCon.appendChild(contactTitle);

    // const contactForm = document.createElement('div');
    // contactForm.className = 'about1';
    // contactForm.innerHTML = `
    //   <div class="aboutin">
    //     <form action="https://docs.google.com/forms/u/3/d/e/1FAIpQLScA52mI9-sUfV-7K2-8GBI-OxQorCBlMGHazgL3mgonpUomNg/formResponse" method="POST">
    //       <input name="entry.1542095054" placeholder="Name*" required>
    //       <input name="entry.75762421" placeholder="Phone">
    //       <input type="email" name="entry.2108674751" placeholder="Email*" required>
    //       <textarea name="entry.1885054033" placeholder="Message*" required></textarea>
    //       <button type="submit">Submit</button>
    //     </form>
    //   </div>
    // `;
    // aboutCon.appendChild(contactForm);

    observeElements(document.querySelectorAll('.aboutin'));
  }

  /* ---------------- ARROWS ---------------- */

  const arrows = document.querySelectorAll('.arrow-con i');
  if (arrows.length) {
    let current = 0;
    let previous = arrows.length - 1;

    setInterval(() => {
      arrows[current].classList.add('active');
      arrows[previous].classList.remove('active');
      previous = current;
      current = (current + 1) % arrows.length;
    }, 300);
  }

  /* ---------------- SCROLL BAR ---------------- */

  window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    const maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (maxScroll <= 0) return;

    const percent =
      (document.documentElement.scrollTop / maxScroll) * 100;

    progressBar.style.width = percent + '%';
    progressBar.style.backgroundColor = 'pink';
  });
});










