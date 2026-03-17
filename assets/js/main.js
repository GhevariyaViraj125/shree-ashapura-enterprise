/* =========================================================
   Royal Enfield Finance Page — main.js
   ========================================================= */

  /* =========================================================
   COUNTRY CODE DROPDOWN — simple numeric list
   ========================================================= */

var CC_CODES = [
  1,7,20,27,30,31,32,33,34,36,39,40,41,43,44,45,46,47,48,
  49,51,52,53,54,55,56,57,58,60,61,62,63,64,65,66,81,82,
  84,86,90,91,92,93,94,95,98,212,213,216,218,220,221,222,
  223,224,225,226,227,228,229,230,231,232,233,234,235,236,
  237,238,239,240,241,242,243,244,245,246,247,248,249,250,
  251,252,253,254,255,256,257,258,260,261,262,263,264,265,
  266,267,268,269,290,291,297,298,299,350,351,352,353,354,
  355,356,357,358,359,370,371,372,373,374,375,376,377,378,
  380,381,382,385,386,387,389,420,421,423,500,501,502,503,
  504,505,506,507,508,509,590,591,592,593,594,595,596,597,
  598,670,672,673,674,675,676,677,678,679,680,681,682,683,
  685,686,687,688,689,690,691,692,850,852,853,855,856,880,
  886,960,961,962,963,964,965,966,967,968,970,971,972,973,
  974,975,976,977,992,993,994,995,996,998
];

function buildCCList() {
  var container = document.getElementById('ccList');
  var selected  = document.getElementById('countryCode').value;
  container.innerHTML = '';
  CC_CODES.forEach(function(code) {
    var div = document.createElement('div');
    div.className = 'cc-option' + (String(code) === String(selected) ? ' active' : '');
    div.textContent = code;
    div.addEventListener('click', function() { selectCC(code); });
    container.appendChild(div);
  });
}

function selectCC(code) {
  document.getElementById('ccDisplay').textContent = code;
  document.getElementById('countryCode').value     = code;
  // update active style
  document.querySelectorAll('.cc-option').forEach(function(el) {
    el.classList.toggle('active', el.textContent == code);
  });
  closeCC();
}

function toggleCC() {
  var panel = document.getElementById('ccPanel');
  if (panel.classList.contains('open')) {
    closeCC();
  } else {
    buildCCList();
    panel.classList.add('open');
    document.getElementById('ccTrigger').classList.add('open');
    // scroll selected into view
    setTimeout(function() {
      var active = document.querySelector('.cc-option.active');
      if (active) active.scrollIntoView({ block: 'center' });
    }, 50);
  }
}

function closeCC() {
  document.getElementById('ccPanel').classList.remove('open');
  document.getElementById('ccTrigger').classList.remove('open');
}

function ccScroll(dir) {
  var list = document.getElementById('ccList');
  list.scrollBy({ top: dir === 'up' ? -60 : 60, behavior: 'smooth' });
}

// Close when clicking outside
document.addEventListener('click', function(e) {
  var wrap = document.getElementById('ccWrap');
  if (wrap && !wrap.contains(e.target)) closeCC();
});


/* =========================================================
   CUSTOM MOTORCYCLE DROPDOWN
   ========================================================= */

   /* =========================================================
   FIX — stop placeholder.png 404 reload loop
   ========================================================= */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.moto-item img').forEach(function(img) {
    img.addEventListener('error', function() {
      if (!this.dataset.errored) {
        this.dataset.errored = 'true';
        this.removeAttribute('onerror');
        this.src = '';
        this.style.opacity = '0';
      }
    });
  });
});

// function toggleMotoDropdown() {
//   var panel   = document.getElementById('motoPanel');
//   var trigger = document.getElementById('motoTrigger');
//   var isOpen  = panel.classList.contains('open');

//   if (isOpen) {
//     panel.classList.remove('open');
//     trigger.classList.remove('open');
//   } else {
//     panel.classList.add('open');
//     trigger.classList.add('open');
//   }
// }

function toggleMotoDropdown() {
  var panel   = document.getElementById('motoPanel');
  var trigger = document.getElementById('motoTrigger');
  var isOpen  = panel.classList.contains('open');
  if (isOpen) {
    panel.classList.remove('open');
    trigger.classList.remove('open');
  } else {
    panel.classList.add('open');
    trigger.classList.add('open');
  }
}

function selectMoto(el) {
  // Deactivate all
  document.querySelectorAll('.moto-item').forEach(function(item) {
    item.classList.remove('active');
  });

  // Activate clicked
  el.classList.add('active');

  // Update trigger label & hidden input
  var label = el.querySelector('span').textContent;
  var value = el.getAttribute('data-value');
  document.getElementById('motoLabel').textContent = label;
  document.getElementById('motorcycle').value = value;

  var trigger = document.getElementById('motoTrigger');
  trigger.classList.add('selected');

  // Close panel
  document.getElementById('motoPanel').classList.remove('open');
  trigger.classList.remove('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  var wrap = document.getElementById('motoWrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('motoPanel').classList.remove('open');
    document.getElementById('motoTrigger').classList.remove('open');
  }
});

/* ---- Popup helpers ---- */
function showPopup(message) {
  document.getElementById('popupMessage').textContent = message;
  document.getElementById('popupOverlay').classList.add('active');
}

function closePopupBtn() {
  document.getElementById('popupOverlay').classList.remove('active');
}

/* Close on backdrop click */
document.getElementById('popupOverlay').addEventListener('click', function (e) {
  if (e.target === this) closePopupBtn();
});

/* Close on Escape key */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePopupBtn();
});

/* ---- Verify mobile ---- */
function handleVerify() {
  const mobile = document.getElementById('mobile').value.trim();
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    showPopup('Please enter a valid 10-digit mobile number before verifying.');
    return;
  }
  const btn = document.querySelector('.verify-btn');
  btn.textContent = 'Sent!';
  btn.style.color = '#1a7a1a';
  btn.disabled = true;
  setTimeout(function () {
    btn.textContent = 'Verify';
    btn.style.color = '';
    btn.disabled = false;
  }, 4000);
}

/* ---- Validation — returns first error string or null ---- */
function getValidationError() {
  var fullName = document.getElementById('fullName').value.trim();
  var email    = document.getElementById('email').value.trim();
  var moto     = document.getElementById('motorcycle').value;
  var mobile   = document.getElementById('mobile').value.trim();
  var pincode  = document.getElementById('pincode').value.trim();
  var accepted = document.getElementById('acceptTerms').checked;

  if (!fullName)
    return 'Enter your full name.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'Enter a valid email address.';
  if (!moto)
    return 'Please select a motorcycle.';
  if (!mobile || !/^\d{10}$/.test(mobile))
    return 'Enter a valid 10-digit mobile number.';
  if (!pincode || !/^\d{6}$/.test(pincode))
    return 'Enter a valid 6-digit pincode.';
  if (!accepted)
    return 'Please accept the terms and conditions as well as privacy policy.';

  return null;
}

/* ---- Submit ---- */
function handleSubmit() {
  var error = getValidationError();
  if (error) {
    showPopup(error);
    return;
  }

  var btn = document.querySelector('.submit-btn');
  btn.disabled = true;
  btn.innerHTML = 'Submitting\u2026 <span class="btn-arrow">\u203A</span>';

  setTimeout(function () {
    showPopup('Thank you! Our team will reach out to you shortly.');
    btn.innerHTML = 'Submit <span class="btn-arrow">\u203A</span>';
    btn.disabled = false;
    resetForm();
  }, 1000);
}

/* ---- Reset ---- */
function resetForm() {
  ['fullName', 'email', 'mobile', 'pincode'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('motorcycle').value = '';
  document.getElementById('acceptTerms').checked = false;
}

/* ---- Digits-only inputs ---- */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('mobile').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });
  document.getElementById('pincode').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });
});
