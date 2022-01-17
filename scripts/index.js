(() => {
    const billInputNode = document.querySelector(".js-bill");
    const peopleInputNode = document.querySelector(".js-people");
    const tipsContainerNode = document.querySelector(".js-tips");

    const tipPerPersonNode = document.querySelector(".js-tip-per-person");
    const totalPerPersonNode = document.querySelector(".js-total-per-person");
    
    billInputNode.addEventListener("input", (event) => {
        checkInputValue(event.target)

        if (isAllInputsPresent()) {
            displayPrice();
        }
    })

    peopleInputNode.addEventListener("input", (event) => {
        checkInputValue(event.target)

        if (isAllInputsPresent()) {
            displayPrice();
        }
    })

    tipsContainerNode.addEventListener("click", (event) => {

        const currentNode = event.target;
        
        if (currentNode.classList.contains("js-tip-custom")) {

        } else if (currentNode.classList.contains("card__tip")) {
            document.querySelector(".card__tip--active")?.classList.remove("card__tip--active");
            currentNode.classList.add("card__tip--active")
            
        }

        if (isAllInputsPresent()) {
            displayPrice();
        }
    })

    function isAllInputsPresent() {
        return billInputNode.value && peopleInputNode.value && document.querySelector(".card__tip--active")
    }

    function displayTipAmountPerPerson() {
        const bill = Number.parseInt(billInputNode.value);
        const people = Number.parseInt(peopleInputNode.value);
        const tip = Number.parseInt(document.querySelector(".card__tip--active").textContent.replace("%", ""));

        const tipPerPerson = ((bill * tip) / 100) / people;

        tipPerPersonNode.textContent = "$" + round(tipPerPerson);
        
    }

    function displayTotalPerPerson() {
        const bill = Number.parseInt(billInputNode.value);
        const people = Number.parseInt(peopleInputNode.value);
        const tip = Number.parseInt(document.querySelector(".card__tip--active").textContent.replace("%", ""));

        const totalPerPerson = (bill / people) + (((bill * tip) / 100) / people);

        totalPerPersonNode.textContent = "$" + round(totalPerPerson);
    }

    function displayPrice() {
        displayTipAmountPerPerson();
        displayTotalPerPerson();
    }

    function checkInputValue(currentNode) {
        const value = Number.parseInt(currentNode.value);

        if (isNaN(value) || value == 0) {
            currentNode.classList.remove("card__input--valid");
            currentNode.classList.add("card__input--error");
        } else {
            currentNode.classList.remove("card__input--error");
            currentNode.classList.add("card__input--valid");
        }
    }

    function round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    
})()