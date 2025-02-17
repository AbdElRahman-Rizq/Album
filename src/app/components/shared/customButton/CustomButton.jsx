'use client'
import Link from 'next/link'
import "../../../home/home.css"

const CustomButton = ({ children, href, disabled, onClick, className }) => {
    return (
        <Link
            href={href || '#'}
            className={` ${className || ''}`}
            onClick={onClick}
            {...(disabled ? { 'aria-disabled': true } : {})}
            style={{ color: `var(--second-color)` }}
        >
            {children}
        </Link>
    )
}

export default CustomButton
