# Big Planetarium Website

## Project Overview

This website was developed as a prototype for Big Planetarium, an educational organisation based in Bristol.  
The main goal is to help users learn about the Solar System in a simple, clear and interactive way.

The project focuses on usability, accessibility and responsive design, making the experience easy for all users.

---

## Project Structure

The website is built using three main technologies:

- **HTML** → Responsible for the structure of the pages  
- **CSS** → Controls layout, colours and visual design  
- **JavaScript** → Adds interactivity and dynamic content  

Each page follows a consistent structure with:

- Header (navigation and title)
- Main content (sections with information)
- Footer (basic site information)

---

## Pages Description

### Home Page (index.html)
The home page introduces the website and the concept of the Milky Way.  
It includes:

- A hero section with main information  
- Featured space objects (Sun, Moon, Asteroids)  
- A planet gallery  
- A call-to-action that directs users to the quiz  

---

### Mars Page (mars.html)
This page focuses on the planet Mars.  
It includes:

- General information about Mars  
- Quick facts displayed in cards  
- A comparison between Earth and Mars  
- An interactive section where users can generate random facts using JavaScript  

---

### Moon Page (moon.html)
This page explains key information about the Moon.  
It includes:

- Basic explanation of the Moon  
- Observational facts  
- Scientific information (phases, tides, distance)  
- A summary section to reinforce learning  

---

### Quiz & Video Page (visit.html)
This is the most interactive page of the website.  
It includes:

#### Video Section
- Embedded YouTube video explaining the Solar System  

#### Quiz
- 6 multiple-choice questions  
- Questions are shuffled using JavaScript  
- Instant feedback after submission  
- Highlights correct and incorrect answers  

#### Memory Game
- Cards are generated dynamically using JavaScript  
- Random images are selected each time the game starts  
- Users must match pairs of space objects  
- A message appears when all pairs are matched  

---

## JavaScript Functionality

JavaScript is used to add interactivity to the website.

### Quiz System
- Questions are stored in an array  
- The order is randomized using a shuffle function  
- User answers are checked and scored  
- Feedback is displayed dynamically  

### Memory Game
- Images are stored in an array  
- A random selection is made for each game  
- Cards are duplicated and shuffled  
- The system checks for matches and controls the game state  

### Interactive Mars Facts
- A button displays a random fact from a predefined list  
- Uses `Math.random()` to select the content  

---

## CSS Design

The design uses:

- Dark theme for better visual contrast  
- Grid and Flexbox for layout  
- Responsive design with media queries  
- Reusable classes for consistency  
- Visual feedback (hover, focus, active states)  

---

## Accessibility

The website includes several accessibility features:

- Semantic HTML elements  
- Skip link for keyboard navigation  
- Focus styles for interactive elements  
- Clear structure and readable content  

---

## Academic Integrity

This project is my own work, created as part of my Web Development assessment.  
I used online resources and tools, including ChatGPT, to support my learning and better understand concepts during development.

---

## Author

Pamela Luna  
Bath Spa University, Computing  