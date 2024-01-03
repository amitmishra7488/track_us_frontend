import { useContext } from 'react';
import AllRoutes from './Routes/AllRoutes';
import ChatInterface from './components/Common/ChatInterface';
import Chitti from './components/practice/Chitti';
import { authContext } from './context/context';
import { Flex } from '@chakra-ui/react';

function App() {
  const { isLoggedIn } = useContext(authContext);

  return (
    <div className="App">

      {/* {isLoggedIn ? <ChatInterface/> :null}
      {isLoggedIn ? <Chitti/>:null}  */}
      <Flex right="5em" gap="2em">
        {isLoggedIn ? <ChatInterface /> : null}
        {isLoggedIn ? <Chitti /> : null}
      </Flex>
      <AllRoutes/>
    </div>
  );
}

export default App;
