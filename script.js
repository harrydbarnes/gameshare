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

    shareBtn.addEventListener('click', async () => {
        const player1Name = player1Input.value.trim() || "Player 1";
        const player2Name = player2Input.value.trim() || "Player 2";
        
        // Consolidate text from instruction sections
        let textToShare = `PS5 Game Sharing Instructions for ${player1Name} and ${player2Name}:\n\n`;

        const p1InstructionsSection = document.getElementById('p1-instructions');
        const p2InstructionsSection = document.getElementById('p2-instructions');
        const risksSection = document.getElementById('risks');
        const postSetupSection = document.getElementById('post-setup');

        if (p1InstructionsSection) {
            textToShare += `Instructions for ${player1Name} (Game Owner):\n${Array.from(p1InstructionsSection.querySelectorAll('li')).map(li => `- ${li.textContent.replace(/\s+/g, ' ').trim()}`).join('\n')}\n\n`;
        }
        if (p2InstructionsSection) {
            textToShare += `Instructions for ${player2Name} (Game Receiver):\n${Array.from(p2InstructionsSection.querySelectorAll('li')).map(li => `- ${li.textContent.replace(/\s+/g, ' ').trim()}`).join('\n')}\n\n`;
        }
        if (risksSection) {
            textToShare += `Important Considerations & Risks:\n${Array.from(risksSection.querySelectorAll('li')).map(li => `- ${li.textContent.replace(/\s+/g, ' ').trim()}`).join('\n')}\n\n`;
        }
        if (postSetupSection) {
            textToShare += `Post-Setup Information:\n${Array.from(postSetupSection.querySelectorAll('li')).map(li => `- ${li.textContent.replace(/\s+/g, ' ').trim()}`).join('\n')}\n\n`;
        }
        
        textToShare += "Generated from PS5 Game Sharing Guide.";

        const shareData = {
            title: `PS5 Game Sharing: ${player1Name} & ${player2Name}`,
            text: textToShare,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Instructions shared successfully');
            } catch (err) {
                console.error('Error sharing:', err);
                // Fallback to clipboard if Web Share API fails (e.g., user cancels)
                copyToClipboard(textToShare, "Share failed, instructions copied to clipboard!");
            }
        } else {
            // Fallback for browsers that do not support Web Share API
            copyToClipboard(textToShare, "Web Share not supported. Instructions copied to clipboard!");
        }
    });

    function copyToClipboard(text, message) {
        navigator.clipboard.writeText(text).then(() => {
            alert(message || 'Copied to clipboard!');
        }).catch(err => {
            console.error('Error copying to clipboard:', err);
            alert('Failed to copy instructions. Please copy manually.');
        });
    }
});
