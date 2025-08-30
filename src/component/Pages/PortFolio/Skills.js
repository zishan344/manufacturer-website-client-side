const Skills=()=>{
return (
    <section className="py-16 px-4 bg-gray-50  relative">
        {/* Network Lines - Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 w-1/2 h-0.5 bg-blue-500/10 rotate-45"></div>
          <div className="absolute left-1/4 bottom-1/4 w-1/2 h-0.5 bg-blue-500/10 -rotate-45"></div>
          <div className="absolute left-1/3 top-0 w-0.5 h-full bg-blue-500/5"></div>
          <div className="absolute right-1/3 top-0 w-0.5 h-full bg-blue-500/5"></div>
          <div className="absolute left-0 top-1/3 w-full h-0.5 bg-blue-500/5"></div>
          <div className="absolute left-0 bottom-1/3 w-full h-0.5 bg-blue-500/5"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">MY SKILLS</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="flex flex-col items-center">
            {/* Main Skill Node - Center */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-300 shadow-lg shadow-blue-500/30 flex items-center justify-center mb-10 relative z-20">
              <span className="text-white text-2xl font-bold">MY SKILLS</span>
              
              {/* Decorative circles around main node */}
              <div className="absolute w-48 h-48 border border-blue-400/20 rounded-full"></div>
              <div className="absolute w-60 h-60 border border-blue-400/10 rounded-full"></div>
            </div>
            
            {/* Skill Map */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Left Branch - Frontend */}
              <div className="relative">
                <div className="mb-8 md:mb-12 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-cyan-300 shadow-lg shadow-cyan-500/30 mx-auto flex items-center justify-center mb-4">
                    <span className="text-white font-bold">FRONTEND</span>
                  </div>
                  {/* Connecting line */}
                  <div className="hidden md:block absolute top-14 -right-12 w-24 h-0.5 bg-cyan-400/30 rotate-[30deg]"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">HTML</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">CSS</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">JAVASCRIPT</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">REACT</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">NEXT.JS</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">TAILWIND CSS</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">BOOTSTRAP</div>
                  <div className="skill-tag bg-cyan-50 text-cyan-600 border border-cyan-200 shadow-md hover:shadow-cyan-300/40 hover:border-cyan-400">FRAMER MOTION</div>
                </div>
              </div>
              
              {/* Programming Languages - Center Down Branch */}
              <div className="relative">
                <div className="mb-8 md:mb-12 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border-2 border-purple-300 shadow-lg shadow-purple-500/30 mx-auto flex items-center justify-center mb-4">
                    <span className="text-white font-bold">LANGUAGES</span>
                  </div>
                  {/* Connecting line */}
                  <div className="hidden md:block absolute top-14 -left-12 w-24 h-0.5 bg-purple-400/30 -rotate-[30deg]"></div>
                  <div className="hidden md:block absolute top-14 -right-12 w-24 h-0.5 bg-purple-400/30 rotate-[30deg]"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">C/C++</div>
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">PYTHON</div>
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">JAVASCRIPT</div>
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">TYPESCRIPT</div>
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">SQL</div>
                  <div className="skill-tag bg-purple-50 text-purple-600 border border-purple-200 shadow-md hover:shadow-purple-300/40 hover:border-purple-400">SHELL</div>
                </div>
              </div>
              
              {/* Right Branch - Backend */}
              <div className="relative">
                <div className="mb-8 md:mb-12 text-center">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-300 shadow-lg shadow-green-500/30 mx-auto flex items-center justify-center mb-4">
                    <span className="text-white font-bold">BACKEND</span>
                  </div>
                  {/* Connecting line */}
                  <div className="hidden md:block absolute top-14 -left-12 w-24 h-0.5 bg-green-400/30 -rotate-[30deg]"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">NODE.JS</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">EXPRESS</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">DJANGO</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">REST API</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">MYSQL</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">POSTGRESQL</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">MONGODB</div>
                  <div className="skill-tag bg-green-50 text-green-600 border border-green-200 shadow-md hover:shadow-green-300/40 hover:border-green-400">FIREBASE</div>
                </div>
              </div>
            </div>
            
            {/* Bottom row - Tools and DevOps */}
            <div className="mt-12 relative">
              <div className="mb-8 text-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border-2 border-amber-300 shadow-lg shadow-amber-500/30 mx-auto flex items-center justify-center mb-4">
                  <span className="text-white font-bold">TOOLS</span>
                </div>
                <div className="hidden md:block absolute top-14 left-1/2 w-0.5 h-12 bg-amber-400/30 -translate-x-1/2"></div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">GIT/GITHUB</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">HUGGING FACE</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">LINUX</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">FIGMA</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">VERCEL</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">JWT/OAUTH</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">ZOD VALIDATION</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">STRIPE PAYMENTS</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">Razorpay</div>
                <div className="skill-tag bg-amber-50 text-amber-600 border border-amber-200 shadow-md hover:shadow-amber-300/40 hover:border-amber-400">Postman</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add a style tag for the skill tag styling */}
        <style jsx="true">{`
          .skill-tag {
            @apply px-3 py-1.5 rounded-md font-mono font-bold text-sm transition-all duration-300 hover:transform hover:-translate-y-1;
          }
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 5px 0px currentColor;
            }
            50% {
              box-shadow: 0 0 12px 2px currentColor;
            }
          }
          .skill-tag:hover {
            animation: pulse-glow 2s infinite;
          }
        `}</style>
      </section>
)
}

export default Skills