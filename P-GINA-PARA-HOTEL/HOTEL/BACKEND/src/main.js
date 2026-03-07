document.addEventListener('DOMContentLoaded', () => {
    // --- SLIDER AUTOMÁTICO ---
    const sliderContainer = document.getElementById('slider-container');
    const images = sliderContainer?.querySelectorAll('img');
    let currentIndex = 0;

    if (sliderContainer && images.length > 0) {
        // Función para cambiar de imagen
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % images.length;
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        // Cambiar automáticamente cada 5 segundos
        setInterval(nextSlide, 5000);

        // Botones manuales (opcional, ya los tienes en el HTML)
        document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
        document.getElementById('prevBtn')?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    console.log("Slider del Hotel Paradiso cargado correctamente 🌴");
});