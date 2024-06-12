document.addEventListener("DOMContentLoaded", function () {
    const unlockButton = document.getElementById("unlockButton");
    const passwordInput = document.getElementById("passwordInput");
    const lockScreen = document.getElementById("lockScreen");
    const content = document.getElementById("content");

    unlockButton.addEventListener("click", function () {
        const password = passwordInput.value.trim();
        if (password === "I" || password === "i") {  // Accepts both 'I' and 'i' as valid passwords
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
        "Engaged Professional with Diverse Interactions": "low",
        "Focused Specialist with Limited Social Network": "moderate"
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

            checkAnswers();  // Check answers each time a choice is clicked
        });
    });

    function checkAnswers() {
        console.log("Checking answers...");
        let allCorrect = true;
        for (const [description, answer] of Object.entries(correctAnswers)) {
            const descriptionElement = Array.from(document.querySelectorAll('.description-text p')).find(p => p.textContent.trim() === description);
            console.log(`Checking description: "${description}"`);
            console.log(`Description element found: ${descriptionElement ? descriptionElement.textContent : 'none'}`);
            if (descriptionElement) {
                const selectedChoice = descriptionElement.parentElement.parentElement.querySelector('.choice.selected');
                console.log(`Selected choice for "${description}": ${selectedChoice ? selectedChoice.getAttribute('data-answer') : 'none'}`);
                if (!selectedChoice || selectedChoice.getAttribute('data-answer') !== answer) {
                    allCorrect = false;
                    console.log(`Incorrect answer for: ${description}`);
                    break;
                }
            } else {
                allCorrect = false;
                console.log(`Description element not found for: ${description}`);
                break;
            }
        }
        console.log("All correct:", allCorrect);
        console.log("Number of selected choices:", document.querySelectorAll('.choice.selected').length);
        if (allCorrect && document.querySelectorAll('.choice.selected').length === 3) {
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
    }

    const hintButton = document.getElementById("hintButton");
    const hintText = document.getElementById("hintText");

    hintButton.addEventListener("click", function () {
        if (hintText.style.display === "block") {
            hintText.style.display = "none";
        } else {
            hintText.style.display = "block";
            window.scrollTo(0, document.body.scrollHeight);
        }
    });
});
