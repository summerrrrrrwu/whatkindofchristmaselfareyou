var answers = {};
var totalQuestions = 9;

function recordAnswer(questionNumber, option) {
    answers[questionNumber] = option;

    displayResult();

    if (questionNumber < totalQuestions) {
        var nextQuestionNumber = questionNumber + 1;
        console.log('跳转到 question' + nextQuestionNumber + '.html');
        window.location.href = 'question' + nextQuestionNumber + '.html';
    } else {
        calculateResult(); // 用户完成所有问题后计算结果
    }
}
function displayResult() {
    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '<p>你的答案: ' + JSON.stringify(answers) + '</p>';
}

document.addEventListener("DOMContentLoaded", function() {
    const introText = document.getElementById('introText');
    const paragraphs = [
        "你覺得大家最喜歡你什麼特點？"
    ];

    let index = 0;
    let paragraphIndex = 0;

    function typeWriter() {
        if (paragraphIndex < paragraphs.length) {
            if (index < paragraphs[paragraphIndex].length) {
                introText.innerHTML += paragraphs[paragraphIndex].charAt(index);
                index++;
                setTimeout(typeWriter, 60); // 调整打字速度（毫秒）
            } else {
                introText.innerHTML += '<br>';
                paragraphIndex++;
                index = 0;
                setTimeout(typeWriter, 50);
            }
        } else {
            fadeInOptions(); // 添加选项逐个显示的函数调用
        }
    }

    setTimeout(typeWriter, 1000);

    const options = document.querySelectorAll('.option');

    // 设置所有选项的初始不透明度为0
    options.forEach(option => {
        option.style.opacity = '0';
    });

    function fadeInOptions() {
        let opacity = 0;
        const fadeInInterval = setInterval(function() {
            if (opacity < 1) {
                options.forEach(option => {
                    option.style.opacity = opacity;
                });
                opacity += 0.05; // 调整淡入速度
            } else {
                clearInterval(fadeInInterval);
            }
        }, 100); // 调整淡入间隔（毫秒）
    }
});

let characters = {
    "煙囪滑梯專家": 0,
    "來自德國農場的聖誕樹": 0,
    "聖誕小妖精": 0,
    "夢遊小魔": 0,
    "克里希克拉赫": 0,
    "癱在地上的一攤雪": 0,
    "聖誕老人": 0,
};

function processAnswer(questionNumber, selectedAnswer) {
    switch (questionNumber) {
        case 1:
            if (selectedAnswer === 'A') {
                characters["煙囪滑梯專家"]++;
            } else if (selectedAnswer === 'B') {
                characters["聖誕老人"]++;
            } else if (selectedAnswer === 'C') {
                characters["夢遊小魔"]++;
            } else if (selectedAnswer === 'D') {
                characters["克里希克拉赫"]++;
            }
            break;
        // 处理其他问题的选项...
        default:
            break;
    }
}
function calculateResult() {
    let maxScore = -1;
    let topCharacters = [];
    
    for (const character in characters) {
        if (characters[character] > maxScore) {
            maxScore = characters[character];
            topCharacters = [character];
        } else if (characters[character] === maxScore) {
            topCharacters.push(character);
        }
    }

    let resultPage = '';

    if (topCharacters.length === 1) {
        resultPage = getResultPage(topCharacters[0]); // 根据最高得分的角色获取对应页面
    } else {
        resultPage = getResultPage(topCharacters[Math.floor(Math.random() * topCharacters.length)]);
    }

    window.location.href = resultPage; // 跳转到对应的结果页面
}

function getResultPage(character) {
    switch (character) {
        case "煙囪滑梯專家":
            return 'chimney.html';
        case "克里希克拉赫":
            return 'devil.html';
        case "癱在地上的一攤雪":
            return 'snow.html';
        case "聖誕小妖精":
            return 'elves.html';
        case "來自德國農場的聖誕樹":
            return 'christmastree.html';
        case "聖誕老人":
            return 'santa.html';
        case "夢遊小魔":
            return 'sleepwalking.html';
        default:
            return 'default.html'; // 未识别角色时的默认页面
    }
}

window.addEventListener('popstate', function(event) {
    // 获取当前页面的问题号
    var currentPageNumber = getCurrentPageNumber();

    // 清除当前问题之后的答案
    for (var i = currentPageNumber + 1; i <= totalQuestions; i++) {
        delete answers[i];
    }

    // 获取上一页的问题号
    var previousPageNumber = getCurrentPageNumberFromHistory();

    // 如果上一页问题号不同于当前页，则跳转到上一页
    if (previousPageNumber !== currentPageNumber) {
        window.location.href = 'question' + previousPageNumber + '.html';
    }
});

function getCurrentPageNumberFromHistory() {
    var currentPageNumber = getCurrentPageNumber();
    history.go(-1); // 直接返回上一页
    var previousPageNumber = getCurrentPageNumber();
    history.go(1); // 回到原页面
    return previousPageNumber;
}