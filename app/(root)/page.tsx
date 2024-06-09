"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Home() {
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);

  const [scanResult, setScanResult] = useState<string | null>(null);
  
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: 250,
        fps: 5,
      },
      true
    );
    
    scanner.render(success, error);
    
    function success(result: any) {
      scanner.clear();
      setScanResult(result);
    }
    
    function error(error: any) {
      console.error(error);
    }
  }, []);
  
  return (
    <div className="flex flex-col justify-center items-center mx-auto min-h-screen">
      <h1>Scanning in Progress :</h1>
      {scanResult ? (
        <div>
          Result {":"} <a href={`https://${scanResult}`}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}
