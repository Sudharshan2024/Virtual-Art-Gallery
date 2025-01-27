const room = document.querySelector('.room');

let rotY = 0; // Horizontal rotation (left/right)
let rotX = 0; // Vertical rotation (up/down)

// Handle mouse movement for rotation
let isMouseDown = false;
document.addEventListener('mousedown', () => (isMouseDown = true));
document.addEventListener('mouseup', () => (isMouseDown = false));
document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    rotY += event.movementX * 0.2; // Rotate left/right
    rotX -= event.movementY * 0.2; // Rotate up/down

    // Limit vertical rotation to stay inside the room
    rotX = Math.max(-90, Math.min(90, rotX));

    updateView();
  }
});

// Handle keyboard input for rotation
document.addEventListener('keydown', (event) => {
  const rotationStep = 5; // Rotation increment in degrees

  switch (event.key) {
    case 'ArrowUp':
      rotX -= rotationStep; // Rotate up
      break;
    case 'ArrowDown':
      rotX += rotationStep; // Rotate down
      break;
    case 'ArrowLeft':
      rotY -= rotationStep; // Rotate left
      break;
    case 'ArrowRight':
      rotY += rotationStep; // Rotate right
      break;
    default:
      return; // Ignore other keys
  }

  // Limit vertical rotation
  rotX = Math.max(-90, Math.min(90, rotX));

  updateView();
});

// Update the room's perspective based on rotation
function updateView() {
  room.style.transform = `
    perspective(240px)
    rotateX(${rotX}deg)
    rotateY(${rotY}deg)
  `;
}

// Modal for artwork details
document.querySelectorAll('.art-piece').forEach((art) => {
  art.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    document.getElementById('modal-img').src = art.querySelector('img').src;
    document.getElementById('modal-title').innerText = art.dataset.title;
    document.getElementById('modal-description').innerText = art.dataset.description;
    modal.style.display = 'flex';
  });
});

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

