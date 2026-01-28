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

### 🧠 What This Problem Teaches

This problem is less about colors and more about **thinking clearly under pressure**:

- How to model state
- How to detect last actions
- How to enforce game rules
- How UI reacts to data
- How small mistakes create big bugs

It mirrors real machine coding rounds where:
> Your approach matters more than perfection.

---

### 📈 Progress Strategy

Each next problem will:
- Add complexity
- Improve code structure
- Reduce use of `any`
- Introduce cleaner patterns
- Improve interview readiness

---

### 🎯 Objective

To become confident enough that in an interview:
- The clock doesn’t scare me
- Bugs don’t panic me
- Logic feels natural
- Debugging feels controlled

This repo is proof of consistency, not perfection.
