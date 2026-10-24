/* Portfolio – Sergio Nahuel Solveira
   JavaScript puro: tema claro/oscuro, menú móvil,
   sección activa en la navegación y año del footer. */

(function () {
  'use strict';

  /* ---------------- Tema claro/oscuro ---------------- */

  var root = document.documentElement;
  var themeBtn = document.getElementById('theme-toggle');
  var colorMeta = document.querySelector('meta[name="theme-color"]');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  var COLORS = { light: '#ffffff', dark: '#0f1216' };

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (colorMeta) colorMeta.setAttribute('content', COLORS[theme]);
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* almacenamiento no disponible (modo privado): se ignora */
    }
  }

  // Estado inicial: preferencia guardada o esquema del sistema.
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
    } else {
      if (colorMeta) {
        colorMeta.setAttribute('content', systemDark.matches ? COLORS.dark : COLORS.light);
      }
      // Sin elección manual, el botón refleja igual el tema activo.
      if (themeBtn) themeBtn.setAttribute('aria-pressed', String(systemDark.matches));
    }
  } catch (e) {
    /* sin almacenamiento: sigue el sistema vía CSS */
    if (themeBtn) themeBtn.setAttribute('aria-pressed', String(systemDark.matches));
  }

  // Si el usuario no eligió un tema manual, seguir cambios del sistema en vivo.
  if (systemDark.addEventListener) {
    systemDark.addEventListener('change', function (event) {
      if (!root.dataset.theme) {
        if (colorMeta) {
          colorMeta.setAttribute('content', event.matches ? COLORS.dark : COLORS.light);
        }
        if (themeBtn) themeBtn.setAttribute('aria-pressed', String(event.matches));
      }
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
  }

  /* ---------------- Menú de navegación (móvil) ---------------- */

  var header = document.querySelector('.site-header');
  var navToggle = document.getElementById('nav-toggle');
  var navPanel = document.getElementById('site-nav');

  function setNavOpen(open) {
    header.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', function () {
      setNavOpen(!header.classList.contains('is-open'));
    });

    // Cerrar al elegir una sección.
    navPanel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNavOpen(false);
    });

    // Cerrar con Escape y devolver el foco al botón.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        setNavOpen(false);
        navToggle.focus();
      }
    });

    // Al pasar a escritorio, cerrar el menú móvil.
    var desktop = window.matchMedia('(min-width: 960px)');
    if (desktop.addEventListener) {
      desktop.addEventListener('change', function (event) {
        if (event.matches) setNavOpen(false);
      });
    }
  }

  /* ---------------- Sección activa en la navegación ---------------- */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.removeAttribute('aria-current');
          });
          var active = navLinks.filter(function (link) {
            return link.getAttribute('href') === '#' + entry.target.id;
          })[0];
          if (active) active.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------------- Año dinámico en el footer ---------------- */

  var anio = document.getElementById('anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
