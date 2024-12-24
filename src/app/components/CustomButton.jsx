'use client'
import Link from 'next/link'

const CustomButton = ({ children, href, disabled }) => {
    return (
        <div className="btn-wrap text-center">
            <Link href={href} className="button-primary">{children}</Link>
        </div>
    )
}

export default CustomButton
