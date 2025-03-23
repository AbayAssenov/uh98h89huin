// Плавная прокрутка для навигационных ссылок
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Переключение языков
  const langButtons = document.querySelectorAll('.lang-btn');
  const translatedElements = document.querySelectorAll('[data-ru], [data-en]');
  const inputFields = document.querySelectorAll('input, textarea');
  let currentLanguage = 'ru';

  // Инициализация языка
  setLanguage(currentLanguage);

  // Обработчик переключения языка
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      if (lang !== currentLanguage) {
        currentLanguage = lang;
        setLanguage(currentLanguage);
        
        // Установка активной кнопки
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      }
    });
  });

  // Функция установки языка
  function setLanguage(lang) {
    console.log(`Устанавливаю язык: ${lang}`);
    console.log(`Найдено элементов для перевода: ${translatedElements.length}`);
    
    // Обновление текста всех элементов с атрибутами data-ru/data-en
    translatedElements.forEach(element => {
      if (element.getAttribute(`data-${lang}`)) {
        const originalText = element.textContent;
        const translatedText = element.getAttribute(`data-${lang}`);
        element.textContent = translatedText;
        console.log(`Перевод: "${originalText}" -> "${translatedText}"`);
      }
    });

    // Обновление плейсхолдеров для полей ввода
    inputFields.forEach(field => {
      const placeholder = field.getAttribute(`data-${lang}-placeholder`);
      if (placeholder) {
        field.placeholder = placeholder;
      }
    });
    
    console.log(`Язык успешно изменен на: ${lang}`);
  }

  // Обработка отправки формы
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Здесь можно добавить логику отправки формы через AJAX
      // Сейчас просто сделаем имитацию успешной отправки
      
      const formData = new FormData(contactForm);
      const formValues = {};
      
      // Преобразуем данные формы в объект
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // Добавим имена для полей формы
      const nameInput = contactForm.querySelector('input[type="text"]');
      const emailInput = contactForm.querySelector('input[type="email"]');
      const messageInput = contactForm.querySelector('textarea');
      
      if (nameInput) nameInput.name = 'name';
      if (emailInput) emailInput.name = 'email';
      if (messageInput) messageInput.name = 'message';
      
      // Очищаем форму после "отправки"
      contactForm.reset();
      
      // Показываем уведомление
      const successMessage = currentLanguage === 'ru' 
        ? 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.' 
        : 'Message sent! We will contact you soon.';
      showNotification(successMessage);
    });
  }
  
  // Кнопка CTA
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      const contactSection = document.querySelector('#contact');
      
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }

  // Анимация космических элементов
  animateSpace();
});

// Функция показа уведомления
function showNotification(message) {
  // Создаем элемент уведомления
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;
  
  // Стили для уведомления
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = 'var(--primary-color)';
  notification.style.color = 'white';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = 'var(--border-radius)';
  notification.style.boxShadow = '0 4px 12px rgba(90, 62, 255, 0.3)';
  notification.style.opacity = '0';
  notification.style.transform = 'translateY(20px)';
  notification.style.transition = 'opacity 0.3s, transform 0.3s';
  notification.style.zIndex = '1000';
  
  // Добавляем в DOM
  document.body.appendChild(notification);
  
  // Анимируем появление
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
  }, 10);
  
  // Удаляем через 5 секунд
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Анимация при скролле
function animateOnScroll() {
  const elements = document.querySelectorAll('.principle, .product-card, .feature');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top <= windowHeight * 0.8) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Анимация космических элементов
function animateSpace() {
  const rocket = document.querySelector('.rocket');
  const stars = document.querySelectorAll('.star');
  const planets = document.querySelectorAll('.planet');

  // Создаем дополнительные звезды программно
  createAdditionalStars(20);

  // Анимация ракеты - сделаем её более заметной и активной
  if (rocket) {
    // Начальная позиция
    rocket.style.transform = `translate(${window.innerWidth}px, ${window.innerHeight}px)`;
    rocket.style.opacity = '1';
    
    // Функция для анимации ракеты
    function animateRocket() {
      const x = Math.random() * window.innerWidth * 0.8;
      const y = Math.random() * window.innerHeight * 0.7;
      
      rocket.style.transition = 'transform 8s ease-in-out, opacity 2s';
      rocket.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 60 - 30 + 45}deg)`;
      
      setTimeout(() => {
        rocket.style.opacity = '0.9';
        
        setTimeout(() => {
          // Скрываем ракету
          rocket.style.opacity = '0.3';
          
          setTimeout(() => {
            // Перемещаем ракету на новую начальную позицию без анимации
            rocket.style.transition = 'none';
            rocket.style.transform = `translate(${window.innerWidth + 100}px, ${window.innerHeight * Math.random()}px) rotate(45deg)`;
            
            setTimeout(() => {
              // Показываем ракету снова
              rocket.style.opacity = '1';
              
              // Запускаем новую анимацию через небольшую паузу
              setTimeout(animateRocket, 1000);
            }, 500);
          }, 1000);
        }, 4000);
      }, 2000);
    }
    
    // Запускаем анимацию ракеты сразу
    animateRocket();
  }

  // Анимация звезд (мерцание)
  stars.forEach(star => {
    const randomDuration = 2 + Math.random() * 4; // Более быстрое мерцание
    const randomDelay = Math.random() * 2;
    
    star.style.animation = `twinkle ${randomDuration}s infinite ${randomDelay}s`;
  });

  // Анимация планет (вращение)
  planets.forEach((planet, index) => {
    const randomDuration = 30 + Math.random() * 40; // Более быстрое вращение
    const randomDelay = Math.random() * 5;
    const direction = index % 2 === 0 ? 'normal' : 'reverse'; // Чередуем направление
    
    planet.style.animation = `orbit ${randomDuration}s linear infinite ${randomDelay}s`;
    planet.style.animationDirection = direction;
  });
}

// Функция для создания дополнительных звезд
function createAdditionalStars(count) {
  const starsContainer = document.querySelector('.stars-container');
  
  if (!starsContainer) return;
  
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    // Разные размеры для звезд
    const size = 1 + Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Разные цвета для звезд
    const colors = ['#ffffff', '#ffe9c4', '#d4fbff', '#fff4e0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    star.style.backgroundColor = randomColor;
    
    // Добавляем звезду в контейнер
    starsContainer.appendChild(star);
    
    // Анимируем звезду
    const randomDuration = 2 + Math.random() * 4;
    const randomDelay = Math.random() * 2;
    star.style.animation = `twinkle ${randomDuration}s infinite ${randomDelay}s`;
  }
}

// Добавим начальные стили для анимации
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.principle, .product-card, .feature');
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s, transform 0.6s';
  });
  
  // Запускаем анимацию при загрузке и при скролле
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
}); console.log('Переключение языка сработало!')
