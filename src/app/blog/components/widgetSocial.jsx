import Link from "next/link";

const WidgetSocial = ({ type, icon, name, children, href }) => {
  return (
    <div className={`social-icon social-${type}`}>
      <Link href={href}>
        {children}
        {/* <i className={`fab fa-${icon}`}></i> */}
        <span>{name}</span>
      </Link>
    </div>
  );
};

export default WidgetSocial;
