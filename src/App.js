import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceGenerator from './taxInvoiceGenerator/components/index';
import PortfolioCorrelation from './portfolioCorrelation/components/index';
import PortfolioOverlap from './portfolioOverlap/components/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoiceGenerator" element={<InvoiceGenerator />} />
        <Route path="/portfolioCorrelation" element={<PortfolioCorrelation />} />
        <Route path="/portfolioOverlap" element={<PortfolioOverlap />} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;
