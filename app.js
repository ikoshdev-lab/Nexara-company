/* ==========================================
   NEXARA GLOBAL INTERACTIVE SCRIPT (app.js)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // -- 0. Multi-language Translation Engine --
    const langSelect = document.getElementById('lang-select');
    let currentLang = localStorage.getItem('lang') || 'uz';
    langSelect.value = currentLang;

    // Apply translations on load
    applyTranslations(currentLang);

    langSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('lang', selectedLang);
        applyTranslations(selectedLang);
        calculateArchitecture();
    });

    function applyTranslations(lang) {
        const dict = translations[lang];
        if (!dict) return;

        const mappings = {
            // Navbar Links
            'nav.nav-menu ul li:nth-child(1) a': 'nav_home',
            'nav.nav-menu ul li:nth-child(2) a': 'nav_ecosystem',
            'nav.nav-menu ul li:nth-child(3) a': 'nav_architect',
            'nav.nav-menu ul li:nth-child(4) a': 'nav_terminal',
            'nav.nav-menu ul li:nth-child(5) a': 'nav_infrastructure',
            'nav.nav-menu ul li:nth-child(6) a': 'nav_leadership',
            'nav.nav-menu ul li:nth-child(7) a': 'nav_careers',
            'nav.nav-menu ul li:nth-child(8) a': 'nav_faq',
            'nav.nav-menu ul li:nth-child(9) a': 'nav_contact',
            '#nav-cta-btn': 'nav_cta',

            // Hero Section
            '#hero-badge': 'hero_badge',
            '#hero-title': 'hero_title',
            '#hero-description': 'hero_desc',
            '#hero-primary-btn': 'hero_btn_products',
            '#hero-secondary-btn': 'hero_btn_create',

            // Ecosystem Section
            '#ecosystem .section-subtitle': 'eco_subtitle',
            '#ecosystem .section-title': 'eco_title',
            '#ecosystem .section-desc': 'eco_desc',
            '.ecosystem-card[data-product="connect"] h3': 'eco_prod1_title',
            '.ecosystem-card[data-product="connect"] p': 'eco_prod1_desc',
            '.ecosystem-card[data-product="devgrid"] h3': 'eco_prod2_title',
            '.ecosystem-card[data-product="devgrid"] p': 'eco_prod2_desc',
            '.ecosystem-card[data-product="aetheros"] h3': 'eco_prod3_title',
            '.ecosystem-card[data-product="aetheros"] p': 'eco_prod3_desc',
            '.ecosystem-card[data-product="quantumcore"] h3': 'eco_prod4_title',
            '.ecosystem-card[data-product="quantumcore"] p': 'eco_prod4_desc',

            // Calculator Section
            '#architect .section-subtitle': 'calc_subtitle',
            '#architect .section-title': 'calc_title',
            '#architect .section-desc': 'calc_desc',
            '.architect-panel .form-group:nth-of-type(1) label': 'calc_lbl_type',
            '#project-type option[value="social"]': 'calc_opt_social',
            '#project-type option[value="messenger"]': 'calc_opt_messenger',
            '#project-type option[value="saas"]': 'calc_opt_saas',
            '#project-type option[value="ai"]': 'calc_opt_ai',
            '.architect-panel .form-group:nth-of-type(2) label:first-of-type': 'calc_lbl_scale',
            '.btn-scale[data-scale="local"] .scale-title': 'calc_btn_local',
            '.btn-scale[data-scale="local"] .scale-desc': 'calc_desc_local',
            '.btn-scale[data-scale="national"] .scale-title': 'calc_btn_national',
            '.btn-scale[data-scale="national"] .scale-desc': 'calc_desc_national',
            '.btn-scale[data-scale="global"] .scale-title': 'calc_btn_global',
            '.btn-scale[data-scale="global"] .scale-desc': 'calc_desc_global',
            '.architect-panel .form-group:nth-of-type(3) label:not(.switch)': 'calc_lbl_sec',
            '.architect-panel .toggle-label': 'calc_lbl_sec_desc',
            '.architect-panel .form-group:nth-of-type(4) label': 'calc_lbl_tech',
            '.checkbox-grid .checkbox-container:nth-of-type(1)': 'calc_chk_ai',
            '.checkbox-grid .checkbox-container:nth-of-type(2)': 'calc_chk_db',
            '.checkbox-grid .checkbox-container:nth-of-type(3)': 'calc_chk_cdn',
            '.checkbox-grid .checkbox-container:nth-of-type(4)': 'calc_chk_blockchain',
            '.calc-results-title': 'calc_res_title',
            '.calc-item:nth-child(1) .calc-label': 'calc_res_cost',
            '.calc-item:nth-child(2) .calc-label': 'calc_res_time',
            '.calc-item:nth-child(3) .calc-label': 'calc_res_infra',
            '#download-config-btn': 'calc_res_btn',
            '.cost-breakdown-wrapper h4': 'calc_bd_title',
            '#breakdown-dev-type': 'calc_bd_base',
            '#breakdown-scale-type': 'calc_bd_scale',
            '#breakdown-addons-type': 'calc_bd_addons',
            '.breakdown-row.total .breakdown-label': 'calc_bd_total',

            // CLI Section
            '#terminal .section-subtitle': 'cli_subtitle',
            '#terminal .section-title': 'cli_title',
            '#terminal .section-desc': 'cli_desc',

            // Infrastructure Section
            '#infrastructure .section-subtitle': 'infra_subtitle',
            '#infrastructure .section-title': 'infra_title',
            '#infrastructure .section-desc': 'infra_desc',
            '#hub-sv h4': 'infra_sv_title',
            '#hub-sv p': 'infra_sv_desc',
            '#hub-frankfurt h4': 'infra_frank_title',
            '#hub-frankfurt p': 'infra_frank_desc',
            '#hub-tashkent h4': 'infra_tash_title',
            '#hub-tashkent p': 'infra_tash_desc',
            '#hub-tokyo h4': 'infra_tokyo_title',
            '#hub-tokyo p': 'infra_tokyo_desc',

            // Testimonials Section
            '#testimonials .section-subtitle': 'test_subtitle',
            '#testimonials .section-title': 'test_title',
            '#testimonials .section-desc': 'test_desc',

            // Leadership Section
            '#leadership .section-subtitle': 'leader_subtitle',
            '#leadership .section-title': 'leader_title',
            '#leadership .section-desc': 'leader_desc',
            '.leadership-info h3': 'leader_name',
            '.role-badge': 'leader_role',
            '.leadership-bio': 'leader_bio',
            '.leadership-actions a.btn-primary': 'leader_btn_portfolio',
            '.leadership-actions a.btn-outline': 'leader_btn_contact',

            // Careers Section
            '#careers .section-subtitle': 'careers_subtitle',
            '#careers .section-title': 'careers_title',
            '#careers .section-desc': 'careers_desc',
            '.job-item[data-job="frontend"] h3': 'careers_job1_title',
            '.job-item[data-job="frontend"] p': 'careers_job1_desc',
            '.job-item[data-job="backend"] h3': 'careers_job2_title',
            '.job-item[data-job="backend"] p': 'careers_job2_desc',
            '.job-item[data-job="ai"] h3': 'careers_job3_title',
            '.job-item[data-job="ai"] p': 'careers_job3_desc',
            '.job-more-btn': 'careers_btn_reqs',
            '#job-apply-panel h3': 'careers_form_title',
            '.job-selected-label': 'careers_form_lbl_job',
            'label[for="candidate-name"]': 'careers_form_lbl_name',
            'label[for="candidate-email"]': 'careers_form_lbl_email',
            'label[for="candidate-cv"]': 'careers_form_lbl_cv',
            'label[for="candidate-cover"]': 'careers_form_lbl_cover',
            '#apply-form button[type="submit"]': 'careers_form_btn',
            '#apply-success h4': 'careers_form_success',
            '#apply-success p': 'careers_form_success_desc',

            // FAQ Section
            '#faq .section-subtitle': 'faq_subtitle',
            '#faq .section-title': 'faq_title',
            '#faq .section-desc': 'faq_desc',
            '#faq-search': 'faq_search_placeholder',

            // Contact Section
            '#contact .section-subtitle': 'contact_subtitle',
            '#contact .section-title': 'contact_title',
            '#contact .section-desc': 'contact_desc',
            '#contact .contact-info .info-card:nth-child(1) h4': 'contact_hq',
            '#contact .contact-info .info-card:nth-child(2) h4': 'contact_tash',
            '#contact .contact-info .info-card:nth-child(3) h4': 'contact_email',
            '#contact .contact-info .info-card:nth-child(4) h4': 'contact_phone',
            '.contact-form-container h3': 'contact_form_title',
            'label[for="contact-name"]': 'contact_form_lbl_name',
            'label[for="contact-company"]': 'contact_form_lbl_comp',
            'label[for="contact-email"]': 'contact_form_lbl_email',
            'label[for="contact-subject"]': 'contact_form_lbl_sub',
            'label[for="contact-msg"]': 'contact_form_lbl_msg',
            '#contact-form button[type="submit"]': 'contact_form_btn',
            '#contact-success h4': 'contact_form_success',
            '#contact-success p': 'contact_form_success_desc',

            // Footer Section
            '.footer-brand p': 'footer_desc',
            '.footer-links-col:nth-child(1) h4': 'footer_col1',
            '.footer-links-col:nth-child(2) h4': 'footer_col2',
            '.footer-links-col:nth-child(3) h4': 'footer_col3',
            '.footer-links-col:nth-child(1) ul li:nth-child(1) a': 'footer_p1',
            '.footer-links-col:nth-child(1) ul li:nth-child(2) a': 'footer_p2',
            '.footer-links-col:nth-child(1) ul li:nth-child(3) a': 'footer_p3',
            '.footer-links-col:nth-child(1) ul li:nth-child(4) a': 'footer_p4',
            '.footer-links-col:nth-child(2) ul li:nth-child(1) a': 'footer_c1',
            '.footer-links-col:nth-child(2) ul li:nth-child(2) a': 'footer_c2',
            '.footer-links-col:nth-child(2) ul li:nth-child(3) a': 'footer_c3',
            '.footer-links-col:nth-child(2) ul li:nth-child(4) a': 'footer_c4',
            '.footer-links-col:nth-child(3) ul li:nth-child(1) a': 'footer_s1',
            '.footer-links-col:nth-child(3) ul li:nth-child(2) a': 'footer_s2',
            '.footer-links-col:nth-child(3) ul li:nth-child(3) a': 'footer_s3',
            '.footer-links-col:nth-child(3) ul li:nth-child(4) a': 'footer_s4',
            '.footer-bottom-container p': 'footer_copy',
            '.footer-meta-links a:nth-child(1)': 'footer_privacy',
            '.footer-meta-links a:nth-child(2)': 'footer_terms'
        };

        for (const [selector, translationKey] of Object.entries(mappings)) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                const text = dict[translationKey];
                if (text) {
                    if (text.includes('<') && text.includes('>')) {
                        el.innerHTML = text;
                    } else {
                        if (el.tagName === 'INPUT' && el.getAttribute('placeholder') !== null) {
                            el.setAttribute('placeholder', text);
                        } else if (el.classList.contains('checkbox-container')) {
                            const textNode = Array.from(el.childNodes).find(node => node.nodeType === 3 && node.textContent.trim() !== "");
                            if (textNode) {
                                textNode.textContent = " " + text;
                            }
                        } else if (el.classList.contains('job-selected-label')) {
                            el.innerHTML = text + ' <strong>' + document.getElementById('selected-job-input').value + '</strong>';
                        } else {
                            el.textContent = text;
                        }
                    }
                }
            });
        }
    }

    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyEl = document.body;
    
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    bodyEl.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        if (bodyEl.classList.contains('dark-theme')) {
            bodyEl.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            bodyEl.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'light-theme') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('mobile-open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // 3. Active Nav Link on Scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // 4. Project Architect Calculator & Real-Time Cost Breakdown
    const projectTypeSelect = document.getElementById('project-type');
    const scaleButtons = document.querySelectorAll('.btn-scale');
    const quantumSecToggle = document.getElementById('quantum-security');
    const techAiCheck = document.getElementById('tech-ai');
    const techDbCheck = document.getElementById('tech-db');
    const techCdnCheck = document.getElementById('tech-cdn');
    const techBlockchainCheck = document.getElementById('tech-blockchain');
    
    const costValueEl = document.getElementById('project-cost');
    const timeValueEl = document.getElementById('project-time');
    const infraValueEl = document.getElementById('project-infra');
    const canvasEl = document.getElementById('architecture-canvas');

    // Cost Breakdown Elements
    const bdDevType = document.getElementById('breakdown-dev-type');
    const bdDevCost = document.getElementById('breakdown-dev-cost');
    const bdScaleType = document.getElementById('breakdown-scale-type');
    const bdScaleCost = document.getElementById('breakdown-scale-cost');
    const bdAddonsType = document.getElementById('breakdown-addons-type');
    const bdAddonsCost = document.getElementById('breakdown-addons-cost');
    const bdTotalCost = document.getElementById('breakdown-total-cost');

    let selectedScale = 'local'; // Default scale

    // Scale buttons selector click
    scaleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scaleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedScale = btn.getAttribute('data-scale');
            calculateArchitecture();
        });
    });

    // Inputs listeners
    projectTypeSelect.addEventListener('change', calculateArchitecture);
    quantumSecToggle.addEventListener('change', calculateArchitecture);
    techAiCheck.addEventListener('change', calculateArchitecture);
    techDbCheck.addEventListener('change', calculateArchitecture);
    techCdnCheck.addEventListener('change', calculateArchitecture);
    techBlockchainCheck.addEventListener('change', calculateArchitecture);

    // Initial calculation
    calculateArchitecture();

    function formatUSD(num) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    }

    function calculateArchitecture() {
        const type = projectTypeSelect.value;
        const isQuantumSec = quantumSecToggle.checked;
        const isAi = techAiCheck.checked;
        const isDb = techDbCheck.checked;
        const isCdn = techCdnCheck.checked;
        const isBlockchain = techBlockchainCheck.checked;

        // Base config values
        let baseCost = 0;
        let baseMonths = 0;
        let typeName = "";

        const lang = localStorage.getItem('lang') || 'uz';
        
        let monthSuffix = "oy";
        let noneText = "Tanlanmagan";
        if (lang === 'en') {
            monthSuffix = "months";
            noneText = "None";
        } else if (lang === 'ru') {
            monthSuffix = "мес.";
            noneText = "Не выбрано";
        }

        switch (type) {
            case 'social':
                baseCost = 120000;
                baseMonths = 4;
                typeName = lang === 'uz' ? "Super Ijtimoiy Tarmoq (Core)" : (lang === 'ru' ? "Супер Соцсеть (Core)" : "Super Social Network (Core)");
                break;
            case 'messenger':
                baseCost = 90000;
                baseMonths = 3;
                typeName = lang === 'uz' ? "Kvant Messenjer (Core)" : (lang === 'ru' ? "Квантовый Мессенджер (Core)" : "Quantum Messenger (Core)");
                break;
            case 'saas':
                baseCost = 150000;
                baseMonths = 5;
                typeName = lang === 'uz' ? "Enterprise Bulutli SaaS (Core)" : (lang === 'ru' ? "Корпоративное Облако SaaS (Core)" : "Enterprise Cloud SaaS (Core)");
                break;
            case 'ai':
                baseCost = 200000;
                baseMonths = 6;
                typeName = lang === 'uz' ? "Neyron Tarmoq AI Yadrosi (Core)" : (lang === 'ru' ? "Нейросетевой Движок ИИ (Core)" : "Neural Core AI Engine (Core)");
                break;
        }

        // Scale multiplier
        let scaleMultiplier = 1;
        let scaleTimeAdd = 0;
        let infraText = "";
        let scaleName = "";
        let scaleCostAdd = 0;

        switch (selectedScale) {
            case 'local':
                scaleMultiplier = 1.0;
                scaleTimeAdd = 0;
                infraText = lang === 'uz' ? "Yagona hududiy bulutli stek" : (lang === 'ru' ? "Однорегиональный облачный стек" : "Single Region Cloud Stack");
                scaleName = lang === 'uz' ? "Mahalliy (Local Server Setup)" : (lang === 'ru' ? "Локальный Сервер" : "Local Server Setup");
                scaleCostAdd = 0;
                break;
            case 'national':
                scaleMultiplier = 1.0;
                scaleCostAdd = baseCost * 1.2;
                scaleTimeAdd = 1.5;
                infraText = lang === 'uz' ? "Ko'p hududli taqsimlangan tugunlar" : (lang === 'ru' ? "Мультирегиональные распределенные узлы" : "Multi-Region Distributed Nodes");
                scaleName = lang === 'uz' ? "Milliy (Multi-Region Setup)" : (lang === 'ru' ? "Национальный (Мульти-региональный)" : "National (Multi-Region Setup)");
                break;
            case 'global':
                scaleMultiplier = 1.0;
                scaleCostAdd = baseCost * 3.5;
                scaleTimeAdd = 3;
                infraText = lang === 'uz' ? "Global chekka tarmoqli (Edge Mesh) arxitektura" : (lang === 'ru' ? "Глобальная распределенная Edge Mesh архитектура" : "Edge Mesh Global Architecture");
                scaleName = lang === 'uz' ? "Global (Multi-Cloud Edge)" : (lang === 'ru' ? "Глобальный (Мульти-облачный Edge)" : "Global (Multi-Cloud Edge)");
                break;
        }

        // Calculations
        let finalCost = baseCost + scaleCostAdd;
        let finalMonths = baseMonths + scaleTimeAdd;

        // Addons Cost calculation
        let addonsCost = 0;
        let addonsList = [];

        if (isQuantumSec) {
            addonsCost += 40000;
            finalMonths += 1.0;
            addonsList.push(lang === 'uz' ? "Kvant xavfsizlik" : (lang === 'ru' ? "Квантовая защита" : "Quantum Security"));
        }
        if (isAi) {
            addonsCost += 30000;
            finalMonths += 0.5;
            addonsList.push(lang === 'uz' ? "AI Tavsiya" : (lang === 'ru' ? "Рекомендация ИИ" : "AI Recommendation"));
        }
        if (isDb) {
            addonsCost += 20000;
            addonsList.push(lang === 'uz' ? "Kvant DB" : (lang === 'ru' ? "Квантовая БД" : "Quantum DB"));
        }
        if (isCdn) {
            addonsCost += 15000;
            finalMonths += 0.5;
            addonsList.push(lang === 'uz' ? "Global CDN" : (lang === 'ru' ? "Глобальный CDN" : "Global CDN"));
        }
        if (isBlockchain) {
            addonsCost += 35000;
            finalMonths += 1.0;
            addonsList.push(lang === 'uz' ? "Blokcheyn Log" : (lang === 'ru' ? "Блокчейн Лог" : "Blockchain Log"));
        }

        finalCost += addonsCost;

        // Formatting Outputs
        costValueEl.textContent = formatUSD(finalCost);
        timeValueEl.textContent = `${Math.ceil(finalMonths)} ${monthSuffix}`;
        infraValueEl.textContent = infraText;

        // Update Breakdown Table
        bdDevType.textContent = typeName;
        bdDevCost.textContent = formatUSD(baseCost);
        bdScaleType.textContent = scaleName;
        bdScaleCost.textContent = formatUSD(scaleCostAdd);
        bdAddonsType.textContent = addonsList.length > 0 ? addonsList.join(", ") : noneText;
        bdAddonsCost.textContent = formatUSD(addonsCost);
        bdTotalCost.textContent = formatUSD(finalCost);

        // Redraw Simulated Diagram
        updateCanvasVisuals(type, selectedScale, isQuantumSec, isAi, isDb, isCdn, isBlockchain);
    }

    function updateCanvasVisuals(type, scale, qSec, ai, db, cdn, blockchain) {
        canvasEl.innerHTML = ''; // Clear canvas

        const lang = localStorage.getItem('lang') || 'uz';
        const labelsMap = {
            uz: {
                user: "Foydalanuvchi",
                lb: "Load Balancer",
                cdn: "Global Edge CDN",
                cluster: "Cluster Node",
                db: "Kvant DB",
                ai: "AI Tizimi",
                blockchain: "Blokcheyn Log",
                shield: "Kvant Qalqon",
                dc: "Data Center"
            },
            en: {
                user: "User",
                lb: "Load Balancer",
                cdn: "Global Edge CDN",
                cluster: "Cluster Node",
                db: "Quantum DB",
                ai: "AI Engine",
                blockchain: "Blockchain Log",
                shield: "Quantum Shield",
                dc: "Data Center"
            },
            ru: {
                user: "Пользователь",
                lb: "Балансировщик",
                cdn: "Глобальный CDN",
                cluster: "Узел кластера",
                db: "Квантовая БД",
                ai: "Движок ИИ",
                blockchain: "Блокчейн Лог",
                shield: "Квантовый Щит",
                dc: "Дата-центр"
            }
        };

        const labels = labelsMap[lang] || labelsMap.uz;

        // 1. User Node
        const userNode = document.createElement('div');
        userNode.className = 'server-node user-node active';
        userNode.innerHTML = `<i class="fa-solid fa-users"></i><span>${labels.user}</span>`;
        canvasEl.appendChild(userNode);

        // Connector line 1
        const line1 = document.createElement('div');
        line1.className = 'connector-line pulse-blue';
        canvasEl.appendChild(line1);

        // 2. Gateway/LB Node
        const lbNode = document.createElement('div');
        lbNode.className = 'server-node lb-node active';
        lbNode.innerHTML = `<i class="fa-solid fa-network-wired"></i><span>${cdn ? labels.cdn : labels.lb}</span>`;
        canvasEl.appendChild(lbNode);

        // Connector line 2
        const line2 = document.createElement('div');
        line2.className = 'connector-line pulse-purple';
        canvasEl.appendChild(line2);

        // 3. Application Servers Grid
        const gridNode = document.createElement('div');
        gridNode.className = 'server-nodes-grid';

        let serverCount = 1;
        if (scale === 'national') serverCount = 2;
        if (scale === 'global') serverCount = 3;

        for (let i = 1; i <= serverCount; i++) {
            const appNode = document.createElement('div');
            appNode.className = 'server-node app-node active';
            appNode.innerHTML = `<i class="fa-solid fa-gears"></i><span>${labels.cluster} ${i}</span>`;
            gridNode.appendChild(appNode);
        }
        canvasEl.appendChild(gridNode);

        // Connector line 3
        const line3 = document.createElement('div');
        line3.className = 'connector-line pulse-green';
        canvasEl.appendChild(line3);

        // 4. Data / Specialized Node Grid (DB, AI, Blockchain, Security)
        const dataGrid = document.createElement('div');
        dataGrid.className = 'server-nodes-grid';

        // Add DB Node
        if (db) {
            const dbNode = document.createElement('div');
            dbNode.className = 'server-node db-node active';
            dbNode.innerHTML = `<i class="fa-solid fa-database"></i><span>${labels.db}</span>`;
            dataGrid.appendChild(dbNode);
        }

        // Add AI Node
        if (ai) {
            const aiNode = document.createElement('div');
            aiNode.className = 'server-node db-node active';
            aiNode.style.borderColor = 'var(--accent-purple)';
            aiNode.innerHTML = `<i class="fa-solid fa-brain"></i><span>${labels.ai}</span>`;
            dataGrid.appendChild(aiNode);
        }

        // Add Security or Blockchain Nodes
        if (qSec || blockchain) {
            const secNode = document.createElement('div');
            secNode.className = 'server-node db-node active';
            secNode.style.borderColor = 'var(--accent-gold)';
            secNode.innerHTML = blockchain 
                ? `<i class="fa-solid fa-link"></i><span>${labels.blockchain}</span>`
                : `<i class="fa-solid fa-shield-halved"></i><span>${labels.shield}</span>`;
            dataGrid.appendChild(secNode);
        }

        // If no additional nodes are added, append a basic DB node anyway
        if (dataGrid.children.length === 0) {
            const baseDbNode = document.createElement('div');
            baseDbNode.className = 'server-node db-node active';
            baseDbNode.innerHTML = `<i class="fa-solid fa-database"></i><span>${labels.dc}</span>`;
            dataGrid.appendChild(baseDbNode);
        }

        canvasEl.appendChild(dataGrid);
    }

    // JSON Proposal Downloader Logic
    const downloadBtn = document.getElementById('download-config-btn');
    downloadBtn.addEventListener('click', () => {
        const type = projectTypeSelect.value;
        const isQuantumSec = quantumSecToggle.checked;
        const isAi = techAiCheck.checked;
        const isDb = techDbCheck.checked;
        const isCdn = techCdnCheck.checked;
        const isBlockchain = techBlockchainCheck.checked;
        
        const configData = {
            company: "Nexara Global Technologies",
            proposalName: "Tizim Arxitekturasi va Dasturiy Yechimlar Taklifi",
            timestamp: new Date().toISOString(),
            projectSetup: {
                projectType: type,
                projectScale: selectedScale,
                modules: {
                    quantumSecurity: isQuantumSec,
                    aiRecommendation: isAi,
                    quantumDatabase: isDb,
                    globalCdn: isCdn,
                    blockchainLogging: isBlockchain
                }
            },
            financialBreakdown: {
                developmentCostUSD: bdDevCost.textContent,
                infrastructureCostUSD: bdScaleCost.textContent,
                addonsCostUSD: bdAddonsCost.textContent,
                totalEstimatedCostUSD: bdTotalCost.textContent
            },
            timeframe: timeValueEl.textContent
        };

        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(configData, null, 4))}`;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute("download", `nexara-architecture-proposal-${type}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    });

    // Order CTA Click Handler
    const orderBtn = document.getElementById('order-project-btn');
    orderBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Populate contact subject automatically
        const typeText = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;
        const msgField = document.getElementById('contact-msg');
        const subjectField = document.getElementById('contact-subject');
        
        subjectField.value = `Nexara ${typeText} Buyurtmasi`;
        msgField.value = `Salom Nexara! Biz ${typeText} loyihasini ${selectedScale} miqyosda ishga tushirmoqchimiz. Narxi va infratuzilmasini muhokama qilish uchun aloqaga chiqishingizni kutamiz.`;
    });

    // 5. Interactive Ecosystem Product Detail Modals
    const productModal = document.getElementById('product-modal');
    const productModalBody = document.getElementById('product-modal-body');
    const productModalClose = document.getElementById('product-modal-close');
    const ecoCards = document.querySelectorAll('.clickable-card');

    const productDetailsData = {
        connect: {
            title: "Nexara Connect",
            icon: "fa-comments",
            colorClass: "text-glow-blue",
            desc: "Instagram, Telegram va Twitter kuchini birlashtirgan, ultra-xavfsiz, kriptografik shifrlashga ega va AI yordamchilar o'rnatilgan global super-muloqot platformasi.",
            features: [
                "End-to-End shifrlash va Kvant xavfsiz kanallar",
                "Yuqori tezlikda multimedia uzatish (10GB gacha fayllar)",
                "O'rnatilgan neyron tarmoq tarjimonlari va AI yordamchilar",
                "Video va ovozli aloqa uchun ultra-past kechikish (WebRTC kross-global)"
            ],
            caseStudy: "Mijozimiz bo'lgan yirik global tashkilot 24 soat ichida 5 million foydalanuvchini ushbu platformaga muvaffaqiyatli ko'chirdi va ma'lumotlar xavfsizligini 100% ta'minladi."
        },
        devgrid: {
            title: "DevGrid Platform",
            icon: "fa-terminal",
            colorClass: "text-glow-purple",
            desc: "GitHub va Jira tizimlarini ortda qoldiruvchi, butun dunyo dasturchilari uchun bir vaqtning o'zida birgalikda kod yozish va avtomatik deploy qilish tizimi.",
            features: [
                "Real vaqtda kross-brauzer orqali kod hamkorligi",
                "Neyron tarmoq asosidagi kod yordamchisi (Nexara Copilot)",
                "Millisekundlik global CI/CD pipelines",
                "Integratsiyalashgan bulutli muharrir va debugger"
            ],
            caseStudy: "Tesla va SpaceX muhandislari DevGrid yordamida o'zlarining avtomatlashtirilgan deploy tizimlarini 3 barobar tezlashtirishga erishdilar."
        },
        aetheros: {
            title: "AetherOS",
            icon: "fa-server",
            colorClass: "text-glow-green",
            desc: "Kelajakning operatsion tizimi. Windows va macOS kabi tizimlardan farqli o'laroq, u to'liq neyron tarmoqlar yordamida ishlaydi va qurilmalarni aql bovar qilmas darajada tezlashtiradi.",
            features: [
                "To'liq virtualizatsiya va bulutli Desktop interfeysi",
                "Ovoz va neyron-sensor boshqaruvi",
                "Nol tizim yuklamasi va super-operatsiyalar tezligi",
                "Kvant darajasidagi shaxsiy fayllar shifrlanishi"
            ],
            caseStudy: "Yevropaning yirik banki o'z ish stantsiyalarini AetherOS bulutli tizimiga o'tkazgach, yillik litsenziya xarajatlarini 60% ga kamaytirdi."
        },
        quantumcore: {
            title: "QuantumCore AI",
            icon: "fa-microchip",
            colorClass: "text-glow-gold",
            desc: "Biznesingiz uchun kvant kompyuterlar quvvati. Katta ma'lumotlar, moliya va logistik hisob-kitoblarni an'anaviy serverlarga qaraganda 10,000 marta tezroq hal qiladi.",
            features: [
                "Bulutli Kvant Superkompyuterlariga API ulanish",
                "Sun'iy intellekt modellarini 10 barobar tezroq o'qitish",
                "Moliyaviy risklarni baholash va bashoratlash moduli",
                "Taqsimlangan tranzaksiyalarning cheksiz masshtablanuvchanligi"
            ],
            caseStudy: "NASA logistika jamoasi QuantumCore yordamida koinot missiyalari trayektoriyasini hisoblash vaqtini 10 kundan 3 daqiqaga qisqartirdi."
        }
    };

    ecoCards.forEach(card => {
        card.addEventListener('click', () => {
            const prodKey = card.getAttribute('data-product');
            const data = productDetailsData[prodKey];
            if (!data) return;

            productModalBody.innerHTML = `
                <div class="modal-title-wrapper">
                    <div class="card-icon ${data.colorClass.replace('text-', '')}" style="width: 50px; height: 50px; margin-bottom: 0; font-size: 1.3rem;">
                        <i class="fa-solid ${data.icon}"></i>
                    </div>
                    <h2>${data.title}</h2>
                </div>
                <p class="modal-desc">${data.desc}</p>
                <h3 class="modal-section-title">Texnologik Xususiyatlari</h3>
                <ul class="modal-list">
                    ${data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join("")}
                </ul>
                <h3 class="modal-section-title">Muvaffaqiyatli Keys (Case Study)</h3>
                <p class="modal-desc" style="font-style: italic;">"${data.caseStudy}"</p>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="document.getElementById('product-modal').classList.remove('active')">Yopish</button>
                    <a href="#contact" class="btn btn-primary" onclick="document.getElementById('product-modal').classList.remove('active')">Sotib Olish / Hamkorlik</a>
                </div>
            `;
            productModal.classList.add('active');
        });
    });

    productModalClose.addEventListener('click', () => productModal.classList.remove('active'));
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
    });

    // 6. Interactive Job Description Modals
    const jobModal = document.getElementById('job-modal');
    const jobModalBody = document.getElementById('job-modal-body');
    const jobModalClose = document.getElementById('job-modal-close');
    const jobMoreButtons = document.querySelectorAll('.job-more-btn');

    const jobDetailsData = {
        frontend: {
            title: "Lead Frontend Architect (React/Vue/Vanilla)",
            salary: "$8,000 - $12,000",
            tag: "Frontend",
            reqs: [
                "Advanced JavaScript (ES6+), HTML5 va modern CSS/SCSS bilimlar",
                "React/Next.js yoki Vue.js tizimlarida 5+ yillik arxitektura tajribasi",
                "Web3, Canvas, SVG yoki WebGL animatsiyalar bilan ishlash malakasi",
                "SEO, Performance Optimization va millisekundlik sahifa yuklanishini ta'minlay olish"
            ],
            benefits: [
                "Moslashuvchan (remote) ish tartibi va eng zamonaviy texnik jihozlar",
                "Yillik $5,000 miqdorida professional rivojlanish byudjeti",
                "Kompaniya aksiyalari (Stock Options) paketi",
                "AQSh va Yevropadagi HQ ofislariga yillik sayohatlar"
            ]
        },
        backend: {
            title: "Senior Distributed Systems Engineer (Rust/Go)",
            salary: "$10,000 - $15,000",
            tag: "Backend",
            reqs: [
                "Rust, Go, yoki C++ tillarida yuqori yuklamali tizimlar yaratish tajribasi (6+ yil)",
                "Taqsimlangan ma'lumotlar bazalari va Kubernetes infratuzilmalari bilan ishlash",
                "Kvant shifrlash kutubxonalari va yuqori xavfsizlik arxitekturasi bilimlar",
                "gRPC, WebSockets va past kechikishli API kanallarini optimallashtirish"
            ],
            benefits: [
                "To'liq tibbiy sug'urta va cheksiz pullik ta'tillar (PTO)",
                "Dunyo miqyosidagi muhandislar jamoasi bilan tajriba almashish",
                "Nexara Kvant Laboratoriyasidan bepul foydalanish huquqi",
                "Yillik bonuslar va ishlash ko'rsatkichlariga ko'ra qo'shimcha oyliklar"
            ]
        },
        ai: {
            title: "Principal LLM & Neural Networks Researcher",
            salary: "$12,000 - $18,000",
            tag: "AI / ML",
            reqs: [
                "AI/ML, Matematika yoki Kompyuter fanlari bo'yicha PhD yoki Master darajasi",
                "Katta til modellari (LLMs) va transformerlarni noldan o'qitish tajribasi",
                "PyTorch, TensorFlow, CUDA va GPU cluster'larini boshqarish malakasi",
                "Neyron tarmoqlarning resurs iste'molini 10 barobargacha optimallashtirish bilimlar"
            ],
            benefits: [
                "Eng yirik GPU klasterlariga (Nvidia H100) to'g'ridan-to'g'ri kirish va cheksiz hisoblash resursi",
                "AQSh, Yaponiya va Germaniyada yashash va ishlash vizasini qo'llab-quvvatlash",
                "Xalqaro AI konferensiyalarida (NeurIPS, ICML) to'liq moliyalashtiriladigan ishtirok",
                "Keng qamrovli oylik bonus tizimi va global yordamlar"
            ]
        }
    };

    jobMoreButtons.forEach((btn, idx) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents triggering card active select
            const jobItem = btn.closest('.job-item');
            const jobKey = jobItem.getAttribute('data-job');
            const data = jobDetailsData[jobKey];
            if (!data) return;

            jobModalBody.innerHTML = `
                <div class="modal-title-wrapper" style="margin-bottom: 1rem;">
                    <h2>${data.title}</h2>
                </div>
                <div class="job-meta" style="margin-bottom: 1.5rem;">
                    <span class="job-tag">${data.tag}</span>
                    <span class="job-salary" style="font-size: 1.2rem;">${data.salary}</span>
                </div>
                <h3 class="modal-section-title">Lavozimga bo'lgan talablar</h3>
                <ul class="modal-list">
                    ${data.reqs.map(r => `<li><i class="fa-solid fa-circle-notch"></i> ${r}</li>`).join("")}
                </ul>
                <h3 class="modal-section-title">Nexara Imtiyozlari (Benefits)</h3>
                <ul class="modal-list">
                    ${data.benefits.map(b => `<li><i class="fa-solid fa-gift"></i> ${b}</li>`).join("")}
                </ul>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="document.getElementById('job-modal').classList.remove('active')">Yopish</button>
                    <button class="btn btn-primary" onclick="
                        document.getElementById('job-modal').classList.remove('active');
                        document.getElementById('job-apply-panel').scrollIntoView({ behavior: 'smooth' });
                    ">Hozir Topshirish</button>
                </div>
            `;
            jobModal.classList.add('active');
        });
    });

    jobModalClose.addEventListener('click', () => jobModal.classList.remove('active'));
    jobModal.addEventListener('click', (e) => {
        if (e.target === jobModal) jobModal.classList.remove('active');
    });

    // 7. Searchable FAQ Accordion and search filter
    const faqSearchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');

    // Accordion Toggle
    faqItems.forEach(item => {
        const questionHeader = item.querySelector('.faq-question');
        questionHeader.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Filter FAQ list by search input value
    faqSearchInput.addEventListener('input', () => {
        const query = faqSearchInput.value.toLowerCase().trim();
        
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();
            const keywords = item.getAttribute('data-question') || '';

            if (questionText.includes(query) || answerText.includes(query) || keywords.includes(query)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // 8. Testimonials Carousel Slider Logic
    const testCarousel = document.getElementById('testimonials-carousel');
    const testSlides = document.querySelectorAll('.testimonial-slide');
    const testDots = document.querySelectorAll('.carousel-dot');
    const prevTestBtn = document.getElementById('prev-test-btn');
    const nextTestBtn = document.getElementById('next-test-btn');

    let currentSlideIdx = 0;
    let autoPlayTimer;

    function showSlide(index) {
        if (index < 0) index = testSlides.length - 1;
        if (index >= testSlides.length) index = 0;

        currentSlideIdx = index;

        testSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            testDots[i].classList.remove('active');
            if (i === currentSlideIdx) {
                slide.classList.add('active');
                testDots[i].classList.add('active');
            }
        });
    }

    prevTestBtn.addEventListener('click', () => {
        resetAutoplay();
        showSlide(currentSlideIdx - 1);
    });

    nextTestBtn.addEventListener('click', () => {
        resetAutoplay();
        showSlide(currentSlideIdx + 1);
    });

    testDots.forEach(dot => {
        dot.addEventListener('click', () => {
            resetAutoplay();
            const idx = parseInt(dot.getAttribute('data-index'));
            showSlide(idx);
        });
    });

    function startAutoplay() {
        autoPlayTimer = setInterval(() => {
            showSlide(currentSlideIdx + 1);
        }, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoPlayTimer);
        startAutoplay();
    }

    // Start testimonials autoplay
    startAutoplay();

    // 9. Interactive Developer CLI Terminal Logic
    const cliBody = document.getElementById('cli-body');
    const cliInput = document.getElementById('cli-input');

    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = cliInput.value;
            cliInput.value = '';
            
            // Print user command line
            printCliLine(`nexara-cli$ ${inputVal}`, 'user-line', false);
            
            // Process command
            processCliCommand(inputVal.trim().toLowerCase());
        }
    });

    function printCliLine(text, cssClass = 'output-line', isHtml = false) {
        const line = document.createElement('div');
        line.className = `cli-line ${cssClass}`;
        if (isHtml) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        cliBody.appendChild(line);
        cliBody.scrollTop = cliBody.scrollHeight; // Auto scroll to bottom
    }

    async function processCliCommand(commandStr) {
        if (commandStr === '') return;

        const tokens = commandStr.split(" ");
        const baseCmd = tokens[0];

        switch (baseCmd) {
            case 'help':
                printCliLine("Nexara CLI Tizimi Buyruqlari:", 'text-glow-blue');
                printCliLine("  help                - Ushbu yordam ro'yxatini chiqaradi.");
                printCliLine("  status              - Butun global infratuzilma holatini tekshiradi.");
                printCliLine("  ping <hub>          - Tashkent, Frankfurt, Tokyo yoki SV hablariga ulanish tezligini ko'rsatadi.");
                printCliLine("  deploy <product>    - Tanlangan dasturning bulutli deployini simulyatsiya qiladi.");
                printCliLine("  quantum             - Kvant hisoblash modulini sinab ko'radi.");
                printCliLine("  inbox               - Hamkorlik aloqa qutisidagi xabarlarni ko'rish.");
                printCliLine("  clearinbox          - Aloqa qutisidagi barcha xabarlarni tozalash.");
                printCliLine("  applications        - Vakansiyalarga kelgan arizalarni ko'rish.");
                printCliLine("  clearapplications   - Kelgan barcha arizalarni tozalash.");
                printCliLine("  clear               - Terminal ekranini tozalaydi.");
                break;
                
            case 'status':
                printCliLine("Infratuzilma holatini tekshirish...", 'text-glow-blue');
                setTimeout(() => {
                    printCliLine("[OK] Global Cloud Core: Operational");
                    printCliLine("[OK] Quantum Shield v2.4: Active");
                    printCliLine("[OK] Database Cluster Sync: 100%");
                    printCliLine("[OK] Edge CDN Mesh: Online (No anomalies detected)", 'text-glow-green');
                }, 400);
                break;

            case 'clear':
                cliBody.innerHTML = '';
                break;

            case 'ping':
                const hub = tokens[1];
                if (!hub) {
                    printCliLine("Xato: Iltimos qaysi markazni ping qilmoqchiligingizni yozing. Masalan: ping tashkent", 'text-glow-gold');
                } else if (['tashkent', 'tokyo', 'frankfurt', 'sv'].includes(hub)) {
                    printCliLine(`Nexara ${hub.toUpperCase()} Hub serveriga ping yuborilmoqda...`, 'text-glow-purple');
                    setTimeout(() => {
                        const latency = Math.floor(Math.random() * 20) + 5;
                        printCliLine(`Ulanish muvaffaqiyatli: 64 bayt packet yuborildi. Kechikish: ${latency}ms.`, 'text-glow-green');
                    }, 500);
                } else {
                    printCliLine(`Xato: Markaz topilmadi. Mavjudlar: tashkent, tokyo, frankfurt, sv.`, 'text-glow-gold');
                }
                break;

            case 'deploy':
                const product = tokens[1];
                if (!product) {
                    printCliLine("Xato: Qaysi mahsulotni deploy qilmoqchisiz? Masalan: deploy connect", 'text-glow-gold');
                } else if (['connect', 'devgrid', 'aetheros', 'quantumcore'].includes(product)) {
                    printCliLine(`DEPLOYMENT: [Nexara ${product.toUpperCase()}] global serverlar to'plamiga yuklanmoqda...`, 'text-glow-purple');
                    let progress = 0;
                    const interval = setInterval(() => {
                        progress += 25;
                        printCliLine(`[${'#'.repeat(progress/5)}${'.'.repeat(20 - progress/5)}] ${progress}%`, 'output-line');
                        if (progress >= 100) {
                            clearInterval(interval);
                            printCliLine(`SUCCESS: Nexara ${product.toUpperCase()} dunyo bo'ylab muvaffaqiyatli deploy qilindi!`, 'text-glow-green');
                        }
                    }, 300);
                } else {
                    printCliLine(`Xato: Dastur topilmadi. Mavjudlar: connect, devgrid, aetheros, quantumcore.`, 'text-glow-gold');
                }
                break;

            case 'quantum':
                printCliLine("QUANTUM SIMULATOR STACK INITIALIZED", 'text-glow-gold');
                printCliLine("Qubits state vector calculation in progress...");
                setTimeout(() => {
                    printCliLine("|ψ⟩ = 1/√2 (|00⟩ + |11⟩) - Bell state superposition.", 'text-glow-blue');
                    printCliLine("Quantum entropy matrix generation: SUCCESS.", 'text-glow-green');
                }, 600);
                break;

            case 'inbox':
                printCliLine("Ma'lumotlar bazasidan xabarlar yuklanmoqda...", 'text-glow-blue');
                fetch('/api/messages')
                    .then(res => res.json())
                    .then(data => {
                        if (!data.success || !data.messages || data.messages.length === 0) {
                            printCliLine("Nexara Aloqa Qutisi Bo'sh. Hozircha kelgan xabarlar yo'q.", 'text-glow-gold');
                        } else {
                            printCliLine(`Nexara Aloqa Qutisi: Jami ${data.messages.length} ta xabar topildi.`, 'text-glow-blue');
                            data.messages.forEach((msg, idx) => {
                                printCliLine(`------------------------------------------------`, 'output-line');
                                printCliLine(`XABAR #${idx + 1} - Yuborilgan vaqt: ${new Date(msg.date).toLocaleString()}`, 'text-glow-purple');
                                printCliLine(`  Kimdan:    ${msg.name} (${msg.company})`);
                                printCliLine(`  Pochta:    ${msg.email}`);
                                printCliLine(`  Mavzu:     ${msg.subject}`);
                                printCliLine(`  Xabar:     ${msg.message}`, 'text-glow-green');
                            });
                        }
                    })
                    .catch(err => {
                        printCliLine("Xato: Ma'lumotlarni yuklab bo'lmadi. Server aloqasini tekshiring.", 'text-glow-gold');
                    });
                break;

            case 'clearinbox':
                printCliLine("Aloqa qutisi tozalanmoqda...", 'text-glow-blue');
                fetch('/api/messages', { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            printCliLine("Nexara Aloqa Qutisi butunlay tozalandi!", 'text-glow-green');
                        } else {
                            printCliLine("Xato: Aloqa qutisini tozalab bo'lmadi.", 'text-glow-gold');
                        }
                    })
                    .catch(err => {
                        printCliLine("Xato: Server aloqasini tekshiring.", 'text-glow-gold');
                    });
                break;

            case 'applications':
                printCliLine("Ma'lumotlar bazasidan arizalar yuklanmoqda...", 'text-glow-blue');
                fetch('/api/applications')
                    .then(res => res.json())
                    .then(data => {
                        if (!data.success || !data.applications || data.applications.length === 0) {
                            printCliLine("Nexara Arizalar Qutisi Bo'sh. Arizalar kelmagan.", 'text-glow-gold');
                        } else {
                            printCliLine(`Nexara Arizalar Qutisi: Jami ${data.applications.length} ta ariza topildi.`, 'text-glow-blue');
                            data.applications.forEach((app, idx) => {
                                printCliLine(`------------------------------------------------`, 'output-line');
                                printCliLine(`ARIZA #${idx + 1} - Yuborilgan vaqt: ${new Date(app.date).toLocaleString()}`, 'text-glow-purple');
                                printCliLine(`  Lavozim:   ${app.jobTitle}`);
                                printCliLine(`  Nomzod:    ${app.name}`);
                                printCliLine(`  Email:     ${app.email}`);
                                printCliLine(`  Portfolio: ${app.portfolio}`);
                                printCliLine(`  Xabar:     ${app.message || 'Yozilmagan'}`, 'text-glow-green');
                            });
                        }
                    })
                    .catch(err => {
                        printCliLine("Xato: Arizalarni yuklab bo'lmadi. Server aloqasini tekshiring.", 'text-glow-gold');
                    });
                break;

            case 'clearapplications':
                printCliLine("Barcha arizalar o'chirilmoqda...", 'text-glow-blue');
                fetch('/api/applications', { method: 'DELETE' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            printCliLine("Nexara Arizalar Qutisi butunlay tozalandi!", 'text-glow-green');
                        } else {
                            printCliLine("Xato: Arizalarni tozalab bo'lmadi.", 'text-glow-gold');
                        }
                    })
                    .catch(err => {
                        printCliLine("Xato: Server aloqasini tekshiring.", 'text-glow-gold');
                    });
                break;

            default:
                printCliLine(`Xato: '${baseCmd}' buyrug'i topilmadi. Ro'yxatni ko'rish uchun 'help' deb yozing.`, 'text-glow-gold');
        }
    }

    // 10. Global Infrastructure Map Dots interaction
    const mapDots = document.querySelectorAll('.map-dot');
    const mapHubs = document.querySelectorAll('.map-hub');

    mapDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const city = dot.getAttribute('data-city');
            let targetId = '';
            
            if (city.includes('Silicon')) targetId = 'hub-sv';
            else if (city.includes('Frankfurt')) targetId = 'hub-frankfurt';
            else if (city.includes('Tashkent')) targetId = 'hub-tashkent';
            else if (city.includes('Tokyo')) targetId = 'hub-tokyo';

            mapHubs.forEach(hub => {
                hub.classList.remove('active');
                if (hub.id === targetId) {
                    hub.classList.add('active');
                    hub.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    });

    // 11. Careers Job List & Form pre-fill
    const jobItems = document.querySelectorAll('.job-item');
    const applyForm = document.getElementById('apply-form');
    const jobSelectedLabel = document.querySelector('.job-selected-label strong');
    const hiddenJobInput = document.getElementById('selected-job-input');
    const applySuccessEl = document.getElementById('apply-success');

    jobItems.forEach(item => {
        item.addEventListener('click', () => {
            jobItems.forEach(j => j.classList.remove('active'));
            item.classList.add('active');
            
            const jobTitle = item.querySelector('h3').textContent;
            jobSelectedLabel.textContent = jobTitle;
            hiddenJobInput.value = jobTitle;

            // Scroll form to view slightly in mobile
            if (window.innerWidth <= 1024) {
                document.getElementById('job-apply-panel').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Real Careers Form Submission Handler
    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = applyForm.querySelector('button[type="submit"]');
        const jobTitle = hiddenJobInput.value;
        const name = document.getElementById('candidate-name').value;
        const email = document.getElementById('candidate-email').value;
        const portfolio = document.getElementById('candidate-portfolio').value;
        const message = document.getElementById('candidate-msg').value;

        const lang = localStorage.getItem('lang') || 'uz';
        let loadingText = "Arizani yuborish...";
        let btnText = "Arizani topshirish";
        let connErrorText = "Serverga ulanishda xatolik! Server ishlayotganini yoki internet aloqangizni tekshiring.";
        let generalErrorText = "Xatolik yuz berdi: ";

        if (lang === 'en') {
            loadingText = "Submitting application...";
            btnText = "Submit Application";
            connErrorText = "Connection error! Check if server is running or check your internet.";
            generalErrorText = "An error occurred: ";
        } else if (lang === 'ru') {
            loadingText = "Отправка заявки...";
            btnText = "Отправить заявку";
            connErrorText = "Ошибка подключения! Проверьте запущен ли сервер или подключение к интернету.";
            generalErrorText = "Произошла ошибка: ";
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${loadingText}`;

        try {
            const response = await fetch("/api/apply", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    jobTitle: jobTitle,
                    name: name,
                    email: email,
                    portfolio: portfolio,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                applyForm.classList.add('hidden');
                applySuccessEl.classList.remove('hidden');
            } else {
                alert(generalErrorText + (result.error || "Arizani yuborib bo'lmadi."));
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${btnText}`;
            }
        } catch (error) {
            console.error(error);
            alert(connErrorText);
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> ${btnText}`;
        }
    });

    // Real Contact Form Handler (General Contact using Node.js API)
    const contactForm = document.getElementById('contact-form');
    const contactSuccessEl = document.getElementById('contact-success');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const name = document.getElementById('contact-name').value;
        const company = document.getElementById('contact-company').value || 'Noma\'lum';
        const email = document.getElementById('contact-email').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-msg').value;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Xabar yuborilmoqda...`;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    company: company,
                    email: email,
                    subject: subject,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                contactForm.classList.add('hidden');
                contactSuccessEl.classList.remove('hidden');
            } else {
                alert("Xatolik yuz berdi: " + (result.error || "Xabarni yuborib bo'lmadi."));
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Xabarni Yuborish`;
            }
        } catch (error) {
            console.error(error);
            alert("Serverga ulanishda xatolik! Server ishlayotganini yoki internet aloqangizni tekshiring.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Xabarni Yuborish`;
        }
    });

});
