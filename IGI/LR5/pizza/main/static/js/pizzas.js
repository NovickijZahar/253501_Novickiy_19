const itemsPerPage = 3;
const items = document.querySelectorAll('.pizza-item');
const totalPages = Math.ceil(items.length / itemsPerPage);
const paginationContainer = document.getElementById('pagination');

function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
        item.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
}

function createPagination() {
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            showPage(i);
        });
        paginationContainer.appendChild(button);
    }
}

createPagination();
showPage(1); 



for (let wrapper of document.querySelectorAll('.parallax')){

    const layers = wrapper.querySelectorAll('.parallax__layer');
    
    const handleParallax = (evt) => {
    const parallaxLeftOffset = wrapper.getBoundingClientRect().left;
    const parallaxTopOffset = wrapper.getBoundingClientRect().top;
  
    const coordX = evt.clientX - parallaxLeftOffset - 0.5 * wrapper.offsetWidth;
    const coordY = evt.clientY - parallaxTopOffset - 0.5 *  wrapper.offsetHeight;
  
    layers.forEach((layer)=>{
        const layerSpeed = layer.dataset.speed;
        const x = - (coordX * layerSpeed).toFixed(2);
        const y = - (coordY * layerSpeed).toFixed(2);
        layer.setAttribute('style', `transform: translate(${x}px, ${y}px);`)
        });
    };

    const reset = () => {
        layers.forEach((layer)=>{
            layer.removeAttribute('style');
        });
    };

    wrapper.addEventListener('mousemove', handleParallax);
    wrapper.addEventListener('mouseout', reset);
}