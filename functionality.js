document.addEventListener("DOMContentLoaded", () => {
    const gridSection = document.getElementById("grid-section");
    const listSection = document.getElementById("symbol-list");
    const addButton = document.getElementById("add-symbol-btn");
    const dropdown = document.getElementById("symbol-dropdown");
  
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const querySymbol = urlParams.get("query");
    
    // Prefill symbol from URL
    if (querySymbol) {
      addSymbol(querySymbol.toUpperCase());
    }
  
    // Load saved symbols
    const savedSymbols = JSON.parse(localStorage.getItem("cryptoSymbols")) || [];
    savedSymbols.forEach(addMiniChart);
  
    // Add symbol from dropdown
    addButton.addEventListener("click", () => {
      const symbol = dropdown.value.toUpperCase();
      if (symbol && !savedSymbols.includes(symbol)) {
        savedSymbols.push(symbol);
        localStorage.setItem("cryptoSymbols", JSON.stringify(savedSymbols));
        addMiniChart(symbol);
        dropdown.value = "";
      }
    });
  
    function addSymbol(symbol) {
      if (!savedSymbols.includes(symbol)) {
        savedSymbols.push(symbol);
        localStorage.setItem("cryptoSymbols", JSON.stringify(savedSymbols));
        addMiniChart(symbol);
      }
    }
  
    // Add Mini Chart Widget
    function addMiniChart(symbol) {
      const widget = document.createElement("div");
      widget.classList.add("mini-chart");
      widget.innerHTML = `
        <div class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <script type="text/javascript">
            new TradingView.MiniWidget({
              container_id: "tradingview_${symbol}",
              symbol: "CRYPTOCAP:${symbol}",
              width: "100%",
              height: "200",
              locale: "en",
              theme: "dark"
            });
          </script>
        </div>`;
      gridSection.appendChild(widget);
      updateGrid();
    }
  
    // Adjust grid layout based on number of widgets
    function updateGrid() {
      const itemCount = gridSection.children.length;
      gridSection.style.gridTemplateColumns = `repeat(${Math.min(8, itemCount)}, 1fr)`;
    }
  });
  