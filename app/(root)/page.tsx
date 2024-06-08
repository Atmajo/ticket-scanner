"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";

export default function Home() {
  const [form, setForm] = useState({
    id: Cookies.get("id"),
    name: "",
    membershipId: "",
    event: "",
    qr: "",
  });

  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getQr = async () => {
    const value = form.name + "," + form.membershipId + "," + form.event;
    return await QRCode.toDataURL(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const qrCode = await getQr();
      const updatedForm = { ...form, qr: qrCode };

      await fetch("/api/genTicket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedForm),
      });

      toast({
        title: "Ticket generated successfully",
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto min-h-screen">
      <div className="flex flex-col p-5 border border-black rounded-lg gap-3">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input type="text" name="name" onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Membership Id</Label>
          <Input type="text" name="membershipId" onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Event</Label>
          <Input type="text" name="event" onChange={handleChange} />
        </div>
        <div>
          {!loading ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
