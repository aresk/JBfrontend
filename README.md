# Weather Frontend
A React frontend project built with Create React App (react-scripts) and originally developed on Node.js v22.18.0.  

## Getting Started  
### Prerequisites  
- Node.js  
  - Preferred: v22.18.0 (development version)  
  - Fallback: v20.x (LTS, fully supported by Create React App)  
- npm (bundled with Node)  

### Installation  
1. Clone the repository:  
   `git clone <repo-url>`  
2. Navigate to the project directory:  
   `cd JBfrontend-main`  
3. Install dependencies:  
   `npm install`  

### Running the App  
- Start the development server:  
   `npm start`  
The app runs at [http://localhost:3000](http://localhost:3000).  

## Node Version Notes  
- Developed on Node v22.18.0.  
- CRA is tested against Node v20 (LTS).  
- On Node v22+, you may see:  
  `Invalid options object. Dev Server has been initialized using an options object that does not match the API schema. - options.allowedHosts[0] should be a non-empty string.`  
  If this occurs, switch to Node v20 using nvm:  
    `nvm install 20`  
    `nvm use 20`  

## Common Commands  
- `npm install` → Install dependencies  
- `npm start` → Start the development server  
- `npm run build` → Build for production  
- `npm test` → Run tests  

## Troubleshooting  
- **'react-scripts' is not recognized** → Run `npm install react-scripts@5.0.1`.  
- **allowedHosts schema error** → Use Node v20 (LTS).  
- **Deprecation warnings (fs.F_OK)** → Safe to ignore.
