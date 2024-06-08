import React from "react";

interface TicketCardProps {
  qr: string;
  name: string;
  membershipId: string;
  event: string;
}

const TicketCard = ({ qr, name, membershipId, event }: TicketCardProps) => {
  return (
    <div className="border border-black w-72 h-[500px] p-2">
      <div className="flex justify-center items-center">
        <img src={qr} alt="qr" className="object-contain" />
      </div>
      <div className="p-12">
        <h1 className="text-2xl font-semibold">{name}</h1>
        <p className="text-sm mt-2">{membershipId}</p>
        <p className="text-sm mt-2">{event}</p>
      </div>
    </div>
  );
};

export default TicketCard;
