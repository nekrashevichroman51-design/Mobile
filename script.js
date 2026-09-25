document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // ЛОГИКА ЧАСТИ 1: GOOGLE И КИБЕР-ТЕРМИНАЛ
    // ==========================================
    const textToType = "Некрашевич Роман Викторович";
    const searchInput = document.getElementById("search-input");
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            searchInput.value += textToType.charAt(charIndex);
            charIndex++;
            searchInput.scrollLeft = searchInput.scrollWidth;
            setTimeout(typeText, 60); 
        }
    }
    setTimeout(typeText, 500);

    const terminal = document.getElementById("terminal-content");
    const logTemplates = [
        "[INFO] Инициализация ядра системы Роман-НВ...",
        "[SUCCESS] Подключение к глобальной сети верифицировано.",
        "[PROCESS] Компиляция модулей HTML5/CSS3/JS...",
        "[OPTIMIZE] Сжатие бандлов кода завершено на 100%.",
        "[INFO] Импорт Figma UI-Kit компонентов...",
        "[SUCCESS] Рендеринг Pixel-Perfect сетки выполнен.",
        "[WARN] Зафиксирована высокая концентрация чистого кода.",
        "[PROCESS] Деплой проекта Nekrashevich-Portfolio...",
        "[STATUS] Системы работают стабильно. Ошибок: 0."
    ];

    function addLogLine(customLine = null) {
        const p = document.createElement("p");
        let randomLine = customLine ? customLine : logTemplates[Math.floor(Math.random() * logTemplates.length)];
        
        if (randomLine.includes("[SUCCESS]")) {
            p.innerHTML = `<span class="term-success">${randomLine}</span>`;
        } else if (randomLine.includes("[WARN]") || randomLine.includes("[ACTION]")) {
            p.innerHTML = `<span class="term-warn">${randomLine}</span>`;
        } else {
            p.textContent = randomLine;
        }

        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;

        if (terminal.childNodes.length > 20) {
            terminal.removeChild(terminal.firstChild);
        }

        if (!customLine) {
            setTimeout(addLogLine, Math.random() * 1200 + 400);
        }
    }
    addLogLine();
    const searchBtn = document.getElementById("search-btn");
    const placeholder = document.getElementById("search-placeholder");
    const resultsWrapper = document.getElementById("results-wrapper");

    function executeSearch() {
        placeholder.style.display = "none";
        resultsWrapper.style.display = "block";
        addLogLine("[ACTION] Запрос '" + textToType + "' успешно выполнен.");
    }

    searchBtn.addEventListener("click", executeSearch);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && googlePage.style.display !== "none") {
            executeSearch();
        }
    });

    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            addLogLine("[ACTION] Включен ночной режим (Dark Mode).");
        } else {
            addLogLine("[ACTION] Включена светлая тема интерфейса.");
        }
    });

    // ==========================================
    // СВЯЗУЮЩАЯ ЛОГИКА: ПЕРЕКЛЮЧЕНИЕ МЕЖДУ САЙТАМИ
    // ==========================================
    const googlePage = document.getElementById("google-portfolio-page");
    const shopPage = document.getElementById("phone-shop-page");
    const openShopLink = document.getElementById("open-shop-link");
    const backToPortfolioBtn = document.getElementById("back-to-portfolio");

    openShopLink.addEventListener("click", (e) => {
        e.preventDefault();
        googlePage.style.display = "none";
        shopPage.style.display = "block";
        window.scrollTo(0, 0);
        addLogLine("[ACTION] Открыто интерактивное демо 'PHONIC SHOP'.");
    });

    backToPortfolioBtn.addEventListener("click", () => {
        shopPage.style.display = "none";
        googlePage.style.display = "flex";
        addLogLine("[ACTION] Возврат в главное меню портфолио.");
    });
    // ==========================================
    // ЛОГИКА ЧАСТИ 2: ИНТЕРНЕТ-МАГАЗИН СМАРТФОНОВ
    // ==========================================
    let cart = [];
    const heroTitleShop = document.getElementById("hero-title-shop");
    const heroDescriptionShop = document.getElementById("hero-description-shop");
    const heroPriceShop = document.getElementById("hero-price-shop");
    const visualGlow = document.getElementById("visual-glow");
    const phoneWallpaper = document.getElementById("phone-wallpaper");
    
    const cartTrigger = document.getElementById("cart-trigger");
    const cartOverlay = document.getElementById("cart-overlay");
    const cartClose = document.getElementById("cart-close");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartCounter = document.getElementById("cart-counter");

    const wallpaperGrads = {
        "#39ff14": "linear-gradient(45deg, #134e5e, #71b280)",
        "#a259ff": "linear-gradient(45deg, #6441a5, #2a0845)",
        "#ff5f56": "linear-gradient(45deg, #bb0000, #ff5f56)"
    };

    const productCards = document.querySelectorAll(".product-card-shop");
    productCards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("add-to-cart-btn-shop")) return;
            
            const name = card.getAttribute("data-name");
            const price = card.getAttribute("data-price");
            const desc = card.getAttribute("data-desc");
            const color = card.getAttribute("data-color");
            
            heroTitleShop.textContent = name;
            heroDescriptionShop.textContent = desc;
            heroPriceShop.textContent = parseInt(price).toLocaleString('ru-RU') + " ₽";
            
            visualGlow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            phoneWallpaper.style.background = wallpaperGrads[color] || wallpaperGrads["#39ff14"];
            
            const frame = document.getElementById("main-phone-view");
            frame.style.transform = "scale(0.95) rotateY(-15px) rotateX(10px)";
            setTimeout(() => { frame.style.transform = ""; }, 200);
        });
    });

    function updateCartUI() {
        cartCounter.textContent = cart.length;
        cartItemsContainer.innerHTML = "";
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-message">Корзина пуста. Время для апгрейда!</p>';
            cartTotalPrice.textContent = "0 ₽";
            return;
        }
        
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('ru-RU')} ₽</div>
                </div>
                <button class="remove-item-btn" style="background:none; border:none; color:#ff5f56; cursor:pointer; font-size:20px;" data-index="${index}">×</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
        
        cartTotalPrice.textContent = total.toLocaleString('ru-RU') + " ₽";
        
        document.querySelectorAll(".remove-item-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                cart.splice(idx, 1);
                updateCartUI();
            });
        });
    }

    document.querySelectorAll(".add-to-cart-btn-shop").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card-shop");
            const name = card.getAttribute("data-name");
            const price = parseInt(card.getAttribute("data-price"));
            
            cart.push({ name, price });
            updateCartUI();
            
            e.target.textContent = "Добавлено! ✓";
            e.target.style.background = "#39ff14";
            e.target.style.color = "#000";
            
            setTimeout(() => {
                e.target.textContent = "В корзину";
                e.target.style.background = "";
                e.target.style.color = "";
            }, 1000);
        });
    });

    document.getElementById("hero-buy-btn").addEventListener("click", () => {
        const currentName = heroTitleShop.textContent;
        const currentPrice = parseInt(heroPriceShop.textContent.replace(/[^0-9]/g, ""));
        cart.push({ name: currentName, price: currentPrice });
        updateCartUI();
        cartOverlay.style.display = "block";
    });

    cartTrigger.addEventListener("click", () => cartOverlay.style.display = "block");
    cartClose.addEventListener("click", () => cartOverlay.style.display = "none");
    cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) cartOverlay.style.display = "none";
    });

    document.getElementById("lucky-btn").addEventListener("click", () => {
        alert("Роман Викторович уже здесь, вам точно повезло!");
    });
});
