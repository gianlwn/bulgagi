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
      fbMode: false,
      openFlavorCard: null
    };

    // Unified order queue shared by Screen 1 (Held Orders bar) and Screen 2 (Order Queue).
    // order: { id, ticket, type: 'instore'|'facebook'|'grabfood'|'foodpanda',
    //          status: 'HELD'|'PENDING_PAYMENT'|'PREPARING'|'READY',
    //          cart, customer: {name,phone,address}|null, payment: {method}|null, total }
    var orders = [
      {
        id: "seed1", ticket: 45, type: "instore", status: "HELD", total: 655,
        customer: null, payment: null,
        cart: [
          { uid: "h1", productId: "c3", name: "Whole Bucket", flavor: "Honey Garlic", price: 555, qty: 1 },
          { uid: "h2", productId: "a2", name: "Regular Fries", flavor: null, price: 50, qty: 2 }
        ]
      },
      {
        id: "seed2", ticket: 46, type: "instore", status: "HELD", total: 115,
        customer: null, payment: null,
        cart: [
          { uid: "h3", productId: "s3", name: "Chick n' Cheese", flavor: null, price: 115, qty: 1 }
        ]
      }
    ];

    var modalState = { mode: null, order: null }; // mode: 'new-fb' | 'view-fb' | 'view-instore'

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

    function lineTotal(cart) { return cart.reduce(function (s, l) { return s + l.price * l.qty; }, 0); }

    function nextTicket() {
      var t = state.ticketNo;
      state.ticketNo += 1;
      updateTicketDisplays();
      return t;
    }
    function updateTicketDisplays() {
      $("#ticketNo").textContent = "#" + state.ticketNo;
      $("#ticketNoSide").textContent = "#" + state.ticketNo;
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

    function cartTotal() { return lineTotal(state.cart); }

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
      $("#orderTotals").hidden = state.cart.length === 0;

      updateOrderActionsUI();
    }

    /* ---------------- Facebook mode / order actions ---------------- */
    function updateOrderActionsUI() {
      var holdBtn = $("#holdBtn");
      var chargeBtn = $("#chargeBtn");
      var actions = $("#orderActions");
      holdBtn.hidden = state.fbMode;
      actions.classList.toggle("order-actions--single", state.fbMode);
      if (state.fbMode) {
        chargeBtn.textContent = "Generate QR Checkout";
      } else {
        chargeBtn.innerHTML = 'Charge <span class="tnum">' + peso(cartTotal()) + '</span>';
      }
      chargeBtn.disabled = state.cart.length === 0;
      holdBtn.disabled = state.cart.length === 0;
    }

    $("#fbModeToggle").addEventListener("change", function (e) {
      state.fbMode = e.target.checked;
      updateOrderActionsUI();
    });

    $("#holdBtn").addEventListener("click", function () {
      if (state.cart.length === 0) return;
      var order = {
        id: "ord" + Date.now(), ticket: state.ticketNo, type: "instore", status: "HELD",
        cart: state.cart, customer: null, payment: null, total: cartTotal()
      };
      orders.push(order);
      state.cart = [];
      nextTicket();
      renderCart();
      renderHeld();
      renderQueue();
      showToast("Order held — new ticket opened");
    });

    function chargeCurrentOrder() {
      if (state.cart.length === 0) return;
      var order = {
        id: "ord" + Date.now(), ticket: state.ticketNo, type: "instore", status: "PREPARING",
        cart: state.cart, customer: null, payment: null, total: cartTotal()
      };
      orders.push(order);
      var amt = peso(order.total);
      var t = order.ticket;
      state.cart = [];
      nextTicket();
      renderCart();
      renderQueue();
      deductInventoryForCart(order.cart);
      showToast("Ticket #" + t + " sent to kitchen · " + amt + " charged");
    }

    $("#chargeBtn").addEventListener("click", function () {
      if (this.disabled) return;
      if (state.fbMode) { openFacebookModal(); }
      else { chargeCurrentOrder(); }
    });

    /* ---------------- held orders bar ---------------- */
    function renderHeld() {
      var wrap = $("#heldChips");
      wrap.innerHTML = "";
      var list = orders.filter(function (o) { return o.status === "HELD" || o.status === "PENDING_PAYMENT"; });
      if (list.length === 0) {
        wrap.appendChild(el("span", "held-strip__empty", "No held orders"));
        return;
      }
      list.forEach(function (o) {
        var chip = el("button", "held-chip");
        chip.type = "button";
        var itemCount = o.cart.reduce(function (s, l) { return s + l.qty; }, 0);
        var tag = o.type === "facebook" ? "FB" : "In-Store";
        chip.appendChild(el("div", "held-chip__top", "<span>#" + o.ticket + " · " + tag + "</span><span>" + itemCount + " item" + (itemCount === 1 ? "" : "s") + "</span>"));
        chip.appendChild(el("div", "held-chip__meta", o.status === "PENDING_PAYMENT" ? "Pending payment" : "Held"));
        chip.addEventListener("click", function () { openExistingOrderModal(o.id); });
        wrap.appendChild(chip);
      });
    }

    /* ---------------- order detail modal ---------------- */
    function openFacebookModal() {
      if (state.cart.length === 0) return;
      var draft = {
        id: null, ticket: state.ticketNo, type: "facebook", status: "PENDING_PAYMENT",
        cart: state.cart.slice(), customer: { name: "", phone: "", address: "" }, payment: { method: "gcash" },
        total: cartTotal()
      };
      modalState = { mode: "new-fb", order: draft };
      renderOrderModal();
      $("#orderModalScrim").hidden = false;
    }

    function openExistingOrderModal(orderId) {
      var order = orders.filter(function (o) { return o.id === orderId; })[0];
      if (!order) return;
      var mode = order.type === "facebook" ? "view-fb" : "view-instore";
      var draft = {
        id: order.id, ticket: order.ticket, type: order.type, status: order.status,
        cart: order.cart, total: order.total,
        customer: order.customer ? { name: order.customer.name, phone: order.customer.phone, address: order.customer.address } : { name: "", phone: "", address: "" },
        payment: order.payment ? { method: order.payment.method } : { method: "gcash" }
      };
      modalState = { mode: mode, order: draft };
      renderOrderModal();
      $("#orderModalScrim").hidden = false;
    }

    function closeOrderModal() {
      $("#orderModalScrim").hidden = true;
      modalState = { mode: null, order: null };
    }

    function renderOrderModal() {
      var mode = modalState.mode, order = modalState.order;
      var isFb = order.type === "facebook";

      $("#orderModalTitle").textContent = isFb ? "Facebook Order" : "In-Store Held Order";
      $("#orderModalTicket").textContent = "Ticket #" + order.ticket;

      var pill = $("#orderModalStatus");
      pill.textContent = order.status === "PENDING_PAYMENT" ? "PENDING PAYMENT" : "HELD";

      var itemsWrap = $("#orderModalItems");
      itemsWrap.innerHTML = "";
      order.cart.forEach(function (l) {
        var li = document.createElement("li");
        li.innerHTML = "<span>" + l.qty + "x " + l.name + (l.flavor ? " <em>· " + l.flavor + "</em>" : "") + "</span><span class='tnum'>" + peso(l.price * l.qty) + "</span>";
        itemsWrap.appendChild(li);
      });
      order.total = lineTotal(order.cart);
      $("#orderModalTotal").textContent = peso(order.total);

      $("#orderModalCustomerBlock").hidden = !isFb;
      $("#orderModalPaymentBlock").hidden = !isFb;

      if (isFb) {
        $("#modalCustName").value = order.customer.name || "";
        $("#modalCustPhone").value = order.customer.phone || "";
        $("#modalCustAddr").value = order.customer.address || "";
        var method = order.payment.method || "gcash";
        $all(".ck-paymethod", $("#modalPayMethods")).forEach(function (b) { b.classList.toggle("is-active", b.dataset.method === method); });
        $("#modalQrPanel").hidden = method !== "qrph";
      }

      var secondaryBtn = $("#orderModalSecondaryBtn");
      var primaryBtn = $("#orderModalPrimaryBtn");
      if (mode === "new-fb") {
        secondaryBtn.textContent = "Cancel";
        primaryBtn.textContent = "Save & Move to Pending";
      } else if (mode === "view-fb") {
        secondaryBtn.textContent = "Save Changes";
        primaryBtn.textContent = "Simulate Payment Success";
      } else if (mode === "view-instore") {
        secondaryBtn.textContent = "Resume on POS";
        primaryBtn.textContent = "Release to Kitchen";
      }
    }

    $("#orderModalCloseBtn").addEventListener("click", closeOrderModal);

    $("#modalPayMethods").addEventListener("click", function (ev) {
      var btn = ev.target.closest(".ck-paymethod");
      if (!btn || !modalState.order) return;
      $all(".ck-paymethod", $("#modalPayMethods")).forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      var method = btn.dataset.method;
      modalState.order.payment.method = method;
      $("#modalQrPanel").hidden = method !== "qrph";
    });

    function readModalCustomerFields() {
      return {
        name: $("#modalCustName").value.trim(),
        phone: $("#modalCustPhone").value.trim(),
        address: $("#modalCustAddr").value.trim()
      };
    }

    function saveFacebookDraft() {
      var customer = readModalCustomerFields();
      if (!customer.name || !customer.phone || !customer.address) {
        showToast("Fill in customer name, contact number, and delivery address");
        return;
      }
      var order = modalState.order;
      order.id = "ord" + Date.now();
      order.customer = customer;
      order.total = lineTotal(order.cart);
      orders.push(order);

      state.cart = [];
      state.fbMode = false;
      $("#fbModeToggle").checked = false;
      nextTicket();
      renderCart();
      closeOrderModal();
      renderHeld();
      renderQueue();
      showToast("Ticket #" + order.ticket + " saved to Pending — FB");
    }

    function updateFacebookOrder() {
      var customer = readModalCustomerFields();
      if (!customer.name || !customer.phone || !customer.address) {
        showToast("Fill in customer name, contact number, and delivery address");
        return;
      }
      var real = orders.filter(function (o) { return o.id === modalState.order.id; })[0];
      if (!real) return;
      real.customer = customer;
      real.payment.method = modalState.order.payment.method;
      closeOrderModal();
      renderHeld();
      renderQueue();
      showToast("Changes saved for ticket #" + real.ticket);
    }

    function releaseToKitchen(orderId) {
      var order = orders.filter(function (o) { return o.id === orderId; })[0];
      if (!order) return;
      order.status = "PREPARING";
      closeOrderModal();
      renderHeld();
      renderQueue();
      deductInventoryForCart(order.cart);
      showToast("Ticket #" + order.ticket + " released to kitchen");
    }

    function resumeOnPos(orderId) {
      if (state.cart.length > 0) {
        showToast("Hold or clear the current order before resuming another ticket");
        return;
      }
      var idx = orders.findIndex(function (o) { return o.id === orderId; });
      if (idx === -1) return;
      var order = orders[idx];
      state.cart = order.cart;
      orders.splice(idx, 1);
      state.ticketNo = order.ticket;
      updateTicketDisplays();
      renderCart();
      closeOrderModal();
      renderHeld();
      renderQueue();
      showToast("Resumed ticket #" + order.ticket);
    }

    $("#orderModalSecondaryBtn").addEventListener("click", function () {
      if (!modalState.mode) return;
      if (modalState.mode === "new-fb") { closeOrderModal(); }
      else if (modalState.mode === "view-fb") { updateFacebookOrder(); }
      else if (modalState.mode === "view-instore") { resumeOnPos(modalState.order.id); }
    });
    $("#orderModalPrimaryBtn").addEventListener("click", function () {
      if (!modalState.mode) return;
      if (modalState.mode === "new-fb") { saveFacebookDraft(); }
      else if (modalState.mode === "view-fb") { releaseToKitchen(modalState.order.id); }
      else if (modalState.mode === "view-instore") { releaseToKitchen(modalState.order.id); }
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
      queue: { view: "queueView", tab: "tabQueue" },
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
      if (v === "queue") { renderQueue(); }
      if (v === "dashboard") { renderDashboard(); }
    }

    /* ---------------- Screen 2 — centralized order queue ---------------- */
    var TYPE_LABEL = { instore: "In-Store", facebook: "Facebook", grabfood: "GrabFood", foodpanda: "Foodpanda" };

    function renderQueueCard(order) {
      var card = el("div", "queue-card");

      var top = el("div", "queue-card__top");
      top.appendChild(el("span", "queue-card__ticket tnum", "#" + order.ticket));
      top.appendChild(el("span", "queue-card__type queue-card__type--" + order.type, TYPE_LABEL[order.type]));
      card.appendChild(top);

      var itemCount = order.cart.reduce(function (s, l) { return s + l.qty; }, 0);
      card.appendChild(el("div", "queue-card__meta", itemCount + " item" + (itemCount === 1 ? "" : "s") + " · " + peso(lineTotal(order.cart))));

      if (order.customer && order.customer.name) {
        card.appendChild(el("div", "queue-card__customer", order.customer.name));
      }

      var actions = el("div", "queue-card__actions");
      if (order.status === "HELD" || order.status === "PENDING_PAYMENT") {
        var openBtn = el("button", "btn btn--ghost btn--sm", "Open Details");
        openBtn.type = "button";
        openBtn.addEventListener("click", function () { openExistingOrderModal(order.id); });
        actions.appendChild(openBtn);
      } else if (order.status === "PREPARING") {
        var readyBtn = el("button", "btn btn--primary btn--sm", "Mark Ready");
        readyBtn.type = "button";
        readyBtn.addEventListener("click", function () { markReady(order.id); });
        actions.appendChild(readyBtn);
      } else if (order.status === "READY") {
        var completeBtn = el("button", "btn btn--primary btn--sm", "Complete Order");
        completeBtn.type = "button";
        completeBtn.addEventListener("click", function () { completeOrder(order.id); });
        actions.appendChild(completeBtn);
      }
      card.appendChild(actions);

      return card;
    }

    function fillQueueColumn(sel, list) {
      var wrap = $(sel);
      wrap.innerHTML = "";
      if (list.length === 0) {
        wrap.appendChild(el("p", "queue-col__empty", "No orders here."));
        return;
      }
      list.forEach(function (o) { wrap.appendChild(renderQueueCard(o)); });
    }

    function renderQueue() {
      var pending = orders.filter(function (o) { return o.status === "HELD" || o.status === "PENDING_PAYMENT"; });
      var preparing = orders.filter(function (o) { return o.status === "PREPARING"; });
      var ready = orders.filter(function (o) { return o.status === "READY"; });

      fillQueueColumn("#colPending", pending);
      fillQueueColumn("#colPreparing", preparing);
      fillQueueColumn("#colReady", ready);
      $("#countPending").textContent = String(pending.length);
      $("#countPreparing").textContent = String(preparing.length);
      $("#countReady").textContent = String(ready.length);
    }

    function markReady(orderId) {
      var order = orders.filter(function (o) { return o.id === orderId; })[0];
      if (!order) return;
      order.status = "READY";
      renderQueue();
      showToast("Ticket #" + order.ticket + " marked ready for dispatch");
    }

    function completeOrder(orderId) {
      var idx = orders.findIndex(function (o) { return o.id === orderId; });
      if (idx === -1) return;
      var order = orders[idx];
      orders.splice(idx, 1);
      state.dashboard.grossSales += order.total;
      state.dashboard.ordersToday += 1;
      updateDashboardKpis();
      renderQueue();
      showToast("Ticket #" + order.ticket + " completed · sales updated");
    }

    var SAMPLE_QTY = [1, 1, 2];
    function simulatePlatformOrder(type) {
      var pool = PRODUCTS.filter(function (p) { return p.stock !== "out"; });
      var itemCount = 1 + Math.floor(Math.random() * 2);
      var cart = [];
      for (var i = 0; i < itemCount; i++) {
        var p = pool[Math.floor(Math.random() * pool.length)];
        var flavor = p.flavors ? FLAVORS[Math.floor(Math.random() * FLAVORS.length)] : null;
        cart.push({
          uid: p.id + "-" + i + "-" + Date.now(), productId: p.id, name: p.name, flavor: flavor,
          price: p.price, qty: SAMPLE_QTY[Math.floor(Math.random() * SAMPLE_QTY.length)]
        });
      }
      var ticket = nextTicket();
      var order = { id: "ord" + Date.now(), ticket: ticket, type: type, status: "PREPARING", cart: cart, customer: null, payment: { method: "platform-prepaid" }, total: lineTotal(cart) };
      orders.push(order);
      renderQueue();
      deductInventoryForCart(order.cart);
      showToast(TYPE_LABEL[type] + " order #" + ticket + " received — pre-paid, sent to kitchen");
    }
    $("#simGrabBtn").addEventListener("click", function () { simulatePlatformOrder("grabfood"); });
    $("#simPandaBtn").addEventListener("click", function () { simulatePlatformOrder("foodpanda"); });

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
    state.dashboard = { grossSales: 18940, ordersToday: 146 };
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

    function updateDashboardKpis() {
      $("#kpiSales").textContent = peso(state.dashboard.grossSales);
      $("#kpiOrders").textContent = String(state.dashboard.ordersToday);
      $("#kpiAvg").textContent = peso(state.dashboard.grossSales / state.dashboard.ordersToday);
    }

    function renderDashboard() {
      updateDashboardKpis();
      renderChart();
      renderRankList();
      renderIncidents();
      renderStaffTable();
      renderCloseoutList();
      applyRoleMasking();
    }

    /* ---------------- dashboard sub-tabs (Sales Analytics / Inventory Console) ---------------- */
    $("#dashSubtabs").addEventListener("click", function (ev) {
      var btn = ev.target.closest(".dash-subtab");
      if (!btn) return;
      switchDashSubtab(btn.dataset.subtab);
    });
    function switchDashSubtab(tab) {
      $all(".dash-subtab").forEach(function (b) {
        var active = b.dataset.subtab === tab;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active);
      });
      $("#salesSubview").hidden = tab !== "sales";
      $("#inventorySubview").hidden = tab !== "inventory";
      if (tab === "inventory") { renderInventoryLedger(); renderStockAudit(); }
    }

    /* ---------------- Inventory Console (Screen 4) ---------------- */
    // Local-state simulation only — no backend/database. Separate from the
    // Shift Closeout wizard's RAW_MATERIALS so Screen 3 stays untouched.
    var INVENTORY_ITEMS = [
      { id: "inv1", name: "Raw Chicken", unit: "g", stockQty: 15000, reorderThreshold: 5000 },
      { id: "inv2", name: "Breading Mix", unit: "g", stockQty: 8000, reorderThreshold: 2500 },
      { id: "inv3", name: "Cooking Oil", unit: "ml", stockQty: 12000, reorderThreshold: 4000 },
      { id: "inv4", name: "Plain Rice", unit: "g", stockQty: 10000, reorderThreshold: 3000 },
      { id: "inv5", name: "Yangnyeom Sauce", unit: "ml", stockQty: 5000, reorderThreshold: 1500 },
      { id: "inv6", name: "Honey Garlic Sauce", unit: "ml", stockQty: 4500, reorderThreshold: 1500 },
      { id: "inv7", name: "Burger Buns", unit: "pcs", stockQty: 120, reorderThreshold: 30 },
      { id: "inv8", name: "Cheese Slices", unit: "pcs", stockQty: 150, reorderThreshold: 40 },
      { id: "inv9", name: "Softdrink Syrup", unit: "ml", stockQty: 6000, reorderThreshold: 2000 },
      { id: "inv10", name: "Fries Potato Cut", unit: "g", stockQty: 9000, reorderThreshold: 3000 }
    ];

    // Bill of Materials: ingredient consumption per 1 unit sold, by product id.
    var BOM_BY_PRODUCT = {
      c1: [{ invId: "inv1", qty: 260 }, { invId: "inv2", qty: 90 }, { invId: "inv3", qty: 60 }, { invId: "inv6", qty: 40 }],
      c2: [{ invId: "inv1", qty: 520 }, { invId: "inv2", qty: 180 }, { invId: "inv3", qty: 120 }, { invId: "inv6", qty: 80 }],
      c3: [{ invId: "inv1", qty: 1040 }, { invId: "inv2", qty: 360 }, { invId: "inv3", qty: 240 }, { invId: "inv6", qty: 160 }],
      c4: [{ invId: "inv1", qty: 520 }, { invId: "inv2", qty: 180 }, { invId: "inv3", qty: 120 }, { invId: "inv4", qty: 400 }, { invId: "inv6", qty: 80 }],
      c5: [{ invId: "inv1", qty: 1040 }, { invId: "inv2", qty: 360 }, { invId: "inv3", qty: 240 }, { invId: "inv9", qty: 300 }],
      c6: [{ invId: "inv1", qty: 2080 }, { invId: "inv2", qty: 720 }, { invId: "inv3", qty: 480 }, { invId: "inv9", qty: 300 }],
      c7: [{ invId: "inv1", qty: 175 }, { invId: "inv2", qty: 60 }, { invId: "inv3", qty: 40 }, { invId: "inv4", qty: 200 }],
      c8: [{ invId: "inv1", qty: 260 }, { invId: "inv2", qty: 90 }, { invId: "inv3", qty: 60 }, { invId: "inv4", qty: 200 }],

      w1: [{ invId: "inv1", qty: 300 }, { invId: "inv2", qty: 100 }, { invId: "inv3", qty: 70 }, { invId: "inv5", qty: 40 }],
      w2: [{ invId: "inv1", qty: 480 }, { invId: "inv2", qty: 160 }, { invId: "inv3", qty: 110 }, { invId: "inv5", qty: 70 }],
      w3: [{ invId: "inv1", qty: 600 }, { invId: "inv2", qty: 200 }, { invId: "inv3", qty: 140 }, { invId: "inv5", qty: 90 }],
      w4: [{ invId: "inv1", qty: 480 }, { invId: "inv2", qty: 160 }, { invId: "inv3", qty: 110 }, { invId: "inv4", qty: 400 }, { invId: "inv5", qty: 70 }],
      w5: [{ invId: "inv1", qty: 600 }, { invId: "inv2", qty: 200 }, { invId: "inv3", qty: 140 }, { invId: "inv9", qty: 300 }],
      w6: [{ invId: "inv1", qty: 1200 }, { invId: "inv2", qty: 400 }, { invId: "inv3", qty: 280 }, { invId: "inv9", qty: 300 }],
      w7: [{ invId: "inv1", qty: 120 }, { invId: "inv2", qty: 40 }, { invId: "inv3", qty: 30 }, { invId: "inv4", qty: 200 }],
      w8: [{ invId: "inv1", qty: 180 }, { invId: "inv2", qty: 60 }, { invId: "inv3", qty: 45 }, { invId: "inv4", qty: 200 }],

      s1: [{ invId: "inv1", qty: 130 }, { invId: "inv2", qty: 45 }, { invId: "inv3", qty: 30 }, { invId: "inv7", qty: 1 }],
      s2: [{ invId: "inv1", qty: 130 }, { invId: "inv2", qty: 45 }, { invId: "inv3", qty: 30 }, { invId: "inv7", qty: 1 }],
      s3: [{ invId: "inv1", qty: 130 }, { invId: "inv2", qty: 45 }, { invId: "inv3", qty: 30 }, { invId: "inv7", qty: 1 }, { invId: "inv8", qty: 1 }],
      s4: [{ invId: "inv7", qty: 1 }],
      s5: [{ invId: "inv7", qty: 1 }, { invId: "inv8", qty: 2 }],
      s6: [{ invId: "inv7", qty: 1 }, { invId: "inv8", qty: 2 }],

      a1: [{ invId: "inv2", qty: 30 }, { invId: "inv3", qty: 40 }],
      a2: [{ invId: "inv10", qty: 150 }, { invId: "inv3", qty: 60 }],
      a3: [{ invId: "inv8", qty: 6 }, { invId: "inv2", qty: 40 }, { invId: "inv3", qty: 50 }],
      a4: [{ invId: "inv10", qty: 200 }, { invId: "inv3", qty: 80 }, { invId: "inv8", qty: 2 }],
      a5: [{ invId: "inv10", qty: 150 }, { invId: "inv3", qty: 60 }],

      d1: [{ invId: "inv9", qty: 60 }],
      d2: [{ invId: "inv9", qty: 60 }],
      d3: [{ invId: "inv9", qty: 60 }],
      d4: [{ invId: "inv9", qty: 50 }],
      d5: [{ invId: "inv9", qty: 40 }]
    };

    var inventory = { auditCounts: {} };

    function findInventoryItem(id) { return INVENTORY_ITEMS.filter(function (i) { return i.id === id; })[0]; }

    function deductInventoryForCart(cart) {
      cart.forEach(function (line) {
        var bom = BOM_BY_PRODUCT[line.productId];
        if (!bom) return;
        bom.forEach(function (b) {
          var item = findInventoryItem(b.invId);
          if (!item) return;
          item.stockQty = Math.max(0, item.stockQty - b.qty * line.qty);
        });
      });
      renderInventoryLedger();
      renderStockAudit();
    }

    function renderInventoryLedger() {
      var wrap = $("#invLedgerRows");
      if (!wrap) return;
      wrap.innerHTML = "";
      INVENTORY_ITEMS.forEach(function (item) {
        var low = item.stockQty < item.reorderThreshold;
        var row = el("div", "inv-row" + (low ? " inv-row--low" : ""));
        row.appendChild(el("div", "inv-row__name", item.name));
        row.appendChild(el("div", "tnum", item.stockQty.toLocaleString("en-US") + " " + item.unit));
        row.appendChild(el("div", null, item.unit));
        row.appendChild(el("div", "tnum", item.reorderThreshold.toLocaleString("en-US") + " " + item.unit));
        row.appendChild(el("div", null, low ? "<span class='badge badge--out'>⚠️ Low Stock</span>" : "<span class='badge badge--ok'>OK</span>"));
        wrap.appendChild(row);
      });
    }

    function computeVariancePct(item) {
      var physical = inventory.auditCounts[item.id];
      if (physical == null || isNaN(physical)) return null;
      if (item.stockQty === 0) return physical === 0 ? 0 : 100;
      return ((item.stockQty - physical) / item.stockQty) * 100;
    }

    function renderStockAudit() {
      var wrap = $("#auditRows");
      if (!wrap) return;
      wrap.innerHTML = "";
      INVENTORY_ITEMS.forEach(function (item) {
        var row = el("div", "audit-row");

        var nameCell = el("div", "audit-row__name");
        nameCell.appendChild(el("div", "audit-row__mat", item.name));
        nameCell.appendChild(el("div", "audit-row__sys tnum", "System: " + item.stockQty.toLocaleString("en-US") + " " + item.unit));
        row.appendChild(nameCell);

        var input = document.createElement("input");
        input.type = "number"; input.min = "0"; input.step = "1";
        input.className = "audit-row__input tnum";
        input.placeholder = "Physical count";
        input.value = inventory.auditCounts[item.id] != null ? inventory.auditCounts[item.id] : "";

        var varianceSpan = el("span", "audit-row__variance tnum", "—");

        input.addEventListener("input", function () {
          var val = parseFloat(input.value);
          inventory.auditCounts[item.id] = isNaN(val) ? null : val;
          updateVarianceCell(item, varianceSpan);
        });
        row.appendChild(input);

        updateVarianceCell(item, varianceSpan);
        row.appendChild(varianceSpan);

        wrap.appendChild(row);
      });
    }

    function updateVarianceCell(item, span) {
      var pct = computeVariancePct(item);
      if (pct === null) {
        span.textContent = "—";
        span.classList.remove("audit-row__variance--warn");
        return;
      }
      var sign = pct > 0 ? "+" : "";
      span.textContent = sign + pct.toFixed(1) + "%";
      span.classList.toggle("audit-row__variance--warn", Math.abs(pct) > 5);
    }

    $("#submitAuditBtn").addEventListener("click", function () {
      INVENTORY_ITEMS.forEach(function (item) {
        var physical = inventory.auditCounts[item.id];
        if (physical != null && !isNaN(physical)) { item.stockQty = physical; }
      });
      inventory.auditCounts = {};
      renderInventoryLedger();
      renderStockAudit();
      showToast("Success: Inventory Re-aligned");
    });

    function populateInventorySelect(selectEl) {
      selectEl.innerHTML = "";
      INVENTORY_ITEMS.forEach(function (item) {
        var opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.name + " (" + item.unit + ")";
        selectEl.appendChild(opt);
      });
    }

    $("#addStockBtn").addEventListener("click", function () {
      var matId = $("#deliveryMaterial").value;
      var qty = parseFloat($("#deliveryQty").value);
      var invoice = $("#deliveryInvoice").value.trim();
      if (!matId || isNaN(qty) || qty <= 0) { showToast("Enter a valid quantity received"); return; }
      var item = findInventoryItem(matId);
      if (!item) return;
      item.stockQty += qty;
      $("#deliveryQty").value = "";
      $("#deliveryInvoice").value = "";
      renderInventoryLedger();
      renderStockAudit();
      showToast("Stock added: +" + qty + " " + item.unit + " " + item.name + (invoice ? " · Invoice " + invoice : ""));
    });

    $("#deductStockBtn").addEventListener("click", function () {
      var matId = $("#wastageMaterial").value;
      var qty = parseFloat($("#wastageQty").value);
      var reasonInput = $all('input[name="wastageReason"]').filter(function (r) { return r.checked; })[0];
      var reason = reasonInput ? reasonInput.value : "Spoilage";
      if (!matId || isNaN(qty) || qty <= 0) { showToast("Enter a valid quantity wasted"); return; }
      var item = findInventoryItem(matId);
      if (!item) return;
      item.stockQty = Math.max(0, item.stockQty - qty);
      $("#wastageQty").value = "";
      renderInventoryLedger();
      renderStockAudit();
      showToast("Stock deducted: −" + qty + " " + item.unit + " " + item.name + " · " + reason);
    });

    $("#invTabs").addEventListener("click", function (ev) {
      var btn = ev.target.closest(".inv-tab");
      if (!btn) return;
      switchInvTab(btn.dataset.invtab);
    });
    function switchInvTab(tab) {
      $all(".inv-tab").forEach(function (b) {
        var active = b.dataset.invtab === tab;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active);
      });
      $("#invPanelLedger").hidden = tab !== "ledger";
      $("#invPanelAudit").hidden = tab !== "audit";
      $("#invPanelLogs").hidden = tab !== "logs";
    }

    /* ---------------- init ---------------- */
    renderTabs();
    renderGrid();
    renderCart();
    renderHeld();
    renderQueue();
    updateDashboardKpis();
    $("#cashFloat").textContent = peso(CASH_FLOAT);
    $("#cashSystemSales").textContent = peso(CASH_SYSTEM_SALES);
    $("#cashExpected").textContent = peso(cashExpectedTotal());
    renderWasteRows();
    renderWizardChrome();
    renderInventoryLedger();
    renderStockAudit();
    populateInventorySelect($("#deliveryMaterial"));
    populateInventorySelect($("#wastageMaterial"));
  })();
