import React from 'react'

const LinkCarousel = ({ Links=null }) => {
    return (
        <div>
            <div className="carousel rounded-box border mx-auto p-5">

                {
                    Links && Links.map((l, i) => {
                        return (
                            <div className="carousel-item">
                                    {l}
                            </div>
                        )
                    })
                }


            </div>

        </div>
    )
}

export default LinkCarousel
