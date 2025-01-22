import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <>
    <Navbar/>
      <main className="container mx-auto p-2 flex flex-col gap-7">
        <img className="fixed inset-0 opacity-10 -z-50 w-full h-full" alt='' src="./assets/7612.jpg"/>
        
        <h1 className="text-center text-4xl p-4 mb-3 font-bold">About Us</h1>


        <section className="flex flex-col gap-3 mb-3">
          <h1 className="border-l-4 border-l-[#1b4965] p-3 text-xl font-bold">Who We Are</h1>
          <p>Welcome to Qualisure , where precision meets efficiency. Our platform is dedicated to revolutionizing document management by ensuring unparalleled quality control. At Qualisure we recognise the pivotal role documents play in business operations. Our mission is to empower organizations with the tools they need to effortlessly manage and enhance consistent document quality, ensuring consistency and reliability accross the board and identify fluctuations in real-time.</p>
        </section>

        <section className="flex flex-col gap-3 mb-3">
          <h1 className="border-r-4 border-r-[#1b4965] p-3 text-xl text-right font-bold">Why Qualisure</h1>
          <p>Whether you're dealing with fluctuating document quality or struggling to manage large volumes of data, Qualisure is your solution. Our user friendly interface, intuitive design and powerful features streamline the entire document management process. Qualisure with its automated compression feature can swiftly identifies and compresses your low-quality documents, saving your valuable time and resources.</p>
        </section>

        <section className="flex flex-col gap-3 mb-3">
          <h1 className="border-l-4 border-l-[#1b4965] p-3 text-xl font-bold">What We Do</h1>
          <p>Gone are the days of manual quality checks and cumbersome document management processes.
            Our platform leverages advanced algorithms and provides actionable insights, allowing you to identify and address quality issues before they impact your operations.
            With our innovative technology, we provide comprehensive insights into document quality, allowing users to pinpoint areas for improvement and take proactive measures to maintain high standards.Join us on our mission to elevate document quality standards and transform the way organizations manage their valuable data.</p>
        </section>
      </main>

      

        {/* <div>
          Who We Are:

          Welcome to Qualisure , where precision meets efficiency. Our platform is dedicated to revolutionizing document management by ensuring unparalleled quality control. At Qualisure we recognise the pivotal role documents play in business operations. Our mission is to empower organizations with the tools they need to effortlessly manage and enhance consistent document quality, ensuring consistency and reliability accross the board and identify fluctuations in real-time.


          Why Qualisure:

          Whether you're dealing with fluctuating document quality or struggling to manage large volumes of data, Qualisure is your solution. Our user friendly interface, intuitive design and powerful features streamline the entire document management process. Qualisure with its automated compression feature can swiftly identifies and compresses your low-quality documents, saving your valuable time and resources.



          What We Do:

          Gone are the days of manual quality checks and cumbersome document management processes.
          Our platform leverages advanced algorithms and provides actionable insights, allowing you to identify and address quality issues before they impact your operations.
          With our innovative technology, we provide comprehensive insights into document quality, allowing users to pinpoint areas for improvement and take proactive measures to maintain high standards.Join us on our mission to elevate document quality standards and transform the way organizations manage their valuable data.
        </div> */}
    </>
  )
}

export default About