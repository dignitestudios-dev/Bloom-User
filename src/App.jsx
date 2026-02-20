import { useEffect, useState } from "react";
import "./App.css";

function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
  return "Desktop";
}

function openAppOrRedirect() {
  const device = getDeviceType();

  if (device === "Android") {
    // Try to open the app via Intent URL
    window.location.href =
      "intent://open#Intent;scheme=bloomapp;package=com.dignitestudios.bloomapp;end;";

    // Fallback to Play Store if app isn't installed
    setTimeout(() => {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.dignitestudios.bloomapp";
    }, 2000);
  } else if (device === "iOS") {
    // Try to open the app via custom URL scheme
    window.location.href = "secondshot://open";

    // Fallback to App Store if app isn't installed
    setTimeout(() => {
      window.location.href =
        "https://apps.apple.com/us/app/bloom-by-brittany/id6612033630"; // ← Replace with your App Store URL
    }, 2000);
  }
  // Desktop: do nothing (UI will show the message below)
}

function App() {
  const [deviceType, setDeviceType] = useState("");
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const device = getDeviceType();
    setDeviceType(device);

    if (device === "Android" || device === "iOS") {
      openAppOrRedirect();
      setRedirected(true);
    }
  }, []);

  return (
    <div className="redirect-container">
      {redirected ? (
        <>
          <h1>Redirecting you to the app...</h1>
          <p>
            If the app doesn't open automatically,{" "}
            <a
              href={
                deviceType === "Android"
                  ? "https://play.google.com/store/apps/details?id=com.dignitestudios.bloomapp"
                  : "https://apps.apple.com/us/app/bloom-by-brittany/id6612033630" // ← Replace with your App Store URL
              }
            >
              click here to download it.
            </a>
          </p>
        </>
      ) : (
        <>
          <h1>Bloom</h1>
          <p>This link is intended for mobile users only.</p>
          <p>Please open this link on your Android or iOS device.</p>
        </>
      )}
    </div>
  );
}

export default App;
