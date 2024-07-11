type Props = {
  data: { title: string; desc: string }[]
  subHeading: string
  heading: string
}
const ListDataSection = ({ data, subHeading, heading }: Props) => {
  return (
    <section className='ct-container flex flex-col gap-5 lg:gap-10'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-sm font-bold uppercase text-primary-yellow md:text-xl'>{subHeading}</h3>
        <h2 className='inline-block text-2xl font-semibold uppercase text-primary-blue lg:text-4xl'>{heading}</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6'>
        {data.map((item, index) => (
          <div key={`listData-${index}`} className='flex flex-col gap-1 text-lg text-baseBlack lg:gap-2'>
            <div className='flex items-center gap-2'>
              <span className='relative flex size-3 items-center justify-center lg:size-4'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5b500] opacity-75' />
                <span className='relative inline-flex size-2 rounded-full bg-[#f5b500] lg:size-[10px]' />
              </span>
              <h3 className='text-base font-semibold text-black lg:text-xl'>{item.title}</h3>
            </div>
            <p className='text-sm lg:text-base 2xl:text-lg'>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ListDataSection
