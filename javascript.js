document.addEventListener('DOMContentLoaded', () => {

    // 1. Contador Regresivo para la Cierre de Admisión
    const countdownElement = document.getElementById('countdownTimer');
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 12); // 12 días a partir de hoy

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours < 10 ? '0' : ''}${hours}h ${minutes < 10 ? '0' : ''}${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. Menú Hambuguesa Móvil
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        icon.className = navLinks.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // 3. Contadores Numéricos Animados (Stats)
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        const heroSection = document.querySelector('.hero');
        const sectionPos = heroSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !animated) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        stat.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
            animated = true;
        }
    }
    window.addEventListener('scroll', animateStats);
    animateStats();

    // 4. Tabs de Metodología
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 5. Filtro de Carreras
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. Calculadora de Pensiones / Beca
    const calcCarrera = document.getElementById('calcCarrera');
    const calcPromedio = document.getElementById('calcPromedio');
    const calcColegio = document.getElementById('calcColegio');
    const priceBase = document.getElementById('priceBase');
    const priceFinal = document.getElementById('priceFinal');
    const discountBadge = document.getElementById('discountBadge');

    function calculateFee() {
        let basePrice = 650;
        if (calcCarrera.value === 'ciberseguridad' || calcCarrera.value === 'data') basePrice = 700;

        let discountPercentage = 10; // Base por postulación digital
        const promedio = parseFloat(calcPromedio.value) || 0;

        if (promedio >= 17) discountPercentage += 20;
        else if (promedio >= 14) discountPercentage += 10;

        if (calcColegio.value === 'estatal') discountPercentage += 10;

        const finalPrice = basePrice - (basePrice * (discountPercentage / 100));

        priceBase.textContent = basePrice;
        priceFinal.textContent = Math.round(finalPrice);
        discountBadge.textContent = `¡Descuento Beca del ${discountPercentage}% Aplicado!`;
    }

    [calcCarrera, calcPromedio, calcColegio].forEach(element => {
        element.addEventListener('input', calculateFee);
    });
    calculateFee();

    // 7. Accordion FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(f => f.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 8. Modal Plan de Estudios (Syllabus)
    const modalSyllabus = document.getElementById('modalSyllabus');
    const closeSyllabus = document.getElementById('closeSyllabus');
    const syllabusTitle = document.getElementById('syllabusTitle');
    const syllabusSemesters = document.getElementById('syllabusSemesters');

    const syllabusData = {
        software: {
            title: "Ingeniería de Software e IA",
            semesters: [
                { sem: "Semestre 1", courses: ["Fundamentos de Programación (Python)", "Lógica Matemática", "Sistemas Operativos Linux", "Inglés Tech I"] },
                { sem: "Semestre 2", courses: ["Estructura de Datos & Algoritmos", "Desarrollo Web Frontend (React)", "Bases de Datos Relacionales (SQL)", "Git/GitHub"] },
                { sem: "Semestre 3", courses: ["Backend Architecture (Node.js/Express)", "Bases de Datos NoSQL (MongoDB)", "UX/UI Design", "Metodologías Ágiles (Scrum)"] },
                { sem: "Semestre 4", courses: ["Machine Learning Básico", "Cloud Computing (AWS/Docker)", "Testing & QA Software", "Prácticas Profesionales I"] },
                { sem: "Semestre 5", courses: ["Deep Learning & TensorFlow", "Seguridad en Aplicaciones Web", "Microservicios", "Proyecto Incubadora I"] },
                { sem: "Semestre 6", courses: ["IA Generativa Aplicada", "DevOps & CI/CD", "Proyecto de Titulación", "Prácticas Profesionales II"] }
            ]
        },
        ciberseguridad: {
            title: "Ciberseguridad & Redes Cloud",
            semesters: [
                { sem: "Semestre 1", courses: ["Fundamentos de Redes (CCNA I)", "Linux System Administration", "Hardware & Virtualización", "Inglés Tech I"] },
                { sem: "Semestre 2", courses: ["Routing & Switching (CCNA II)", "Python para Ciberseguridad", "Criptografía y Protocolos", "Sistemas Operativos Windows Server"] },
                { sem: "Semestre 3", courses: ["Ethical Hacking & Pentesting I", "Seguridad en Redes Inalámbricas", "Análisis de Vulnerabilidades", "AWS Cloud Practitioner"] },
                { sem: "Semestre 4", courses: ["Seguridad Defensiva (Blue Teaming)", "Análisis Forense Digital", "Firewalls Enterprises (Fortinet)", "Prácticas I"] },
                { sem: "Semestre 5", courses: ["Ethical Hacking Avanzado (Red Team)", "ISO 27001 & Auditoría Tech", "Seguridad en la Nube", "Proyecto de Titulación I"] },
                { sem: "Semestre 6", courses: ["Gestión de Incidentes (SOC)", "Malware Analysis", "Proyecto de Titulación Final", "Prácticas II"] }
            ]
        },
        administracion: {
            title: "Administración y Negocios Digitales",
            semesters: [
                { sem: "Semestre 1", courses: ["Fundamentos de Administración", "Economía Digital", "Herramientas Ofimáticas Avanzadas", "Marketing Digital I"] },
                { sem: "Semestre 2", courses: ["Contabilidad Financiera", "Gestión de Comercio Electrónico", "Power BI & Analítica Básica", "Gestión de Clientes (CRM)"] },
                { sem: "Semestre 3", courses: ["Metodologías Ágiles (Agile Scrum)", "E-Commerce & Pasarelas de Pago", "Growth Hacking", "Legislación Digital"] },
                { sem: "Semestre 4", courses: ["Fintech & Banca Digital", "Gestión de Cadenas de Suministro Digital", "Evaluación de Proyectos Tech", "Prácticas I"] },
                { sem: "Semestre 5", courses: ["Liderazgo y Equipos Remotos", "Business Intelligence Avanzado", "Estrategia Digital de Negocios", "Proyecto Titulación I"] },
                { sem: "Semestre 6", courses: ["Transformación Digital Empresarial", "Inversión y Venture Capital", "Proyecto de Titulación Final", "Prácticas II"] }
            ]
        },
        data: {
            title: "Big Data & Data Science",
            semesters: [
                { sem: "Semestre 1", courses: ["Estadística y Probabilidad", "Programación para Data Science (Python)", "SQL e Ingesta de Datos", "Inglés Tech I"] },
                { sem: "Semestre 2", courses: ["Análisis Exploratorio de Datos (Pandas)", "Bases de Datos NoSQL", "Power BI & Tableau", "Álgebra Lineal Computacional"] },
                { sem: "Semestre 3", courses: ["Machine Learning Supervisado", "Web Scraping & APIs", "Big Data Architecture (Hadoop/Spark)", "Cloud Data Warehouses"] },
                { sem: "Semestre 4", courses: ["Machine Learning No Supervisado", "Procesamiento de Lenguaje Natural (NLP)", "Data Ops", "Prácticas I"] },
                { sem: "Semestre 5", courses: ["Deep Learning & Computer Vision", "Gobierno y Ética de Datos", "Modelos Predictivos Financieros", "Proyecto Titulación I"] },
                { sem: "Semestre 6", courses: ["Despliegue de Modelos (MLOps)", "AI Ethics", "Proyecto Final de Titulación", "Prácticas II"] }
            ]
        }
    };

    document.querySelectorAll('.view-syllabus').forEach(btn => {
        btn.addEventListener('click', () => {
            const careerKey = btn.getAttribute('data-career');
            const data = syllabusData[careerKey];

            if (data) {
                syllabusTitle.textContent = data.title;
                syllabusSemesters.innerHTML = '';

                data.semesters.forEach(s => {
                    const box = document.createElement('div');
                    box.className = 'semester-box';
                    box.innerHTML = `
                        <h5>${s.sem}</h5>
                        <ul>${s.courses.map(c => `<li><i class="fa-solid fa-angle-right text-neon-cyan"></i> ${c}</li>`).join('')}</ul>
                    `;
                    syllabusSemesters.appendChild(box);
                });

                modalSyllabus.style.display = 'flex';
            }
        });
    });

    closeSyllabus.addEventListener('click', () => modalSyllabus.style.display = 'none');

    // Modal Video Tour
    const openModalVideo = document.getElementById('openModalVideo');
    const modalVideo = document.getElementById('modalVideo');
    const closeVideo = document.getElementById('closeVideo');

    openModalVideo.addEventListener('click', () => modalVideo.style.display = 'flex');
    closeVideo.addEventListener('click', () => modalVideo.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === modalSyllabus) modalSyllabus.style.display = 'none';
        if (e.target === modalVideo) modalVideo.style.display = 'none';
    });

    // 9. Formulario de Admisión e Identificador
    const cyberForm = document.getElementById('cyberForm');
    const cyberAlert = document.getElementById('cyberAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');
    const ticketContainer = document.getElementById('ticketContainer');

    cyberForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const programa = document.getElementById('programa').value;
        const terminos = document.getElementById('terminos').checked;

        if (!nombre || !email || !telefono || !programa) {
            showAlert('Error del Sistema: Por favor complete todos los campos requeridos.', 'danger');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert('Formato Inválido: Ingrese una dirección de correo electrónico válida.', 'danger');
            return;
        }

        if (!terminos) {
            showAlert('Acceso Denegado: Debe aceptar los términos de privacidad.', 'danger');
            return;
        }

        // Éxito: Generar ticket holográfico
        showAlert('¡Solicitud Procesada Con Éxito! Pase holográfico generado.', 'success');

        document.getElementById('ticketName').textContent = nombre;
        document.getElementById('ticketCareer').textContent = document.getElementById('programa').options[document.getElementById('programa').selectedIndex].text;
        document.getElementById('ticketCode').textContent = `KUA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

        ticketContainer.style.display = 'block';
        cyberForm.reset();
    });

    function showAlert(msg, type) {
        cyberAlert.style.display = 'flex';
        alertMessage.textContent = msg;

        if (type === 'danger') {
            cyberAlert.className = 'cyber-alert danger';
            alertIcon.className = 'fa-solid fa-triangle-exclamation';
        } else {
            cyberAlert.className = 'cyber-alert success';
            alertIcon.className = 'fa-solid fa-circle-check';
        }

        setTimeout(() => cyberAlert.style.display = 'none', 4000);
    }

    // 10. Asistente Virtual (Chatbot Flotante)
    const botToggle = document.getElementById('botToggle');
    const botBox = document.getElementById('botBox');
    const botClose = document.getElementById('botClose');
    const botMessages = document.getElementById('botMessages');

    botToggle.addEventListener('click', () => botBox.style.display = botBox.style.display === 'none' ? 'flex' : 'none');
    botClose.addEventListener('click', () => botBox.style.display = 'none');

    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            appendMsg(btn.textContent, 'user-msg');

            setTimeout(() => {
                if (query === 'carreras') {
                    appendMsg("Ofrecemos 4 especialidades: 1. Software e IA, 2. Ciberseguridad, 3. Administración Digital y 4. Big Data. ¿Deseas ver los planes de estudio?", 'bot-msg');
                } else if (query === 'pensiones') {
                    appendMsg("Nuestras pensiones regulares van desde S/ 650. Puedes obtener hasta un 30% de beca usando nuestro simulador en la sección de Calculadora.", 'bot-msg');
                } else if (query === 'admision') {
                    appendMsg("El proceso consta de: 1. Registro web, 2. Evaluación de aptitud lógica online, 3. Entrevista y asignación de vacante.", 'bot-msg');
                }
            }, 600);
        });
    });

    function appendMsg(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${className}`;
        msgDiv.textContent = text;
        botMessages.appendChild(msgDiv);
        botMessages.scrollTop = botMessages.scrollHeight;
    }
});