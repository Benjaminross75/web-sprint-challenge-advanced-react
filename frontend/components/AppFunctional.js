import React from 'react'
import { useState } from 'react'

// Suggested initial states

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4// the index the "B" is at

const initialValues = {
  message: initialMessage,
  email: initialEmail,
  steps: initialSteps,
  index: initialIndex,
}
export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
const [formValues, setFormValues] = useState(initialValues);

  function getXY() {
    const x = (formValues.index % 3) + 1;
    const y = Math.floor(formValues.index / 3) +1;

    return { x, y };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {

    const {x,y} = getXY(formValues.index);
    return `Coordinates (${x}, ${y})`
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setFormValues(initialValues)
  }

  function getNextIndex(direction) {

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {

    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
// import React, { useState } from 'react';

// const initialMessage = '';
// const initialEmail = '';
// const initialSteps = 0;
// const initialIndex = 4;

// const initialValues = {
//   message: initialMessage,
//   email: initialEmail,
//   steps: initialSteps,
//   index: initialIndex,
// };

// export default function AppFunctional(props) {
//   const [formValues, setFormValues] = useState(initialValues);

//   function getXY() {
//     const x = (formValues.index % 3) + 1;
//     const y = Math.floor(formValues.index / 3) + 1;

//     return { x, y };
//   }

//   function getXYMessage() {
//     const { x, y } = getXY();
//     return `Coordinates (${x}, ${y})`;
//   }

//   function reset() {
//     setFormValues(initialValues);
//   }

//   function getNextIndex(direction) {
//     const currentIndex = formValues.index;
//     let newIndex = currentIndex;

//     if (direction === 'left' && currentIndex % 3 !== 0) {
//       newIndex = currentIndex - 1;
//     } else if (direction === 'up' && currentIndex >= 3) {
//       newIndex = currentIndex - 3;
//     } else if (direction === 'right' && currentIndex % 3 !== 2) {
//       newIndex = currentIndex + 1;
//     } else if (direction === 'down' && currentIndex <= 5) {
//       newIndex = currentIndex + 3;
//     }

//     return newIndex;
//   }

//   function move(direction) {
//     const newIndex = getNextIndex(direction);
//     if (newIndex !== formValues.index) {
//       const newSteps = formValues.steps + 1;
//       setFormValues({
//         ...formValues,
//         index: newIndex,
//         steps: newSteps,
//       });
//     }
//   }

//   function onChange(evt) {
//     const { id, value } = evt.target;
//     setFormValues({
//       ...formValues,
//       [id]: value,
//     });
//   }

//   function onSubmit(evt) {
//     evt.preventDefault();

//   }

//   return (
//     <div id="wrapper" className={props.className}>
//       <div className="info">
//         <h3 id="coordinates">{getXYMessage()}</h3>
//         <h3 id="steps">You moved {formValues.steps} times</h3>
//       </div>
//       <div id="grid">
//         {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
//           <div key={idx} className={`square${idx === formValues.index ? ' active' : ''}`}>
//             {idx === formValues.index ? 'B' : null}
//           </div>
//         ))}
//       </div>
//       <div className="info">
//         <h3 id="message">{formValues.message}</h3>
//       </div>
//       <div id="keypad">
//         <button id="left" onClick={() => move('left')}>
//           LEFT
//         </button>
//         <button id="up" onClick={() => move('up')}>
//           UP
//         </button>
//         <button id="right" onClick={() => move('right')}>
//           RIGHT
//         </button>
//         <button id="down" onClick={() => move('down')}>
//           DOWN
//         </button>
//         <button onClick={reset} id="reset">
//           Reset
//         </button>
//       </div>
//       <form onSubmit={onSubmit}>
//         <input
//           id="email"
//           type="email"
//           placeholder="Type email"
//           value={formValues.email}
//           onChange={onChange}
//         />
//         <input id="submit" type="submit" />
//       </form>
//     </div>
//   );
// }
