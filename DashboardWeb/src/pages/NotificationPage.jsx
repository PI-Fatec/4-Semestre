import { useEffect, useRef } from "react";
import axios from "axios";

const NotificationPage = () => {
  const lastAttRef = useRef(null);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const checkNotification = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensor/stats");
        const last = response.data[response.data.length - 1];
        if (last && last.att && lastAttRef.current !== last.att) {
          if (Notification.permission === "granted") {
            new Notification("Nova atualização detectada!", {
              body: "Há uma nova atualização no sistema.",
              icon: "./logosite.svg", 
            });
          }
          lastAttRef.current = last.att;
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    checkNotification();
    const interval = setInterval(checkNotification, 10000);
    return () => clearInterval(interval);
  }, []);

  return null; 
};

export default NotificationPage;