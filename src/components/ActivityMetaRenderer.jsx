import React from 'react'
import UpdateUserMeta from './Meta/UpdateUserMeta'

const ActivityMetaRenderer = ({action, meta}) => {
//   if(action === 'Update User'){
//     return (
//        <UpdateUserMeta action={action} meta={meta} />
//     )
//   }

return (
   <div>
    {(action === 'Update User' || action ==='Update Employee') &&  <UpdateUserMeta action={action} meta={meta} /> }
   </div>
)

}

export default ActivityMetaRenderer
