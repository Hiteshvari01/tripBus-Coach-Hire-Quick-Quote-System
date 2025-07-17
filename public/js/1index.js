
    const tripButtons = document.querySelectorAll('.trip-type-btn');
    const tripTypeInput = document.getElementById('tripTypeInput');

    tripButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tripButtons.forEach((b) => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-outline-secondary');
        });

        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-primary');

        tripTypeInput.value = btn.getAttribute('data-type');
      });
    });
  