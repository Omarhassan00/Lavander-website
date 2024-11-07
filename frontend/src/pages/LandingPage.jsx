import "../../public/css/LandingPage.css";
import { motion } from "framer-motion";

const LandingPage = () => {

  return( 
    <div className="container_All">
  <div className="container-door">
  <div className="land-door1"></div>
  <div className="land-door2"></div>
  <div className="land-bg-container">
    <div className="land-bg1"></div>
    <div className="land-bg2"></div>
  </div>
  <div className="cont_btn">
    <motion.div 
    className='flex flex-col justify-center align-middle text-span sm:mx-auto sm:w-full sm:max-w-md'
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    >
      <span style={{color: "#6E4A96",fontWeight:" 900",letterSpacing: "7px",paddingBottom: "8px",marginBottom: "16px",fontSize: "3rem",borderBottom:" 3px double",
      }}>Lavander life</span> 
      <span className="s-span">
      Lavander life has a wide array of International Products which meet the style and colour with perfection
      The company has a diverse product range of bags, wallets, shoces and Leather goods.
      </span>
    </motion.div>
    <br />
    <motion.div
    className='button flex justify-center align-middle mt-8 sm:mx-auto sm:w-full sm:max-w-md'
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    >
    <button 
    onClick={ ()=> {
        setTimeout(() => {
            window.location.href = "/home" ;
        }, 8000);          
        const GetStarted = document.querySelector(".Get_Started");
        const ContainerDoor = document.querySelector(".container-door");
        const LandDoor1 = document.querySelector(".land-door1");
        const LandDoor2 = document.querySelector(".land-door2");
        const LandBg1 = document.querySelector(".land-bg1");
        const LandBg2 = document.querySelector(".land-bg2");
        const ContBtn = document.querySelector(".cont_btn");
            GetStarted.classList.toggle("activ");
            ContainerDoor.classList.toggle("activ");
            LandDoor1.classList.toggle("activ");
            LandDoor2.classList.toggle("activ");
            LandBg1.classList.toggle("activ");
            LandBg2.classList.toggle("activ");
            ContBtn.classList.toggle("activ");
        }}
type="button"
className='Get_Started'
>Get Started</button>
</motion.div>
  </div>
</div>
</div>
);
}

export default LandingPage;
