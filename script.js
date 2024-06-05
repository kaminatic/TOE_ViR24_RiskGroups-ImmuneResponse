document.addEventListener("DOMContentLoaded", function () {
    const unlockButton = document.getElementById("unlockButton");
    const passwordInput = document.getElementById("passwordInput");
    const lockScreen = document.getElementById("lockScreen");
    const content = document.getElementById("content");

    unlockButton.addEventListener("click", function () {
        const password = passwordInput.value.trim().toLowerCase();
        if (password === "i") {
            lockScreen.style.display = "none";
            content.style.display = "flex";
        } else {
            alert("Incorrect password. Try again.");
        }
    });

    const choices = document.querySelectorAll(".choice");
    const congratsMessage = document.getElementById("congratsMessage");
    const message = document.getElementById("message");
    const defaultMessage = document.getElementById("defaultMessage");

    const correctAnswers = {
        "Solitary Worker with Narrow Focus": "high",
        "Active Community Member with a Robust Routine": "low",
        "Engaged Professional with Diverse Interactions": "low",
        "Moderately Active Individual with Balanced Habits": "moderate",
        "Focused Specialist with Limited Social Network": "moderate",
        "Sensitive Individual with Specialised Challenges": "low"
    };

    choices.forEach(choice => {
        choice.addEventListener("click", function () {
            const parent = choice.parentElement;
            const allChoices = parent.querySelectorAll(".choice");
            allChoices.forEach(c => {
                c.src = c.src.replace("_checked.svg", "_unchecked.svg");
                c.classList.remove("selected");
            });

            choice.src = choice.src.replace("_unchecked.svg", "_checked.svg");
            choice.classList.add("selected");

            const allSelected = Array.from(document.querySelectorAll(".choice.selected"))
                .every(c => correctAnswers[c.closest('.outline-wrapper').querySelector('.description-text p').innerText.trim()] === c.dataset.answer);

            if (allSelected && document.querySelectorAll('.choice.selected').length === 6) {
                defaultMessage.style.display = "none";
                congratsMessage.style.display = "block";
                congratsMessage.classList.add("fade-in");
                setTimeout(() => {
                    congratsMessage.classList.remove("fade-in");
                    congratsMessage.classList.add("fade-out");
                    message.style.display = "block";
                    message.classList.add("fade-in");
                }, 2000); // Allow 2 seconds for the fade-in message before fading out
            }
        });
    });
});
