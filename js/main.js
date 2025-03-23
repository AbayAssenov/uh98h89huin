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
  const translateElements = document.querySelectorAll('.translate');
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
    translateElements.forEach(element => {
      if (element.getAttribute(`data-${lang}`)) {
        element.textContent = element.getAttribute(`data-${lang}`);
      }
    });

    // Обновление плейсхолдеров для полей ввода
    inputFields.forEach(field => {
      const placeholder = field.getAttribute(`data-${lang}-placeholder`);
      if (placeholder) {
        field.placeholder = placeholder;
      }
    });
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

  // Анимация ракеты
  if (rocket) {
    setInterval(() => {
      const x = Math.random() * window.innerWidth * 0.8;
      const y = Math.random() * window.innerHeight * 0.7;
      
      rocket.style.transition = 'transform 15s ease-in-out, opacity 2s';
      rocket.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
      
      setTimeout(() => {
        rocket.style.opacity = '0.7';
        
        setTimeout(() => {
          rocket.style.opacity = '0';
          
          setTimeout(() => {
            rocket.style.transition = 'none';
            rocket.style.transform = `translate(${-100}px, ${window.innerHeight + 100}px)`;
            
            setTimeout(() => {
              rocket.style.opacity = '1';
            }, 500);
          }, 2000);
        }, 8000);
      }, 5000);
    }, 20000);
  }

  // Анимация звезд (мерцание)
  stars.forEach(star => {
    const randomDuration = 3 + Math.random() * 7;
    const randomDelay = Math.random() * 5;
    
    star.style.animation = `twinkle ${randomDuration}s infinite ${randomDelay}s`;
  });

  // Анимация планет (вращение)
  planets.forEach(planet => {
    const randomDuration = 50 + Math.random() * 100;
    const randomDelay = Math.random() * 10;
    
    planet.style.animation = `orbit ${randomDuration}s linear infinite ${randomDelay}s`;
  });
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
}); 