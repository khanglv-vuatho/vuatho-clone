import AwardStructure from './(sections)/AwardStructure'
import Banner from './(sections)/Banner'
import ComplaintHandling from './(sections)/ComplaintHandling'
import Conditions from './(sections)/Conditions'
import Hero from './(sections)/Hero'
import HowToJoin from './(sections)/HowToJoin'
import Infomation from './(sections)/Infomation'
import Intro from './(sections)/Intro'
import OrganizingCommittee from './(sections)/OrganizingCommittee'
import Regulations from './(sections)/Regulations'

const ShineWithVuaTho = () => {
  return (
    <div className='flex flex-col pt-[70px] 2xl:pt-[80px]'>
      <Banner />
      <div className='w-full bg-primary-blue'>
        <div className='mx-auto mt-10 flex max-w-[1300px] flex-col gap-20'>
          <Intro />
          <Hero />
          {/* Điều kiện và tiêu chí */}
          <Conditions />
          {/* Cơ cấu giải thưởng */}
          <AwardStructure />
          {/* GIẢI QUYẾT KHIẾU NẠI, TỐ CÁO VÀ XỬ LÝ VI PHẠM */}
          <ComplaintHandling />
          {/*ban tổ chức */}
          <OrganizingCommittee />
          {/* Quy chế chấm giải */}
          <Regulations />

          {/* Cách thức tham gia */}
          <HowToJoin />
        </div>
        <Infomation />
      </div>
    </div>
  )
}

export default ShineWithVuaTho
