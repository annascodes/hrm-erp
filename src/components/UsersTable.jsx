import moment from 'moment'
import React from 'react'
import RoleBadges from './RoleBadges'
import UserTableFilter from './UserTableFilter'
import Link from 'next/link'

const UsersTable = ({ users = null , handleFilter=null }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table table-md">
                <thead>
                    <UserTableFilter handle={handleFilter} />
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

            {/* <pre>
                {JSON.stringify(users, null, 10)}
            </pre> */}

        </div>
    )
}

export default UsersTable
