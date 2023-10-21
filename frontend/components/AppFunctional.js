import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import * as yup from "yup"
// Suggested initial states
const URL = 'http://localhost:9000/api/result'

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
  const [values, setValues] = useState(initialValues)



  function getXY() {

    const x = (values.index % 3) + 1;
         const y = Math.floor(values.index / 3) +1;
         console.log(x)
         return { x, y };
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const {x,y} = getXY(values.index);
        return `Coordinates (${x}, ${y})`
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }


  function reset() {
    // Use this helper to reset all states to their initial values.
      setValues(initialValues)
  }


  function getNextIndex(direction) {
    const currIndex = values.index;
     let newIndex = currIndex;

     if (direction === 'left' && currIndex % 3 !== 0) {
               newIndex = currIndex - 1;
           }   if (direction === 'up' && currIndex >= 3) {
                   newIndex = currIndex - 3;
           }  if(direction === 'right' && currIndex % 3 !==2){
             newIndex = currIndex + 1
           }   if(direction === 'down' && currIndex <= 5){
            newIndex = currIndex + 3
          }
          return newIndex

    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {

    const direction = evt.target.id;

           const newIndex = getNextIndex(direction);

           if(newIndex !== values.index){
             let newSteps = values.steps + 1;
            setValues({...values, index: newIndex, steps: newSteps})

          }

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }



  function onChange(evt) {
    const {id, value} = evt.target;
         setValues({...values, [id]: value})

    // You will need this to update the value of the input.

  }


  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const { x, y } = getXY();
    //console.log(`this is x --->${x} and this is y --->${y}`)
    const newValue = {
      x:x,
      y:y,
      steps: values.steps,
      email: values.email
    }
    
    axios.post(URL, newValue)
    .then(res =>{
        setValues({...values, message: res.data.message, email:''})
       // setValues({...values, email:''});

    }).catch(err =>{
      console.error(err.response.data.message)
      setValues({...values, message: err.response.data.message})

    })

  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Corrdinates {getXYMessage()}</h3>
        <h3 id="steps">You moved {values.steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === values.index ? ' active' : ''}`}>
              {idx === values.index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{values.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={move} id="left"  >LEFT</button>
        <button onClick={move}id="up" >UP</button>
        <button onClick={move} id="right" >RIGHT</button>
        <button onClick={move}id="down" >DOWN</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>

        <input id="email" type="email" placeholder="type email" onChange={onChange} value={values.email} ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}










// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import * as yup from "yup"
// // Suggested initial states
// const URL = 'http://localhost:9000/api/result'

// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = 4// the index the "B" is at

// const initialValues = {
//   message: initialMessage,
//   email: initialEmail,
//   steps: initialSteps,
//   index: initialIndex,
// }


// const schema = yup.object().shape({
//   x: yup.number().integer().min(1).max(3).required(),
//   y: yup.number().integer().min(1).max(3).required(),
//   steps: yup.number().integer().min(1).required(),
//   email: yup.string().email().required(),
// });

// export default function AppFunctional(props) {
//   // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
//   // You can delete them and build your own logic from scratch.
// const [formValues, setFormValues] = useState(initialValues);
// const [errorMessage, setErrorMessage] = useState('');



//   function getXY() {
//     const x = (formValues.index % 3) + 1;
//     const y = Math.floor(formValues.index / 3) +1;

//     return { x, y };
//     // It it not necessary to have a state to track the coordinates.
//     // It's enough to know what index the "B" is at, to be able to calculate them.
//   }

//   function getXYMessage() {

//     const {x,y} = getXY(formValues.index);
//     return `Coordinates (${x}, ${y})`
//     // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
//     // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
//     // returns the fully constructed string.
//   }

//   function reset() {
//     // Use this helper to reset all states to their initial values.
//     setFormValues(initialValues)
//   }

//   function getNextIndex(direction) {
//     const currIndex = formValues.index;
//     let newIndex = currIndex;

//     if (direction === 'left' && currIndex % 3 !== 0) {
//             newIndex = currIndex - 1;
//           }   if (direction === 'up' && currIndex >= 3) {
//                   newIndex = currIndex - 3;
//           }  if(direction === 'right' && currIndex % 3 !==2){
//             newIndex = currIndex + 1
//           }   if(direction === 'down' && currIndex <= 5){
//             newIndex = currIndex + 3
//           }
//           return newIndex
//     // This helper takes a direction ("left", "up", etc) and calculates what the next index
//     // of the "B" would be. If the move is impossible because we are at the edge of the grid,
//     // this helper should return the current index unchanged.
//   }

//   function move(evt) {
//       const direction = evt.target.id;

//       const newIndex = getNextIndex(direction);

//       if(newIndex !== formValues.index){
//         let newSteps = formValues.steps + 1;
//         setFormValues({...formValues, index: newIndex, steps: newSteps})

//       }
//     // This event handler can use the helper above to obtain a new index for the "B",
//     // and change any states accordingly.
//   }



//   function onChange(evt) {

//     // You will need this to update the value of the input.
//     const {id, value} = evt.target;
//     setFormValues({...formValues, [id]: value})
//   }
//   const payload = {
//     x: formValues.index[0],
//     y: formValues.index[1],
//     steps: formValues.steps,
//     message: formValues.message,
//   }

//   function onSubmit(evt) {
//     // Use a POST request to send a payload to the server.
//     evt.preventDefault()

//   }


//   return (
//     <div id="wrapper" className={props.className}>
//       <div className="info">
//         <h3 id="coordinates">{getXYMessage()}</h3>
//         <h3 id="steps">You moved {formValues.steps}</h3>
//       </div>
//       <div id="grid">
//         {
//           [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
//             <div key={idx} className={`square${idx === formValues.index ? ' active' : ''}`}>
//               {idx === formValues.index ? 'B' : null}
//             </div>
//           ))
//         }
//       </div>
//       <div className="info">
//         <h3 id="message">{formValues.message}</h3>
//       </div>
//       <div id="keypad">
//         <button id="left" onClick={move}  >LEFT</button>
//         <button id="up" onClick={move}>UP</button>
//         <button id="right" onClick={move}>RIGHT</button>
//         <button id="down" onClick={move}>DOWN</button>
//         <button onClick={reset} id="reset">reset</button>
//       </div>
//       <form onSubmit={onSubmit}>

//         <input id="email" type="email" placeholder="type email" onChange={onChange}></input>
//         <input id="submit" type="submit"></input>
//       </form>
//     </div>
//   )
// }
