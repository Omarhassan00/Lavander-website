import { ShoppingCart, UserPlus, LogIn, Lock, User2, LogOutIcon, UserCircle2, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import "../../public/css/Navbar.css";

const Navbar = () => {

	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header 
		className='fixed top-0 left-0 w-full  bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all z-50 duration-300 border-b border-purple-800'>
			<div className='container mx-auto px-4 py-9'>
				<div className='flex flex-wrap justify-between items-center'>
					<Link to='/home' className='text-xl font-bold text-purple-400 items-center space-x-2 flex'
					style={{position:"absolute",height:"70px"}}
					>
					<img className="text-xl items-center space-x-0 flex w-10 h-7" src="https://res.cloudinary.com/ds7lqwxbp/image/upload/c_fit,h_150,w_150/static/bmrpkieogxtuhowcizlx.jpg" alt="Logo Not Found" />
						Lavander Life
					</Link>

					<div
					onClick={() => {
						const menuBtn = document.querySelector(".menu-btn");
						const bigNav = document.querySelector(".big-nav");
						
							menuBtn.classList.toggle("active");
							bigNav.classList.toggle("active");

					}} 
					className="menu-btn flex flex-wrap text-center items-center z-10 absolute top-4 right-1 w-10 h-10 cursor-pointer gap-10 lg:hidden md:flex max-sm:flex"></div>

					<nav className='big-nav flex flex-wrap text-center mr-9 max-w-xl items-center gap-10 lg:flex md:hidden sm:hidden
					   max-sm:hidden'
					   style={{position:"absolute",
						right: "75px"}}
					   >
						<nav className=" flex flex-nowrap justify-between flex-row gap-6 text-center h-12 max-w-xl items-center">
						<Link
							to='/home'
							className='text-black hover:text-purple-400 transition duration-300
					 ease-in-out'
					 onClick={() => {window.onload()}}
						>
							Home
						</Link>
						<Link
							to='/Plogs'
							className='text-black hover:text-purple-400 transition duration-300
					 ease-in-out'
					 onClick={() => {window.onload()}}
						>
							Articals
						</Link>
						<Link
							to='/product_page'
							className='text-black hover:text-purple-400 transition duration-300
					 ease-in-out'
					 onClick={() => {window.onload()}}
						>
							Product
						</Link>
						<Link
							to='/About'
							className='text-black hover:text-purple-400 transition duration-300
					 ease-in-out'
					onClick={() => {window.onload()}}
						>
							About
						</Link>
						<Link
							to='/ContactUs'
							className='text-black hover:text-purple-400 transition duration-300
					 ease-in-out'
					 onClick={() => {window.onload()}}
						>
							Contact
						</Link>
						{user && (
							<Link
								to={"/cart"}
								className='cart-text relative group text-black hover:text-purple-400 transition duration-300 
							ease-in-out'
							onClick={() => {window.onload()}}
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-purple-400' size={20} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-purple-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-purple-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='ADMINBTN bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
								onClick={() => {window.onload()}}
							>
								<Lock className='inline-block mr-1' size={18} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}
						{user ? (
							<><div
							onClick={() => {
								const USBTN = document.querySelector(".Us_Btn");
								const AllBtnUser= document.querySelector(".All_btn_user");
								
									USBTN .classList.toggle("active");
									AllBtnUser.classList.toggle("active");
									window.onload()
							}} 
								className='Us_Btn bg-purple-700 hover:bg-purple-500 text-white py-2 px-4 cursor-pointer flex-nowrap
						rounded-md flex items-center transition duration-300 ease-in-out'
								style={{
									gap: "7px",
								}}
							>
								<User2 size={18} style={{position: "inherit",left: "5px",width:"20px",height:"20px"}}/>
								<span className=' USERBTN hidden sm:inline ml-2' style={{textTransform:"capitalize",position: "inherit",right: "10px",display:"flex" ,width:"max-content"}}>Hi {user.Frist_Name}</span>
							</div>
							<div 
							className="All_btn_user"
							>
								<Link to={"/Profile"}>
								<button
								className="Btn_user bg-purple-700 hover:bg-purple-500"
								onClick={() => {window.onload()}}
								>
								<UserCircle2 size={18} />
									<span>Profile</span>
									</button>
									</Link>
									<Link to={"/History"}>
								<button
									className="Btn_user bg-purple-700 hover:bg-purple-500"
									onClick={() => {window.onload()}}
									>
									<BookMarked size={18} />
									<span>History</span>
								</button>
								</Link>
								<Link
								to='/home'
								onClick={logout}
								>
								<button
								className="Btn_user bg-purple-700 hover:bg-purple-500"
								onClick={() => {window.onload()}}
								>
									<LogOutIcon size={18} />
								<span>LogOut</span>
								</button>
								</Link>
							</div>
							</>
						) : (
							<div className='butt lg:flex justify-evenly flex-row align-middle h-12 pl-2 md:gap-5'>
								<Link
									to={"/signup"}
									className='bg-purple-700 hover:bg-purple-500 text-white py-2 
									rounded-md flex justify-evenly align-middle lg:w-36 gap-1 items-center transition duration-300 ease-in-out
									md:w-40 sm:w-40
									'
									onClick={() => {window.onload()}}
								>
									<UserPlus className='mr-2' size={20} />
									<h4>
									Sign Up
									</h4>
								</Link>
								<Link
									to={"/login"}
									className='bg-purple-700 hover:bg-purple-500 text-white py-2 px-4
									rounded-md flex justify-between align-middle lg:w-32 gap-1 items-center transition duration-300 ease-in-out
									md:w-40 sm:w-40
									'
									onClick={() => {window.onload()}}
								>
									<LogIn className='mr-2' size={20} />
									Log In
								</Link>
							</div>
						)}
						</nav>
					</nav>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
