const GRID = document.querySelector('.grid')
const ALL_BTNS = document.querySelectorAll('.buttons');
const FULL_SCREEN = document.querySelector('.screen');
const INPUT_SCREEN = document.getElementById('screen_text_node');
const ANSWER_SCREEN = document.getElementById('answer_screen');
const DELETE_BTN = document.querySelector('.delete')
const EQUAL_TO_BTN = document.querySelector('.equal')
let calculator_is_off = false;
let max_length_of_screen_input = 18;

GRID.addEventListener('click', e => {
    if (e.target.classList.contains('paste')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        if (!calculator_is_off) {
            if (INPUT_SCREEN.innerText.length < max_length_of_screen_input) put_input_on_screen(e.target);
            else return;
        }
    }

    if (e.target.classList.contains('off')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        calculator_is_off = true;
        FULL_SCREEN.style.background = 'black';
        INPUT_SCREEN.innerText = '';
    }

    if (e.target.classList.contains('on')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        calculator_is_off = false;
        FULL_SCREEN.style.background = '';
        INPUT_SCREEN.innerText = '';
        ANSWER_SCREEN.innerHTML = '';
    }

    if (e.target.classList.contains('square')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        let maximum_length_of_input_for_squaring = 8;

        if ((typeof eval(INPUT_SCREEN.innerText) === 'number') &&
            (INPUT_SCREEN.innerText.length < maximum_length_of_input_for_squaring)) {
            INPUT_SCREEN.innerText += ` * ${eval(INPUT_SCREEN.innerText)}`;
        } else return;
    }

    if (e.target.classList.contains('root')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        let max_length_of_input_for_squareRoot = 10;
        try {
            if (typeof eval(INPUT_SCREEN.innerText) === 'number' &&
                INPUT_SCREEN.innerText.length < max_length_of_input_for_squareRoot) {
                    ANSWER_SCREEN.innerText = Math.sqrt(eval(INPUT_SCREEN.innerText)).toFixed(3)
                }
        } catch (error) {
            return
        }
    }

    if (e.target.classList.contains('equal')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        try_catch_block_for_answer_evaluation()
    }

    if (e.target.classList.contains('ans')) {
        cssStyle_for_up_and_down_Btnpress(e.target)
        let ans = ANSWER_SCREEN.innerText;
        if (ans > 0) {
            ANSWER_SCREEN.innerText = '';
            INPUT_SCREEN.innerText = ans;
        } else return
    }

    if (e.target.classList.contains('delete')) delete_last_input()
    if (e.target.classList.contains('mc')) cssStyle_for_up_and_down_Btnpress(e.target);

})

window.addEventListener('keydown', (e) => {
        ALL_BTNS.forEach(button => {
            if (!calculator_is_off) {
                if (e.key === button.innerText) {
                    cssStyle_for_up_and_down_Btnpress(button);
                    if (INPUT_SCREEN.innerText.length < max_length_of_screen_input) put_input_on_screen(button);
            } else return;
        }
        });

        if (e.key === EQUAL_TO_BTN.innerText || e.key === 'Enter') {
            cssStyle_for_up_and_down_Btnpress(EQUAL_TO_BTN)
            try_catch_block_for_answer_evaluation()
    }
    
    if (e.key === 'Backspace') delete_last_input()
});

function put_input_on_screen(selected_input) {
    if ( INPUT_SCREEN.innerText.charAt(INPUT_SCREEN.innerText.length - 1) === selected_input.innerText &&
        selected_input.classList.contains('symb')) return;
    else INPUT_SCREEN.innerText += selected_input.innerText;
}

function put_answer_on_screen(arg) {
    let screen_input;
    let max_length_of_answer = 9;
    INPUT_SCREEN.innerText && arguments.length === 0) ? args_of_parentFunc_is_0() : args_of_parentFunc_is_greater_than_0();
    }

    function args_of_parentFunc_is_0() {
        screen_input = INPUT_SCREEN.innerText;

        if (Number.isInteger(eval(screen_input))) {
            if (eval(screen_input).toString().length >= max_length_of_answer) ANSWER_SCREEN.innerText = eval(screen_input).toPrecision(3);
            else ANSWER_SCREEN.innerText = eval(screen_input);
        }
        else if (!Number.isInteger(eval(screen_input)) && eval(screen_input) > 0) {
            if (eval(screen_input).toString().length >= max_length_of_answer) ANSWER_SCREEN.innerText = eval(screen_input).toPrecision(3);
            else ANSWER_SCREEN.innerText = eval(screen_input).toFixed(3);
        }
    }
    function args_of_parentFunc_is_greater_than_0() {
        if (Number.isInteger(arg)) {
            if (eval(arg).toString().length >= max_length_of_answer) ANSWER_SCREEN.innerText = arg.toPrecision(3);
            else ANSWER_SCREEN.innerText = arg;
        }

        else if (!Number.isInteger(eval(arg)) && eval(arg) > 0) {
            if (eval(arg).toString().length >= max_length_of_answer) ANSWER_SCREEN.innerText = eval(arg).toPrecision(3);
            else ANSWER_SCREEN.innerText = arg.toFixed(3);
        }
    }
}

function while_deleting_if_last_input_is_symbol_dont_evaluate_answer() {
    let all_symbols = /[+-/*%.]/;
    if (INPUT_SCREEN.innerText === '') ANSWER_SCREEN.innerText = '';
    else if (ANSWER_SCREEN.innerText > 0 && !all_symbols.test(INPUT_SCREEN.innerText.charAt(INPUT_SCREEN.innerText.length - 1))) put_answer_on_screen();
}

function try_catch_block_for_answer_evaluation() {
    try {
        if (typeof eval(INPUT_SCREEN.innerText) === 'number') put_answer_on_screen();
    } catch (error) {
        error = 'syntax error';
        ANSWER_SCREEN.innerText = error;
    }
}

function delete_last_input() {
    INPUT_SCREEN.innerText = INPUT_SCREEN.innerText.slice(0, -1);
    while_deleting_if_last_input_is_symbol_dont_evaluate_answer();
    cssStyle_for_up_and_down_Btnpress(DELETE_BTN);
}

function cssStyle_for_up_and_down_Btnpress(button) {
    //KEY DOWN
    button.style.top = '1px';
    button.style.boxShadow = `1px 1px 2px #bcbcbc,
                    -1px -1px 2px #fff`;

    //KEY UP
    setTimeout(() => {
        button.style.top = '0px';
        button.style.boxShadow = `3px 3px 6px #bcbcbc,
                    -3px -3px 8px #fff`;
    }, 200);
}
