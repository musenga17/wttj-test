import { Box } from '@welcome-ui/box';
import Job from './components/jobs/Job';

function App() {
  return (
    <div className="App">
      <Box
        display="flex"
        width={1}
        height="500px"
        justifyContent="center"
        alignItems="center"
        backgroundColor="nude.100"
      >
       <Job />
      </Box>
    </div>
  );
}

export default App;
