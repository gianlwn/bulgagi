  (function () {
    "use strict";

    /* ---------------- data ---------------- */
    var FLAVORS = ["Original", "Honey Butter", "Honey Sriracha", "Honey Garlic", "Yangnyeom", "Soy Garlic", "Buffalo", "Garlic Parmesan", "Snow Cheese", "Salted Egg", "Spicy Salted Egg"];

    var CATEGORIES = [
      { id: "chicken", label: "Boneless Chicken", icon: "icon-bucket" },
      { id: "wings", label: "Chicken Wings", icon: "icon-wing" },
      { id: "sandwich", label: "Sandwiches & Burgers", icon: "icon-sandwich" },
      { id: "sides", label: "Appetizers & Sides", icon: "icon-fries" },
      { id: "drinks", label: "Drinks", icon: "icon-cup" }
    ];

    var PRODUCTS = [
      { id: "c1", cat: "chicken", name: "Solo Bucket", desc: "3 pcs boneless fried chicken", price: 145, stock: "ok", flavors: true },
      { id: "c2", cat: "chicken", name: "Half Bucket", desc: "6 pcs boneless fried chicken", price: 280, stock: "low", stockQty: 4, flavors: true },
      { id: "c3", cat: "chicken", name: "Whole Bucket", desc: "12 pcs boneless fried chicken", price: 555, stock: "ok", flavors: true },
      { id: "c4", cat: "chicken", name: "Half Bucket Combo", desc: "6 pcs + 2 cups rice", price: 400, stock: "ok", flavors: true },
      { id: "c5", cat: "chicken", name: "Whole Bucket Bundle", desc: "12 pcs + 1.5L softdrink", price: 650, stock: "out", flavors: true },
      { id: "c6", cat: "chicken", name: "2 Whole Bucket Bundle", desc: "24 pcs + 1.5L softdrink", price: 1200, stock: "out", flavors: true },
      { id: "c7", cat: "chicken", name: "2pc Rice Meal", desc: "2 pcs + 1 cup rice", price: 115, stock: "ok", flavors: true },
      { id: "c8", cat: "chicken", name: "3pc Rice Meal", desc: "3 pcs + 1 cup rice", price: 150, stock: "ok", flavors: true },

      { id: "w1", cat: "wings", name: "Solo Bucket", desc: "5 pcs chicken wings", price: 110, stock: "ok", flavors: true },
      { id: "w2", cat: "wings", name: "Half Bucket", desc: "8 pcs chicken wings", price: 220, stock: "ok", flavors: true },
      { id: "w3", cat: "wings", name: "Whole Bucket", desc: "10 pcs chicken wings", price: 435, stock: "low", stockQty: 2, flavors: true },
      { id: "w4", cat: "wings", name: "Half Bucket Combo", desc: "8 pcs + 2 cups rice", price: 330, stock: "ok", flavors: true },
      { id: "w5", cat: "wings", name: "Whole Bucket Bundle", desc: "10 pcs + 1.5L softdrink", price: 530, stock: "ok", flavors: true },
      { id: "w6", cat: "wings", name: "2 Whole Bucket Bundle", desc: "20 pcs + 1.5L softdrink", price: 970, stock: "ok", flavors: true },
      { id: "w7", cat: "wings", name: "2pc Rice Meal", desc: "2 pcs + 1 cup rice", price: 100, stock: "ok", flavors: true },
      { id: "w8", cat: "wings", name: "3pc Rice Meal", desc: "3 pcs + 1 cup rice", price: 130, stock: "ok", flavors: true },

      { id: "s1", cat: "sandwich", name: "Chicken Sandwich Classic", desc: "Crispy fillet, house bun", price: 100, stock: "ok" },
      { id: "s2", cat: "sandwich", name: "Chicken Sandwich Spicy", desc: "Crispy fillet, spicy mayo", price: 105, stock: "ok" },
      { id: "s3", cat: "sandwich", name: "Chick n' Cheese", desc: "Fillet, melted cheese", price: 115, stock: "ok" },
      { id: "s4", cat: "sandwich", name: "Beef Hamburger Classic", desc: "Beef patty, house sauce", price: 100, stock: "ok" },
      { id: "s5", cat: "sandwich", name: "Beef Bacondor", desc: "Beef, bacon, cheddar", price: 160, stock: "low", stockQty: 5 },
      { id: "s6", cat: "sandwich", name: "Double Gag", desc: "Double beef, double cheese", price: 170, stock: "ok" },

      { id: "a1", cat: "sides", name: "Empanada", desc: "Savory hand pie", price: 50, stock: "ok" },
      { id: "a2", cat: "sides", name: "Regular Fries", desc: "Classic salted fries", price: 50, stock: "ok" },
      { id: "a3", cat: "sides", name: "Mozzarella Stick", desc: "6 pcs, marinara dip", price: 120, stock: "low", stockQty: 6 },
      { id: "a4", cat: "sides", name: "Cajun Fries Overload", desc: "Loaded fries, cajun spice", price: 150, stock: "ok" },
      { id: "a5", cat: "sides", name: "Luncheon Meat Fries", desc: "Fries topped w/ luncheon meat", price: 100, stock: "out" },

      { id: "d1", cat: "drinks", name: "Fruit Tea", desc: "Iced fruit tea, pick a flavor", price: 39, stock: "ok" },
      { id: "d2", cat: "drinks", name: "Fruit Soda", desc: "Sparkling fruit soda", price: 49, stock: "ok" },
      { id: "d3", cat: "drinks", name: "Fruit Tea Yakult", desc: "Fruit tea with yakult", price: 79, stock: "ok" },
      { id: "d4", cat: "drinks", name: "Kalmado Iced Coffee 12oz", desc: "House iced coffee", price: 49, stock: "ok" },
      { id: "d5", cat: "drinks", name: "Coke Mismo", desc: "Single serve softdrink", price: 30, stock: "low", stockQty: 8 }
    ];

    /* ---------------- state ---------------- */
    var state = {
      activeCat: "chicken",
      cart: [],
      ticketNo: 47,
      heldOrders: [
        {
          ticket: 45, items: 3, ago: "held 6 min ago", cart: [
            { uid: "h1", productId: "c3", name: "Whole Bucket", flavor: "Honey Garlic", price: 555, qty: 1 },
            { uid: "h2", productId: "a2", name: "Regular Fries", flavor: null, price: 50, qty: 2 }
          ]
        },
        {
          ticket: 46, items: 1, ago: "held 2 min ago", cart: [
            { uid: "h3", productId: "s3", name: "Chick n' Cheese", flavor: null, price: 115, qty: 1 }
          ]
        }
      ],
      openFlavorCard: null
    };

    var pin = { entry: "", attemptsLeft: 3, locked: false, lockRemaining: 30, timer: null, context: "", onSuccess: null };
    var CORRECT_PIN = "1234";

    /* ---------------- helpers ---------------- */
    function peso(n) { return "₱" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    function $(sel) { return document.querySelector(sel); }
    function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

    function showToast(msg) {
      var t = $("#toast");
      t.textContent = msg;
      t.hidden = false;
      clearTimeout(showToast._t);
      showToast._t = setTimeout(function () { t.hidden = true; }, 2600);
    }

    /* ---------------- category tabs ---------------- */
    function renderTabs() {
      var wrap = $("#catTabs");
      wrap.innerHTML = "";
      CATEGORIES.forEach(function (c) {
        var b = el("button", "cat-tab" + (c.id === state.activeCat ? " is-active" : ""), c.label);
        b.addEventListener("click", function () { state.activeCat = c.id; state.openFlavorCard = null; renderTabs(); renderGrid(); });
        wrap.appendChild(b);
      });
    }

    /* ---------------- product grid ---------------- */
    function renderGrid() {
      var grid = $("#productGrid");
      grid.innerHTML = "";
      var catDef = CATEGORIES.filter(function (c) { return c.id === state.activeCat; })[0];
      PRODUCTS.filter(function (p) { return p.cat === state.activeCat; }).forEach(function (p) {
        grid.appendChild(renderCard(p, catDef.icon));
      });
    }

    function renderCard(p, iconId) {
      var card = el("div", "card" + (p.stock === "out" ? " is-out" : ""));
      card.dataset.selectedFlavor = FLAVORS[0];

      var top = el("div", "card__top");
      var iconBox = el("div", "card__icon", "<svg class='icon'><use href='#" + iconId + "'/></svg>");
      top.appendChild(iconBox);
      if (p.stock === "low") {
        var b = el("span", "badge badge--low", p.stockQty + " left");
        top.appendChild(b);
      } else if (p.stock === "out") {
        var b = el("span", "badge badge--out", "Out of stock");
        top.appendChild(b);
      }
      card.appendChild(top);

      card.appendChild(el("div", "card__name", p.name));
      card.appendChild(el("div", "card__desc", p.desc || ""));
      card.appendChild(el("div", "card__price tnum", peso(p.price)));

      if (p.flavors) {
        var toggle = el("button", "flavor-toggle", "<span>Flavor: " + FLAVORS[0] + "</span><svg class='icon icon--sm'><use href='#icon-chevron'/></svg>");
        var panel = el("div", "flavor-panel");
        panel.hidden = true;
        FLAVORS.forEach(function (f) {
          var chip = el("button", "flavor-chip" + (f === FLAVORS[0] ? " is-selected" : ""), f);
          chip.type = "button";
          chip.addEventListener("click", function (ev) {
            ev.stopPropagation();
            card.dataset.selectedFlavor = f;
            $all(".flavor-chip", panel).forEach(function (c) { c.classList.remove("is-selected"); });
            chip.classList.add("is-selected");
            toggle.querySelector("span").textContent = "Flavor: " + f;
          });
          panel.appendChild(chip);
        });
        toggle.type = "button";
        toggle.addEventListener("click", function () {
          var open = panel.hidden;
          panel.hidden = !open;
          toggle.classList.toggle("is-open", open);
        });
        card.appendChild(toggle);
        card.appendChild(panel);
      }

      if (p.stock !== "out") {
        var addBtn = el("button", "card__add", "Add · " + peso(p.price));
        addBtn.type = "button";
        addBtn.addEventListener("click", function () {
          addToCart(p, p.flavors ? card.dataset.selectedFlavor : null);
        });
        card.appendChild(addBtn);
      }

      return card;
    }

    /* ---------------- cart ---------------- */
    function addToCart(product, flavor) {
      var existing = state.cart.filter(function (l) { return l.productId === product.id && l.flavor === flavor; })[0];
      if (existing) { existing.qty += 1; }
      else {
        state.cart.push({ uid: product.id + "-" + (flavor || "") + "-" + Date.now(), productId: product.id, name: product.name, flavor: flavor || null, price: product.price, qty: 1 });
      }
      renderCart();
    }

    function changeQty(uid, delta) {
      var line = state.cart.filter(function (l) { return l.uid === uid; })[0];
      if (!line) return;
      line.qty += delta;
      if (line.qty <= 0) { state.cart = state.cart.filter(function (l) { return l.uid !== uid; }); }
      renderCart();
    }

    function requestVoid(uid) {
      var line = state.cart.filter(function (l) { return l.uid === uid; })[0];
      if (!line) return;
      openPinModal("Void: " + line.name + (line.flavor ? " · " + line.flavor : "") + " · " + peso(line.price * line.qty), function () {
        state.cart = state.cart.filter(function (l) { return l.uid !== uid; });
        renderCart();
        showToast("Item voided by manager override");
      });
    }

    function cartTotal() { return state.cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0); }

    function renderCart() {
      var wrap = $("#orderLines");
      wrap.innerHTML = "";
      if (state.cart.length === 0) {
        wrap.appendChild(el("p", "order-empty", "No items yet — tap the menu to add."));
      } else {
        state.cart.forEach(function (line) {
          var row = el("div", "order-line");
          var info = el("div", "order-line__info");
          info.appendChild(el("div", "order-line__name", line.name));
          if (line.flavor) info.appendChild(el("div", "order-line__flavor", line.flavor));
          row.appendChild(info);

          var qty = el("div", "order-line__qty");
          var minus = el("button", null, "−"); minus.type = "button";
          minus.addEventListener("click", function () { changeQty(line.uid, -1); });
          var qn = el("span", "tnum", String(line.qty));
          var plus = el("button", null, "+"); plus.type = "button";
          plus.addEventListener("click", function () { changeQty(line.uid, 1); });
          qty.appendChild(minus); qty.appendChild(qn); qty.appendChild(plus);
          row.appendChild(qty);

          row.appendChild(el("div", "order-line__price tnum", peso(line.price * line.qty)));

          var voidBtn = el("button", "order-line__void", "<svg class='icon icon--sm'><use href='#icon-close'/></svg>");
          voidBtn.type = "button"; voidBtn.title = "Void item (manager approval)";
          voidBtn.addEventListener("click", function () { requestVoid(line.uid); });
          row.appendChild(voidBtn);

          wrap.appendChild(row);
        });
      }

      var total = cartTotal();
      var vatable = total / 1.12;
      var vat = total - vatable;
      $("#sumVatable").textContent = peso(vatable);
      $("#sumVat").textContent = peso(vat);
      $("#sumTotal").textContent = peso(total);
      $("#chargeAmt").textContent = peso(total);
      $("#orderTotals").hidden = state.cart.length === 0;

      $("#holdBtn").disabled = state.cart.length === 0;
      $("#chargeBtn").disabled = state.cart.length === 0;
    }

    /* ---------------- held orders ---------------- */
    function renderHeld() {
      var wrap = $("#heldChips");
      wrap.innerHTML = "";
      if (state.heldOrders.length === 0) {
        wrap.appendChild(el("span", "held-strip__empty", "No held orders"));
        return;
      }
      state.heldOrders.forEach(function (h) {
        var chip = el("button", "held-chip");
        chip.type = "button";
        chip.appendChild(el("div", "held-chip__top", "<span>#" + h.ticket + "</span><span>" + h.items + " item" + (h.items === 1 ? "" : "s") + "</span>"));
        chip.appendChild(el("div", "held-chip__meta", h.ago));
        chip.addEventListener("click", function () { resumeHeld(h.ticket); });
        wrap.appendChild(chip);
      });
    }

    function resumeHeld(ticket) {
      var idx = state.heldOrders.findIndex(function (h) { return h.ticket === ticket; });
      if (idx === -1) return;
      var h = state.heldOrders[idx];
      if (state.cart.length > 0) {
        showToast("Hold current order first before resuming another ticket");
        return;
      }
      state.cart = h.cart;
      state.heldOrders.splice(idx, 1);
      state.ticketNo = h.ticket;
      $("#ticketNo").textContent = "#" + state.ticketNo;
      $("#ticketNoSide").textContent = "#" + state.ticketNo;
      renderCart(); renderHeld();
      showToast("Resumed ticket #" + h.ticket);
    }

    $("#holdBtn").addEventListener("click", function () {
      if (state.cart.length === 0) return;
      state.heldOrders.push({ ticket: state.ticketNo, items: state.cart.reduce(function (s, l) { return s + l.qty; }, 0), ago: "held just now", cart: state.cart });
      state.cart = [];
      state.ticketNo += 1;
      $("#ticketNo").textContent = "#" + state.ticketNo;
      $("#ticketNoSide").textContent = "#" + state.ticketNo;
      renderCart(); renderHeld();
      showToast("Order held — new ticket opened");
    });

    $("#chargeBtn").addEventListener("click", function () {
      if (state.cart.length === 0) return;
      var amt = peso(cartTotal());
      var t = state.ticketNo;
      showToast("Ticket #" + t + " sent to kitchen · " + amt + " charged");
      state.cart = [];
      state.ticketNo += 1;
      $("#ticketNo").textContent = "#" + state.ticketNo;
      $("#ticketNoSide").textContent = "#" + state.ticketNo;
      renderCart();
    });

    /* ---------------- manager pin modal ---------------- */
    function openPinModal(context, onSuccess) {
      pin.context = context;
      pin.onSuccess = onSuccess;
      pin.entry = "";
      $("#pinContext").textContent = context;
      $("#pinScrim").hidden = false;
      renderPinDots();
      if (!pin.locked) { setPinStatus(pin.attemptsLeft + " attempt" + (pin.attemptsLeft === 1 ? "" : "s") + " remaining", false); }
    }
    function closePinModal() {
      $("#pinScrim").hidden = true;
      pin.onSuccess = null;
    }
    function renderPinDots() {
      var dots = $all(".pin-dot");
      dots.forEach(function (d, i) { d.classList.toggle("is-filled", i < pin.entry.length); });
    }
    function setPinStatus(msg, isError) {
      var s = $("#pinStatus");
      s.textContent = msg;
      s.classList.toggle("is-error", !!isError);
    }

    $("#managerOverrideBtn").addEventListener("click", function () {
      openPinModal("General manager access", function () { showToast("Manager access granted"); });
    });
    $("#pinCloseBtn").addEventListener("click", closePinModal);

    $("#pinKeypad").addEventListener("click", function (ev) {
      var btn = ev.target.closest("button[data-k]");
      if (!btn || pin.locked) return;
      if (pin.entry.length >= 4) return;
      pin.entry += btn.dataset.k;
      renderPinDots();
      if (pin.entry.length === 4) {
        setTimeout(evaluatePin, 180);
      }
    });
    $("#pinBackspace").addEventListener("click", function () {
      if (pin.locked) return;
      pin.entry = pin.entry.slice(0, -1);
      renderPinDots();
    });

    function evaluatePin() {
      if (pin.entry === CORRECT_PIN) {
        pin.attemptsLeft = 3;
        var cb = pin.onSuccess;
        closePinModal();
        if (cb) cb();
        return;
      }
      pin.attemptsLeft -= 1;
      pin.entry = "";
      renderPinDots();
      var modal = $(".pin-modal");
      modal.classList.remove("shake"); void modal.offsetWidth; modal.classList.add("shake");
      if (pin.attemptsLeft <= 0) {
        enterLockout();
      } else {
        setPinStatus("Incorrect PIN · " + pin.attemptsLeft + " attempt" + (pin.attemptsLeft === 1 ? "" : "s") + " remaining", true);
      }
    }

    function enterLockout() {
      pin.locked = true;
      pin.lockRemaining = 30;
      $("#pinKeypad").hidden = true;
      $("#pinLockout").hidden = false;
      $("#pinDots").hidden = true;
      setPinStatus("", false);
      updateLockoutTimer();
      pin.timer = setInterval(function () {
        pin.lockRemaining -= 1;
        updateLockoutTimer();
        if (pin.lockRemaining <= 0) {
          clearInterval(pin.timer);
          pin.locked = false;
          pin.attemptsLeft = 3;
          $("#pinKeypad").hidden = false;
          $("#pinLockout").hidden = true;
          $("#pinDots").hidden = false;
          setPinStatus("3 attempts remaining", false);
        }
      }, 1000);
    }
    function updateLockoutTimer() {
      var m = Math.floor(pin.lockRemaining / 60), s = pin.lockRemaining % 60;
      $("#pinLockoutTimer").textContent = m + ":" + (s < 10 ? "0" : "") + s;
    }

    /* ---------------- screen switcher ---------------- */
    var VIEW_MAP = {
      pos: { view: "posView", tab: "tabPos" },
      checkout: { view: "checkoutView", tab: "tabCheckout" },
      wizard: { view: "wizardView", tab: "tabWizard" },
      dashboard: { view: "dashboardView", tab: "tabDashboard" }
    };
    Object.keys(VIEW_MAP).forEach(function (key) {
      $("#" + VIEW_MAP[key].tab).addEventListener("click", function () { switchView(key); });
    });
    function switchView(v) {
      Object.keys(VIEW_MAP).forEach(function (key) {
        var isActive = key === v;
        $("#" + VIEW_MAP[key].view).hidden = !isActive;
        var tab = $("#" + VIEW_MAP[key].tab);
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive);
      });
      if (v === "dashboard") { renderDashboard(); }
    }

    /* ---------------- checkout screen logic ---------------- */
    var refDigits = "";
    var screenshotAttached = false;

    $("#refInput").addEventListener("input", function (e) {
      var digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 13);
      refDigits = digitsOnly;
      e.target.value = digitsOnly;
      $("#refStatus").textContent = digitsOnly.length + "/13";
      var valid = digitsOnly.length === 13;
      e.target.classList.toggle("is-valid", valid);
      var hint = $("#refHint");
      if (digitsOnly.length > 0 && digitsOnly.length < 13) {
        hint.textContent = "Enter " + (13 - digitsOnly.length) + " more digit" + (13 - digitsOnly.length === 1 ? "" : "s") + ".";
        hint.classList.add("is-error");
      } else {
        hint.textContent = "Numbers only, exactly 13 digits.";
        hint.classList.remove("is-error");
      }
      updateConfirmState();
    });

    $("#dropzone").addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { $("#fileInput").click(); } });
    $("#fileInput").addEventListener("change", function (e) {
      var f = e.target.files[0];
      if (!f) return;
      screenshotAttached = true;
      $("#attachmentName").textContent = f.name + " · " + Math.max(1, Math.round(f.size / 1024)) + " KB";
      $("#attachment").hidden = false;
      $("#dropzoneText").textContent = "Replace screenshot";
      updateConfirmState();
    });

    function updateConfirmState() {
      var ready = refDigits.length === 13 && screenshotAttached;
      var btn = $("#confirmOrderBtn");
      btn.disabled = !ready;
      $("#confirmBtnLabel").textContent = ready ? "Confirm Order" :
        (refDigits.length < 13 && !screenshotAttached ? "Enter reference number & upload screenshot" :
          refDigits.length < 13 ? "Enter your 13-digit reference number" : "Upload your payment screenshot");
    }

    $("#confirmOrderBtn").addEventListener("click", function () {
      if (this.disabled) return;
      var btn = this;
      btn.disabled = true;
      $("#confirmBtnLabel").innerHTML = "Submitting…";
      setTimeout(function () {
        $all(".ck-block", $("#checkoutScroll")).forEach(function (b) { b.style.display = "none"; });
        btn.style.display = "none";
        $("#ckSuccess").hidden = false;
      }, 1100);
    });

    /* ---------------- shift closeout wizard (Screen 3) ---------------- */
    var RAW_MATERIALS = [
      { id: "rm1", name: "Raw Chicken", unit: "kg", cost: 180 },
      { id: "rm2", name: "Breading Mix", unit: "kg", cost: 95 },
      { id: "rm3", name: "Cooking Oil", unit: "L", cost: 110 },
      { id: "rm4", name: "Plain Rice", unit: "kg", cost: 55 },
      { id: "rm5", name: "Honey Garlic Sauce", unit: "L", cost: 140 },
      { id: "rm6", name: "Buffalo Sauce", unit: "L", cost: 130 },
      { id: "rm7", name: "Burger Buns", unit: "pcs", cost: 12 },
      { id: "rm8", name: "Cheese Slices", unit: "pcs", cost: 6 },
      { id: "rm9", name: "Softdrink Syrup", unit: "L", cost: 95 },
      { id: "rm10", name: "Lettuce", unit: "kg", cost: 70 }
    ];
    var REASON_CODES = ["Spoilage", "Expired", "Overproduction", "Dropped / Damaged", "Prep Error", "Customer Return", "Other"];
    var CASH_FLOAT = 3000;
    var CASH_SYSTEM_SALES = 8420;

    var wizard = {
      step: 1,
      cashActual: null,
      wasteRows: [
        { uid: "wr1", materialId: "rm1", qty: 1.5, reason: "Spoilage" },
        { uid: "wr2", materialId: "rm5", qty: 0.5, reason: "Expired" }
      ]
    };

    function cashExpectedTotal() { return CASH_FLOAT + CASH_SYSTEM_SALES; }
    function wasteRowMaterial(row) { return RAW_MATERIALS.filter(function (m) { return m.id === row.materialId; })[0]; }
    function wasteRowCost(row) {
      var mat = wasteRowMaterial(row);
      return (!mat || !row.qty) ? 0 : mat.cost * row.qty;
    }
    function wasteTotalValue() { return wizard.wasteRows.reduce(function (s, r) { return s + wasteRowCost(r); }, 0); }
    function varianceText(diff) {
      if (Math.abs(diff) < 0.005) return "Balanced";
      return diff > 0 ? "+" + peso(diff) + " over" : "−" + peso(Math.abs(diff)) + " short";
    }

    function renderWasteRows() {
      var wrap = $("#wasteRows");
      wrap.innerHTML = "";
      wizard.wasteRows.forEach(function (row) {
        var line = el("div", "waste-row");
        var costSpan;

        var matSelect = document.createElement("select");
        RAW_MATERIALS.forEach(function (m) {
          var opt = document.createElement("option");
          opt.value = m.id; opt.textContent = m.name + " (" + m.unit + ")";
          if (m.id === row.materialId) opt.selected = true;
          matSelect.appendChild(opt);
        });
        matSelect.addEventListener("change", function () {
          row.materialId = matSelect.value;
          costSpan.textContent = peso(wasteRowCost(row));
          renderWasteTotal();
        });
        line.appendChild(matSelect);

        var qtyInput = document.createElement("input");
        qtyInput.type = "number"; qtyInput.min = "0"; qtyInput.step = "0.1"; qtyInput.value = row.qty;
        qtyInput.addEventListener("input", function () {
          row.qty = parseFloat(qtyInput.value) || 0;
          costSpan.textContent = peso(wasteRowCost(row));
          renderWasteTotal();
        });
        line.appendChild(qtyInput);

        var reasonSelect = document.createElement("select");
        REASON_CODES.forEach(function (r) {
          var opt = document.createElement("option");
          opt.value = r; opt.textContent = r;
          if (r === row.reason) opt.selected = true;
          reasonSelect.appendChild(opt);
        });
        reasonSelect.addEventListener("change", function () { row.reason = reasonSelect.value; });
        line.appendChild(reasonSelect);

        costSpan = el("span", "waste-row__cost tnum", peso(wasteRowCost(row)));
        line.appendChild(costSpan);

        var removeBtn = el("button", "waste-row__remove", "<svg class='icon icon--sm'><use href='#icon-close'/></svg>");
        removeBtn.type = "button";
        removeBtn.addEventListener("click", function () {
          wizard.wasteRows = wizard.wasteRows.filter(function (r) { return r.uid !== row.uid; });
          renderWasteRows();
        });
        line.appendChild(removeBtn);

        wrap.appendChild(line);
      });
      renderWasteTotal();
    }
    function renderWasteTotal() { $("#wasteTotal").textContent = peso(wasteTotalValue()); }

    $("#addWasteRowBtn").addEventListener("click", function () {
      wizard.wasteRows.push({ uid: "wr" + Date.now(), materialId: RAW_MATERIALS[0].id, qty: 1, reason: REASON_CODES[0] });
      renderWasteRows();
    });

    $("#cashActual").addEventListener("input", function (e) {
      var val = parseFloat(e.target.value);
      wizard.cashActual = isNaN(val) ? null : val;
      updateVarianceDisplay();
      updateWizardNav();
    });

    function updateVarianceDisplay() {
      var box = $("#varianceReadout");
      if (wizard.cashActual === null) { box.hidden = true; return; }
      box.hidden = false;
      var diff = wizard.cashActual - cashExpectedTotal();
      var badge = $("#varianceBadge");
      badge.className = "variance-badge tnum";
      if (Math.abs(diff) < 0.005) {
        badge.classList.add("variance-badge--ok");
        badge.textContent = "Balanced";
      } else if (diff > 0) {
        badge.classList.add("variance-badge--low");
        badge.textContent = "+" + peso(diff) + " Over";
      } else {
        badge.classList.add("variance-badge--out");
        badge.textContent = "−" + peso(Math.abs(diff)) + " Short";
      }
    }

    function wizardStepValid(step) { return step === 1 ? wizard.cashActual !== null : true; }

    function renderWizardChrome() {
      [1, 2, 3].forEach(function (n) {
        var li = document.querySelector('.wizard-step[data-step="' + n + '"]');
        li.classList.toggle("is-active", n === wizard.step);
        li.classList.toggle("is-complete", n < wizard.step);
        $("#wizStep" + n).hidden = n !== wizard.step;
      });
      $("#closeoutSuccess").hidden = true;
      $("#wizardNav").hidden = wizard.step === 3;
      $("#wizBackBtn").disabled = wizard.step === 1;
      updateWizardNav();
    }
    function updateWizardNav() { $("#wizNextBtn").disabled = !wizardStepValid(wizard.step); }

    $("#wizBackBtn").addEventListener("click", function () {
      if (wizard.step > 1) { wizard.step -= 1; renderWizardChrome(); }
    });
    $("#wizNextBtn").addEventListener("click", function () {
      if (!wizardStepValid(wizard.step)) return;
      if (wizard.step === 2) { renderReviewStep(); }
      if (wizard.step < 3) { wizard.step += 1; renderWizardChrome(); }
    });

    function renderReviewStep() {
      var diff = (wizard.cashActual || 0) - cashExpectedTotal();
      $("#reviewVariance").textContent = varianceText(diff) + (Math.abs(diff) < 0.005 ? " (₱0.00)" : "");
      $("#reviewWastage").textContent = wizard.wasteRows.length + " item" + (wizard.wasteRows.length === 1 ? "" : "s") + " · " + peso(wasteTotalValue());
    }

    $("#approveCloseoutBtn").addEventListener("click", function () {
      var diff = (wizard.cashActual || 0) - cashExpectedTotal();
      openPinModal("Close Shift #" + state.ticketNo + " · Cash " + varianceText(diff) + " · Wastage " + peso(wasteTotalValue()), finalizeCloseout);
    });

    var zReportSeq = 1;
    function finalizeCloseout() {
      var diff = (wizard.cashActual || 0) - cashExpectedTotal();
      var wasteVal = wasteTotalValue();
      var zNo = "#Z-" + String(zReportSeq++).padStart(4, "0");

      state.closeouts.unshift({
        dateLabel: "Jul 14, 2026",
        ticketRange: "#1–#" + state.ticketNo,
        variance: diff,
        wasteValue: wasteVal,
        closedBy: "J. Ramos"
      });
      state.wastageWeekTotal += wasteVal;

      $("#zReportNo").textContent = zNo;
      $("#closeoutSuccessSummary").innerHTML =
        "<div>Cash Variance: <strong>" + varianceText(diff) + "</strong></div>" +
        "<div>Wastage Logged: <strong>" + wizard.wasteRows.length + " items · " + peso(wasteVal) + "</strong></div>";

      [1, 2, 3].forEach(function (n) { $("#wizStep" + n).hidden = true; });
      $("#wizardNav").hidden = true;
      $all(".wizard-step").forEach(function (li) { li.classList.add("is-complete"); li.classList.remove("is-active"); });
      $("#closeoutSuccess").hidden = false;

      showToast("Shift closed · Z-Report " + zNo + " generated");
    }

    $("#newCloseoutBtn").addEventListener("click", function () {
      wizard.step = 1;
      wizard.cashActual = null;
      wizard.wasteRows = [{ uid: "wr" + Date.now(), materialId: "rm1", qty: 1, reason: "Spoilage" }];
      $("#cashActual").value = "";
      $("#varianceReadout").hidden = true;
      $all(".wizard-step").forEach(function (li) { li.classList.remove("is-complete"); });
      renderWasteRows();
      renderWizardChrome();
    });

    /* ---------------- management dashboard (Screen 4) ---------------- */
    var DAILY_SALES = [
      { day: "Wed", amt: 14200 },
      { day: "Thu", amt: 15680 },
      { day: "Fri", amt: 19340 },
      { day: "Sat", amt: 24100 },
      { day: "Sun", amt: 22860 },
      { day: "Mon", amt: 16590 },
      { day: "Tue", amt: 18940 }
    ];
    var TOP_SELLERS = [
      { name: "Whole Bucket · Original", qty: 38, revenue: 21090, margin: 34 },
      { name: "Half Bucket Combo", qty: 29, revenue: 11600, margin: 29 },
      { name: "Solo Bucket", qty: 24, revenue: 3480, margin: 31 },
      { name: "Chick n' Cheese Sandwich", qty: 19, revenue: 2185, margin: 26 },
      { name: "Cajun Fries Overload", qty: 15, revenue: 2250, margin: 42 }
    ];
    var STOCK_OUT_INCIDENTS = [
      { item: "Whole Bucket Bundle", start: "2:15 PM", status: "ongoing", duration: "2h 10m and counting", lost: 4 },
      { item: "2 Whole Bucket Bundle", start: "4:40 PM", status: "ongoing", duration: "45m and counting", lost: 1 },
      { item: "Luncheon Meat Fries", start: "11:20 AM", status: "resolved", duration: "Resolved 1:05 PM · 1h 45m", lost: 3 }
    ];
    var STAFF_ACTIVITY = [
      { name: "J. Ramos", voids: 2, adjustments: 1, value: 680, flag: false },
      { name: "M. Dela Cruz", voids: 5, adjustments: 3, value: 1920, flag: true },
      { name: "A. Santos", voids: 1, adjustments: 0, value: 145, flag: false }
    ];

    state.role = "manager";
    state.wastageWeekTotal = 438;
    state.closeouts = [
      { dateLabel: "Jul 13, 2026", ticketRange: "#1–#44", variance: -10, wasteValue: 248, closedBy: "M. Dela Cruz" },
      { dateLabel: "Jul 12, 2026", ticketRange: "#1–#51", variance: 0, wasteValue: 190, closedBy: "J. Ramos" }
    ];

    function applyRoleMasking() {
      var masked = state.role === "cashier";
      $all("[data-mask]").forEach(function (elm) { elm.classList.toggle("is-masked", masked); });
    }

    $("#roleToggle").addEventListener("click", function (ev) {
      var btn = ev.target.closest(".role-toggle__btn");
      if (!btn) return;
      state.role = btn.dataset.role;
      $all(".role-toggle__btn").forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      applyRoleMasking();
      renderRankList();
    });

    function renderChart() {
      var wrap = $("#chartBars");
      wrap.innerHTML = "";
      var max = Math.max.apply(null, DAILY_SALES.map(function (d) { return d.amt; }));
      var barsRow = el("div", "chart-bars__row");
      var daysRow = el("div", "chart-bars__days");
      DAILY_SALES.forEach(function (d, i) {
        var isToday = i === DAILY_SALES.length - 1;
        var col = el("div", "chart-bar" + (isToday ? " chart-bar--today" : ""));
        var val = el("div", "chart-bar__value tnum", (d.amt / 1000).toFixed(1) + "k");
        var fill = el("div", "chart-bar__fill");
        fill.style.height = Math.round((d.amt / max) * 100) + "%";
        col.appendChild(val); col.appendChild(fill);
        barsRow.appendChild(col);
        daysRow.appendChild(el("span", null, d.day));
      });
      wrap.appendChild(barsRow);
      wrap.appendChild(daysRow);
    }

    function renderRankList() {
      var wrap = $("#rankList");
      wrap.innerHTML = "";
      var showMargin = state.role === "manager";
      TOP_SELLERS.forEach(function (item, i) {
        var row = el("div", "rank-item");
        row.appendChild(el("span", "rank-badge", String(i + 1)));
        row.appendChild(el("span", "rank-item__name", item.name));
        row.appendChild(el("span", "rank-item__qty", item.qty + " sold"));
        row.appendChild(el("span", "rank-item__val tnum", peso(item.revenue)));
        if (showMargin) { row.appendChild(el("span", "rank-item__margin tnum", item.margin + "% margin")); }
        wrap.appendChild(row);
      });
    }

    function renderIncidents() {
      var wrap = $("#incidentList");
      wrap.innerHTML = "";
      STOCK_OUT_INCIDENTS.forEach(function (inc) {
        var item = el("div", "incident-item");
        var top = el("div", "incident-item__top");
        top.appendChild(el("span", null, inc.item));
        top.appendChild(el("span", "status-pill status-pill--" + inc.status, inc.status === "ongoing" ? "ONGOING" : "RESOLVED"));
        item.appendChild(top);
        var meta = el("div", "incident-item__meta");
        meta.appendChild(el("span", null, "Out since " + inc.start));
        meta.appendChild(el("span", null, "~" + inc.lost + " missed order" + (inc.lost === 1 ? "" : "s")));
        item.appendChild(meta);
        item.appendChild(el("div", "incident-item__meta", inc.duration));
        wrap.appendChild(item);
      });
    }

    function renderStaffTable() {
      var wrap = $("#staffTable");
      wrap.innerHTML = "";
      STAFF_ACTIVITY.forEach(function (s) {
        var row = el("div", "staff-row");
        var nameCell = el("div", "staff-row__name");
        nameCell.appendChild(document.createTextNode(s.name));
        if (s.flag) { nameCell.appendChild(el("span", "flag-pill", "REVIEW")); }
        row.appendChild(nameCell);
        row.appendChild(el("div", "tnum", String(s.voids) + " voids"));
        row.appendChild(el("div", "tnum", String(s.adjustments) + " adj."));
        row.appendChild(el("div", "tnum", peso(s.value)));
        wrap.appendChild(row);
      });
    }

    function renderCloseoutList() {
      $("#wastageWeekTotal").textContent = peso(state.wastageWeekTotal);
      var wrap = $("#closeoutList");
      wrap.innerHTML = "";
      state.closeouts.forEach(function (c) {
        var item = el("div", "closeout-item");
        var top = el("div", "closeout-item__top");
        top.appendChild(el("span", null, c.dateLabel + " · Ticket " + c.ticketRange));
        top.appendChild(el("span", "tnum", varianceText(c.variance)));
        item.appendChild(top);
        item.appendChild(el("div", "closeout-item__meta", "Wastage " + peso(c.wasteValue) + " · Closed by " + c.closedBy));
        wrap.appendChild(item);
      });
    }

    function renderDashboard() {
      renderChart();
      renderRankList();
      renderIncidents();
      renderStaffTable();
      renderCloseoutList();
      applyRoleMasking();
    }

    /* ---------------- init ---------------- */
    renderTabs();
    renderGrid();
    renderCart();
    renderHeld();
    $("#cashFloat").textContent = peso(CASH_FLOAT);
    $("#cashSystemSales").textContent = peso(CASH_SYSTEM_SALES);
    $("#cashExpected").textContent = peso(cashExpectedTotal());
    renderWasteRows();
    renderWizardChrome();
  })();
