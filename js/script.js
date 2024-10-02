const sections = document.querySelectorAll('section');
const aboutSection = document.querySelector('#about');
const navLi = document.querySelectorAll('nav .container ul li');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= sectionTop - sectionHeight/3) {
            current = section.getAttribute('id');
        }
    });
    navLi.forEach(li => {
        li.classList.remove('active');
        if(li.classList.contains(current)) {
            li.classList.add('active');
        }
    });
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
        navLi[navLi.length - 1].classList.add('active');
        navLi[navLi.length - 2].classList.remove('active');
    }
})

window.addEventListener('scroll', () => {
    const container = document.querySelector('.container');
    if (window.scrollY > 40) {
        container.classList.add('shrink');
    } else {
        container.classList.remove('shrink'); 
    }
})

navLi.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const section = document.querySelector(event.target.getAttribute('href'));
        const navHeight = document.querySelector('nav .container').offsetHeight;
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
    });
});

const carouselContainer = document.querySelector('.carousel-container');
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let slideWidth;
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', () => {
    if(counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

prevBtn.addEventListener('click', () => {
    if(counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
})

carouselSlide.addEventListener('transitionend', () => {
    if(carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if(carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
})

function updateSlideWidth() {
    slideWidth = carouselContainer.clientWidth;
    carouselImages.forEach(img => {
        img.style.width = `${slideWidth}px`;
    });
    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
}

window.addEventListener('resize', () => {
    updateSlideWidth();
});

updateSlideWidth();

const modal = document.querySelector('.modal-container');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.getElementsByClassName('close')[0];
const projectCards = document.querySelectorAll('.project');

const projectDetails = {
    project1: {
        title: "Maxit",
        description: `
            <ul>
                <li>Includes two modes of play: single and double player</li>
                <li>In the single player mode, the opponent is program that uses Minimax algorithm to make the best move possible</li>
                <li>Minimax algorithm implemented via Dynamic Programming (DP)</li>
                <li><a href="https://github.com/akilkarthikeyan/maxit">GitHub</a></li>
            </ul>
        `
    },
    project2: {
        title: "MicroSecPost",
        description: `
            <ul>
                <li>Analysis framework for microservices to help developers identify critical features affecting system issues</li>
                <li>The framework models microservices using a DAG representation (where vertices correspond to microservices and edges
correspond to API calls between them) and applies GNN algorithms to identify the critical features</li>
                <li>Presented work at the 21st IEEE International Conference on Software Architecture (ICSA '24)</li>
                <li><a href="https://ieeexplore.ieee.org/document/10628246">IEEE Xplore</a></li>
            </ul>
        `
    },
    project3: {
        title: "Ecommerce",
        description: `
            <ul>
                <li>Ecommerce back end built using Java, Spring Boot and PostgreSQL</li>
                <li>Provides APIs to perform CRUD operations on CART and STORE</li>
                <li><a href="https://github.com/akilkarthikeyan/ecommerce">GitHub</a></li>
            </ul>
        `
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const projectId = this.id;
        const project = projectDetails[projectId];
        modalTitle.textContent = project.title;
        modalTitle.style.textAlign = "center";
        modalDescription.innerHTML = project.description;
        modalDescription.style.padding = "20px";
        modalDescription.style.textAlign = "left";
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});