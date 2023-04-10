export function SliderDisplay({ darkMode, setDarkMode }) {

    const handleClick = (event) => {
      // If theme is truthy, set to dark, otherwise light. Light/Dark are used in to define the second part of a className e.g. formDark vs. formLight.
      // Invert to swap between true and false.
      setDarkMode(event.target.checked);
    }
  
    return (
      <div className='switchContainer'>
        <p className={`sliderTextDark${darkMode}`}>Switch Dark Mode:</p>
        <label className="switch">
          <input type="checkbox" onChange={handleClick} checked={darkMode} />
          <span className={`slider sliderDark${darkMode} round`}></span>
        </label>
      </div>
    )
  }