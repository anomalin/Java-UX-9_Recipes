// OBS! All JS här är chatGPT:at !

// Select the slider, value display, and slider container
const slider = document.querySelector('input[type="range"]');
const valueDisplay = document.querySelector('.slider-value');

// Function to update the value display and position
function updateSliderValue() {
    const sliderValue = slider.value;
    valueDisplay.textContent = `${sliderValue} kr`;

    // Calculate the new left position of the value display
    const valuePosition = (sliderValue - slider.min) / (slider.max - slider.min) * 100;

    // Position the value display relative to the slider's value
    valueDisplay.style.left = `calc(${valuePosition}% - ${valueDisplay.offsetWidth / 2}px)`; // Center the value display
}

// Update the value display and position when the slider changes
slider.addEventListener('input', updateSliderValue);

// Call the function on page load to set the initial position
document.addEventListener('DOMContentLoaded', updateSliderValue);
