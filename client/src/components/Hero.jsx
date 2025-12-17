import React from 'react'
import { NotebookPen, Sparkles, ArrowRight, Zap, Brain } from "lucide-react"
import SignIn from "@/components/SignIn.jsx"
import { Button } from './ui/button'
import { Link } from "react-router-dom"

function Hero() {


  return (
    <div className=' inset-0 z-0 bg-[radial-gradient(140%_140%_at_50%_90%,#000000_50%,#350136_100%)]  
    sm:bg-[radial-gradient(150%_120%_at_40%_100%,#000000_30%,#350136_100%)]' 
    >
        <div className='flex items-center justify-between px-2 md:px-4 py-2 md:py-4'>
            <div className='flex items-center justify-center gap-2'>
                <NotebookPen className='text-background' height={28} width={28}/>
                <span className='text-background text-base font-semibold md:font-bold md:text-lg'>AI Notes</span>
            </div>
            <div className='flex items-center gap-4'>
              <a href="https://github.com/MDK528/fullstack-notes-app" target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github text-background"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <SignIn/>
            </div>
        </div>

        <div className="text-center space-y-8 mt-16">

          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span className="text-sm text-background">AI-Powered Notes</span>
          </div>


          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
            <span className="block text-background  ">
              Your Notes,
            </span>
            <span className="block bg-linear-to-r from-purple-800 via-pink-600 to-rose-600 bg-clip-text text-transparent mt-2">
              Summarized by AI
            </span>
          </h1>

          <p className="text-base md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Capture your thoughts effortlessly and let AI transform them into 
            <span className="text-rose-500 font-semibold"> intelligent summaries</span>.
          </p>
        </div>

        <div className='text-center my-6'>
          <Button variant='default' className={'bg-linear-to-r from-purple-800 via-pink-600 to-rose-600 cursor-pointer mx-1'}>Start Taking Notes<ArrowRight/></Button>
          <Button variant='outline' className={'border-neutral-600 bg-neutral-800 text-background hover:text-background hover:bg-neutral-700 cursor-pointer mx-1'}>Wacth Demo</Button>
        </div>

        <div className="grid md:grid-cols-1 gap-6 mt-20 mx-4 py-6 text-left  place-content-center place-items-center">
            <div className="group p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-pink-500/50">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-background">Instant Summaries</h3>
              <p className="text-neutral-400">
                Get AI-generated summaries of your notes in seconds. Perfect for quick reviews and studying.
              </p>
            </div>

            <div className="group p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-pink-500/50">
              <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-background">Smart Organization</h3>
              <p className="text-neutral-400">
                AI automatically categorizes and tags your notes, making them easy to find and reference later.
              </p>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-pink-500/50">
              <div className="w-12 h-12 bg-linear-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-background">Key Insights</h3>
              <p className="text-neutral-400">
                Extract important points, action items, and insights automatically from any note or meeting.
              </p>
            </div>
          </div>

    </div>
  )
}

export default Hero