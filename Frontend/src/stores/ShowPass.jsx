import "../../public/css/Login.css";
const ShowPass = () => {
  let bem = document.querySelector(".bem");
  document.addEventListener("mousemove", (event) => {
    let mouseY = event.clientY;
    let rotationRange = 8;
    let rotationAngle =
      (mouseY / window.innerHeight) * rotationRange - rotationRange / 2;
    bem.style.transform = `translate(0%, -50%) rotate(${-rotationAngle}deg)`;
  });
  return (
    
    <div className="light">
      <span onClick={() => {
        const toggle = (bt) => {
            const password = document.getElementById("confirmPassword");

            if (bt.innerText == "visibility_off") {

              password.setAttribute("type", "text");
              // password.style.color = "black";
              bt.innerText = "visibility";
            } else {
              password.setAttribute("type", "password");
              // password.style.color = "white";
              bt.innerText = "visibility_off";
            }
            bem.classList.toggle("on");
          };

          toggle(document.querySelector(".Material_Icons_Outlined"));

      }} className="Material_Icons_Outlined">
        visibility_off
      </span>
      <div className="bem"></div>
    </div>
  )
}

export default ShowPass