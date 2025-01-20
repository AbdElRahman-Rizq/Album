'use client'
import Link from 'next/link'
import "../home/home.css"

const CustomButton = ({ children, href, disabled }) => {
    return (
        <div className="btn-wrap text-center custom-button">
            <Link href={href} className="button-primary">{children}</Link>
        </div>
    )
}

export default CustomButton
