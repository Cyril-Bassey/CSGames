import React, { useState, useEffect, useCallback } from "react";
import beepSound from "../Assets/Sounds/computer-beeps-232200.mp3";
import softTone from "../Assets/Sounds/beepbeepbeep-53921.mp3";
import { Button, Card, Modal, notification } from "antd";

const defaultQuotes = {
  Stretch: "Stretching helps improve posture and releases tension in muscles!",
  "Drink Water": "Stay hydrated! Drinking water is vital for energy and focus.",
  "Take a Walk": "Walking clears your mind and boosts creativity.",
  Meditate: "A few moments of mindfulness can reduce stress significantly.",
  "Breathing Exercise": "Deep breathing relaxes the mind and calms the body.",
};

const soundOptions = [
  { label: "Beep Sound", file: beepSound },
  { label: "Soft Tone", file: softTone },
];

const BreakReminders = () => {
  const [alarms, setAlarms] = useState(
    JSON.parse(localStorage.getItem("alarms")) || []
  );
  const [newAlarmTime, setNewAlarmTime] = useState("");
  const [selectedReminders, setSelectedReminders] = useState([]);
  const [selectedSound, setSelectedSound] = useState(soundOptions[0].file);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAlarmIndex, setEditingAlarmIndex] = useState(null);
  const [countdowns, setCountdowns] = useState([]);
  // const [currentAlarmSound, setCurrentAlarmSound] = useState(null);
  const [audioContext, setAudioContext] = useState(null);

  const handleAlarmTrigger = useCallback(
    (index) => {
      if (alarms[index].isRinging) return;

      const sound = new Audio(alarms[index].sound);
      sound.play();

      const updatedAlarms = [...alarms];
      updatedAlarms[index].isRinging = true;
      updatedAlarms[index].soundInstance = sound;
      setAlarms(updatedAlarms);

      notification.open({
        message: "Time for a Break!",
        description: alarms[index].reminders
          .map((reminder) => defaultQuotes[reminder])
          .join("\n"),
      });
    },
    [alarms]
  );

  //Set initial user interaction to state
  useEffect(() => {
    // Start audio context on first user interaction to bypass autoplay restriction
    const startAudioContext = () => {
      if (!audioContext) {
        const context = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(context);
      }
    };

    window.addEventListener("click", startAudioContext, { once: true });
    return () => window.removeEventListener("click", startAudioContext);
  }, [audioContext]);

  //Play sound when alarm triggers
  useEffect(() => {
    const timers = alarms.map((alarm, index) => {
      if (alarm.startTime && !alarm.isRinging) {
        const now = Date.now();
        const timeElapsed = Math.floor((now - alarm.startTime) / 1000);
        const remainingTime = alarm.countdown - timeElapsed;

        if (remainingTime > 0) {
          setCountdowns((prevCountdowns) => {
            const newCountdowns = [...prevCountdowns];
            newCountdowns[index] = remainingTime;
            return newCountdowns;
          });
        } else {
          handleAlarmTrigger(index);
        }
      }

      return setInterval(() => {
        setCountdowns((prevCountdowns) => {
          const newCountdowns = [...prevCountdowns];
          if (newCountdowns[index] > 0) {
            newCountdowns[index] -= 1;
            if (newCountdowns[index] === 0) {
              handleAlarmTrigger(index);
            }
          }

          const updatedAlarms = alarms.map((alarm, idx) => ({
            ...alarm,
            countdown: newCountdowns[idx],
          }));
          localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
          return newCountdowns;
        });
      }, 1000);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [alarms, countdowns, handleAlarmTrigger]);

  const stopAlarm = (index) => {
    if (alarms[index].soundInstance) {
      alarms[index].soundInstance.pause();
      alarms[index].soundInstance.currentTime = 0;
      alarms[index].soundInstance = null;
    }

    const updatedAlarms = [...alarms];
    updatedAlarms[index].isRinging = false;
    setAlarms(updatedAlarms);
  };

  const handleNewAlarmChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      notification.error({
        message: "Please enter a valid number for minutes!",
      });
      return;
    }
    setNewAlarmTime(value);
  };

  const handleSetAlarm = () => {
    if (!newAlarmTime || isNaN(newAlarmTime) || newAlarmTime <= 0) {
      notification.error({
        message: "Please enter a valid time to set an alarm!",
      });
      return;
    }

    if (selectedReminders.length === 0) {
      notification.error({ message: "Please select at least one reminder!" });
      return;
    }

    if (!selectedSound) {
      notification.error({ message: "Please select a sound tone!" });
      return;
    }

    const intervalInSeconds = parseInt(newAlarmTime) * 60;
    const newAlarm = {
      time: newAlarmTime,
      reminders: selectedReminders,
      sound: selectedSound,
      countdown: intervalInSeconds,
      isRinging: false,
      startTime: Date.now(),
    };

    const updatedAlarms = [...alarms, newAlarm];
    setAlarms(updatedAlarms);
    setCountdowns((prevCountdowns) => {
      const newCountdowns = [...prevCountdowns];
      newCountdowns[alarms.length] = intervalInSeconds;
      return newCountdowns;
    });
    setNewAlarmTime("");
    setSelectedReminders([]);
    setSelectedSound(soundOptions[0].file);
    localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
  };

  const handleEditAlarm = (index) => {
    setEditingAlarmIndex(index);
    setIsModalVisible(true);
  };

  const handleConfirmChange = () => {
    const updatedAlarm = {
      time: newAlarmTime,
      reminders: selectedReminders,
      sound: selectedSound,
      countdown: parseInt(newAlarmTime) * 60,
      isRinging: false,
      startTime: Date.now(),
    };

    const updatedAlarms = [...alarms];
    updatedAlarms[editingAlarmIndex] = updatedAlarm;

    setCountdowns((prevCountdowns) => {
      const updatedCountdowns = [...prevCountdowns];
      updatedCountdowns[editingAlarmIndex] = parseInt(newAlarmTime) * 60;
      return updatedCountdowns;
    });

    setAlarms(updatedAlarms);
    setIsModalVisible(false);
    setEditingAlarmIndex(null);
    setNewAlarmTime("");
    setSelectedReminders([]);
    setSelectedSound(soundOptions[0].file);
    localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
  };

  const handleDeleteAlarm = (index) => {
    const updatedAlarms = alarms.filter((_, i) => i !== index);
    const updatedCountdowns = countdowns.filter((_, i) => i !== index);
    setAlarms(updatedAlarms);
    setCountdowns(updatedCountdowns);
    localStorage.setItem("alarms", JSON.stringify(updatedAlarms));
  };

  return (
    <div className="w-full h-full mx-auto bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 sm:p-4 md:p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Break Reminders
      </h2>

      <div>
        <label className="block text-md md:text-lg font-medium mb-2">
          Set Break Interval (minutes):
        </label>
        <input
          type="number"
          min="1"
          value={newAlarmTime}
          onChange={handleNewAlarmChange}
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        />
      </div>

      <div>
        <label className="block text-md md:text-lg font-medium mb-2">
          Choose Break Reminders:
        </label>
        <select
          multiple
          onChange={(e) =>
            setSelectedReminders(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        >
          {Object.keys(defaultQuotes).map((reminder) => (
            <option
              key={reminder}
              value={reminder}
              className="hover:bg-blue-200"
            >
              {reminder}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-md md:text-lg font-medium mb-2">
          Choose Alarm Tone:
        </label>
        <select
          onChange={(e) =>
            setSelectedSound(
              soundOptions.find((tone) => tone.label === e.target.value).file
            )
          }
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        >
          {soundOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSetAlarm}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Set Alarm
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg md:text-xl font-bold">Your Alarms:</h3>
        <div className="space-y-4">
          {alarms.map((alarm, index) => (
            <Card
              key={index}
              className={`p-4 ${
                alarm.isRinging ? "bg-green-400" : "bg-white"
              } rounded-lg shadow-md`}
              title={`Alarm set for ${alarm.time} minutes`}
              extra={
                <span>
                  {countdowns[index] !== undefined && !isNaN(countdowns[index])
                    ? `${Math.floor(countdowns[index] / 60)}m ${
                        countdowns[index] % 60
                      }s left`
                    : "0m 0s left"}
                </span>
              }
            >
              <p>{alarm.reminders.join(", ")}</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {alarm.isRinging ? (
                  <Button
                    onClick={() => stopAlarm(index)}
                    className="bg-red-500 text-white rounded-md w-full sm:w-auto"
                  >
                    Stop Alarm
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleEditAlarm(index)}
                    className="bg-blue-500 text-white rounded-md w-full sm:w-auto"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteAlarm(index)}
                  className="bg-red-500 text-white rounded-md w-full sm:w-auto"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        title="Edit Alarm"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmChange}>
            Confirm
          </Button>,
        ]}
      >
        <label className="block text-md font-medium mb-2">
          Set New Time (minutes):
        </label>
        <input
          type="number"
          min="1"
          value={newAlarmTime}
          onChange={handleNewAlarmChange}
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        />
        <label className="block text-md font-medium mb-2">
          Edit Reminders:
        </label>
        <select
          multiple
          value={selectedReminders}
          onChange={(e) =>
            setSelectedReminders(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        >
          {Object.keys(defaultQuotes).map((reminder) => (
            <option
              key={reminder}
              value={reminder}
              className="hover:bg-blue-200"
            >
              {reminder}
            </option>
          ))}
        </select>
        <label className="block text-md font-medium mb-2">
          Edit Alarm Tone:
        </label>
        <select
          value={
            soundOptions.find((option) => option.file === selectedSound)
              ?.label || soundOptions[0].label
          }
          onChange={(e) =>
            setSelectedSound(
              soundOptions.find((tone) => tone.label === e.target.value).file
            )
          }
          className="w-full p-2 mb-4 text-black rounded-md shadow-md"
        >
          {soundOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </Modal>
    </div>
  );
};

export default BreakReminders;
