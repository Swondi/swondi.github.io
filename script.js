/* Navbar */
const burgerButton = document.getElementsByClassName('navbar-burger').item(0)
const navbarMenu = document.getElementById('navbar-menu')

burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('is-active')
  navbarMenu.classList.toggle('is-active')
})

/* Main countdown */
const countdownElement = document.getElementById("countdown");
const endDate = new Date(Date.parse('30 Sep 2023 12:00:00 GMT'));
const startDate = new Date(Date.parse('1 Jul 2023 12:00:00 GMT'));

const backgroundCircle = document.getElementById('background-circle')
const backgroundLine = document.getElementById('background-line')

const updateCountdown = () => {

    const timeLeft = endDate - Date.now();

    if (timeLeft < 0) {
        countdownElement.innerHTML = "Countdown Expired!";
        return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    /* Circle Clock */
    const totalDuration = endDate - startDate
    const elapsedTime = Date.now() - startDate

    const currentPositionInDeg = (elapsedTime / totalDuration) * 360

    document.documentElement.style.setProperty('--start-time-deg', `${currentPositionInDeg}deg`)    
}

updateCountdown();

setInterval(updateCountdown, 1000);

const particleJsConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 2004.259050482275,
        "rotateY": 4249.029187022423
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 707.2927072927073,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

/* Light and dark mode */
const THEME = {
    DARK: 0,
    LIGHT: 1
}

const darkModeButton = document.getElementById('dark-mode')
const lightModeButton = document.getElementById('light-mode')
let currentMode = THEME.DARK

const changeImageTheme = () => {
    var logoImage = document.getElementById('navbar-logo').querySelector('img')
    var separator = document.getElementsByClassName('background-overlay').item(0)

    // Replace the current image source with the new one
    logoImage.setAttribute('src', `./assets/logo/${currentMode === THEME.DARK ? 'light' : 'dark'}-logo.png`);
    separator.setAttribute('src', `./assets/background/${currentMode === THEME.DARK ? 'dark' : 'light'}-background-overlay-1.svg`);
}

const changeTriangleColor = () => {
    const currentLinesColor = particleJsConfig.particles.line_linked.color
    const currentCircleColor = particleJsConfig.particles.color.value

    particleJsConfig.particles.line_linked.color = currentLinesColor === '#000000' ? '#ffffff' : '#000000' 
    particleJsConfig.particles.color.value = currentCircleColor === '#ffffff' ? '#000000' : '#ffffff'

    var particleJSDiv = document.getElementById('particles-js');

    if (particleJSDiv) { 
        particleJSDiv.removeChild(particleJSDiv.firstChild)
        particlesJS('particles-js', particleJsConfig);
    }

}

darkModeButton.addEventListener('click', () => {
    if (currentMode === THEME.DARK) {
        return
    }

    currentMode = THEME.DARK

    document.documentElement.style.setProperty('--background-1-color', '#000')
    document.documentElement.style.setProperty('--background-2-color', '#1b1b1b')
    document.documentElement.style.setProperty('--light-font-color', '#fff')
    document.documentElement.style.setProperty('--dark-font-color', '#000')
    document.documentElement.style.setProperty('--icon-not-selected', '#666')
    changeImageTheme()
    changeTriangleColor()
    
    darkModeButton.classList.remove('icon-toggled')
    lightModeButton.classList.add('icon-toggled')
})

lightModeButton.addEventListener('click', () => {
    if (currentMode === THEME.LIGHT) {
        return
    }

    currentMode = THEME.LIGHT

    document.documentElement.style.setProperty('--background-1-color', '#fff')
    document.documentElement.style.setProperty('--background-2-color', '#c8c8c8')
    document.documentElement.style.setProperty('--light-font-color', '#000')
    document.documentElement.style.setProperty('--dark-font-color', '#fff')
    document.documentElement.style.setProperty('--icon-not-selected', '#888')

    changeImageTheme()
    changeTriangleColor()

    darkModeButton.classList.add('icon-toggled')
    lightModeButton.classList.remove('icon-toggled')
})

/* Click progress bar/circle */
const dueEvent = 'Grand Opening'
const dueDate = '31 - 09 - 2023'

const toggleDueDate = () => {
  const currentDate = backgroundLine.getAttribute('data-date')
  backgroundLine.setAttribute('data-text', currentDate === '' ? dueEvent : '')
  backgroundLine.setAttribute('data-date', currentDate === '' ? dueDate : '')
}

backgroundCircle.addEventListener('click', toggleDueDate)
backgroundLine.addEventListener('click', toggleDueDate)

/* Contact me highlight */
const contactUsButton = document.getElementById('contact-us')
const footer = document.getElementById('footer')

contactUsButton.addEventListener('click', () => {

  if (footer.classList.contains('pulse-animation-footer')) {
    return;
  }

  footer.classList.add('pulse-animation-footer')

  setTimeout(() => {
    footer.classList.remove('pulse-animation-footer');
  }, 3000);

  footer.querySelectorAll('i').forEach(i => {
    i.classList.add('pulse-animation-icon');

    setTimeout(() => {
      i.classList.remove('pulse-animation-icon');
    }, 3000);
  })
})

/* Click paragraph highlighting */
const aboutSection = document.getElementById('about-section')
const paragraphs = aboutSection.querySelectorAll('.about-text')

paragraphs.forEach(p => {
  p.addEventListener('click', () => {
    p.classList.toggle('highlight-animation-touch')
  })
})

/* Init of particles-js */
particlesJS('particles-js', particleJsConfig);