/* ------------------------------------------------------------------
 * EDITABLE CONFIG — SPayLater installment tiers.
 * Business team: replace `minPurchase: null` with the confirmed real
 * baht threshold for each tier once approved. Until then, leave the
 * value as `null` and the UI will render the "min. purchase ฿XXX"
 * placeholder automatically. `isDefault` marks the tier that is
 * pre-selected when the SPayLater accordion first opens.
 * ------------------------------------------------------------------ */
var installmentPlans = [
  { months: 3, minPurchase: null, isDefault: true },
  { months: 6, minPurchase: null, isDefault: false },
  { months: 10, minPurchase: null, isDefault: false },
  { months: 12, minPurchase: null, isDefault: false }
];

// Existing payment methods — copy/behavior unchanged, SPayLater appended.
var paymentMethods = [
  { id: "cod", icon: "💵", title: "Cash on Delivery", subtitle: "Cash, Credit Card, QR PromptPay" },
  { id: "bigc-credit", icon: "💳", title: "Online with Big C credit card", subtitle: "Get up to 7% discount" },
  { id: "credit-card", icon: "💳", title: "Credit card", subtitle: "Big C credit card discount not valid" },
  { id: "spaylater", icon: "🛍️", title: "SPayLater", subtitle: "0% installment, up to 12 months", badge: "New", isSPayLater: true }
];

/* ------------------------------------------------------------------
 * App state — a single object driving what's on screen. setState()
 * merges a patch into it and re-renders. Text inputs on the Shopee
 * screen are intentionally NOT wired to setState on every keystroke
 * (that would rebuild the DOM and kick focus out of the field they're
 * typing in); their values are read directly from the DOM instead,
 * at the moment "Confirm"/"Cancel" is pressed.
 * ------------------------------------------------------------------ */
var state = {
  screen: "home", // home | payment | summary | shopeeRedirect | success | failure
  selectedMethodId: null,
  selectedMonths: null,
  payerName: "",
  payerEmail: "",
  orderId: null,
  simulateFailure: false
};

function setState(patch) {
  Object.assign(state, patch);
  render();
}

function formatMinPurchase(minPurchase) {
  return minPurchase === null || minPurchase === undefined
    ? "min. purchase ฿XXX"
    : "min. purchase ฿" + minPurchase.toLocaleString();
}

function money(n) {
  return "฿" + n.toLocaleString();
}

function makeOrderId() {
  return "BC" + Math.floor(100000 + Math.random() * 900000);
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function findMethod(id) {
  return paymentMethods.filter(function (m) { return m.id === id; })[0];
}

/* ---------------------------- Screens ---------------------------- */

function renderStepBreadcrumb() {
  var steps = ["Delivery method", "Address", "Date & time", "Payment"];
  return (
    '<div class="steps">' +
    steps
      .map(function (label, i) {
        var isLast = i === steps.length - 1;
        var done = i < steps.length - 1;
        var stepClass = "step" + (done ? " done" : "") + (isLast ? " active" : "");
        var dot = '<span class="dot">' + (done ? "✓" : i + 1) + "</span>";
        var sep = isLast ? "" : '<span class="step-sep"></span>';
        return '<div class="' + stepClass + '">' + dot + "</div>" + sep;
      })
      .join("") +
    "</div>"
  );
}

function renderAppHeader(title, backAction) {
  var backBtn = backAction
    ? '<button class="back-btn" data-action="' + backAction + '" aria-label="Back">‹</button>'
    : "";
  return '<div class="app-header">' + backBtn + "<h1>" + title + "</h1></div>";
}

function renderDevBar() {
  return (
    '<div class="dev-bar">' +
    "<span><strong>DEV PREVIEW</strong> — reviewer tool, not part of the real app</span>" +
    "<label>" +
    '<input type="checkbox" data-action="toggle-sim-failure"' +
    (state.simulateFailure ? " checked" : "") +
    ">" +
    "Force payment failure" +
    "</label>" +
    "</div>"
  );
}

function renderSPayLaterOptions() {
  return (
    '<div class="accordion"><div class="installment-grid">' +
    installmentPlans
      .map(function (plan) {
        var selected = state.selectedMonths === plan.months;
        return (
          '<button type="button" class="installment-tile' +
          (selected ? " selected" : "") +
          '" data-action="select-months" data-months="' +
          plan.months +
          '">' +
          '<div class="months">0% for ' + plan.months + " months</div>" +
          '<div class="pct">0% interest</div>' +
          '<div class="min-purchase">' + formatMinPurchase(plan.minPurchase) + "</div>" +
          "</button>"
        );
      })
      .join("") +
    "</div></div>"
  );
}

function renderPaymentMethodScreen() {
  var canContinue =
    state.selectedMethodId &&
    (state.selectedMethodId !== "spaylater" || state.selectedMonths !== null);

  var optionsHtml = paymentMethods
    .map(function (method) {
      var isSelected = state.selectedMethodId === method.id;
      var badge = method.badge ? '<span class="badge-new">' + method.badge + "</span>" : "";
      var indicator = method.isSPayLater
        ? '<span class="chevron">' + (isSelected ? "▲" : "▼") + "</span>"
        : '<div class="radio' + (isSelected ? " checked" : "") + '"></div>';
      var row =
        '<div class="payment-option' + (isSelected ? " selected" : "") +
        '" data-action="select-method" data-method-id="' + method.id + '">' +
        '<div class="payment-icon">' + method.icon + "</div>" +
        '<div class="payment-text">' +
        '<div class="payment-title-row"><span class="payment-title">' + method.title + "</span>" + badge + "</div>" +
        '<div class="payment-subtitle">' + method.subtitle + "</div>" +
        "</div>" +
        indicator +
        "</div>";
      var accordion = method.isSPayLater && isSelected ? renderSPayLaterOptions() : "";
      return row + accordion;
    })
    .join("");

  return (
    '<div class="screen">' +
    renderAppHeader("Payment method", "back-home") +
    renderStepBreadcrumb() +
    '<div class="content">' +
    '<p class="section-title">Select payment method</p>' +
    '<div class="card">' + optionsHtml + "</div>" +
    "</div>" +
    '<div class="footer">' +
    '<button class="btn-primary" data-action="continue-payment"' +
    (canContinue ? "" : " disabled") +
    ">Continue</button>" +
    "</div>" +
    "</div>"
  );
}

function renderOrderSummaryScreen() {
  var method = findMethod(state.selectedMethodId);
  var isSPayLater = state.selectedMethodId === "spaylater";
  var subtotal = 1250;
  var deliveryFee = 40;
  var total = subtotal + deliveryFee;
  var paymentLabel = isSPayLater
    ? "SPayLater · " + state.selectedMonths + " months · 0%"
    : method.title;

  return (
    '<div class="screen">' +
    renderAppHeader("Order summary", "back-to-payment") +
    renderStepBreadcrumb() +
    '<div class="content">' +
    '<p class="section-title">Payment method</p>' +
    '<div class="card"><div class="selected-method-card">' +
    '<div><div class="label">Paying with</div><div class="value">' + paymentLabel + "</div></div>" +
    '<button class="link-btn" data-action="back-to-payment">Change</button>' +
    "</div></div>" +
    '<p class="section-title">Order details</p>' +
    '<div class="card" style="padding:14px">' +
    '<div class="summary-row"><span>Subtotal</span><span>' + money(subtotal) + "</span></div>" +
    '<div class="summary-row"><span>Delivery fee</span><span>' + money(deliveryFee) + "</span></div>" +
    '<div class="summary-row total"><span>Total</span><span>' + money(total) + "</span></div>" +
    "</div>" +
    "</div>" +
    '<div class="footer">' +
    '<button class="btn-primary" data-action="primary-summary-action">' +
    (isSPayLater ? "Continue to Shopee" : "Place order") +
    "</button>" +
    "</div>" +
    "</div>"
  );
}

function renderShopeeRedirectScreen() {
  return (
    '<div class="screen shopee-screen">' +
    renderAppHeader("Shopee", "cancel-shopee") +
    '<div class="shopee-banner">' +
    '<div class="logo">S</div>' +
    "<h2>Confirm your SPayLater payment</h2>" +
    "<p>0% for " + state.selectedMonths + " months · Redirected from Big C PLUS</p>" +
    "</div>" +
    '<div class="content">' +
    '<div class="form-card">' +
    '<div class="field" id="name-field">' +
    "<label>Payer name</label>" +
    '<input type="text" id="payer-name" placeholder="Full name as on ID" value="' + escapeHtml(state.payerName) + '">' +
    '<div class="error-text">Payer name is required.</div>' +
    "</div>" +
    '<div class="field" id="email-field">' +
    "<label>Email address</label>" +
    '<input type="email" id="payer-email" placeholder="you@example.com" value="' + escapeHtml(state.payerEmail) + '">' +
    '<div class="error-text">Enter a valid email address.</div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="footer">' +
    '<button class="btn-primary shopee-confirm" data-action="confirm-shopee">Confirm</button>' +
    '<button class="btn-secondary" data-action="cancel-shopee">Cancel</button>' +
    "</div>" +
    "</div>"
  );
}

function renderSuccessScreen() {
  var isSPayLater = state.selectedMethodId === "spaylater";
  var methodLabel = isSPayLater
    ? "SPayLater · " + state.selectedMonths + " months · 0%"
    : findMethod(state.selectedMethodId).title;

  return (
    '<div class="result-screen">' +
    '<div class="result-icon success">✓</div>' +
    '<div class="result-title">Payment successful</div>' +
    '<div class="result-sub">Your order has been placed.</div>' +
    '<div class="result-detail-card">' +
    '<div class="summary-row"><span>Order number</span><span>' + state.orderId + "</span></div>" +
    '<div class="summary-row"><span>Status</span><span class="status-pill paid">Paid</span></div>' +
    '<div class="summary-row"><span>Payment method</span><span>' + methodLabel + "</span></div>" +
    "</div>" +
    '<div class="result-actions">' +
    '<button class="btn-primary" data-action="back-home">Back home</button>' +
    "</div>" +
    "</div>"
  );
}

function renderFailureScreen() {
  return (
    '<div class="result-screen">' +
    '<div class="result-icon failure">!</div>' +
    '<div class="result-title">Payment failed</div>' +
    '<div class="result-sub">We couldn\'t complete your SPayLater payment.</div>' +
    '<div class="result-detail-card">' +
    '<div class="summary-row"><span>Order ID</span><span>' + state.orderId + "</span></div>" +
    '<div class="summary-row"><span>Status</span><span class="status-pill pending">Pending payment</span></div>' +
    "</div>" +
    '<div class="result-actions">' +
    '<button class="btn-primary danger" data-action="pay-again">Pay again</button>' +
    '<button class="btn-secondary" data-action="back-home">Back home</button>' +
    "</div>" +
    "</div>"
  );
}

function renderHomeScreen() {
  return (
    '<div class="home-screen">' +
    '<div class="home-logo">BC+</div>' +
    '<h1 class="home-title">Big C PLUS</h1>' +
    '<p class="home-sub">SPayLater checkout prototype. Start the demo to walk through selecting SPayLater, choosing an installment tenure, and the Shopee payment handoff.</p>' +
    '<button class="btn-primary" data-action="start-checkout">Start checkout demo</button>' +
    "</div>"
  );
}

function renderScreen() {
  switch (state.screen) {
    case "payment": return renderPaymentMethodScreen();
    case "summary": return renderOrderSummaryScreen();
    case "shopeeRedirect": return renderShopeeRedirectScreen();
    case "success": return renderSuccessScreen();
    case "failure": return renderFailureScreen();
    default: return renderHomeScreen();
  }
}

function render() {
  var root = document.getElementById("root");
  root.innerHTML = '<div class="phone">' + renderDevBar() + renderScreen() + "</div>";
}

/* ---------------------------- Actions ---------------------------- */

function resetToHome() {
  setState({
    screen: "home",
    selectedMethodId: null,
    selectedMonths: null,
    payerName: "",
    payerEmail: "",
    orderId: null
  });
}

function handleSelectMethod(id) {
  if (id === "spaylater") {
    var defaultPlan = installmentPlans.filter(function (p) { return p.isDefault; })[0];
    setState({
      selectedMethodId: id,
      selectedMonths: defaultPlan ? defaultPlan.months : installmentPlans[0].months
    });
  } else {
    setState({ selectedMethodId: id, selectedMonths: null });
  }
}

function handleContinueFromPayment() {
  if (!state.selectedMethodId) return;
  if (state.selectedMethodId === "spaylater" && state.selectedMonths === null) return;
  setState({ orderId: makeOrderId(), screen: "summary" });
}

function handlePrimaryFromSummary() {
  setState({ screen: state.selectedMethodId === "spaylater" ? "shopeeRedirect" : "success" });
}

function handleConfirmShopee() {
  var nameInput = document.getElementById("payer-name");
  var emailInput = document.getElementById("payer-email");
  var nameField = document.getElementById("name-field");
  var emailField = document.getElementById("email-field");

  var name = nameInput.value;
  var email = emailInput.value;
  var nameValid = name.trim().length > 0;
  var emailValid = /\S+@\S+\.\S+/.test(email);

  nameField.classList.toggle("has-error", !nameValid);
  emailField.classList.toggle("has-error", !emailValid);

  // Persist whatever was typed so it survives a "Pay again" retry loop,
  // without re-rendering on every keystroke (which would drop focus).
  state.payerName = name;
  state.payerEmail = email;

  if (!nameValid || !emailValid) return;

  setState({ screen: state.simulateFailure ? "failure" : "success" });
}

/* ------------------------- Event delegation ------------------------- */

document.addEventListener("click", function (e) {
  var target = e.target.closest("[data-action]");
  if (!target) return;
  var action = target.dataset.action;

  switch (action) {
    case "start-checkout":
      setState({ screen: "payment" });
      break;
    case "select-method":
      handleSelectMethod(target.dataset.methodId);
      break;
    case "select-months":
      setState({ selectedMonths: Number(target.dataset.months) });
      break;
    case "continue-payment":
      handleContinueFromPayment();
      break;
    case "back-to-payment":
      setState({ screen: "payment" });
      break;
    case "primary-summary-action":
      handlePrimaryFromSummary();
      break;
    case "cancel-shopee":
      setState({ screen: "summary" });
      break;
    case "confirm-shopee":
      handleConfirmShopee();
      break;
    case "pay-again":
      setState({ screen: "shopeeRedirect" });
      break;
    case "back-home":
      resetToHome();
      break;
  }
});

document.addEventListener("change", function (e) {
  if (e.target.dataset.action === "toggle-sim-failure") {
    state.simulateFailure = e.target.checked;
  }
});

render();
