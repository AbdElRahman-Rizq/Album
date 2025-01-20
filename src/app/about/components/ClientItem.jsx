import Image from "next/image";

const ClientItem = ({ logo }) => (
  <div className="client-item">
    <figure>
      <Image src={logo} alt="Client Logo" width={200} height={200} />
    </figure>
  </div>
);

export default ClientItem;
