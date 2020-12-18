import { Box } from '@welcome-ui/box';
import Offers from './components/offers/Offers';

function App() {
  return (
    <div className="App">
      <Box
        width={1}
        height="500px"
        justifyContent="center"
        alignItems="center"
        backgroundColor="primary.800"
      />
      <Offers />
    </div>
  );
}

export default App;
