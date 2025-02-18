import { useEffect, useState } from "react";
import NumberUtil from "../../../../../Utils/number";

const useMonitorTestTaking = () => {
  useEffect(() => {
    // Function to capture device parameters
    const captureDeviceInfo = () => {
      return {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
      };
    };

    // Function to handle tab switch or window blur
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logActivity("Tab switch or window blur detected");
      }
    };

    // Function to log activity
    const logActivity = (message: string) => {
      const data = {
        timestamp: new Date().toISOString(),
        message,
        deviceInfo: captureDeviceInfo(),
      };
      // Send data to server
      console.log("monitor: ", data);
    };

    // Add event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", () => logActivity("Page unload detected"));

    // Capture initial device info
    logActivity("Test started");

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null; // This hook doesn't render anything
};

const useCountDown = (duration: number) => {
  const [secondLeft, setSecondLeft] = useState(duration);

  const calculateTimeLeft = () => {
    let timeLeft: { hours: string; minutes: string; seconds: string } = {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (secondLeft > 0) {
      const hours = Math.floor(secondLeft / (60 * 60));
      const minutes = Math.floor((secondLeft - hours * 60 * 60) / 60);
      const seconds = Math.floor(secondLeft - hours * 60 * 60 - minutes * 60);

      timeLeft = {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    }

    setSecondLeft((pre) => pre - 1);

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [secondLeft]);

  return timeLeft;
};

export { useMonitorTestTaking, useCountDown };
