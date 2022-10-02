import React from 'react';
import callButton from '../../assets/images/call-button.png';
import endButton from '../../assets/images/end-button.png';

const CallerContainer = (props) => {

  const { 
    callerValue, 
    callerId, 
    calling, 
    handleCall, 
    handleInputChange,
    showAlert,
    numberToCall 
  } = props;
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  return (
    <div className='caller-container'>
      {Object.entries(callerValue).map(([key, value], i) => {
        return (
          <div className={`caller__${value.id}`} key={i}>
            <p>My phone number is {value.id}</p>
            <form>
              <input 
                type="text" 
                className={
                  callerId && value.incomingCall ? 'caller-input incoming' 
                  : 
                  callerId && value.outgoingCall ? 'caller-input outgoing' 
                  : 'caller-input'
                }
                name={`caller__${i+1}`} 
                defaultValue={calling && value.incomingCall && !showAlert ? `Incoming Call from ${callerId}` : calling && value.outgoingCall && !showAlert? `Outgoing Call to ${numberToCall}` : value.value} 
              />
            </form>
            <div className='number-buttons-container'>
              {buttons.map((button, i) => {
                return ( 
                <button 
                  className='number-buttons' 
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
                  handleCall(e.target.name);
                }}
                onMouseOver={(e) => calling && !value.isDisabled ? e.target.src = endButton : callButton}
                onMouseLeave={(e) => e.target.src = callButton}
                onMouseDown={(e) => e.target.src = endButton}
              />
            </button>
          </div>
        )
      })}
    </div>
  );
}

export default CallerContainer;