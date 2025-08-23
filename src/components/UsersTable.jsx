import moment from 'moment'
import React from 'react'
import RoleBadges from './RoleBadges'
import UserTableFilter from './UserTableFilter'
import Link from 'next/link'

const UsersTable = ({ users = null }) => {
    return (
        // <div>
        //     <div className="overflow-x-auto">
        //         <table className="table">
        //             {/* head */}
        //             <thead>
        //                 <tr>
        //                     <th>
        //                         <label>
        //                             <input type="checkbox" className="checkbox" />
        //                         </label>
        //                     </th>
        //                     <th>Name</th>
        //                     <th>Job</th>
        //                     <th>Favorite Color</th>
        //                     <th></th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {users && users.map((u, indx) => {
        //                     return (
        //                         <tr>
        //                             <th>
        //                                 {/* <label>
        //                                     <input 
        //                                     onChange={(e)=>console.log(e.target.value)}
        //                                     type="checkbox" className="checkbox" />
        //                                 </label> */}
        //                                 {++indx}
        //                             </th>
        //                             <td>
        //                                 <div className="flex items-center gap-3">
        //                                     <div className="avatar">
        //                                         <div className="mask mask-squircle h-12 w-12">
        //                                             <img
        //                                                 src={u.profileImg}
        //                                                 alt="Avatar Tailwind CSS Component" />
        //                                         </div>
        //                                     </div>
        //                                     <div>
        //                                         <div className="font-bold">{u.username}</div>
        //                                         <div className="text-sm opacity-50">{u.email}</div>
        //                                     </div>
        //                                 </div>
        //                             </td>
        //                             <td>
        //                               {/* {u.role} */}
        //                                 <br />
        //                                 <span className="badge badge-ghost badge-sm"> {u.role}</span>
        //                             </td>
        //                             <td>Purple</td>
        //                             <th>
        //                                 <button className="btn btn-ghost btn-xs">details</button>
        //                             </th>
        //                         </tr>
        //                     )
        //                 })}
        //                 {/* row 1 */}


        //             </tbody>
        //             {/* foot */}
        //             <tfoot>
        //                 <tr>
        //                     <th></th>
        //                     <th>Name</th>
        //                     <th>Job</th>
        //                     <th>Favorite Color</th>
        //                     <th></th>
        //                 </tr>
        //             </tfoot>
        //         </table>
        //     </div>

        // </div>

        <div className="overflow-x-auto">

            <table className="table table-md">
                <thead>
                    <UserTableFilter />
                    <tr>
                        <th></th>
                        <th>username</th>
                        <th>email</th>
                        <th>created</th>
                        <th>role</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        users && users.map((u, i) => {
                            return (
                                <tr className='hover:bg-blue-50 rounded-3xl' key={u._id} >
                                    <td></td>
                                    <td>
                                        <Link className='underline underline-offset-2' href={`/profile/${u.username}`}>{u.username}</Link>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        {moment(u.createdAt).format('ddd Do MMMM YYYY')}
                                        {/* {u.createdAt} */}
                                    </td>
                                    <td>
                                        <RoleBadges role={u.role} />
                                    </td>
                                </tr>
                            )
                        })
                    }


                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th>username</th>
                        <th>email</th>
                        <th>created</th>
                        <th>role</th>
                    </tr>
                </tfoot>
            </table>

            <pre>
                {JSON.stringify(users, null, 10)}
            </pre>

        </div>
    )
}

export default UsersTable
