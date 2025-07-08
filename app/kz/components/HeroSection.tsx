'use client'

const HeroBanner = require('./HeroBanner').default
const SideBanners = require('./SideBanners').default

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-6 mx-6 my-8">
      <div className="flex-1">
        <HeroBanner />
      </div>
      <div className="w-full lg:w-[350px] flex flex-col gap-4">
        <SideBanners />
      </div>
    </section>
  )
}
