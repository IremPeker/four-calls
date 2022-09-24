import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import callButton from '../assets/images/call-button.jpeg';
import endButton from '../assets/images/end-button.png';

const Call = () => {
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [ numberToCall, setNumberToCall ] = useState(0);
  const [ callerValue, setCallerValue ] = useState(
    [{id: 1, name: "caller__1", value: "", isDisabled: true, phone: null, called: null, incomingCall: false, outgoingCall: false}, 
    {id: 2, name: "caller__2", value: "", isDisabled: true, phone: null, called: null, incomingCall: false, outgoingCall: false}, 
    {id: 3, name: "caller__3", value: "", isDisabled: true, phone: null, called: null, incomingCall: false, outgoingCall: false}, 
    {id: 4, name: "caller__4", value: "", isDisabled: true, phone: null, called: null, incomingCall: false, outgoingCall: false}]
  );
  const [ calling, setCalling ] = useState(false);
  const [ callerId, setCallerId ] = useState(0);
  const alert = useAlert();

  const handleCall = (callerId) => {
   
    if (!calling) {
      let id = parseInt(callerId.slice(-1));
      setCallerId(id);
      const callFrom = document.querySelector(`.caller__${id}`);
      const callTo = document.querySelector(`.caller__${numberToCall}`);
      if (numberToCall > 0 && numberToCall <= Object.keys(callerValue).length && numberToCall !== id) {
        handleState(callFrom, callTo);
      } else if (numberToCall == id) {
        return alert.show('You can\'t call yourself :)');
      } else if (isNaN(numberToCall)) {
        return alert.show('This is not a number :)');
      } else {
        return alert.show('You can only make a call to following numbers: 1, 2, 3, 4!');
      } 
    } else {
      window.location.reload(false);
    }
  };

  const handleState = (callFrom, callTo) => {
    Object.entries(callerValue).forEach(([key, value]) => {
      if (!value.isDisabled) {
        callFrom.style['backgroundColor'] = 'green';
        callTo.style['backgroundColor'] = 'red';
      }
    })
  };
 
  const handleInputChange = (e, caller) => {
    let target = e.target.innerText;
    setNumberToCall(parseInt(target));
    Object.entries(callerValue).forEach(([key, value]) => {
      setCallerValue(
        callerValue.map(item => 
            item.name === `caller__${caller}`
            ? {...item, value: target, isDisabled: false, outgoingCall: true } 
            : item.name === `caller__${target}`
            ? {...item, isDisabled: false, incomingCall: true } 
            : item 
      ));
    })
  };
   
  return (
    <div className='caller-container'>
      {Object.entries(callerValue).map(([key, value], i) => {
        return (
          <div className={`caller__${value.id}`} key={i}>
            <p>My number is {value.id}</p>
            <form>
              <label>
                Call to:
              </label>
              <input type="text" name={`caller__${i+1}`} defaultValue={value.value} />
            </form>
            <div className='dial-buttons-container'>
              {buttons.map((button, i) => {
                return ( 
                <button 
                  className='dial-buttons' 
                  name={`caller__${i+1}`} 
                  key={i} 
                  onClick={(e) => {
                    e.preventDefault(); 
                    handleInputChange(e, value.id);
                  }}
                >
                  {button}
                </button>)
              })}
            </div> 
            <button 
              className='call-button' 
              name={`button__${i+1}`} 
            >
              <img
                src={callButton}
                name={`button__${i+1}`} 
                onClick={(e) => {
                  e.preventDefault();
                  setCalling(calling => !calling); 
                  handleCall(e.target.name);
                }}
                onMouseOver={(e) => calling && !value.isDisabled ? e.target.src = endButton : callButton}
                onMouseLeave={(e) => e.target.src = callButton}
                onMouseDown={(e) => e.target.src = endButton}
              />
            </button>
            {value.incomingCall ? 
              <p>Incoming Call from {callerId}</p> 
                : 
              null
            }
            {value.outgoingCall ? 
              <p>Outgoing call to {numberToCall}</p> 
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