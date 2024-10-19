// Text Typing Animation Functionality
document.addEventListener("DOMContentLoaded", function() {
    const introText = document.getElementById('introText');
    const paragraphs = [
        "在一座遠離塵囂的森林中，一群特別的小精靈，又將在聖誕夜掀起一場又一場的歡樂混亂，他們就是......聖誕可愛鬼!",
        "這座看似普通的森林，其實充滿魔法的樹木和融化人心的彩虹雲層。",
        "每當聖誕夜來臨，可愛鬼們都迫不及待地展開一場神秘的挑戰，這就是傳說中的「聖誕可愛鬼的神秘測驗」。",
        "在這個神奇的夜晚，每一位可愛鬼都將被帶入一個充滿冒險和魔法的境地。",
        "他們需要回答一系列古老而神秘的問題，每一個問題都像是一扇通往不同聖誕境界的門。",
        "這是他們展現自己獨特個性的機會，也是見證自己在聖誕夜中的角色的時刻。",
        "現在，你也有機會參與這場神秘的測驗，發現自己的聖誕魔法，並成為那群愉快、獨特以及充滿驚喜的聖誕可愛鬼之一。",
        "準備好迎接這場冒險了嗎？",
		"讓魔法的聖誕之夜開始吧！"
    ];

    let index = 0;
    let paragraphIndex = 0;

    function typeWriter() {
        if (paragraphIndex < paragraphs.length) {
            if (index < paragraphs[paragraphIndex].length) {
                introText.innerHTML += paragraphs[paragraphIndex].charAt(index);
                index++;
                setTimeout(typeWriter, 50); // 调整打字速度（毫秒）
            } else {
                introText.innerHTML += '<br>';
                paragraphIndex++;
                index = 0;
                setTimeout(typeWriter, 50);
            }
        } else {
            fadeInButton();
        }
    }

    setTimeout(typeWriter, 1000);

    function fadeInButton() {
        const startButton = document.getElementById('startButton');
        let opacity = 0;
        const fadeInInterval = setInterval(function() {
            if (opacity < 1) {
                opacity += 0.05; // 调整淡入速度
                startButton.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 50); // 调整淡入间隔（毫秒）
    }
});

// Redirect to Question 1 Functionality
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function() {
        window.location.href = 'question1.html'; // 在点击按钮时跳转到 question1.html
    });
});
