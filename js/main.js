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
      showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
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