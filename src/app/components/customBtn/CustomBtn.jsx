'use client'
import Link from 'next/link'
import "../../home/home.css"

const CustomBtn = ({ children, href, disabled }) => {
    return (
        <div className="btn-wrap text-center custom-button" style={{ marginTop: "2rem"}}> 
            <Link href={href} className="button-primary">{children}</Link>
        </div>
    )
}

export default CustomBtn
