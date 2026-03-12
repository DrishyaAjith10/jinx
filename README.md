# Jinx

Jinx is a minimal desktop productivity app built with **Electron.js** that helps users stay accountable for their daily tasks. The app appears as a lightweight floating widget and reminds users of unfinished tasks throughout the day.

## Features

* Add and manage daily tasks
* Mark tasks as completed to remove them instantly
* Repeat (carry-forward) tasks to the next day
* Automatic **3 AM task reset** where non-repeating tasks are cleared
* Tasks persist locally using **electron-store**
* Popup window appears when the device is unlocked
* Minimal distraction-free UI

## Tech Stack

* **Electron.js**
* **JavaScript**
* **HTML / CSS**
* **electron-store** for local persistence

## How It Works

Tasks are stored locally using `electron-store`. A background scheduler in the Electron main process checks the system time and performs a daily reset at **3 AM**, preserving only tasks marked as repeat.

## Run the Project

```bash
npm install
npm start
```

## Future Improvements

* Native macOS notifications for reminders
* Bottom-right floating widget positioning
* Auto-launch on system startup
* UI improvements and animations
