import React from 'react'
import { NotebookPen, Sparkles, ArrowRight, Zap, Brain } from "lucide-react"
import SignIn from "@/components/SignIn.jsx"
import { Button } from './ui/button'
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern'
import ThemeBtn from './ThemeBtn'
import { useNavigate } from 'react-router-dom'


function Hero() {

  const navigate = useNavigate()

  return (
    <div className="relative items-center justify-center overflow-hidden bg-background dark:bg-background">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.5}
        duration={3}
        className="text-rose-600 mask-[radial-gradient(500px_circle_at_center,white,transparent)]"
      />
        <div className='flex items-center justify-between px-2 md:px-4 py-2 md:py-4'>
            <div className='flex items-center justify-center gap-2'>
                <NotebookPen className='' height={28} width={28}/>
                <span className='text-base font-semibold md:font-bold md:text-lg'>AI Notes</span>
            </div>
            <div className='flex items-center gap-4'>
              <ThemeBtn className={'cursor-pointer'}/>
              <SignIn/>
            </div>
        </div>

        <div className="text-center space-y-8 mt-16">

          <div className="inline-flex items-center space-x-2 px-4 py-2 border border-rose-600 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span className="text-sm font-semibold">AI-Powered Notes</span>
          </div>


          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
            <span className="block">
              Your Notes,
            </span>
            <span className="block bg-linear-to-r from-purple-800 via-pink-600 to-rose-600 bg-clip-text text-transparent mt-2">
              Summarized by AI
            </span>
          </h1>

          <p className="text-base md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Capture your thoughts effortlessly and let AI transform them into 
            <span className="text-rose-500 font-semibold"> intelligent summaries</span>.
          </p>
        </div>

        <div className='text-center my-6'>
          <Button 
          variant='default' className={'bg-linear-to-r from-purple-800 via-pink-600 to-rose-600 cursor-pointer dark:text-foreground mx-1'}
          >
            Start Taking Notes<ArrowRight/>
          </Button>
          <Button variant='outline' className={'border-rose-600 dark:border-rose-600 dark:text-foreground bg-background cursor-pointer mx-1'}>Wacth Demo</Button>
        </div>

        <div className="grid md:grid-cols-1 gap-6 mt-20 mx-4 py-6 text-left  place-content-center place-items-center">
            <div className="group p-6 bg-white/5 backdrop-blur-md rounded-2xl border hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-rose-600">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Zap className="w-6 h-6 text-neutral-50" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Summaries</h3>
              <p className="">
                Get AI-generated summaries of your notes in seconds. Perfect for quick reviews and studying.
              </p>
            </div>

            <div className="group p-5 bg-white/5 backdrop-blur-md rounded-2xl border hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-rose-600">
              <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Brain className="w-6 h-6 text-neutral-50" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Organization</h3>
              <p className="">
                AI automatically categorizes and tags your notes, making them easy to find and reference later.
              </p>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-md rounded-2xl border hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-rose-600">
              <div className="w-12 h-12 bg-linear-to-br from-rose-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-neutral-50" />
              </div>
              <h3 className="text-xl font-bold mb-2">Key Insights</h3>
              <p className="">
                Extract important points, action items, and insights automatically from any note or meeting.
              </p>
            </div>
        </div>

    </div>
  )
}

export default Hero