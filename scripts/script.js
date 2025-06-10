document.addEventListener('DOMContentLoaded', function() {
  // --- Praxis Assistant Context ---
  const systemContext = `
You are the Praxis Assistant, a helpful AI guide for the Praxis Craftsmanship Community. Your goal is to answer questions about Praxis based on the following information. Be friendly, concise, and helpful.

Our Story & Mission:
Praxis was founded by Solomon Nderitu and Benson Mose. The idea came from a frustrating search for a local cobbler to repair a beloved pair of leather boots, only to find the last one had retired. This highlighted a larger problem: foundational craft skills are disappearing, leading to a culture of disposable, mass-produced goods. Praxis was created to reverse this trend. Our mission is to be a community-driven platform that preserves and shares the art of craftsmanship, connecting master artisans with people eager to learn, repair, and create. We want to ensure traditional skills are passed down through generations and promote a circular economy.

Our Founders:
- Solomon Nderitu: CEO & Co-Founder. A former product designer with a passion for sustainable craftsmanship.
- Benson Mose: Head of Artisan Relations. A fourth-generation tailor dedicated to preserving traditional techniques.

Our Products & Services:
1. Trade-in-a-Box Kits: Comprehensive, high-quality kits for learning crafts like leatherworking. Each kit includes professional tools, materials, and access to HD video tutorials for beginners and experienced crafters alike.
2. Artisan Marketplace: A curated online marketplace where certified artisans sell durable, beautifully crafted goods. We maintain rigorous quality standards and provide branding and marketing support to our artisans.
3. Repair & Restoration Service: We connect users with skilled artisans for high-quality repairs on items like shoes, bags, and clothing. Users can get a quote by submitting photos online, then mail their item in for restoration. This supports the circular economy and gives cherished possessions a second life.

How to Get Involved & Contact Us:
- For Learners: Get started by purchasing a "Trade-in-a-Box" kit from our website.
- For Artisans: If you are a skilled artisan, you can apply to join our marketplace. Our certification process involves a thorough review of your portfolio and technical skills to ensure high quality.
- Support Us: You can support us by purchasing from our marketplace, using our repair services, or taking one of our workshops.
- Contact: For direct inquiries, use the contact form on our website. Our office is at 123 Craft St, Artisan City, phone is (555) 123-4567, and email is info@praxis.com.

Our Vision & Long-Term Goal:
Our long-term vision is to build a thriving global community centered around craftsmanship, sustainability, and heritage. We aim to make traditional skills accessible to everyone and to be the leading platform for high-quality, handcrafted goods and expert repairs, thereby reducing waste and fostering a deeper appreciation for the things we own.
`;

  // --- Hamburger Menu Logic ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navbarMenu = document.getElementById('navbar-menu');
  
  hamburgerBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-open');
  });

  // Close menu when a link is clicked
  const menuLinks = navbarMenu.querySelectorAll('a, button');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarMenu.classList.contains('is-open')) {
        navbarMenu.classList.remove('is-open');
      }
    });
  });

  // Visitor counter using localStorage
  let visitCount = localStorage.getItem('siteVisitCount');
  if (visitCount) {
    visitCount = parseInt(visitCount) + 1;
  } else {
    visitCount = 1;
  }
  localStorage.setItem('siteVisitCount', visitCount);
  document.getElementById('visitor-count').textContent = visitCount;

  // Audience toggle logic
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const audienceContents = document.querySelectorAll('.audience-content');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const audience = button.dataset.audience;
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      audienceContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`${audience}-content`).classList.add('active');
    });
  });

  // FAQ accordion - only one can be open at a time
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(clickedItem => {
    const question = clickedItem.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const wasActive = clickedItem.classList.contains('active');
      faqItems.forEach(item => item.classList.remove('active'));
      if (!wasActive) {
        clickedItem.classList.add('active');
      }
    });
  });

  // --- Puter JS Chatbot Integration with Context ---
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInputField = document.getElementById('chat-input-field');
  const chatMessages = document.getElementById('chat-messages');

  chatSendBtn.addEventListener('click', async () => {
    const messageText = chatInputField.value.trim();
    if (!messageText) return;

    // Display user's message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = messageText;
    chatMessages.appendChild(userMessage);
    chatInputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing indicator
    const botTyping = document.createElement('div');
    botTyping.className = 'message bot-message';
    botTyping.textContent = 'Praxis Assistant is typing...';
    chatMessages.appendChild(botTyping);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      // Send the system context and user message to Puter AI
      const response = await puter.ai.chat([
        { role: 'system', content: systemContext },
        { role: 'user', content: messageText }
      ]);

      // Display AI's response
      botTyping.textContent = response;
    } catch (error) {
      botTyping.textContent = 'Sorry, I am having trouble connecting. Please try again later.';
      console.error('Error with Puter AI:', error);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
  // --- End Puter JS Chatbot Integration ---

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim() === '') {
      nameError.style.display = 'block';
      isValid = false;
    } else {
      nameError.style.display = 'none';
    }
    
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.style.display = 'block';
      isValid = false;
    } else {
      emailError.style.display = 'none';
    }
    
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (message.value.trim() === '') {
      messageError.style.display = 'block';
      isValid = false;
    } else {
      messageError.style.display = 'none';
    }
    
    if (isValid) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const body = document.body;

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      body.classList.remove('dark-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  };
  
  themeToggle.addEventListener('click', function() {
    const isDark = body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
