import { useEffect } from 'react';
import './App.css';
import ReceiveCall from './components/ReceiveCall'
import {Helmet} from "react-helmet";


function App() {

  return (
    <div className="App">
      {/* <Helmet>
      <script src="https://media.twiliocdn.com/sdk/js/client/v1.13/twilio.min.js" type="text/javascript" />
      </Helmet> */}
      <h2>
     HelloRented Call Center
     <ReceiveCall />
      </h2>
    </div>
  );
}

export default App;
