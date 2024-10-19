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
                characters["來自德國農場的聖誕樹"]++;
            } else if (selectedAnswer === 'C') {
                characters["聖誕小妖精"]++;
            } else if (selectedAnswer === 'D') {
                characters["夢遊小魔"]++;
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
window.onload = function() {
    window.addEventListener('popstate', function(event) {
        // 获取当前页面的问题号
        var currentPageNumber = getCurrentPageNumber();

        // 清除当前问题之后的答案
        for (var i = currentPageNumber + 1; i <= totalQuestions; i++) {
            delete answers[i];
        }
    });
};

function getCurrentPageNumber() {
    // 从当前页面的路径中提取问题号
    var match = document.location.pathname.match(/question(\d+)\.html/);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return 0;
}


function restartQuiz() {
            // 清除答题记录
            localStorage.removeItem('answers');
            // 跳转到 index.html
            window.location.href = 'index.html';
        }