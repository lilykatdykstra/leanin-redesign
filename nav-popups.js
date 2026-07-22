(function () {

  /* ── Inject CSS ─────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = `
    /* Shared popup styles */
    .np-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.35);
      z-index: 900;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.18s ease;
      pointer-events: none;
    }
    .np-overlay.open { opacity: 1; pointer-events: all; }

    .np-modal {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      width: 100%; max-width: 520px;
      margin: 0 20px;
      padding: 28px 28px 24px;
      transform: translateY(-8px);
      transition: transform 0.18s ease;
    }
    .np-overlay.open .np-modal { transform: translateY(0); }

    .np-modal-title {
      font-family: 'Libre Baskerville', Georgia, serif;
      font-size: 1.1rem; font-weight: 700;
      color: #1A1A1A; margin-bottom: 16px;
    }

    .np-search-input {
      width: 100%;
      border: 1.5px solid #E8E4E0;
      border-radius: 100px;
      padding: 13px 18px;
      font-size: 14px;
      font-family: inherit;
      color: #1A1A1A;
      outline: none;
      transition: border-color 0.15s;
      margin-bottom: 20px;
    }
    .np-search-input:focus { border-color: #C41E3A; }
    .np-search-input::placeholder { color: #9A9A9A; }

    .np-recent-label {
      font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: #9A9A9A; margin-bottom: 10px;
    }
    .np-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .np-chip {
      padding: 7px 14px;
      background: #FDF6F0;
      border: 1px solid #E8E4E0;
      border-radius: 100px;
      font-size: 13px; font-weight: 500; color: #1A1A1A;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .np-chip:hover { background: #FDEAEA; border-color: #C41E3A; color: #C41E3A; }

    /* Dropdown panel (assistant + notifications) */
    .np-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 320px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12);
      border: 1px solid #E8E4E0;
      z-index: 900;
      padding: 20px;
      opacity: 0; transform: translateY(-6px);
      transition: opacity 0.16s ease, transform 0.16s ease;
      pointer-events: none;
    }
    .np-dropdown.open { opacity: 1; transform: translateY(0); pointer-events: all; }

    .np-dropdown-title {
      font-family: 'Libre Baskerville', Georgia, serif;
      font-size: 1rem; font-weight: 700;
      color: #1A1A1A; margin-bottom: 6px;
    }
    .np-dropdown-desc {
      font-size: 13px; color: #6B6B6B;
      line-height: 1.5; margin-bottom: 14px;
    }

    .np-ai-row {
      display: flex; gap: 8px;
    }
    .np-ai-input {
      flex: 1;
      border: 1.5px solid #E8E4E0;
      border-radius: 100px;
      padding: 10px 14px;
      font-size: 13px; font-family: inherit; color: #1A1A1A;
      outline: none; transition: border-color 0.15s;
    }
    .np-ai-input:focus { border-color: #C41E3A; }
    .np-ai-input::placeholder { color: #9A9A9A; }
    .np-ai-send {
      background: #C41E3A; color: #fff;
      border: none; border-radius: 100px;
      padding: 10px 16px; font-size: 13px; font-weight: 600;
      cursor: pointer; font-family: inherit;
      transition: background 0.15s; white-space: nowrap;
    }
    .np-ai-send:hover { background: #A01830; }

    .np-notif-list { list-style: none; margin-bottom: 14px; }
    .np-notif-item {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 11px 0;
      border-bottom: 1px solid #F0EDE9;
    }
    .np-notif-item:last-child { border-bottom: none; }
    .np-notif-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #C41E3A; flex-shrink: 0; margin-top: 5px;
    }
    .np-notif-dot.read { background: transparent; }
    .np-notif-text { font-size: 13px; color: #1A1A1A; line-height: 1.5; }
    .np-notif-time { font-size: 11px; color: #9A9A9A; display: block; margin-top: 2px; }
    .np-mark-read {
      font-size: 12px; font-weight: 600; color: #C41E3A;
      cursor: pointer; background: none; border: none;
      font-family: inherit; padding: 0;
      transition: color 0.15s;
    }
    .np-mark-read:hover { color: #A01830; }
  `;
  document.head.appendChild(style);

  /* ── Search Modal ───────────────────────────────────────── */
  var searchOverlay = document.createElement('div');
  searchOverlay.className = 'np-overlay';
  searchOverlay.setAttribute('role', 'dialog');
  searchOverlay.setAttribute('aria-modal', 'true');
  searchOverlay.setAttribute('aria-label', 'Search');
  searchOverlay.innerHTML = `
    <div class="np-modal" role="document">
      <div class="np-modal-title">Search</div>
      <input class="np-search-input" type="search"
        placeholder="Search members, Circles, resources..."
        aria-label="Search members, Circles, resources">
      <div class="np-recent-label">Recent searches</div>
      <div class="np-chips">
        <button class="np-chip">Women in Product</button>
        <button class="np-chip">Salary negotiation tips</button>
        <button class="np-chip">SF Bay Area Circles</button>
      </div>
    </div>
  `;
  document.body.appendChild(searchOverlay);

  // Close on backdrop click
  searchOverlay.addEventListener('click', function (e) {
    if (e.target === searchOverlay) closeSearch();
  });
  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeAssistant(); closeNotifs(); }
  });

  function openSearch() {
    searchOverlay.classList.add('open');
    setTimeout(function () {
      searchOverlay.querySelector('.np-search-input').focus();
    }, 50);
  }
  function closeSearch() { searchOverlay.classList.remove('open'); }

  /* ── Assistant Dropdown ─────────────────────────────────── */
  var assistantDropdown = document.createElement('div');
  assistantDropdown.className = 'np-dropdown';
  assistantDropdown.setAttribute('role', 'dialog');
  assistantDropdown.setAttribute('aria-label', 'AI Assistant');
  assistantDropdown.innerHTML = `
    <div class="np-dropdown-title">AI Assistant</div>
    <div class="np-dropdown-desc">Ask anything about navigating your career, finding communities, or using Lean In.</div>
    <div class="np-ai-row">
      <input class="np-ai-input" type="text" placeholder="Ask me anything..." aria-label="Ask the AI assistant">
      <button class="np-ai-send">Send</button>
    </div>
  `;

  function openAssistant(btn) {
    btn.style.position = 'relative';
    if (!btn.contains(assistantDropdown)) btn.appendChild(assistantDropdown);
    assistantDropdown.classList.add('open');
    setTimeout(function () {
      assistantDropdown.querySelector('.np-ai-input').focus();
    }, 50);
  }
  function closeAssistant() { assistantDropdown.classList.remove('open'); }

  /* ── Notifications Dropdown ─────────────────────────────── */
  var notifsDropdown = document.createElement('div');
  notifsDropdown.className = 'np-dropdown';
  notifsDropdown.setAttribute('role', 'dialog');
  notifsDropdown.setAttribute('aria-label', 'Notifications');
  notifsDropdown.innerHTML = `
    <div class="np-dropdown-title">Notifications</div>
    <ul class="np-notif-list">
      <li class="np-notif-item">
        <span class="np-notif-dot" aria-label="Unread"></span>
        <span class="np-notif-text">Sarah Chen commented on your post<span class="np-notif-time">2h ago</span></span>
      </li>
      <li class="np-notif-item">
        <span class="np-notif-dot" aria-label="Unread"></span>
        <span class="np-notif-text">Your Circle meeting is tomorrow at 7PM<span class="np-notif-time">1d ago</span></span>
      </li>
      <li class="np-notif-item">
        <span class="np-notif-dot read" aria-hidden="true"></span>
        <span class="np-notif-text">Welcome to Lean In Connect! Complete your profile<span class="np-notif-time">2d ago</span></span>
      </li>
    </ul>
    <button class="np-mark-read">Mark all as read</button>
  `;

  notifsDropdown.querySelector('.np-mark-read').addEventListener('click', function () {
    notifsDropdown.querySelectorAll('.np-notif-dot:not(.read)').forEach(function (dot) {
      dot.classList.add('read');
    });
  });

  function openNotifs(btn) {
    btn.style.position = 'relative';
    if (!btn.contains(notifsDropdown)) btn.appendChild(notifsDropdown);
    notifsDropdown.classList.add('open');
  }
  function closeNotifs() { notifsDropdown.classList.remove('open'); }

  /* ── Mobile Nav + Hamburger ─────────────────────────────── */
  var mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.id = 'mobile-nav';
  mobileNav.setAttribute('role', 'navigation');
  mobileNav.setAttribute('aria-label', 'Mobile navigation');
  document.body.appendChild(mobileNav);

  var hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open menu');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-controls', 'mobile-nav');
  var hamburgerIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var closeMenuIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  hamburger.innerHTML = hamburgerIcon;

  /* ── Wire up buttons ────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.querySelector('.nav-icon-btn[aria-label="Search"]');
    var assistantBtn = document.querySelector('.nav-icon-btn[aria-label="Assistant"]');
    var notifsBtn = document.querySelector('[aria-label^="Notifications"]');
    if (!notifsBtn) notifsBtn = document.querySelector('.nav-icon-btn[aria-label*="Notification"]');

    if (searchBtn) {
      searchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = searchOverlay.classList.contains('open');
        closeAssistant(); closeNotifs();
        isOpen ? closeSearch() : openSearch();
      });
    }

    if (assistantBtn) {
      assistantBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = assistantDropdown.classList.contains('open');
        closeSearch(); closeNotifs();
        isOpen ? closeAssistant() : openAssistant(assistantBtn);
      });
    }

    if (notifsBtn) {
      notifsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = notifsDropdown.classList.contains('open');
        closeSearch(); closeAssistant();
        isOpen ? closeNotifs() : openNotifs(notifsBtn);
      });
    }

    // Close dropdowns on outside click
    document.addEventListener('click', function (e) {
      if (assistantDropdown.classList.contains('open') && !assistantDropdown.contains(e.target)) {
        closeAssistant();
      }
      if (notifsDropdown.classList.contains('open') && !notifsDropdown.contains(e.target)) {
        closeNotifs();
      }
    });

    // ── Hamburger setup ──
    var navRight = document.querySelector('.nav-right');
    if (navRight) {
      navRight.insertBefore(hamburger, navRight.firstChild);
    }

    // Populate mobile nav from desktop links
    document.querySelectorAll('.nav-links .nav-link').forEach(function (link) {
      var a = document.createElement('a');
      a.href = link.getAttribute('href');
      a.className = 'mobile-nav-link' + (link.classList.contains('active') ? ' active' : '');
      if (link.getAttribute('aria-current')) a.setAttribute('aria-current', link.getAttribute('aria-current'));
      a.innerHTML = link.innerHTML;
      mobileNav.appendChild(a);
    });

    var processLink = document.querySelector('.nav-process-link');
    if (processLink) {
      var pa = document.createElement('a');
      pa.href = processLink.getAttribute('href');
      pa.className = 'mobile-nav-link' + (processLink.classList.contains('active') ? ' active' : '');
      pa.innerHTML = processLink.innerHTML;
      mobileNav.appendChild(pa);
    }

    var mobileMenuOpen = false;
    function closeMobileMenu() {
      mobileMenuOpen = false;
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = hamburgerIcon;
    }

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenuOpen = !mobileMenuOpen;
      mobileNav.classList.toggle('open', mobileMenuOpen);
      hamburger.setAttribute('aria-expanded', String(mobileMenuOpen));
      hamburger.innerHTML = mobileMenuOpen ? closeMenuIcon : hamburgerIcon;
    });

    document.addEventListener('click', function (e) {
      if (mobileMenuOpen && !e.target.closest('.topnav') && !e.target.closest('.mobile-nav')) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenuOpen) closeMobileMenu();
    });
  });

})();
