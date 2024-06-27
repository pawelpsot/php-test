document.addEventListener('DOMContentLoaded', function() {
    // Funkcja do przewijania sekcji
    function toggleSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = section.style.display === 'block' ? 'none' : 'block';
        }
    }

    // Funkcja do przypisania zdarzeń po załadowaniu nawigacji
    function initializeNavigation() {
        // Przypisanie funkcji toggleSection do elementów <h2>
        document.querySelectorAll('#navigation h2').forEach(h2 => {
            h2.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                toggleSection(sectionId);
            });
        });

        // Funkcja do filtrowania nawigacji
        function filterNavigation() {
            const query = document.getElementById('search').value.trim().toLowerCase();
            const links = document.querySelectorAll('#navigation a');
            links.forEach(link => {
                const text = link.textContent.trim().toLowerCase();
                const parentUl = link.closest('ul');
                if (text.includes(query)) {
                    link.parentElement.style.display = 'list-item';
                    if (parentUl) {
                        parentUl.style.display = 'block';
                    }
                } else {
                    link.parentElement.style.display = 'none';
                }
            });
            // Pokaż wszystkie sekcje nawigacji
            document.querySelectorAll('#navigation h2').forEach(h2 => h2.style.display = 'block');
        }

        // Dodanie obsługi zdarzeń dla pola wyszukiwania
        document.getElementById('search').addEventListener('input', filterNavigation);

        // Ustawienie aktywnego linku przy ładowaniu strony
        setActiveLink();
    }

    // Funkcja do ustawiania aktywnego linku i rozwijania jego sekcji
    function setActiveLink() {
        const links = document.querySelectorAll('#navigation a');
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
                const parentUl = link.closest('ul');
                if (parentUl) {
                    parentUl.style.display = 'block';
                    // Rozwijanie sekcji nadrzędnej, jeśli link jest aktywny
                    const parentSection = parentUl.previousElementSibling;
                    if (parentSection && parentSection.tagName === 'H2') {
                        toggleSection(parentSection.getAttribute('data-section'));
                    }
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Pobranie i wstawienie zawartości nawigacji z pliku navigation.html
    fetch('navigation.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navigation').innerHTML = data;
            // Po wstawieniu nawigacji, uruchom funkcje z nawi.js
            initializeNavigation();
        });
});
