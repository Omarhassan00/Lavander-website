import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {  Mail, ArrowRight, Loader, HelpingHandIcon} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
// import { text } from "stream/consumers";

const ForgotPassword = () => {
	// const [formData, setFormData] = useState({
	// 	password: "",
	// 	confirmPassword: "",
	// });

	const [email, setEmail] = useState("");
	// const [code, setCode] = useState("");

	const { forgetpass, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
		forgetpass(email);
	};
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	ForgotPassword(formData);
	// };
	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-purple-800'>Forget Your Password</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
								Email address
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm
									placeholder-gray-400 focus:outline-none focus:ring-purple-500 
									focus:border-purple-500 sm:text-sm'
									placeholder='Your@example.com'
								/>
							</div>
						</div>

						{/* <div>
							<label htmlFor='code' className='block text-sm font-medium text-gray-300'>
								Code
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<ScanEyeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='code'
									type='text'
									required
									value={code}
									onChange={(e) => setCode(e.target.value)}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-300'>
								New Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='password'
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 
									rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-300'>
								Confirm New Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-gray-700 border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div> */}
						{/* <div style={{
							cursor: 'pointer',							
							display:"flex",
							width:"165px",
							justifyContent: 'center',
							alignItems: 'center',
							marginTop:"10px",
							marginLeft:"100px",
							padding:"10px 1px 0px"	
						}}
						>
						<Link to="/">
							<h3 className="text-purple-400 hover:text-purple-300">Forgot My Password?</h3>
						</Link>
						</div> */}

						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-purple-600
							 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-purple-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<HelpingHandIcon className='mr-2 h-5 w-5' aria-hidden='true' />
									Submit
								</>
							)}
						</button>
					</form>
					<p className='mt-8 text-center text-sm text-gray-400'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-purple-400 hover:text-purple-300'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>

					<p className='mt-2 text-center text-sm text-gray-400'>
						Not a member?{" "}
						<Link to='/signup' className='font-medium text-purple-400 hover:text-purple-300'>
							Sign up now <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default ForgotPassword;
