import React from 'react'

const Hero = () => {
  return (
    <div  >
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content    shadow-2xl flex-col lg:flex-row-reverse">
          <img
            src="https://i.pinimg.com/1200x/6c/9b/27/6c9b27f2f01c3f40d5518516116ac86a.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className=" max-w-2xl">
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary ml-2">Get Registered</button>
            <button className="btn btn-primary btn-outline  ml-2">Let's login.</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
