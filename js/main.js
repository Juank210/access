document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel');

  const activateTab = (tabId) => {
    // 1. Limpieza absoluta
    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      panel.style.display = 'none'; 
    });

    // 2. Activar el panel correcto
    const targetPanel = document.querySelector(`.tab-panel[data-tab="${tabId}"]`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.style.display = 'block';
    }

    // 3. Sincronizar botones (clase active)
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation(); // <--- ESTO EVITA EL SALTO A OTRA SECCIÓN
      
      const tabId = button.getAttribute('data-tab');
      activateTab(tabId);
    });
  });
});