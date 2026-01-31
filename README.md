# Machine Coding Practice 🚀

This repository is my personal training ground for machine coding rounds.  
The goal is not just to write working code, but to build the mindset needed for interviews:

- Break problems into small rules  
- Design state properly  
- Debug calmly  
- Improve step by step  
- Think like a product engineer, not just a coder  

Each problem here represents one “round” of practice, similar to what happens in real interviews.

---

## 🧩 Problem 1: Color Matching Grid Game

### Overview
A 4×4 grid of squares is displayed.  
Each square has a hidden color.  
When the user clicks squares:

1. The square reveals its color.
2. Only two squares can be active at a time.
3. After two clicks:
   - If both squares have the **same color**, they stay visible.
   - If they have **different colors**, they reset back to white.
4. The game continues until all matching colors are found.

This problem simulates:
- State management
- UI updates based on state
- Array manipulation
- Game logic inside React

---

### 🛠 Concepts Practiced

- React `useState` for storing active squares  
- React `useEffect` for running game rules  
- Immutable state updates  
- Array operations (`slice`, `includes`, `filter`, `pop`)  
- Mapping UI from data  
- Handling toggle behavior  
- Avoiding object reference bugs by using IDs  

---

## 🧩 Problem 2: Counter Component

## Overview
This is a **count-up timer component** in React that tracks **hours, minutes, and seconds**.  
It supports **Start, Pause, and Reset** functionality.  
The key is using **state updater functions** and **intervals** to avoid stale state issues.

---

## Timer State Setup

```jsx
const [timerSeconds, setTimerSeconds] = useState(0);
const [timerMinutes, setTimerMinutes] = useState(0);
const [timerHours, setTimerHours] = useState(0);
const [isActive, setIsActive] = useState(false);
````

* `timerSeconds`, `timerMinutes`, `timerHours` → track time units
* `isActive` → controls if the timer is running

---

## Interval Logic – Correct Way

```jsx
useEffect(() => {
  if (!isActive) return; // Only run if active

  const interval = setInterval(() => {
    setTimerSeconds(prevSeconds => {
      if (prevSeconds + 1 === 60) {
        setTimerMinutes(prevMinutes => {
          if (prevMinutes + 1 === 60) {
            setTimerHours(prevHours => prevHours + 1); // Increment hours
            return 0; // Reset minutes
          }
          return prevMinutes + 1; // Increment minutes
        });
        return 0; // Reset seconds
      }
      return prevSeconds + 1; // Increment seconds
    });
  }, 1000);

  return () => clearInterval(interval); // Cleanup interval
}, [isActive]);
```

**Key Concepts:**

1. **Updater function `prev => prev + 1`**

   * Always uses **latest state**, avoids stale closures
2. **Nested updates for rollover**

   * Seconds → Minutes → Hours
3. **Cleanup** with `clearInterval`

   * Prevents memory leaks and multiple intervals
4. **Dependency array**

   * Only `[isActive]` needed because updater functions handle the rest

---

## Start / Pause / Reset Handlers

```jsx
const handleStart = () => setIsActive(true);
const handlePause = () => setIsActive(false);
const handleReset = () => {
  setTimerSeconds(0);
  setTimerMinutes(0);
  setTimerHours(0);
  setIsActive(false);
};
```

**Tip:** Always reset all units when resetting the timer.

---

## Display Timer – Double-Digit Format

```jsx
<div>
  {`${timerHours.toString().padStart(2, '0')} : 
    ${timerMinutes.toString().padStart(2, '0')} : 
    ${timerSeconds.toString().padStart(2, '0')}`}
</div>
```

* `padStart(2, '0')` → ensures **01:05:09** format
* Keeps UI neat and interview-ready

---

## Key Concepts & Revision Notes

### 1. **Updater function vs direct state**

```jsx
// ✅ Correct
setTimerSeconds(prev => prev + 1);

// ❌ Stale closure risk
setTimerSeconds(timerSeconds + 1);
```

* Always use the updater function inside async callbacks (setInterval, setTimeout)

---

### 2. **Rollover Logic**

* Seconds → Minutes → Hours
* Reset each unit at 60, increment next unit:

```jsx
if(prevSeconds + 1 === 60) {
  setTimerMinutes(prev => (prev + 1 === 60 ? 0 : prev + 1));
  return 0;
}
```

---

### 3. **setInterval vs setTimeout**

| Method        | Runs       | Notes                                                                                 |
| ------------- | ---------- | ------------------------------------------------------------------------------------- |
| `setTimeout`  | Once       | Needs recursion for repeated updates; may cause stale state if state is used directly |
| `setInterval` | Repeatedly | Works with updater function; always remember cleanup                                  |

---

### 4. **useEffect Cleanup**

```jsx
useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval); // Prevent memory leaks
}, [isActive]);
```

* **Always clean up intervals** to avoid multiple timers running

---

### 5. **Best Practices**

* Use `===` for comparisons instead of `==`
* Keep **state types consistent** (`number`)
* Only include **necessary dependencies** in `useEffect`
* Prefer **single updater functions** over multiple direct state references

---

## Quick Revision Tips

1. Always use `prev => prev + 1` in intervals
2. Handle **rollover correctly**: seconds → minutes → hours
3. Cleanup intervals with `clearInterval`
4. Format output neatly with `padStart(2, '0')`
5. Avoid stale closure bugs by **never referencing state directly inside async callbacks**

---
