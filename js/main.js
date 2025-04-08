document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle')
  const navLinks = document.querySelector('.nav-links')

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active')
      menuToggle.classList.toggle('active') // For styling the hamburger itself
      // Accessibility: Toggle aria-expanded attribute
      const isExpanded = navLinks.classList.contains('active')
      menuToggle.setAttribute('aria-expanded', isExpanded)
    })
  }

  // Optional: Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      // Only prevent default if it's a real hash link on the same page
      if (href.length > 1 && href.startsWith('#')) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          e.preventDefault()
          targetElement.scrollIntoView({
            behavior: 'smooth'
          })
        }
      }
    })
  })

  // Optional: Add simple fade-in animation for sections on scroll
  const sections = document.querySelectorAll('section')
  const options = {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: '0px 0px -50px 0px' // Trigger a bit before it enters viewport
  }

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return
      }
      entry.target.style.opacity = 1
      entry.target.style.transform = 'translateY(0)'
      // Optional: Unobserve after animation
      // observer.unobserve(entry.target);
    })
  }, options)

  sections.forEach(section => {
    // Initial state for animation
    section.style.opacity = 0
    section.style.transform = 'translateY(20px)'
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out'
    observer.observe(section)
  })

  // Add other JS functionalities here (e.g., form validation, timeline, FAQ)
})
