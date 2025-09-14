import { SignUp } from '@clerk/nextjs'
import BgGradient from '@/components/common/BgGradient'
export default function Page() {
  return <section className='flex justify-center items-center 
  min-h-[40vh] lg:min-h-[40vh] '>
    <div className="py-12 lg:py-24 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <SignUp />
        <BgGradient className='from-rose-400 via-rose-300 to-orange-200'/>
    </div>

  </section>
}