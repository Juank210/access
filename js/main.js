// ===========================
// Navegación entre Vistas
// ===========================

// Manejo de tabs de navegación
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeFeatureCards();
    initializeVehicleLists();
    initializeCustomForms();
    initializeUploadZones();
});

function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const viewSections = document.querySelectorAll('.view-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetView = tab.getAttribute('data-target');
            activateView(targetView);
            
            // Actualizar tabs activos
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

function activateView(viewId) {
    const viewSections = document.querySelectorAll('.view-section');
    viewSections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
}

function navigateToHome() {
    activateView('landing');
    
    // Actualizar tab activo
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-target') === 'landing') {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===========================
// Tarjetas de Características
// ===========================

function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetView = card.getAttribute('data-navigate');
            if (targetView) {
                activateView(targetView);
                
                // Actualizar navegación
                const navTabs = document.querySelectorAll('.nav-tab');
                navTabs.forEach(tab => {
                    if (tab.getAttribute('data-target') === targetView) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// ===========================
// Listas de Vehículos
// ===========================

function initializeVehicleLists() {
    const listItems = document.querySelectorAll('.list-item:not(.toggle-custom)');
    
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remover selección de items en el mismo contenedor
            const container = item.closest('.vehicle-list');
            if (container) {
                const siblings = container.querySelectorAll('.list-item:not(.toggle-custom)');
                siblings.forEach(sibling => sibling.classList.remove('selected'));
            }
            
            // Seleccionar item actual
            item.classList.add('selected');
            
            // Actualizar detalles del vehículo
            updateVehicleDetails(item);
        });
    });
}

function updateVehicleDetails(item) {
    const vehicleId = item.getAttribute('data-vehicle');
    const detailsContainer = item.closest('.column')?.querySelector('.vehicle-details');
    
    if (detailsContainer && vehicleId) {
        // Datos de ejemplo según el vehículo seleccionado
        const vehicleData = {
            'bus-diesel-1': {
                name: 'Bus Diésel Estándar',
                specs: [
                    'Longitud: 12 metros',
                    'Peso: 18,000 kg',
                    'Área frontal: 7.5 m²',
                    'Rendimiento: 2.8 km/litro',
                    'Capacidad: 80 pasajeros'
                ]
            },
            'bus-ev-1': {
                name: 'Bus Eléctrico BYD K9',
                specs: [
                    'Longitud: 12 metros',
                    'Peso: 18,000 kg',
                    'Batería: 324 kWh',
                    'Autonomía: 250 km',
                    'Consumo: 1.3 kWh/km'
                ]
            }
            // Agregar más vehículos según sea necesario
        };
        
        const data = vehicleData[vehicleId];
        if (data) {
            let html = `<h4>Especificaciones</h4>`;
            html += `<p style="font-weight: 600; margin-bottom: 10px;">${data.name}</p>`;
            html += '<ul style="list-style: none; padding: 0;">';
            data.specs.forEach(spec => {
                html += `<li style="padding: 4px 0; color: var(--text-secondary);">• ${spec}</li>`;
            });
            html += '</ul>';
            detailsContainer.innerHTML = html;
        }
    }
}

// ===========================
// Formularios Personalizados
// ===========================

function initializeCustomForms() {
    const toggleButtons = document.querySelectorAll('.toggle-custom');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const formId = button.getAttribute('data-toggle');
            const form = document.getElementById(formId);
            
            if (form) {
                form.classList.toggle('hidden');
                
                // Si se muestra el formulario, deseleccionar otros items
                if (!form.classList.contains('hidden')) {
                    const container = button.closest('.vehicle-list');
                    if (container) {
                        const items = container.querySelectorAll('.list-item:not(.toggle-custom)');
                        items.forEach(item => item.classList.remove('selected'));
                    }
                }
            }
        });
    });
}

// ===========================
// Modales
// ===========================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-overlay.show');
        openModals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// Upload Zones
// ===========================

function initializeUploadZones() {
    const uploadZones = document.querySelectorAll('.upload-zone');
    
    uploadZones.forEach(zone => {
        // Click para abrir selector de archivos
        zone.addEventListener('click', () => {
            const fileInput = zone.querySelector('.file-input');
            if (fileInput) {
                fileInput.click();
            }
        });
        
        // Drag and drop
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = 'var(--primary-green)';
            zone.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
        });
        
        zone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#e0e0e0';
            zone.style.backgroundColor = '#fafafa';
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '#e0e0e0';
            zone.style.backgroundColor = '#fafafa';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(zone, files[0]);
            }
        });
        
        // Cambio de input file
        const fileInput = zone.querySelector('.file-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    handleFileUpload(zone, e.target.files[0]);
                }
            });
        }
    });
}

function handleFileUpload(zone, file) {
    // Simular carga de archivo
    zone.classList.add('active');
    const text = zone.querySelector('p');
    if (text) {
        text.innerHTML = `<strong>✓ Archivo cargado:</strong> ${file.name}`;
        text.style.color = 'var(--primary-green)';
    }
}

// ===========================
// Vista Indicadores
// ===========================

function generarGrafica() {
    const tipoVehiculo = document.getElementById('tipo-vehiculo')?.value;
    const tipoIndicador = document.getElementById('tipo-indicador')?.value;
    
    if (!tipoVehiculo || !tipoIndicador) {
        alert('Por favor seleccione el tipo de vehículo y el indicador');
        return;
    }
    
    // Simular generación de gráfica
    const chartContainer = document.querySelector('.chart-placeholder svg');
    if (chartContainer) {
        // Actualizar el SVG con una gráfica de ejemplo
        chartContainer.innerHTML = `
            <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#4caf50;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#4caf50;stop-opacity:0.4" />
                </linearGradient>
            </defs>
            <text x="400" y="30" text-anchor="middle" fill="#1a3c5e" font-size="20" font-weight="600">
                ${tipoIndicador.charAt(0).toUpperCase() + tipoIndicador.slice(1)} - ${tipoVehiculo.charAt(0).toUpperCase() + tipoVehiculo.slice(1)}
            </text>
            <rect x="100" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <rect x="200" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <rect x="300" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <rect x="400" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <rect x="500" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <rect x="600" y="100" width="60" height="${Math.random() * 200 + 50}" fill="url(#barGradient)" rx="4"/>
            <text x="130" y="370" text-anchor="middle" fill="#757575" font-size="12">Ene</text>
            <text x="230" y="370" text-anchor="middle" fill="#757575" font-size="12">Feb</text>
            <text x="330" y="370" text-anchor="middle" fill="#757575" font-size="12">Mar</text>
            <text x="430" y="370" text-anchor="middle" fill="#757575" font-size="12">Abr</text>
            <text x="530" y="370" text-anchor="middle" fill="#757575" font-size="12">May</text>
            <text x="630" y="370" text-anchor="middle" fill="#757575" font-size="12">Jun</text>
        `;
    }
}

// ===========================
// Vista Bicicletas
// ===========================

function calcularImpacto() {
    const resultsSection = document.getElementById('results-bicicletas');
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        
        // Scroll suave a los resultados
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Animar las tarjetas de resultados
        const cards = resultsSection.querySelectorAll('.indicator-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease forwards';
            }, index * 100);
        });
    }
}

// ===========================
// Vista Eco-Conducción
// ===========================

function evaluarDesempeno() {
    const uploadPre = document.getElementById('upload-pre');
    const uploadPost = document.getElementById('upload-post');
    
    if (!uploadPre?.classList.contains('active') || !uploadPost?.classList.contains('active')) {
        alert('Por favor cargue los archivos PRE y POST capacitación');
        return;
    }
    
    // Mostrar resultados (ya están visibles en el HTML)
    const resultsContainer = document.getElementById('eco-results');
    if (resultsContainer) {
        // Animar las barras
        const bars = resultsContainer.querySelectorAll('.bar-fill');
        bars.forEach((bar, index) => {
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, index * 200);
        });
    }
    
    // Scroll suave a resultados
    const resultsPanel = document.querySelector('#ecoconductor .panel:last-child');
    if (resultsPanel) {
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===========================
// Análisis Financiero
// ===========================

function calcularTCO() {
    const anosAnalisis = document.getElementById('anos-analisis')?.value || 10;
    const resultsSection = document.getElementById('tco-results');
    
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        
        // Scroll suave a los resultados
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Animar aparición de resultados
        setTimeout(() => {
            resultsSection.style.animation = 'fadeIn 0.5s ease forwards';
        }, 100);
    }
}

function calcularTCOCarga() {
    alert('Cálculo de TCO para vehículos de carga iniciado. Los resultados se mostrarían con datos reales del programa Fom Carga.');
}

// ===========================
// Utilidades
// ===========================

// Prevenir comportamiento por defecto en botones dentro de formularios
document.addEventListener('submit', (e) => {
    e.preventDefault();
});

// Animación de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Log para debugging (remover en producción)
console.log('✅ Plataforma ACCESS cargada correctamente');
console.log('📊 Sistema de navegación inicializado');
console.log('🚌 Módulos activos: Indicadores, Electrificación, Bicicletas, Carga, Eco-Conducción');
