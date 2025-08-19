import React from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import UserSummary from './UserSummary';
import Link from 'next/link';

const dummy = [
  {
    "_id": "687fe5c490edaa376d8d0c2f",
    "email": "Alice@test.com",
    "username": "alice",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:25:56.099Z",
    "updatedAt": "2025-07-22T19:25:56.099Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c30",
    "email": "Bob@test.com",
    "username": "bob",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "manager",
    "createdAt": "2025-07-22T19:26:00.000Z",
    "updatedAt": "2025-07-22T19:26:00.000Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c31",
    "email": "Charlie@test.com",
    "username": "charlie",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "admin",
    "createdAt": "2025-07-22T19:26:05.123Z",
    "updatedAt": "2025-07-22T19:26:05.123Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c32",
    "email": "Diana@test.com",
    "username": "diana",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:26:10.456Z",
    "updatedAt": "2025-07-22T19:26:10.456Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c33",
    "email": "Eve@test.com",
    "username": "eve",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:26:15.789Z",
    "updatedAt": "2025-07-22T19:26:15.789Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c34",
    "email": "Frank@test.com",
    "username": "frank",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "manager",
    "createdAt": "2025-07-22T19:26:20.012Z",
    "updatedAt": "2025-07-22T19:26:20.012Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c35",
    "email": "Grace@test.com",
    "username": "grace",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:26:25.345Z",
    "updatedAt": "2025-07-22T19:26:25.345Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c36",
    "email": "Heidi@test.com",
    "username": "heidi",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "admin",
    "createdAt": "2025-07-22T19:26:30.678Z",
    "updatedAt": "2025-07-22T19:26:30.678Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c37",
    "email": "Ivan@test.com",
    "username": "ivan",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:26:35.901Z",
    "updatedAt": "2025-07-22T19:26:35.901Z",
    "__v": 0
  },
  {
    "_id": "687fe5c490edaa376d8d0c38",
    "email": "Judy@test.com",
    "username": "judy",
    "profileImg": "https://static.vecteezy.com/system/resources/previews/036/744/532/non_2x/user-profile-icon-symbol-template-free-vector.jpg",
    "role": "employee",
    "createdAt": "2025-07-22T19:26:40.234Z",
    "updatedAt": "2025-07-22T19:26:40.234Z",
    "__v": 0
  }
]
const SelectUser = ({ users = null, user = null, setUser = null }) => {
  if(!users) return

  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-sm mx-auto h-56 overflow-auto">

      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Select user from the list</li>

      {
        users && users.map((u, indx) => {
          return (
            <li key={u._id} className={`list-row ${(user && user._id === u._id) && 'bg-blue-50'}`}>
                <div className=' flex flex-row justify-center items-center gap-3'>
                  <UserSummary user={u} />
              
              <div className="text-4xl font-thin opacity-30 tabular-nums">{++indx}</div>
                </div>
              <div><img className="size-10 rounded-box" src={u.profileImg} /></div>
              <div className="list-col-grow">
                <div>
                  <Link className='hover:underline' href={`/profile/${u.username}`}> {u.username} </Link>
                </div>
                <div className="text-xs  font-semibold opacity-60">{u.email}</div>

              </div>
              <div className=' flex flex-row justify-center items-center gap-3'>
                <button
                  onClick={() => {
                    if (user && user._id === u._id) setUser(null)
                    else setUser(u)

                  }}
                  className="cursor-pointer  ">
                  {user && user._id === u._id
                    ? <MdCheckBox className='text-2xl' />
                    : <MdCheckBoxOutlineBlank className='text-2xl' />
                  }
                </button>
              </div>

            </li>
          )
        })
      }




    </ul>
  )
}

export default SelectUser
