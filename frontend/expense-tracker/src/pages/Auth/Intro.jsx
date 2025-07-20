import { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import CARD_2 from '../../assets/images/card2.jpg'; // Replace with your dashboard screenshot
import CARD_1 from '/DashBoard.png'
import Income from '/income.png'
import Expense from '/expense.png'
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { HiMail } from 'react-icons/hi'
import { useState } from 'react';
import { Menu, X} from "lucide-react"
import { SiOpenproject } from "react-icons/si";

const Landingpage = () => {

  const[isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  const {scrollYProgress} = useScroll({
    target:ref,
    offset: ["start end","end start"],
  });

   const opacity = useTransform(scrollYProgress,[0,1],[1,0]);
  return (
    <div className="relative w-screen h-screen bg-gray-950 overflow-auto">
      {/* Navbar */}
      <div className="fixed  top-0 left-0 w-full flex justify-between items-center px-5 py-4 md:px-10 md:py-4 z-10">
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:2,ease:"easeIn"}}
          className='flex bg-zinc-800/50 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 gap-1 md:gap-3 rounded-xl'>
        <motion.img initial={{scale:1}} whileHover={{scale:1.8}} transition={{duration:0.5}} src='/StashUp.png' className='w-8 h-8 cursor-pointer hover:border border-gray-400  rounded-full'/>
        <h1 className=" text-white text-lg md:text-2xl mt-0.5 md:-mt-0 px-1 font-semibold tracking-wide ">Stash Up</h1>

        </motion.div>
        <div className="hidden md:flex  bg-zinc-800/50 items-center px-5 py-2 space-x-5 rounded-xl shadow-md shadow-black/40 backdrop-blur-sm">
        
        <a href="/login" className=" text-sm text-white transition">
          Login
        </a>

        {/* Gradient Border Button (No nested <a>) */}
        <div className="group inline-flex h-10 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 pl-[1.5px] pr-[2.5px] py-[2px] hover:shadow-2xl hover:shadow-purple-600/30 text-white transition">
          <a
            href="/signup"
            className="flex h-full w-full items-center justify-center rounded-full bg-gray-900 transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 group-hover:transition group-hover:duration-300 group-hover:ease-in-out text-sm"
          >
            Sign Up
          </a>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden text-white focus:outline-none cursor-pointer'
        >
          {isOpen ? <X size={24}/> : <Menu size={35} className='rounded-full hover:bg-zinc-800/50 p-1 border border-transparent transition duration-500'/>}
        </button>
      </div>

      {isOpen && (
  <div className="md:hidden fixed top-10 right-5 w-40 mt-4 flex flex-col items-center justify-center bg-zinc-800/90 backdrop-blur-sm rounded-xl px-4 py-3 space-y-3 shadow-md shadow-black/40  z-50">
    
    <a href="/login" className="w-20 mt-2 text-white text-center text-sm border-b border-gray-600 tracking-wider">Login</a>
    
    <div className="group inline-flex h-10 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 pl-[1.5px] pr-[2.5px] py-[2px] hover:shadow-2xl hover:shadow-purple-600/30 text-white transition">
    <a
      href="/signup"
      className="flex h-full w-full items-center justify-center rounded-full bg-gray-900 transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 group-hover:transition group-hover:duration-300 group-hover:ease-in-out text-sm"
    >
      Sign Up
    </a>
    </div>
  </div>
)}


      {/* Hero Section */}
      <motion.div
          ref={ref}
          className=" flex flex-col w-80 h-40 md:w-[770px] md:h-[390px] rounded-xl overflow-hidden shadow-lg border border-gray-700 shadow-xl shadow-blue-500/20 mx-auto mt-50 md:mt-35  "
          initial={{opacity:0,y:-50,scale:1.08}}
          whileInView={{ opacity: 1, y:0, scale: 1 }}
          transition={{duration:1,ease:"easeOut"}}
                   
          >
          <motion.img
            src={CARD_1}
            alt="Dashboard"
            className="w-full h-full object-cover "
                      />
        </motion.div>

        <div className='flex flex-col items-center py-6 mt-5'>

          <motion.h3
           initial={{opacity:0,scale:0.90}} 
           animate={{opacity:1,scale:1}}
           transition={{duration:0.8,ease:"easeOut"}}
           className='text-gray-300 font-light text-center text-md md:text-xl tracking-wide  '>
            <span>Track Every 
           <motion.span initial={{opacity:0}} whileInView={{opacity:[0.25,0.25,0.50,1]}} transition={{duration:2,ease: "easeInOut",times:[0,0.3,0.6,1] }} className='bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-2xl md:text-3xl font-semibold md:font-medium pl-1.5 pr-1'>
            ₹UPEE
            </motion.span>
            </span>. <br /> Plan Every 
            <motion.span initial={{opacity:0}} whileInView={{opacity:[0.25,0.25,0.50,1]}} transition={{duration:2,ease: "easeInOut",times:[0,0.3,0.6,1] }} className='inline-block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-2xl md:text-3xl font-semibold md:font-medium pl-1 pr-1'>
              GOAL
            </motion.span>.
            
            </motion.h3>
           <p className='w-[20rem] md:w-[50rem] mt-2 text-gray-500 text-center text-sm md:text-md '>StashUp makes tracking income and expenses fun with emojis and smart visuals. Budgeting made simple, clean, and modern.</p>
        </div>
        
      <div className="flex flex-col md:flex-row items-center justify-center  px-6 text-center md:text-left mt-25 md:mt-18 mb-20 md:mb-0 space-y-8 md:space-y-0 md:space-x-10">
        {/* Left Content */}
        <div className="max-w-lg text-white mt-5">
            <div className="text-center py-12 px-4">
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-bold text-center md:text-left  text-white mb-4">Track Your Finances with a Fun Twist!</h2>
            <p className="text-center md:text-left text-gray-300 text-sm md:text-lg">
              Add your <span className="font-semibold">income and expenses using emojis</span> like 💰, 🍔, 🚌, and more!
            </p>
            <ul className="text-left text-sm md:text-lg text-gray-400 mt-6 space-y-1 list-disc list-inside">
              <li> <strong className='bg-gradient-to-r from-teal-400 to-yellow-200 bg-clip-text text-transparent text-lg'>Income</strong> is shown with colorful <strong>bar charts</strong>.</li>
              <li> <strong className='bg-gradient-to-r from-red-500 via-amber-500  to-orange-500 bg-clip-text text-transparent text-lg'>Expenses</strong> are tracked using smooth <strong>line charts</strong>.</li>
              <li> Emoji entries make logging quick, fun, and meaningful.💸 💰 </li>
            </ul>
            <p className="mt-6 text-gray-300">
              Start managing your money in a way that's <span className="italic text-gray-200">visual, simple, and fun</span>!
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className='group inline-block'>
              <a href='/signup' className="group inline-block text-white px-3 py-3 md:px-6 md:py-3 rounded-full bg-gray-900 transition duration-300 ease-in-out border-2 border-orange-500 group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 group-hover:scale-102 group-hover:shadow-xl group-hover:shadow-orange-500/30 group-hover:transition group-hover:duration-300 group-hover:ease-in-out  ">
              Get Started
            </a>
            </div>
            <button className="px-3 py-3 md:px-6 md:py-3 rounded-full border border-gray-400 text-gray-300 hover:bg-gray-800 hover:border-indigo-400 cursor-pointer transition">
              Learn More
            </button>
          </div>


        </div>

        {/* Right Image */}
        <motion.div
        initial={{x:80,opacity:0}} 
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{y:-30,x:-80,scale:1.5}}
        transition={{duration:1}}
        
        className="relative w-80 h-60 md:w-[490px] md:h-[230px]  rounded-xl overflow-hidden shadow-lg border border-gray-700 shadow-xl shadow-blue-500/20">
          <img
            src={CARD_2}
            alt="Dashboard"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Income block */}

      <div className='flex flex-col md:flex-row items-center justify-center h-full px-6 text-center md:text-right space-x-8 md:space-y-0 md:space-x-10 '>
      <motion.div
        initial={{x:-80,opacity:0}} 
        whileInView={{ opacity: 1, x: 16, scale: 1 }}
        whileHover={{y:0,x:90,scale:1.5}}
        transition={{duration:1}}
        className="relative w-74 h-35 md:w-[490px] md:h-[230px]  rounded-xl overflow-hidden shadow-lg border border-gray-700 shadow-xl shadow-blue-500/20 mb-8 md:mb-0">
          <img
            src={Income}
            alt="Dashboard"
            className="w-full h-full object-contain "
          />
        </motion.div>

        <div className='max-w-lg text-white'>
          <h2 className='text-4xl md:text-5xl tracking-tight leading-tight font-bold mt-4 mb-4'>
            See Where It Goes. Grow What Comes In.
          </h2>
          <p className='text-gray-400 mb-6'>
            Take control of your income with ease. StashUp lets you track cash flow, monitor every rupee, and build smarter money habits — all in one sleek dashboard.
          </p>
        </div>
        </div>


      {/* Expense block */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-30 md:mb-30 px-6 text-center md:text-left space-y-8 md:space-y-0 md:space-x-10">
        {/* Left Content */}
        <div className="max-w-lg text-white">
          <h2 className="text-4xl md:text-5xl tracking-tight leading-tight font-bold mb-4">
            Know Where Every ₹upee Goes.
          </h2>
          <p className="text-gray-400 mb-3 md:mb-6">
            Every rupee matters. With StashUp, monitor your expenses in real-time, categorize your spending, and stay in full control of your financial future.
          </p>
        
        </div>

        {/* Right Image */}
        <motion.div
        initial={{x:80,opacity:0}} 
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        whileHover={{y:-30,x:-80,scale:1.5}}
        transition={{duration:1}}
        
        className="relative w-75 h-35 md:w-[490px] md:h-[230px] rounded-xl overflow-hidden shadow-lg border border-gray-700 shadow-xl shadow-blue-500/20">
          <img
            src={Expense}
            alt="Dashboard"
            className="w-full h-full object-contain "
          />
        </motion.div>
      </div>

        

        

      
      
      <footer className='fixed flex flex-col bottom-1 left-1/2 -translate-x-1/2 w-[310px] md:w-[65rem] bg-gray-800/50 py-2 rounded-xl items-center justify-center border border-blue-500/20 shadow-2xl shadow-blue-500/20 z-10 backdrop-blur-md'>
          <h2 className='text-sm md:text-md text-gray-300 md:text-gray-400 mb-2 '>&copy; 2025 Ashwin Haragi. All rights reserved.</h2>
          <motion.div
          initial={{y:20,opacity:0}}
          animate={{y:0,opacity:1}}
          transition={{duration:0.5,ease:"easeInOut"}}
          className='flex items-center justify-center space-x-4 mb-2  '>
          
          <motion.a
          href='https://github.com/Ashwin-RH'
          target='_blank'
          rel='noopener noreferrer'
          alt="Github"
          title='Github'
          aria-label="Github"
          className='text-orange-400/70 md:text-gray-500 hover:text-orange-400 hover:scale-105 transition duration-500'
          >
            <FaGithub size={20}/>
          </motion.a>

          <motion.a
          href='https://x.com/Ashwinharagi?t=6FuxoisznsSOeaY1j5zYdA&s=09'
          target='_blank'
          rel='noopener noreferrer'
          alt="X/Twitter"
          title='X/Twitter'
          aria-label="X/Twitter"
          className='text-blue-400/70 md:text-gray-500 hover:text-blue-500 hover:scale-105 transition duration-500'
          >
            <FaXTwitter size={20}/>
            </motion.a>

          <motion.a
          href='https://mail.google.com/mail/?view=cm&fs=1&to=ashwinharagi@gmail.com'
          target='_blank'
          rel='noopener noreferrer'
          alt="Mail"
          title='Mail'
          aria-label="Mail"
          className='text-green-400/70 md:text-gray-500 hover:text-green-400 hover:scale-105 transition duration-500'
          >
            <HiMail size={22}/>
            </motion.a>

            <motion.a
            href="https://ashwinrh.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
            aria-label="Portfolio"
            className="text-fuchsia-400/70 md:text-gray-500 hover:text-fuchsia-400 hover:scale-105 transition duration-500 flex items-center"
          >
            <SiOpenproject size={18} />
          </motion.a>

          </motion.div>
        </footer>
      </div>
      
      
      
      
    
  );
};

export default Landingpage;
