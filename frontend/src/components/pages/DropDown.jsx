import React from 'react';
import { Dropdown, Space } from 'antd';


const DropDown = ({ assignedUsers }) => {
    // console.log("assignedUsers",assignedUsers)
  const menuItems = assignedUsers.map((user, index) => ({
    key: index.toString(),
    label: user.assignedTo
  }))

  const itemList = [...new Set( menuItems.map(item => item.label?.map(subItem => subItem.name)).flat()
  )]


  // console.log("itemList",itemList,menuItems)

  return (
    <Dropdown
      overlay={
        <div className='bg-blue-200 px-4  rounded-[15px] '> 
           {itemList.map((item) => (   
            <div  className="px-4 py-2 cursor-pointer hover:bg-blue-400">
              {item}
            </div>
          ))}
        </div>
      }
    >
      <a onClick={(e) => e.preventDefault()} className='flex justify-center items-center cursor-pointer max-w-25 rounded-[15px]  bg-blue-300'>
        <Space className='flex'>
       Click me
        
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropDown;
