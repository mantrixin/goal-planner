import React from 'react';
import SummarySection from '../../component/homepage-component/left-side';
import RightSide from '../../component/homepage-component/right-side';


const DashBoardPage = () => {
  
  
  return (
    <div className={`px-6 py-2  'bg-gray-50'`}>
      <section className="flex gap-4">
        <SummarySection className={`px-6 py-2 'bg-gray-50'}`}/>
        <RightSide className={`px-6 py-2 'bg-gray-50'}`} />
      </section>
    </div>
  );
};

export default DashBoardPage;
