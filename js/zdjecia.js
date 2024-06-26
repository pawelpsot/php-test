document.addEventListener('DOMContentLoaded', function() { 
    // Inicjalizacja biblioteki ScrollReveal
    const sr = ScrollReveal({
        distance: '50px', // Odległość animacji
        duration: 1000, // Czas trwania animacji (w milisekundach)
        delay: 200, // Opóźnienie animacji (w milisekundach)
        reset: false 
    });

    // Konfiguracja animacji dla elementów img
    sr.reveal('img[data-scroll]', { origin: 'bottom', scale: 0.5 });

    // Funkcja do przewijania sekcji
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.style.display = section.style.display === 'block' ? 'none' : 'block';
    }

});