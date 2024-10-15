// // import { useState } from 'react';
// // import { usePopper } from 'react-popper';
// // import { useUserStore } from "../stores/useUserStore";

// // const VerifyEmailPopper = () => {
// // const { user } = useUserStore();
// // const [verifyemail] = useState(false); 
// // const [showPopper, setShowPopper] = useState(!verifyemail);
// //   const [referenceElement, setReferenceElement] = useState(null);
// //   const [popperElement, setPopperElement] = useState(null);
// //   const { styles, attributes } = usePopper(referenceElement, popperElement, {
// //     placement: 'top',
// //   });

// //   return (
    
// //     <div>
// //     {/* {user.isverify ?( */}
// //       <div>
// //       <button ref={setReferenceElement} onClick={() => setShowPopper(!showPopper)}>
// //         {verifyemail ? ' Done from Verify Email ' : 'chicked your Verify Email'}
// //         <span className="sr-only">Chicked Your Verify Email</span>
// //       </button>

// //       {showPopper && (
// //         <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
// //           please Chicked Your Verify Email
// //         </div>
// //       )}
// //       </div>
// //     {/* ):( */}
// //     {/* <div
// //     onClick={verifyemail({email : user.email, id : user._id , Frist_Name: user.Frist_Name , Last_Name: user.Last_Name})}
// //     >
// //         <button ref={setReferenceElement} onClick={() => setShowPopper(!showPopper)}>
// //         hicked your Verify Email          
// //         <span className="sr-only"> Chicked your Verify Email</span>
// //         </button>

// //         {showPopper && (    
// //           <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
// //             Chicked your Verify Email
// //           </div>
// //         )}
// //     </div> */}
// //     </div>
// //   );
// // };

// // export default VerifyEmailPopper;
// // import { usePopper } from "@popperjs/core"
// import { usePopper } from "react-popper"
// import { useState } from 'react';

// const VerifyEmailPopper = () => {
//   const [popperElement, setPopperElement] = useState(null);
//   const { styles, attributes } = usePopper( popperElement, {
//       placement: 'top',
//     });
//   return (
//     <div >{popperElement && (
//               <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
//                 please Chicked Your Verify Email
//               </div>

//             )} </div>
//   )
// }

// export default VerifyEmailPopper;