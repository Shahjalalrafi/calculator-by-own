class Calculator {
    constructor(previousOperandTextButton, currentOperandTextButton) {
        this.previousOperandTextButton = previousOperandTextButton
        this.currentOperandTextButton = currentOperandTextButton
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    choseOperation(operation) {
        if (this.currentOperand == '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.previousOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0
            })
        }
        if(decimalDigits !== null) {
            return `${integerDisplay}.${integerDigits}`
        }
        else {
            return integerDisplay
        }


        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
    }

    updateDisplay() {
        this.currentOperandTextButton.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation !== null) {
            this.previousOperandTextButton.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextButton.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const previousOperandTextButton = document.querySelector('[data-previous-operand]')
const currentOperandTextButton = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextButton, currentOperandTextButton)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})