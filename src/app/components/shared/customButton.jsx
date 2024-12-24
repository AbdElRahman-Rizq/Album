import { Link } from 'react-router-dom';

const CustomButton = ({ children, href, disabled }) => {
    return (
        <>
            <div className="btn-wrap text-center">
                <Link to={href} className="button-primary">{children}</Link>
            </div>
        </>
    )
}

export default CustomButton