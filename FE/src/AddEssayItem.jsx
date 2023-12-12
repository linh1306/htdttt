import React, { useState } from 'react';

const AddEssayItem = ({ id, index, essays, setEssays, newEssay, setNewEssay }) => {
  return (
    <div className='flex flex-col'>
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        <option value="text">text</option>
        <option value="img">img</option>
        <option value="title">title</option>
      </select>
      <div>

          <textarea className='w-full p-3 border-[3px] whitespace-pre-wrap' placeholder='văn bản'></textarea>
      </div>
      <div>
        <button className='px-3 py-2 text-white bg-blue-400 rounded-md'>add</button>
      </div>
    </div>
  );
};

export default AddEssayItem;