import "../../public/css/Login.css";
const ShowPassword = () => {
  return(

    <div className="light">
      <span onClick={() => {
        const Tggle = (btn) => {
            const password = document.getElementById("setPassword");
            if (btn.innerText == "visibility_off") {
              password.setAttribute("type", "text");
              btn.innerText = "visibility";
            } else {
              password.setAttribute("type", "password");
              btn.innerText = "visibility_off";
            }
          };

          Tggle(document.querySelector(".material-icons-outlined"));

      }} className="material-icons-outlined">
        visibility_off
      </span>
    </div>
);
}
export default ShowPassword;
