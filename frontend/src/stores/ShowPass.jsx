import "../../public/css/Login.css";
const ShowPass = () => {
  return (
    
    <div className="light">
      <span onClick={() => {
        const Toggle = (bt) => {
            const password = document.getElementById("setPasswordAgain");

            if (bt.innerText == "visibility_off") {
              password.setAttribute("type", "text");
              bt.innerText = "visibility";
            } else {
              password.setAttribute("type", "password");
              bt.innerText = "visibility_off";
            }
          };

          Toggle(document.querySelector(".Material_Icons_Outlined"));

      }} className="Material_Icons_Outlined">
        visibility_off
      </span>
    </div>
  )
}

export default ShowPass