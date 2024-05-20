import React, { useEffect, useState } from "react";

const App = () => {
  const [phone,setPhone] = useState(null);
  const callback = (otplessUser) => {

    alert(JSON.stringify(otplessUser))
    // Implement your custom logic here.
  };
  
  useEffect(() => {
    // Load the SDK dynamically
    const script = document.createElement('script')
    script.id = 'otpless-sdk'
    script.type = 'text/javascript'
    script.src = 'https://otpless.com/v2/headless.js'
    script.setAttribute('data-appid',"AKQ65ZPGYITFQ4UQK65O")
    script.onload = () => {
        window.OTPlessSignin = new window.OTPless(callback);
    };
    document.head.appendChild(script);
    return () => {
        document.head.removeChild(script);
    };
}, []);

  const phoneAuth = (phno) => {
    setPhone(phno);
    window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phno,
        countryCode: "+91",
    });
};

  return (
    <div>
      <div id="mobile-section">
        <input id="mobile-input" placeholder="Enter mobile number" />
        <button onClick={()=>phoneAuth(document.getElementById('mobile-input').value)}>Verify</button>
      </div>
    </div>
  );
};

export default App;
