document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const instructionsContainer = document.getElementById('instructions-container');
    const shareBtn = document.getElementById('share-btn');

    const player1NameSpans = document.querySelectorAll('.player1-name');
    const player2NameSpans = document.querySelectorAll('.player2-name');

    generateBtn.addEventListener('click', () => {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();

        if (player1Name === "" || player2Name === "") {
            alert("Please enter names for both Player 1 and Player 2.");
            return;
        }

        // Update player names in the document
        player1NameSpans.forEach(span => span.textContent = player1Name);
        player2NameSpans.forEach(span => span.textContent = player2Name);

        // Show the instructions and the share button
        instructionsContainer.style.display = 'block';
        shareBtn.style.display = 'block'; // Or 'inline-block' if preferred for layout
    });

    shareBtn.addEventListener('click', () => {
        const player1Name = player1Input.value.trim() || "Player 1";
        const player2Name = player2Input.value.trim() || "Player 2";

        // Construct the URL with parameters
        const params = new URLSearchParams();
        params.append('p1', player1Name);
        params.append('p2', player2Name);
        params.append('showInstructions', 'true');

        const shareUrl = `${window.location.pathname}?${params.toString()}`;

        // Attempt to use Web Share API first
        if (navigator.share) {
            navigator.share({
                title: `PS5 Game Sharing Instructions: ${player1Name} & ${player2Name}`,
                text: `Get your PS5 game sharing instructions for ${player1Name} and ${player2Name}.`,
                url: shareUrl,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => {
                console.log('Error sharing:', error);
                // Fallback if share API fails or is cancelled: copy URL to clipboard
                copyToClipboard(shareUrl, "Sharing cancelled or failed. Link to instructions copied to clipboard!");
            });
        } else {
            // Fallback for browsers that don't support Web Share API: copy URL to clipboard
            copyToClipboard(shareUrl, "Web Share not supported. Link to instructions copied to clipboard!");
        }
    });

    function copyToClipboard(text, message) {
        navigator.clipboard.writeText(text).then(() => {
            alert(message || 'Link copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            alert('Failed to copy link. Please copy manually.');
        });
    }

    // Function to load instructions if URL parameters are present
    function loadInstructionsFromURL() {
        const params = new URLSearchParams(window.location.search);
        const p1 = params.get('p1');
        const p2 = params.get('p2');
        const showInstructions = params.get('showInstructions');

        if (p1 && p2 && showInstructions === 'true') {
            player1Input.value = p1;
            player2Input.value = p2;

            player1NameSpans.forEach(span => span.textContent = p1);
            player2NameSpans.forEach(span => span.textContent = p2);

            instructionsContainer.style.display = 'block';
            shareBtn.style.display = 'block';

            // Optional: Scroll to instructions
            instructionsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Load instructions from URL on page load
    loadInstructionsFromURL();
});
