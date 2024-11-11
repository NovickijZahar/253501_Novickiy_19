class PersonOOP{
    constructor(lastName, firstName, middleName){
        this.lastName = lastName.trim();
        this.firstName = firstName.trim();
        this.middleName = middleName.trim();
        if (this.lastName === '')
            throw 'The lastName can\'t be empty';
        if (this.firstName === '')
            throw 'The firstName can\'t be empty';
        if (this.middleName === '')
            throw 'The middleName can\'t be empty';
    }

    getFullName(){
        return `${this.lastName} ${this.firstName} ${this.middleName}`;
    }

    get FirstName(){
        return this.firstName
    }
    set FirstName(value){
        if (value.trim() === '')
            throw 'The firstName can\'t be empty'
        this.firstName = value.trim();
    }

    get LastName(){
        return this.lastName
    }
    set LastName(value){
        if (value.trim() === '')
            throw 'The lastName can\'t be empty'
        this.lastName = value.trim();
    }

    get MiddleName(){
        return this.middleName
    }
    set MiddleName(value){
        if (value.trim() === '')
            throw 'The middleName can\'t be empty'
        this.middleName = value.trim();
    }
}


class ReaderOOP extends PersonOOP{
    constructor(lastName, firstName, middleName, joinYear, libraryCard){
        super(lastName, firstName, middleName);
        this.joinYear = joinYear.trim();
        this.libraryCard = libraryCard.trim();
        if (this.joinYear === '')
            throw 'The joinYear can\'t be empty';
        if (this.libraryCard === '')
            throw 'The libraryCard can\'t be empty';
        if (+this.joinYear == NaN || this.joinYear.includes('+') || 
            this.joinYear.includes('-') || this.joinYear.includes('e') || 
            this.joinYear > 2024 || this.joinYear < 2000)
            throw 'The join year should be between 2000 and 2024';
        if (+this.libraryCard == NaN || this.libraryCard.includes('.') || 
            this.libraryCard.includes('+') || this.libraryCard.includes('-')
            || this.libraryCard.includes('e') || this.libraryCard.length != 4)
            throw 'The library card should have 4 numbers';
    }

    static readers = [];

    static add(lastName, firstName, middleName, joinYear, libraryCard){
        try{
            let container = document.querySelector('.container_oop');
            let reader = new ReaderOOP(lastName, firstName, middleName, joinYear, libraryCard);
            container.innerHTML += `<div>${reader.getFullName()}</div>`;
            this.readers.push(reader);
            this.findOldest();
        }
        catch(e){
            alert(e);
        }
    }

    getFullName(){
        return `${super.getFullName()}, join year: ${this.joinYear}, library card: ${this.libraryCard}`;

    }

    static findOldest(){
        let oldest = document.getElementById('oldest_oop');
        if (this.readers.length > 0) {
            oldest.innerText = [...this.readers].sort((a, b) => a.joinYear - b.joinYear)[0].getFullName();
        } else {
            oldest.innerText = 'No readers available';
        }
    }
}

function oop_add(lastName, firstName, middleName, joinYear, libraryCard){
    ReaderOOP.add(lastName, firstName, middleName, joinYear, libraryCard);
}