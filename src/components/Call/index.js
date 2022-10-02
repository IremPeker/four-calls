import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import CallerContainer from './CallerContainer';

const Call = () => {
  const [ numberToCall, setNumberToCall ] = useState(0);
  const [ calling, setCalling ] = useState(false);
  const [ callerId, setCallerId ] = useState(0);
  const [ showAlert, setShowAlert ] = useState(false);
  const [ callerValue, setCallerValue ] = useState(
    [{id: 1, name: "caller__1", value: "", isDisabled: true, incomingCall: false, outgoingCall: false}, 
    {id: 2, name: "caller__2", value: "", isDisabled: true, incomingCall: false, outgoingCall: false}, 
    {id: 3, name: "caller__3", value: "", isDisabled: true, incomingCall: false, outgoingCall: false}, 
    {id: 4, name: "caller__4", value: "", isDisabled: true, incomingCall: false, outgoingCall: false}]
  );
  const alert = useAlert();

  const handleCall = (caller) => {
    setCalling(calling => !calling); 
    if (!calling) {
      let id = parseInt(caller.slice(-1));
      setCallerId(id);
      const callFrom = document.querySelector(`.caller__${id}`);
      const callTo = document.querySelector(`.caller__${numberToCall}`);
      if (numberToCall > 0 && numberToCall <= Object.keys(callerValue).length && numberToCall !== id) {
        handleState(callFrom, callTo, id);
      } else if (numberToCall === id) {
        setShowAlert(true);
        return alert.show('You can\'t call yourself :)');
      } else if (isNaN(numberToCall)) {
        return alert.show('This is not a number :)');
      } else {
        setShowAlert(true);
        return alert.show('You can only make a call to following numbers: 1, 2, 3, 4!');
      } 
    } else {
      window.location.reload(false);
    }
  };

  const handleState = (callFrom, callTo, id) => {
    let outgoingButton = document.getElementsByName(`button__${id}`);
    let incomingButton = document.getElementsByName(`button__${numberToCall}`);
    outgoingButton[0].classList.add("green");
    incomingButton[0].classList.add("red");
    Object.entries(callerValue).forEach(([key, value]) => {
      if (!value.isDisabled) {
        callFrom.style['backgroundColor'] = 'rgb(137, 210, 137)';
        callTo.style['backgroundColor'] = 'rgb(213, 157, 157)';
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
    <CallerContainer 
      callerValue={callerValue}
      handleInputChange={handleInputChange}
      handleCall={handleCall}
      callerId={callerId}
      showAlert={showAlert}
      numberToCall={numberToCall}
    />

  );
}

export default Call;

// ADD SOUND