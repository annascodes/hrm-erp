import Cookies from 'js-cookie'


export   function setPendingLeaves(leaves) {
    // if(!leaves) return  //culprit
    // console.log('setPendingLeaves : ',leaves)
    Cookies.set('pendingLeaves', JSON.stringify(leaves), {path:'/'})
}

export   function getPendingLeaves() {
    const pendingLeaves = Cookies.get('pendingLeaves')

    return pendingLeaves ? JSON.parse(pendingLeaves): null;
    
}