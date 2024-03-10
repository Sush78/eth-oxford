import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPageWrapper from './pages/landingPageWrapper';
import StakerPageWrapper from './pages/StakerPageWrapper';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/staker" element={<StakerPageWrapper />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
