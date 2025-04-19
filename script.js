let currentMode = 'sides'; // Default mode

document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to mode buttons
    document.getElementById('mode-sides').addEventListener('click', () => switchMode('sides'));
    document.getElementById('mode-angles').addEventListener('click', () => switchMode('angles'));

    // Add reset listeners for the new forms
     document.querySelector('#sides-form button[type="reset"]').addEventListener('click', () => {
        document.getElementById('sides-solution').innerHTML = '<p class="text-center text-gray-500">Enter values to see steps & result.</p>';
    });
    document.querySelector('#angles-form button[type="reset"]').addEventListener('click', () => {
        document.getElementById('angles-solution').innerHTML = '<p class="text-center text-gray-500">Enter values to see results.</p>';
    });


    // Initially set the mode
    switchMode(currentMode);
});


// Function to switch between calculation modes
function switchMode(mode) {
    currentMode = mode;

    // Hide all calculation sections
    document.querySelectorAll('.calculation-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(`${mode}-calc-section`).classList.remove('hidden');

    // Update button styles
    document.getElementById('mode-sides').classList.remove('bg-indigo-600', 'hover:bg-indigo-700', 'bg-gray-300', 'hover:bg-gray-400', 'text-white', 'text-gray-800');
    document.getElementById('mode-angles').classList.remove('bg-indigo-600', 'hover:bg-indigo-700', 'bg-gray-300', 'hover:bg-gray-400', 'text-white', 'text-gray-800');


    if (mode === 'sides') {
        document.getElementById('mode-sides').classList.add('bg-indigo-600', 'hover:bg-indigo-700', 'text-white');
        document.getElementById('mode-angles').classList.add('bg-gray-300', 'hover:bg-gray-400', 'text-gray-800');
         document.getElementById('sides-solution').innerHTML = document.getElementById('sides-solution').innerHTML.trim() === '' ? '<p class="text-center text-gray-500">Enter values to see steps & result.</p>' : document.getElementById('sides-solution').innerHTML; // Reset message if empty
    } else { // mode === 'angles'
        document.getElementById('mode-angles').classList.add('bg-indigo-600', 'hover:bg-indigo-700', 'text-white');
        document.getElementById('mode-sides').classList.add('bg-gray-300', 'hover:bg-gray-400', 'text-gray-800');
         document.getElementById('angles-solution').innerHTML = document.getElementById('angles-solution').innerHTML.trim() === '' ? '<p class="text-center text-gray-500">Enter values to see results.</p>' : document.getElementById('angles-solution').innerHTML; // Reset message if empty
    }

     // Clear inputs when switching mode
     document.getElementById('a-sides').value = '';
     document.getElementById('b-sides').value = '';
     document.getElementById('c-sides').value = '';
     document.getElementById('a-angles').value = '';
     document.getElementById('b-angles').value = '';
     document.getElementById('c-angles').value = '';

     // Clear output divs when switching
     document.getElementById('sides-solution').innerHTML = '<p class="text-center text-gray-500">Enter values to see steps & result.</p>';
     document.getElementById('angles-solution').innerHTML = '<p class="text-center text-gray-500">Enter values to see results.</p>';
}


// Function to calculate sides (modified from previous)
function calculateSides() {
    let a = document.getElementById('a-sides').value;
    let b = document.getElementById('b-sides').value;
    let c = document.getElementById('c-sides').value;
    const solutionDiv = document.getElementById('sides-solution');

    solutionDiv.innerHTML = ''; // Clear previous solution

    // Check if exactly two fields are filled
    const filledCount = [a, b, c].filter(val => val !== "").length;

    if (filledCount !== 2) {
        solutionDiv.innerHTML = '<p class="text-red-500 text-center">Please fill in exactly two side values.</p>';
         // Clear input values if not exactly 2 are filled (but not if all were initially empty)
        if (filledCount !== 0) {
             document.getElementById('a-sides').value = '';
             document.getElementById('b-sides').value = '';
             document.getElementById('c-sides').value = '';
        }
        return; // Stop calculation
    }

    // Convert values to numbers
    a = parseFloat(a);
    b = parseFloat(b);
    c = parseFloat(c);

    // Check for non-negative values
     if ((a < 0 && !isNaN(a)) || (b < 0 && !isNaN(b)) || (c < 0 && !isNaN(c))) {
         solutionDiv.innerHTML = '<p class="text-red-500 text-center">Side lengths cannot be negative.</p>';
         return;
     }

    let calculatedValue = null;
    let solvingFor = '';

    if (isNaN(a)) { // Solving for a
        solvingFor = 'a';
        if (c <= b) {
             solutionDiv.innerHTML = '<p class="text-red-500 text-center">Hypotenuse (c) must be longer than side b when solving for a.</p>';
             return;
        }
        const aSquared = c*c - b*b;
         if (aSquared < 0) {
             solutionDiv.innerHTML = '<p class="text-red-500 text-center">Invalid input: Cannot form a right triangle with these values (c² - b² is negative).</p>';
             return;
         }
        calculatedValue = Math.sqrt(aSquared);

        solutionDiv.innerHTML += `<p>Solving for: <b>a</b></p>`;
        solutionDiv.innerHTML += `<p>$a = \\sqrt{c^2 - b^2}$</p>`;
        solutionDiv.innerHTML += `<p>$a = \\sqrt{${c}^2 - ${b}^2}$</p>`;
        solutionDiv.innerHTML += `<p>$a = \\sqrt{${(c*c).toFixed(2)} - ${(b*b).toFixed(2)}}$</p>`;
        solutionDiv.innerHTML += `<p>$a = \\sqrt{${(aSquared).toFixed(2)}}$</p>`;


    } else if (isNaN(b)) { // Solving for b
        solvingFor = 'b';
         if (c <= a) {
             solutionDiv.innerHTML = '<p class="text-red-500 text-center">Hypotenuse (c) must be longer than side a when solving for b.</p>';
             return;
        }
        const bSquared = c*c - a*a;
        if (bSquared < 0) {
             solutionDiv.innerHTML = '<p class="text-red-500 text-center">Invalid input: Cannot form a right triangle with these values (c² - a² is negative).</p>';
             return;
         }
        calculatedValue = Math.sqrt(bSquared);

        solutionDiv.innerHTML += `<p>Solving for: <b>b</b></p>`;
        solutionDiv.innerHTML += `<p>$b = \\sqrt{c^2 - a^2}$</p>`;
        solutionDiv.innerHTML += `<p>$b = \\sqrt{${c}^2 - ${a}^2}$</p>`;
        solutionDiv.innerHTML += `<p>$b = \\sqrt{${(c*c).toFixed(2)} - ${(a*a).toFixed(2)}}$</p>`;
        solutionDiv.innerHTML += `<p>$b = \\sqrt{${(bSquared).toFixed(2)}}$</p>`;

    } else if (isNaN(c)) { // Solving for c
        solvingFor = 'c';
        calculatedValue = Math.sqrt(a*a + b*b);

        solutionDiv.innerHTML += `<p>Solving for: <b>c</b> (Hypotenuse)</p>`;
        solutionDiv.innerHTML += `<p>$c = \\sqrt{a^2 + b^2}$</p>`;
        solutionDiv.innerHTML += `<p>$c = \\sqrt{${a}^2 + ${b}^2}$</p>`;
        solutionDiv.innerHTML += `<p>$c = \\sqrt{${(a*a).toFixed(2)} + ${(b*b).toFixed(2)}}$</p>`;
        solutionDiv.innerHTML += `<p>$c = \\sqrt{${((a*a)+(b*b)).toFixed(2)}}$</p>`;
    }

     if (calculatedValue !== null) {
         solutionDiv.innerHTML += `<p class="text-lg font-bold mt-4 text-green-700">Result: ${solvingFor} = ${calculatedValue.toFixed(2)}</p>`;
         // Put calculated value back into the correct input field
         document.getElementById(`${solvingFor}-sides`).value = calculatedValue.toFixed(2);
     }


    // Typeset MathJax equations after updating content
     MathJax.typesetPromise([solutionDiv]);
}

// Function to calculate angles
function calculateAngles() {
     let a = document.getElementById('a-angles').value;
     let b = document.getElementById('b-angles').value;
     let c = document.getElementById('c-angles').value;
     const solutionDiv = document.getElementById('angles-solution');

     solutionDiv.innerHTML = ''; // Clear previous solution

     // Check if all three fields are filled
     const filledCount = [a, b, c].filter(val => val !== "").length;

     if (filledCount !== 3) {
         solutionDiv.innerHTML = '<p class="text-red-500 text-center">Please fill in all three side values (a, b, and c).</p>';
          // Clear input values if not exactly 3 are filled
        if (filledCount !== 0) {
             document.getElementById('a-angles').value = '';
             document.getElementById('b-angles').value = '';
             document.getElementById('c-angles').value = '';
        }
         return;
     }

     // Convert values to numbers
     a = parseFloat(a);
     b = parseFloat(b);
     c = parseFloat(c);

     // Check for positive values
     if (a <= 0 || b <= 0 || c <= 0) {
         solutionDiv.innerHTML = '<p class="text-red-500 text-center">Side lengths must be positive numbers.</p>';
         return;
     }

     // Find the hypotenuse (longest side)
     const sides = [a, b, c].sort((x, y) => x - y); // Sort sides in ascending order
     const leg1 = sides[0]; // Smallest side
     const leg2 = sides[1]; // Medium side
     const hypotenuse = sides[2]; // Longest side

     const tolerance = 0.01; // Tolerance for floating point comparison
     const isRightTriangle = Math.abs(leg1 * leg1 + leg2 * leg2 - hypotenuse * hypotenuse) < tolerance;

     if (!isRightTriangle) {
         solutionDiv.innerHTML = '<p class="text-red-500 text-center">These side lengths do not form a right triangle (a² + b² is not equal to c²).</p>';
          // You could add logic here to calculate angles for a general triangle using Law of Cosines if needed
         return;
     }

     // Calculate acute angles using asin or acos. Using acos with adjacent/hypotenuse is common.
     // Angle opposite side 'a' (Alpha) - adjacent side is 'b', hypotenuse is 'c'
     // Angle opposite side 'b' (Beta) - adjacent side is 'a', hypotenuse is 'c'
     // Ensure 'c' is indeed the hypotenuse provided by the user, matching the largest sorted side
     let angleA_rad, angleB_rad;

     if (c === hypotenuse) {
         // User's c is the hypotenuse, calculate angles opposite a and b
         angleA_rad = Math.asin(a / c); // sin(Alpha) = a/c
         angleB_rad = Math.asin(b / c); // sin(Beta) = b/c
     } else if (a === hypotenuse) {
         // User's a is hypotenuse, this doesn't match diagram convention (c is hypotenuse)
          solutionDiv.innerHTML = '<p class="text-red-500 text-center">Based on the diagram, side c is the hypotenuse. Please enter the longest side as c.</p>';
          return;
     } else if (b === hypotenuse) {
         // User's b is hypotenuse, doesn't match diagram convention
          solutionDiv.innerHTML = '<p class="text-red-500 text-center">Based on the diagram, side c is the hypotenuse. Please enter the longest side as c.</p>';
          return;
     } else {
          // Should not happen if isRightTriangle is true, but as a fallback
          solutionDiv.innerHTML = '<p class="text-red-500 text-center">Could not determine hypotenuse correctly.</p>';
          return;
     }


     const angleA_deg = angleA_rad * (180 / Math.PI);
     const angleB_deg = angleB_rad * (180 / Math.PI);
     const angleC_deg = 90; // Right angle

     solutionDiv.innerHTML += `<p class="text-lg font-semibold mb-2">Results:</p>`;
     solutionDiv.innerHTML += `<p>Angle opposite side a (Alpha): <b class="text-green-700">${angleA_deg.toFixed(2)}°</b></p>`;
     solutionDiv.innerHTML += `<p>Angle opposite side b (Beta): <b class="text-green-700">${angleB_deg.toFixed(2)}°</b></p>`;
     solutionDiv.innerHTML += `<p>Angle opposite side c (Gamma): <b class="text-green-700">${angleC_deg}°</b></p>`;
     solutionDiv.innerHTML += `<p class="mt-4 text-sm text-gray-600">Sum of angles: ${(angleA_deg + angleB_deg + angleC_deg).toFixed(2)}° (should be 180°)</p>`;


     // Typeset MathJax equations after updating content
     // No specific math formulas output here, but good practice if you add them
     // MathJax.typesetPromise([solutionDiv]); // Uncomment if adding formulas to angle output
}