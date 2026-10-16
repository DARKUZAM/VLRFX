/**
 * VLRFX TEXT — High-Performance Apple Animated Experience
 * Fast, lightweight, zero-bloat vanilla JavaScript
 */
const DOWNLOAD_CONFIG = {
  mediafireUrl: "https://www.mediafire.com/file/g45tzpa9xuyspzw/Auto-IN-Text.zip/file",
  directZipUrl: "https://www.mediafire.com/file/g45tzpa9xuyspzw/Auto-IN-Text.zip/file",
  directDownloadBypass: true // Opens MediaFire immediately on 1 click
};

document.addEventListener("DOMContentLoaded", () => {
  initDownloadModal();
  initFaqAccordion();
  initInstallTabs();
  initCopyButtons();
  initScrollReveal();
});

/* ==========================================================================
   1. Fast Tab Switcher for Quick Installation Guide
   ========================================================================== */
function initInstallTabs() {
  const tabButtons = document.querySelectorAll(".install-tab-btn");
  const tabPanels = document.querySelectorAll(".install-panel");

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   2. 1-Click Path Copy Buttons
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-path-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<span style="color:#30d158;font-size:11px;font-weight:700;">✓ Copied</span>`;
        setTimeout(() => {
          btn.innerHTML = originalHtml;
        }, 1800);
      } catch (err) {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    });
  });
}

/* ==========================================================================
   3. Silky-Smooth Hardware-Accelerated Scroll Reveal
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Apple-Style FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all other items (Apple single-active style)
      faqItems.forEach((other) => {
        other.classList.remove("open");
        const otherAnswer = other.querySelector(".faq-answer");
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      } else {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================================================
   5. Instant Free Download Handler (MediaFire Integration)
   ========================================================================== */
function initDownloadModal() {
  const modal = document.getElementById("downloadModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const mainDownloadButton = document.getElementById("mainDownloadButton");
  const heroDownloadBtn = document.getElementById("heroDownloadBtn");

  const directZipLink = document.getElementById("directZipLink");
  if (directZipLink) {
    directZipLink.href = DOWNLOAD_CONFIG.mediafireUrl;
    directZipLink.target = "_blank";
    directZipLink.rel = "noopener noreferrer";
  }

  const handleDownloadClick = (e) => {
    if (DOWNLOAD_CONFIG.directDownloadBypass) {
      window.open(DOWNLOAD_CONFIG.mediafireUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (modal) {
      if (e) e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (mainDownloadButton) {
    mainDownloadButton.addEventListener("click", (e) => {
      e.preventDefault();
      handleDownloadClick(e);
    });
  }

  if (heroDownloadBtn) {
    heroDownloadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleDownloadClick(e);
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }
}
