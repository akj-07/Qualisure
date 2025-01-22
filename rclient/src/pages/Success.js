/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const Success = () => {
    const data = [
        {
          name: 'Cluster 1',
          value: 210,
        },
        {
          name: 'Cluster 2',
          value: 30,
        },
        {
          name: 'Cluster 3',
          value: 180,
        },
        {
          name: 'Cluster 4',
          value: 260,
        },
        {
          name: 'Cluster 5',
          value: 60,
        },
      ].sort((a, b) => a.value - b.value);

      const total_value = data.reduce((a, b) => a + b.value, 0);
      const convertToPercent = (num) => Math.round((num / total_value) * 100);
      const convertToDegrees = (num) => Math.round((num / 100) * 360);

      const test_output = data.map((item) => {
        const percentage = convertToPercent(item.value);
        const degrees = convertToDegrees(percentage);
      
        return `${degrees}deg`;
      });
      
      // => ['14deg', '29deg', '86deg', '101deg', '126deg']
      

// convertToDegrees(28) => 101


// convertToPercent(210) => 28


// => 740
      
      
  return (
    <>

        <div className="container mx-auto px-2 my-2 w-3/5">

            {/* bg-tone...................... */}

            <div className="absolute left-0 top-0 w-screen h-screen bg-gradient-to-tr from-sky-100 to-slate-100 -z-10">
            </div>

            
            <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Success alert!</span> Your Document is Ready.
                </div>
            </div>
            

            {/* progress_bar.............................. */}
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width:"100%"}}> 100%</div>
            </div>

            <div className="bg-slate-100 mt-2 shadow-lg rounded-md flex">
                <div className="p-5">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Is the Text readable? : <b>True</b></p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Is the image visible? : <b>True</b></p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Fluctuation in Image quality : <b>50.0%</b></p>                  
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Sharpness : <b>22063.22935</b></p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Upload another file
                    </a>
                </div>
                <div className="p-2 flex justify-center items-center flex-1">
                    <h1 className="font-semibold text-xl">Quality Low</h1>
                </div>
            </div>

        </div>

        

    </>
  )
}

export default Success