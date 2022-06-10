import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

const Call = () => {
  const callers = [1, 2, 3, 4];
  const [ value, setValue ] = useState(0);
  const [ calling, setCalling ] = useState(false);
  const [ phone, setPhone ] = useState(null);
  const [ called, setCalled ] = useState(null);
  const [ incomingCall, setIncomingCall ] = useState(false);
  const [ outgoingCall, setOutgoingCall ] = useState(false);
  const [ callerId, setCallerId ] = useState(0);
  const alert = useAlert();

  useEffect(() => {
    if (!calling && phone !== null) {
      phone.style['backgroundColor'] = 'blueviolet';
      called.style['backgroundColor'] = 'blueviolet';
      setIncomingCall(false);
      setOutgoingCall(false);
    }
  }, [calling])

  const handleCall = () => {
    const callFrom = document.querySelector(`.caller__${callerId}`);
    const callTo = document.querySelector(`.caller__${value}`);
    if (value > 0 && value <= callers.length && value !== callerId) {
      setCalling(true);
      setCalled(callTo);
      setPhone(callFrom);
      setIncomingCall(true);
      setOutgoingCall(true);
      callFrom.style['backgroundColor'] = 'green';
      callTo.style['backgroundColor'] = 'red';
    } else if (value === callerId) {
      return alert.show('You can\'t call yourself :)');
    } else if (isNaN(value)) {
      return alert.show('This is not a number :)');
    } else {
      return alert.show('You can only make a call to following numbers: 1, 2, 3, 4!');
    } 
  }

  const handleValue = (callerNumber, targetNumber) => {
    if (targetNumber === '') {
      setCalling(false);
    } else {
      setValue(parseInt(targetNumber));
      setCallerId(parseInt(callerNumber.slice(-1)));
    }
  }
   
  return (
    <div className='caller-container'>
      {callers.map((caller, i) => {
        return (
          <div className={`caller__${i+1}`} key={i}>
            {caller}
            <input 
              type="text" 
              name={`caller__${i+1}`} 
              onChange={(e) => handleValue(e.target.name, e.target.value)}
            />
            <button onClick={(e) => {e.preventDefault(); handleCall();}}>Call</button>
            {incomingCall && value === i+1 ? 
              <p>Incoming Call from {callerId}</p> 
                : 
              null
            }
            {outgoingCall && callerId === i+1 ? 
              <p>Outgoing call to {value}</p> 
                : 
              null
            }
          </div>
        )
      })}
    </div>
  );
}

export default Call;