class Slider {
    constructor(sliderElement, options) {
        this.sliderElement = sliderElement;
        this.slides = sliderElement.querySelector('.slides');
        this.slideElements = sliderElement.querySelectorAll('.slide');
        this.prevButton = sliderElement.querySelector('.nav.left');
        this.nextButton = sliderElement.querySelector('.nav.right');
        this.pagination = sliderElement.querySelector('.pagination');
        this.slideNumber = sliderElement.querySelector('.slide-number');
        
        this.currentIndex = 0;
        this.totalSlides = this.slideElements.length;
        this.settings = {
            loop: options.loop,
            navs: options.navs,
            pags: options.pags,
            auto: options.auto,
            stopMouseHover: options.stopMouseHover,
            delay: options.delay
        };
        
        this.init();
    }

    init() {
        this.updateSlideNumber();
        this.createPagination();
        this.updateNavigationVisibility();
        
        if (this.settings.auto) {
            this.startAutoSlide();
            if (this.settings.stopMouseHover) {
                this.sliderElement.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.sliderElement.addEventListener('mouseleave', () => this.startAutoSlide());
            }
        }

        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        this.pagination.addEventListener('click', (e) => {
            if (e.target.tagName === 'SPAN') {
                const index = parseInt(e.target.dataset.index, 10);
                this.goToSlide(index);
            }
        });

        this.delayInput = document.getElementById('delay');
    }

    createPagination() {
        if (!this.settings.pags) 
        {
            this.pagination.style.display = 'none';
            return;
        }
        this.pagination.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const span = document.createElement('span');
            span.textContent = i + 1;
            span.dataset.index = i;
            this.pagination.appendChild(span);
        }
        this.updatePaginationActive();
    }

    updatePaginationActive() {
        const spans = this.pagination.querySelectorAll('span');
        spans.forEach((span, index) => {
            span.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.settings.delay * 1000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }

    updateSlideNumber() {
        this.slideNumber.textContent = `${this.currentIndex + 1} / ${this.totalSlides}`;
    }

    nextSlide() {
        if (this.settings.loop){
            this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        }
        else{
            this.currentIndex = Math.min(this.currentIndex+1, this.totalSlides - 1);
        }
        this.updateSlide();
    }

    prevSlide() {
        if (this.settings.loop){
            this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        }
        else{
            this.currentIndex = Math.max(this.currentIndex-1, 0);
        }
        this.updateSlide();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }

    updateSlide() {
        const offset = -this.currentIndex * 100;
        this.slides.style.transform = `translateX(${offset}%)`;
        this.updateSlideNumber();
        this.updatePaginationActive();
        this.updateNavigationVisibility();
    }

    updateNavigationVisibility() {
        if (!this.settings.navs) {
            this.prevButton.style.display = 'none';
            this.nextButton.style.display = 'none';
        } else {
            this.prevButton.style.display = this.settings.loop || this.currentIndex > 0 ? 'block' : 'none';
            this.nextButton.style.display = this.settings.loop || this.currentIndex < this.totalSlides - 1 ? 'block' : 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sliderElement = document.querySelector('.slider');
    const slider = new Slider(sliderElement, {
        loop: true,
        navs: true,
        pags: true,
        auto: true,
        stopMouseHover: true,
        delay: 1
    });
});