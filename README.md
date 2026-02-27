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

## 🧩 Problem 3: Debounced Search with Mock API

### Overview
Search input that delays API calls until the user stops typing.  
Prevents unnecessary network requests.

---

## Core Concepts

- Controlled input (`useState`)
- Debounce using `setTimeout`
- Cleanup with `clearTimeout`
- `useEffect` dependency control
- Async API calls (Axios)
- Next.js API routes as mock backend
- Array filtering logic
- GET request semantics

---

## State Setup

```jsx
const [searchText, setSearchText] = useState("");
const [results, setResults] = useState([]);
const [loading, setLoading] = useState(false);
````

---

## Debounce Logic (Essential)

```jsx
useEffect(() => {
  if (!searchText) return;

  const timer = setTimeout(async () => {
    setLoading(true);
    const res = await axios.get("/api/search", {
      params: { query: searchText }
    });
    setResults(res.data.results);
    setLoading(false);
  }, 300);

  return () => clearTimeout(timer);
}, [searchText]);
```

---

## Why This Works

* `setTimeout` runs once
* Cleanup cancels previous timeout
* Only latest input triggers API
* No stale state usage

---

## setTimeout vs setInterval

| setTimeout           | setInterval        |
| -------------------- | ------------------ |
| Runs once            | Runs repeatedly    |
| Best for debounce    | Best for timers    |
| Cleanup cancels call | Cleanup stops loop |

---

## Axios GET Pattern

```ts
const fetchResults = async (query: string) => {
  const res = await axios.get("/api/search", {
    params: { query }
  });
  return res.data.results;
};
```

---

## Mock API Filter Logic

```ts
const filtered = data.filter(item =>
  item.toLowerCase().includes(query.toLowerCase())
);
```

> `filter` callback must return a boolean.

---

## Why GET Request

* Read-only operation
* Idempotent
* Cache-friendly
* REST standard for search

---

## Common Pitfalls

* Calling API inside `onChange`
* Missing `clearTimeout`
* `filter` without return
* Using POST for search

---

## Quick Revision Points

1. Debounce = `setTimeout + cleanup`
2. Dependency array controls debounce
3. Use GET for search
4. `filter` always returns array
5. Axios `params` preferred

---

## Interview One-Liner

> “Debounced search implemented using `setTimeout` inside `useEffect` with cleanup to avoid unnecessary API calls.”

```
```



# Frontend Machine Coding – Grid Game Concepts Revision

This problem (dynamic N×N grid + pattern detection + scoring) tests multiple React and frontend fundamentals.

Focus on these concepts for interviews.

---

# 1️⃣ React State Management

## Derived State
When one state depends on another:

Example concept:
- grid depends on gridSize
- Must recompute grid when gridSize changes

Interview Point:
> Use useEffect to recompute derived state when dependency changes.

Pattern:
- state A changes
- recompute state B from A

---

## Immutable Updates (Very Important)

React re-renders only when reference changes.

Wrong concept:
- Mutating objects/arrays directly

Correct concept:
- Create new copy → update → return

Interview phrase:
> “React relies on shallow comparison — always update state immutably.”

---

# 2️⃣ Nested Data Structures

Grid problems use:

- 2D arrays
- coordinate keys
- row-column indexing

Common patterns:

- matrix traversal
- directional scanning
- boundary-safe lookup

Interview expectation:
> You should be comfortable working with row/col coordinates.

---

# 3️⃣ Coordinate Key Mapping

Instead of nested objects, flatten coordinates:

```
"row-col" → "2-3"
```

Benefits:
- Easy lookup
- O(1) access
- Avoid nested state complexity

Interview phrase:
> “Flattened coordinate keys simplify board state management.”

---

# 4️⃣ Pattern Detection in Grid

Typical interview pattern:

Check neighbors in directions:

Directions set:
- horizontal
- vertical
- diagonal
- anti-diagonal

Concept:
```
directions = [
 [0,1],
 [1,0],
 [1,1],
 [1,-1]
]
```

Interview phrase:
> “Directional vectors allow reusable grid scanning logic.”

---

# 5️⃣ Sliding Window Pattern (Grid Version)

X-O-X detection is a sliding window of length 3 across directions.

Concept:
- treat pattern matching like window scanning
- center / left / right checks

Interview mapping:
String sliding window → Grid sliding window

---

# 6️⃣ Controlled Components

Each grid cell select/dropdown is controlled:

- value comes from state
- onChange updates state

Interview phrase:
> “Form elements should be controlled for predictable UI behavior.”

---

# 7️⃣ Preventing Duplicate Actions

Logic:
- prevent selecting already-filled cell
- disable crossed cells

Concepts tested:
- guard clauses
- early returns

Interview phrase:
> “Use guard conditions to prevent invalid state transitions.”

---

# 8️⃣ Turn-Based State Logic

Player switching pattern:

- after valid move → toggle player

Concept:
Finite state transitions

Interview phrase:
> “Turn switching is modeled as a deterministic state toggle.”

---

# 9️⃣ Derived Calculations During Update

You computed score during board update.

Good concept:
- compute derived results inside state updater function

Why:
- ensures latest state snapshot

Interview phrase:
> “Use functional state updates when next state depends on previous.”

---

# 🔟 Tailwind Dynamic Class Limitation

Important frontend gotcha:

Dynamic classes like:
```
grid-cols-${n}
```
do NOT work.

Why:
- Tailwind generates classes at build time

Fix concept:
- use inline style for dynamic layout

Interview phrase:
> “Tailwind cannot parse runtime-generated class names.”

---

# 1️⃣1️⃣ useEffect for Game End Detection

Pattern:
Trigger side effects when state reaches condition.

Example:
- board full → compute winner → alert

Interview phrase:
> “useEffect is used for side effects based on state transitions.”

---

# 1️⃣2️⃣ State Shape Design

Good board cell model:

```
{
 value: X | O
 crossed: boolean
}
```

Concept:
Store UI + logic metadata together.

Interview phrase:
> “State should contain both value and UI flags when needed.”

---

# 1️⃣3️⃣ Rendering Performance Concept

Nested maps render grid:

- O(n²) render
- acceptable for small boards
- mention memoization for large grids

Interview phrase:
> “For larger grids, memoization or virtualization may be needed.”

---

# 1️⃣4️⃣ Edge Case Thinking (Interview Gold)

Mention these verbally:

- boundary checks in grid
- duplicate pattern detection
- overlapping matches
- disabled cell clicks
- empty grid case
- grid resize reset

Interviewers LOVE this.

---

# 1️⃣5️⃣ What Interviewers Are Actually Testing

Not the game — but:

- state modeling
- immutability
- grid traversal
- pattern detection
- controlled inputs
- derived state
- conditional rendering
- effect timing
- logic organization

---

# 🔥 One-Line Summary for Interview

> “This problem combines dynamic grid rendering, immutable state updates, directional pattern scanning, and derived scoring logic using React state and effects.”




# 🎬 Movie Filter & Sorting using REST API

## 📌 Overview

This project demonstrates how to fetch data from a public REST API, filter it based on specific criteria, and sort the results using custom logic in Python.

The application retrieves TV show data from the **TVMaze API**, filters shows by genre, and returns the highest-rated show based on defined sorting rules.

---

## 🚀 Features

* Fetch data from REST API
* Filter shows by genre
* Handle missing/null values safely
* Sort results based on:

  * IMDb rating (descending)
  * Show name (ascending, for tie-breaking)
* Return top-rated show

---

## 🛠️ Tech Stack

* Python 3
* `requests` library

---

## 📂 API Used

* https://api.tvmaze.com/shows?page=1

---

## 🧠 Problem Statement

Given a genre:

1. Fetch TV shows from an API
2. Filter shows that belong to the given genre
3. Sort them by:

   * Highest rating first
   * If ratings are equal → sort lexicographically by name
4. Return the top result

---

## 🧾 Code Explanation

### 1. Filtering Function

```python
def filter_movies(data , genre : str):
    res = []
    for ele in data:
        if genre in ele["genres"]:
            res.append(ele)
    return res
```

* Iterates through API response
* Selects only those shows matching the given genre

---

### 2. Main Function

```python
def get_api(genre : str):
    res = []
    for i in range(1,2):
        response = requests.get(f"https://api.tvmaze.com/shows?page={i}")
        data = response.json()
        res.extend(filter_movies(data , genre))
```

* Calls API
* Aggregates filtered results

---

### 3. Sorting Logic

```python
res.sort(
    key=lambda x: (
        -(x.get('rating', {}).get('average') or 0),
        str(x.get('name') or '')
    )
)
```

### 🔍 Explanation:

* `-(rating)` → ensures descending order
* `name` → ensures ascending lexicographical order for ties
* Handles missing values safely using `.get()`

---

### 4. Final Output

```python
return [res[0]['name'], res[0]['rating']['average']]
```

* Returns the highest-rated show after sorting

---

## ▶️ Example Output

```bash
['Show Name', 8.9]
```

---

## ⚠️ Edge Cases Handled

* Missing ratings → treated as `0`
* Missing names → treated as empty string
* Empty results (can be extended with checks)

---

## 📈 Possible Improvements

* Handle multiple pages dynamically instead of fixed range
* Add error handling for API failures
* Use list comprehensions for cleaner filtering
* Return top N results instead of just one
* Add unit tests

---

## 💡 Key Learning

* Practical use of `lambda` for custom sorting
* Handling real-world API data
* Writing clean and safe Python code under constraints

---

## 📬 Usage

```python
print(get_api("Comedy"))
```

---

## 🏁 Conclusion

This project simulates a real-world machine coding/API problem often asked in coding assessments, focusing on:

* Data fetching
* Filtering
* Sorting logic
* Edge case handling

---

⭐ If you found this useful, consider starring the repo!












