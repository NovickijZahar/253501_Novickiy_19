const toggleControls = document.getElementById('toggleControls');
const controls = document.getElementById('controls');

toggleControls.addEventListener('change', () => {
    controls.style.display = toggleControls.checked ? 'block' : 'none';
});

document.getElementById('fontSize').addEventListener('change', function() {
    document.body.style.fontSize = this.value;
});

document.getElementById('textColor').addEventListener('input', function() {
    document.body.style.color = this.value;
});

document.getElementById('bgColor').addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
});