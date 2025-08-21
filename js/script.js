document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const hook = document.getElementById('hook');
    const prize1 = document.getElementById('prize1');
    const prize2 = document.getElementById('prize2');
    const prize3 = document.getElementById('prize3');
    const prize4 = document.getElementById('prize4');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const downBtn = document.getElementById('downBtn');
    const restartBtn = document.getElementById('restartBtn');
    const winModal = document.getElementById('winModal');
    const wonPrize = document.getElementById('wonPrize');

    // Variables de estado
    let hookPosition = 50;
    let isPlaying = true; // El juego empieza automáticamente
    let currentPrize = null;

    // Inicia el juego automáticamente
    hook.style.left = '50%';
    hook.style.top = '0%';

    // Mueve el gancho a izquierda/derecha
    function moveHook(direction) {
        if (!isPlaying) return;
        if (direction === 'left' && hookPosition > 10) {
            hookPosition -= 5;
        } else if (direction === 'right' && hookPosition < 90) {
            hookPosition += 5;
        }
        hook.style.left = `${hookPosition}%`;
    }

    // Baja el gancho y lo sube automáticamente después de 1.5 segundos
    function moveHookDown() {
        if (!isPlaying) return;
        hook.style.top = '85%';
        setTimeout(() => {
            hook.style.top = '0%';
            checkCollision();
        }, 500);
    }

    // Comprueba si el gancho ha chocado con algún peluche
    function checkCollision() {
        const hookRect = hook.getBoundingClientRect();
        const prize1Rect = prize1.getBoundingClientRect();
        const prize2Rect = prize2.getBoundingClientRect();
        const prize3Rect = prize3.getBoundingClientRect();
        const prize4Rect = prize4.getBoundingClientRect();

        if (isColliding(hookRect, prize1Rect)) {
            currentPrize = prize1;
            endGame();
        } else if (isColliding(hookRect, prize2Rect)) {
            currentPrize = prize2;
            endGame();
        } else if (isColliding(hookRect, prize3Rect)) {
            currentPrize = prize3;
            endGame();
        } else if (isColliding(hookRect, prize4Rect)) {
            currentPrize = prize4;
            endGame();
        }
    }

    // Detecta colisión entre dos elementos
    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
    }

    // Muestra el modal de victoria
    function endGame() {
        isPlaying = false;
        wonPrize.src = currentPrize.querySelector('img').src;
        winModal.style.display = 'flex';
    }

    // Reinicia el juego
    function restartGame() {
        isPlaying = true;
        hookPosition = 50;
        hook.style.left = '50%';
        hook.style.top = '0%';
        winModal.style.display = 'none';
        mostrarImagenesAleatorias();
    }

    // Event listeners para botones
    leftBtn.addEventListener('click', () => moveHook('left'));
    rightBtn.addEventListener('click', () => moveHook('right'));
    downBtn.addEventListener('click', moveHookDown);
    restartBtn.addEventListener('click', restartGame);

    // Event listeners para teclado
    document.addEventListener('keydown', (event) => {
        if (!isPlaying) return;
        switch (event.key) {
            case 'ArrowLeft':
                moveHook('left');
                break;
            case 'ArrowRight':
                moveHook('right');
                break;
            case 'ArrowDown':
                moveHookDown();
                break;
        }
    });
});


function mostrarImagenesAleatorias() {

    const todasLasImagenes = [
        "img/regalo1.png",
        "img/regalo2.png",
        "img/regalo3.png",
        "img/regalo4.png",
        "img/regalo5.png",
        "img/regalo6.png",
        "img/regalo7.png",
        "img/regalo8.png"
    ];
    

    const imagenesMezcladas = todasLasImagenes.sort(() => 0.5 - Math.random());
    const imagenesSeleccionadas  = imagenesMezcladas.slice(0, 4);
    // Seleccionar una imagen aleatoria
    
    var imagenSeleccionada = imagenesSeleccionadas[0];
    document.querySelector("#prize1 img").src = imagenSeleccionada;
     imagenSeleccionada = imagenesSeleccionadas[1];
    document.querySelector("#prize2 img").src = imagenSeleccionada;

     imagenSeleccionada = imagenesSeleccionadas[2];
    document.querySelector("#prize3 img").src = imagenSeleccionada;

     imagenSeleccionada = imagenesSeleccionadas[3];
    document.querySelector("#prize4 img").src = imagenSeleccionada;

}


window.onload = mostrarImagenesAleatorias;
