import "../../public/css/Login.css";
const ShowPassword = () => {
  let beam = document.querySelector(".beam");
  document.addEventListener("mousemove", (event) => {
    let mouseY = event.clientY;
    let rotationRange = 8;
    let rotationAngle =
      (mouseY / window.innerHeight) * rotationRange - rotationRange / 2;
    beam.style.transform = `translate(0%, -50%) rotate(${-rotationAngle}deg)`;
  });
  
  return(

    <div className="light">
      <span onClick={() => {
        const toggle = (btn) => {
            const password = document.getElementById("password");
            if (btn.innerText == "visibility_off") {
              password.setAttribute("type", "text");
              // password.style.color = "black";
              btn.innerText = "visibility";
            } else {
              password.setAttribute("type", "password");
              // password.style.color = "white";
              btn.innerText = "visibility_off";
            }
            beam.classList.toggle("on");
          };

          toggle(document.querySelector(".material-icons-outlined"));

      }} className="material-icons-outlined">
        visibility_off
      </span>

      <div className="beam"></div>
    </div>

);
}
export default ShowPassword;
