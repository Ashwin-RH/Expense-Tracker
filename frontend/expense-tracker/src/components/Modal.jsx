import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {

    if(!isOpen) return null
    
  return <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
    <div className='relative p-4 w-full max-w-2xl max-h-full'>
        {/* Modal Content */}
        <div className='relative bg-black/40 rounded-lg shadow-sm border border-gray-200/10 backdrop-blur-[20px]'>
            {/* Modal header */}

            <div className='flex items-center justify-between p-4 md:p-5 border border-b rounded-t  border-gray-200/10'>
                <h3 className='text-lg font-medium text-gray-200 '>
                    {title}
                </h3>

                <button 
                type="button"
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-xl text-sm w-8 h-8 inline-flex justify-center items-center  cursor-pointer'
                onClick={onClose}
                >
                <svg 
                    className='w-3 h-3'
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox='0 0 14 14'
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth="2"
                        d="M1 1L13 13M13 1L1 13"
                    />

                </svg>
                </button>
            </div>

            {/* Modal body */}
            <div className='p-4 md:p-5 space-y-4'>
                {children}
            </div>
        </div>
    </div>
  </div>
};

export default Modal